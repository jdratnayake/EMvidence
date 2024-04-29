<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use App\Models\AnalysisPlugin;
use App\Models\EmDataFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Dompdf\Dompdf;

function execute_python_script($path, ...$variables)
{
    $process = new Process(['python3', $path, ...$variables]);
    $process->setTimeout(360);

    try {
        $process->mustRun();
        return json_decode($process->getOutput());
    } catch (ProcessFailedException $exception) {
        throw new \Exception($exception->getMessage(), $exception->getCode(), $exception);
    }
}

class PluginController extends Controller
{
    public function index()
    {
        $plugins = AnalysisPlugin::all();

        $responseData = [
            'plugins' => $plugins,
        ];

        return response()->json($responseData);
    }

    public function deletePlugin(Request $request)
    {
        $pluginId = $request->header("plugin_id");
        $plugin = AnalysisPlugin::where('plugin_id', $pluginId)->delete();

        $responseData = [
            'success' => "Plugin deleted successfully",
        ];

        return response()->json($responseData);
    }

    public function getDeveloperPlugins(Request $request)
    {
        $userId = $request->header("user_id");
        $plugins = AnalysisPlugin::orderBy('plugin_upload_timestamp', 'asc')
            ->where('user_id', $userId)
            ->get();

        $responseData = [
            'plugins' => $plugins,
        ];

        return response()->json($responseData);
    }

    public function getPlugin(Request $request)
    {
        $pluginId = $request->header("plugin_id");
        $plugin = AnalysisPlugin::where('plugin_id', $pluginId)
            ->join('users', 'analysis_plugins.user_id', '=', 'users.user_id')
            ->select('analysis_plugins.*', 'users.first_name', 'users.last_name')
            ->get();

        $responseData = [
            'plugin' => $plugin[0],
        ];

        return response()->json($responseData);
    }

    public function getFilteredPlugin(Request $request)
    {
        $emRawFileId = $request->header('em_raw_file_id');
        $fftSize = $request->header('fft_size');

        $plugin = EmDataFile::where('em_raw_file_id', $emRawFileId)
            ->select('center_frequency', 'sampling_rate')
            ->get();
        $centerFrequency = $plugin[0]->center_frequency;
        $samplingRate = $plugin[0]->sampling_rate;


        $responseData = AnalysisPlugin::where('center_frequency', $centerFrequency)
            ->where('sampling_rate', $samplingRate)
            ->where('fft_size', $fftSize)
            ->join('users', 'analysis_plugins.user_id', '=', 'users.user_id')
            ->select('analysis_plugins.*', 'users.first_name', 'users.last_name')
            ->get();

        return response()->json(["filteredPluginData" => $responseData]);
    }

    public function getPendingPlugins()
    {
        $initialPlugins = AnalysisPlugin::orderBy('plugin_upload_timestamp', 'asc')->where('compatibility_status', 'pending')->get();

        $responseData = [
            'pendingPlugins' => $initialPlugins,
        ];

        return response()->json($responseData);
    }

    public function getVerifiedPlugins()
    {
        $verifiedPlugins = AnalysisPlugin::orderBy('plugin_upload_timestamp', 'asc')
            ->whereIn('compatibility_status', ['compatible', 'incompatible'])
            ->get();

        $responseData = [
            'verifiedPlugins' => $verifiedPlugins,
        ];

        return response()->json($responseData);
    }

    public function getCompatiblePlugins()
    {
        $verifiedPlugins = AnalysisPlugin::orderBy('number_of_usage_times', 'desc')
            ->where('compatibility_status', 'compatible')
            ->join('users', 'analysis_plugins.user_id', '=', 'users.user_id')
            ->select('analysis_plugins.*', 'users.first_name', 'users.last_name')
            ->get();

        $responseData = [
            'compatiblePlugins' => $verifiedPlugins,
        ];

        return response()->json($responseData);
    }

    public function getPluginIcon(Request $request)
    {
        $filename = $request->header("icon_filename");

        $path = env("PLUGIN_ICON_DIRECTORY_PATH") . $filename;

        if (file_exists($path)) {
            return response()->file($path);
        } else {
            $defaultImagePath = env("PLUGIN_ICON_DIRECTORY_PATH") . "default.png";
            return response()->file($defaultImagePath);
        }
    }

