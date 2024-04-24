<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use App\Models\AnalysisPlugin;
use App\Models\EmDataFile;
use Illuminate\Support\Str;

function execute_python_script($path, ...$variables)
{
    $process = new Process(['python3', $path, ...$variables]);
    $process->setTimeout(360);

    try {
        $process->mustRun();
        return json_decode($process->getOutput());
    } catch (ProcessFailedException $exception) {
        return $exception->getMessage();
    }
}

class PluginController extends Controller
{
    public function executePreprocessingPlugin(Request $request)
    {
        // Header parameters
        $emRawFileName = $request->header("em_raw_file_name");
        $preprocessingPluginName = $request->header("preprocessing_plugin_name");
        $downSamplingIndex = $request->header("down_sampling_index");
        $fftSizeIndex = $request->header("fft_size_index");
        $overlapPercentageIndex = $request->header("overlap_percentage_index");
        $sampleSelectionIndex = $request->header("sample_selection_index");

        // Set path variables
        $emRawFilePath = env("EM_RAW_DIRECTORY_PATH") . "/" . $emRawFileName;
        $preprocessingPluginPath = env("PREPROCESSING_PLUGIN_DIRECTORY_PATH") . "/" . $preprocessingPluginName;
        $emPreprocessedDirectoryPath = env("EM_PREPROCESSED_DIRECTORY_PATH");

        // $output = execute_python_script($preprocessingPluginPath, $emRawFilePath, $emPreprocessedDirectoryPath);

        $output = execute_python_script(
            $preprocessingPluginPath,
            $emRawFilePath,
            $emPreprocessedDirectoryPath,
            $downSamplingIndex,
            $fftSizeIndex,
            $overlapPercentageIndex,
            $sampleSelectionIndex
        );

        return response()->json(["output" => $output]);
    }

    public function executeAnalysisPlugin(Request $request)
    {
        $emRawFileID = $request->header("em_raw_file_id");
        $analysisPluginID = $request->header("analysis_plugin_id");

        $emRawFileRecord = EmDataFile::where('em_raw_file_id', $emRawFileID);
        $analysisPluginRecord = AnalysisPlugin::where('plugin_id', $analysisPluginID);

        $emPreprocessingFileName = $emRawFileRecord->value('em_preprocess_file_name');
        $analysisPluginName = $analysisPluginRecord->value('plugin_script_filename');
        $analysisPluginMlModelName = $analysisPluginRecord->value('ml_model_filename');

        // Set em preprocessing path
        $emPreprocessingFilePath = env("EM_PREPROCESSED_DIRECTORY_PATH") . "/" . $emPreprocessingFileName;

        // Set path variables
        $analysisPluginPath = env("ANALYSIS_PLUGIN_DIRECTORY_PATH") . "/" . $analysisPluginName;
        $analysisPluginMlModelPath = env("ML_MODEL_DIRECTORY_PATH") . "/" . $analysisPluginMlModelName;

        $output = execute_python_script($analysisPluginPath, $emPreprocessingFilePath, $analysisPluginMlModelPath);

        return response()->json(["output" => $output]);
    }

    public function uploadPlugin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'plugin_name' => 'required|string|max:64',
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
}
