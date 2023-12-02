<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

function execute_python_script($path, ...$variables)
{
    $process = new Process(['python3', $path, ...$variables]);

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

        // Set path variables
        $emRawFilePath = env("EM_RAW_DIRECTORY_PATH") . "/" . $emRawFileName;
        $preprocessingPluginPath = env("PREPROCESSING_PLUGIN_DIRECTORY_PATH") . "/" . $preprocessingPluginName;
        $emPreprocessedDirectoryPath = env("EM_PREPROCESSED_DIRECTORY_PATH");

        $output = execute_python_script($preprocessingPluginPath, $emRawFilePath, $emPreprocessedDirectoryPath);

        return response()->json(["output" => $output]);
    }

    public function executeAnalysisPlugin(Request $request)
    {
        // Header parameters
        $emRawFileName = $request->header("em_raw_file_name");
        $analysisPluginName = $request->header("analysis_plugin_name");
        $analysisPluginMlModelName = $request->header("analysis_plugin_ml_model_name");

        // Set em preprocessing path
        $emPreprocessingFileName = explode(".", $emRawFileName)[0] . ".npy";
        $emPreprocessingFilePath = env("EM_PREPROCESSED_DIRECTORY_PATH") . "/" . $emPreprocessingFileName;

        // Set path variables
        $analysisPluginPath = env("ANALYSIS_PLUGIN_DIRECTORY_PATH") . "/" . $analysisPluginName;
        $analysisPluginMlModelPath = env("ML_MODEL_DIRECTORY_PATH") . "/" . $analysisPluginMlModelName;

        $output = execute_python_script($analysisPluginPath, $emPreprocessingFilePath, $analysisPluginMlModelPath);

        return response()->json(["output" => $output]);
    }
}