    public function executePreprocessingPlugin(Request $request)
    {
        try {
            // Header parameters
            $preprocessingPluginName = "basic.py";
            $downSamplingIndex = $request->header("down_sampling_index");
            $fftSizeIndex = $request->header("fft_size_index");
            $overlapPercentageIndex = $request->header("overlap_percentage_index");
            $sampleSelectionIndex = $request->header("sample_selection_index");
            $emRawFileId = $request->header("em_raw_file_id");

            // Retrieve EM raw file record
            $emRawFileRecord = EmDataFile::where('em_raw_file_id', $emRawFileId)->firstOrFail();
            $emRawFileName = $emRawFileRecord->em_raw_file_name;

            // Set path variables
            $emRawFilePath = env("EM_RAW_DIRECTORY_PATH") . "/" . $emRawFileName;
            $preprocessingPluginPath = env("PREPROCESSING_PLUGIN_DIRECTORY_PATH") . "/" . $preprocessingPluginName;
            $emPreprocessedDirectoryPath = env("EM_PREPROCESSED_DIRECTORY_PATH");

            // Execute Python script
            $output = execute_python_script(
                $preprocessingPluginPath,
                $emRawFilePath,
                $emPreprocessedDirectoryPath,
                $downSamplingIndex,
                $fftSizeIndex,
                $overlapPercentageIndex,
                $sampleSelectionIndex
            );

            // Update EM preprocess file name
            $emPreprocessFileName = explode(".", $emRawFileName)[0] . ".npy";
            EmDataFile::where('em_raw_file_id', $emRawFileId)->update(['em_preprocess_file_name' => $emPreprocessFileName]);

            return response()->json(["output" => $output]);
        } catch (\Exception $e) {
            // Handle any exceptions
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    public function executeAnalysisPlugin(Request $request)
    {
        try {
            $emRawFileID = $request->header("em_raw_file_id");
            $analysisPluginID = $request->header("analysis_plugin_id");

            AnalysisPlugin::where('plugin_id', $analysisPluginID)->increment('number_of_usage_times');

            $emRawFileRecord = EmDataFile::where('em_raw_file_id', $emRawFileID)->firstOrFail();
            $analysisPluginRecord = AnalysisPlugin::where('plugin_id', $analysisPluginID)->firstOrFail();

            $emPreprocessingFileName = $emRawFileRecord->em_preprocess_file_name;
            $analysisPluginName = $analysisPluginRecord->plugin_script_filename;
            $analysisPluginMlModelName = $analysisPluginRecord->ml_model_filename;

            // Set em preprocessing path
            $emPreprocessingFilePath = env("EM_PREPROCESSED_DIRECTORY_PATH") . "/" . $emPreprocessingFileName;

            // Set path variables
            $analysisPluginPath = env("ANALYSIS_PLUGIN_DIRECTORY_PATH") . "/" . $analysisPluginName;
            $analysisPluginMlModelPath = env("ML_MODEL_DIRECTORY_PATH") . "/" . $analysisPluginMlModelName;

            $output = execute_python_script($analysisPluginPath, $emPreprocessingFilePath, $analysisPluginMlModelPath);

            return response()->json(["output" => $output]);
        } catch (\Exception $e) {
            // Handle any exceptions
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    function installPipLibrariesFromFile(Request $request)
    {
        try {
            // Retrieve analysis plugin ID from request header
            $analysisPluginID = $request->header("analysis_plugin_id");

            // Retrieve analysis plugin record from the database
            $analysisPluginRecord = AnalysisPlugin::where('plugin_id', $analysisPluginID)->firstOrFail();

            // Get the dependency filename from the analysis plugin record
            $dependencyFilename = $analysisPluginRecord->dependency_filename;

            // Get the full path to the dependency file
            $filePath = env("DEPENDENCY_DIRECTORY_PATH") . $dependencyFilename;

            // Check if the dependency file exists
            if (!file_exists($filePath)) {
                throw new \Exception("Dependency file not found: $dependencyFilename");
            }

            // Read the contents of the dependency file
            $fileContents = file_get_contents($filePath);

            // Split the contents into an array of libraries
            $pipLibraries = explode("\n", $fileContents);

            // Install each pip library
            foreach ($pipLibraries as $library) {
                $process = new Process(['pip', 'install', $library]);
                $process->run();

                // Check if the installation process failed
                if (!$process->isSuccessful()) {
                    throw new ProcessFailedException($process);
                }
            }

            // Return success response
            return response()->json(["success" => 'Pip libraries installed successfully.']);
        } catch (\Exception $e) {
            // Handle any exceptions
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }


    public function uploadPlugin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'plugin_name' => 'required|string|unique:analysis_plugins|max:64',
            'description' => 'required|string|max:512',
            'device_id' => 'required|numeric',
            'em_data_file_id' => 'required|numeric',
            'sampling_rate' => 'required|numeric',
            'center_frequency' => 'required|numeric',
            'fft_size' => 'required|numeric',
            'icon' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'dependency_list' => 'required|file|mimes:txt|max:1024',
            'plugin_script_file' => 'required|file|max:2048',
            'plugin_ml_model' => 'required|file|max:102400',
            'user_id' => 'required|numeric',
        ]);

        // If validation fails, return error messages
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Handle icon upload
        $iconFile = $request->file('icon');
        $iconFileExtension = $iconFile->getClientOriginalExtension();
        $iconFileNewName = $request->input('user_id') . "_plugin_icon_" . Str::uuid()->toString() . "." . $iconFileExtension;
        $iconPath = $iconFile->storeAs('', $iconFileNewName, "plugin_icon");

        // Handle dependency list upload
        $pluginDependencyFile = $request->file('dependency_list');
        $pluginDependencyFileExtension = $pluginDependencyFile->getClientOriginalExtension();
        $pluginDependencyFileNewName = $request->input('user_id') . "_plugin_dependency_file_" . Str::uuid()->toString() . "." . $pluginDependencyFileExtension;
        $pluginDependencyFilePath = $pluginDependencyFile->storeAs('', $pluginDependencyFileNewName, "plugin_dependency");

        // Handle plugin file upload
        $pluginSciptFile = $request->file('plugin_script_file');
        $pluginSciptFileExtension = $pluginSciptFile->getClientOriginalExtension();
        $pluginSciptFileNewName = $request->input('user_id') . "_plugin_script_file_" . Str::uuid()->toString() . "." . $pluginSciptFileExtension;
        $pluginSciptFilePath = $pluginSciptFile->storeAs('', $pluginSciptFileNewName, "plugin_script");

        // Handle machine learning model upload
        $pluginMlModelFile = $request->file('plugin_ml_model');
        $pluginMlModelFileExtension = $pluginMlModelFile->getClientOriginalExtension();
        $pluginMlModelFileNewName = $request->input('user_id') . "_plugin_ml_model_file_" . Str::uuid()->toString() . "." . $pluginMlModelFileExtension;
        $pluginMlModelFilePath = $pluginMlModelFile->storeAs('', $pluginMlModelFileNewName, "plugin_ml_model");

        // Create a new AnalysisPlugin instance
        $plugin = new AnalysisPlugin();
        $plugin->plugin_name = $request->input('plugin_name');
        $plugin->plugin_description = $request->input('description');
        $plugin->device_id = $request->input('device_id');
        $plugin->em_file_id = $request->input('em_data_file_id');
        $plugin->sampling_rate = $request->input('sampling_rate');
        $plugin->center_frequency = $request->input('center_frequency');
        $plugin->fft_size = $request->input('fft_size');
        $plugin->icon_filename = $iconFileNewName;
        $plugin->dependency_filename = $pluginDependencyFileNewName;
        $plugin->plugin_script_filename = $pluginSciptFileNewName;
        $plugin->ml_model_filename = $pluginMlModelFileNewName;
        $plugin->user_id = $request->input('user_id');
        $plugin->save();

        return response()->json(["success" => 'Plugin uploaded successfully.'], 200);
    }

    public function updatePluginCompatibilityStatus(Request $request)
    {
        $userId = $request->header("user_id");
        $analysisPluginID = $request->header("analysis_plugin_id");
        $compatibilityStatus = $request->header("compatibility_status");

        $analysisPluginUpdateStatus = AnalysisPlugin::where('plugin_id', $analysisPluginID)
            ->update([
                'compatibility_status' => $compatibilityStatus,
                "plugin_compatibility_verified_timestamp" => now(),
                "compatibility_check_admin_id" => $userId
            ]);

        return response()->json(["success" => $analysisPluginUpdateStatus]);
    }

    public function changePluginCompatibilityStatusToVerify(Request $request)
    {
        $analysisPluginID = $request->header("analysis_plugin_id");
        $compatibilityStatus = $request->header("compatibility_status");

        $analysisPluginUpdateStatus = AnalysisPlugin::where('plugin_id', $analysisPluginID)
            ->update([
                'compatibility_status' => $compatibilityStatus,
                "plugin_compatibility_verified_timestamp" => now(),
            ]);

        return response()->json(["success" => $analysisPluginUpdateStatus]);
    }

    public function generateAnalysisReport(Request $request)
    {
        // Initialize Dompdf
        $dompdf = new Dompdf();

        // Generate PDF content
        $html = '<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                h1, h2 {
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
        
                }
                th, td {
                    padding: 10px;
                    text-align: left;
                    border: 1px solid #dddddd;
                }
                th {
                    background-color: #f2f2f2;
                    width: 35%;
                }
            </style>
        </head>
        <body>
            <h1>Report Name</h1>
            <h2>Date: 09.04.2024</h2>
        
            <h2>File Details:</h2>
            <table>
                <tr>
                    <th>File Name:</th>
                    <td>Test.cfile</td>
                </tr>
                <tr>
                    <th>Sampling Rate:</th>
                    <td>500 Hz</td>
                </tr>
                <tr>
                    <th>Center Frequency:</th>
                    <td>50 Hz</td>
                </tr>
                <tr>
                    <th>Device Name:</th>
                    <td>iPhone 4s</td>
                </tr>
                <tr>
                    <th>File Size:</th>
                    <td>4.77 MB</td>
                </tr>
                <tr>
                    <th>File Hash:</th>
                    <td>hvbnsidvsvhiushvuhsuodvnshdvjsd@vysd+</td> 
                </tr>
            </table>
        
            <h2>Pre-processing Plugin Details:</h2>
            <table>
                <tr>
                    <th>Down-sampling:</th>
                    <td>10Mhz</td> 
                </tr>
                <tr>
                    <th>FFT Size:</th>
                    <td>20</td>
                </tr>
                <tr>
                    <th>Overlap Size:</th>
                    <td>30</td> 
                </tr>
                <tr>
                    <th>Sample Selection:</th>
                    <td>not selected</td> 
                </tr>
            </table>
        
            <h2>Analysis Plugin Details:</h2>
            <table>
                <tr>
                    <th>Plugin Name:</th>
                    <td>Iphone 4s analysis</td> 
                </tr>
                <tr>
                    <th>Plugin Author:</th>
                    <td>steave pops</td> 
                </tr>
            </table>
        
            <h2>Results:</h2>
            <table>
                <tr>
                    <th>Using Gallary App:</th>
                    <td>62.6%</td>
                </tr>
                <tr>
                    <th>Using SMS App:</th>
                    <td>36.62%</td>
                </tr>
                <tr>
                    <th>Using Email App:</th>
                    <td>0.36%</td>
                </tr>
                <tr>
                    <th>In Home Screen:</th>
                    <td>0.25%</td>
                </tr>
                <tr>
                    <th>Using Calendar App:</th>
                    <td>0.11%</td>
                </tr>
                <tr>
                    <th>Idle:</th>
                    <td>0.06%</td>
                </tr>
            </table>
        </body>
        </html>
        ';

        // Load HTML content into Dompdf
        $dompdf->loadHtml($html);

        // Render PDF
        $dompdf->render();

        // Generate a unique filename for the PDF
        $pdfFilename = 'report_' . time() . '.pdf';

        // Store PDF in the storage directory
        $pdfContent = $dompdf->output();
        file_put_contents(env("REPORTS_DIRECTORY_PATH") . $pdfFilename, $pdfContent);

        // Return the filename of the stored PDF
        return $pdfFilename;
    }
}
