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
    public function test()
    {
        $em_raw_file_path = "/var/www/html/storage/em_raw/class_8_iphone4s_sms-app.cfile";
        $preprocessing_plugin_path = '/var/www/html/storage/plugins/preprocessing/test.py';

        $process = new Process(['python3', $preprocessing_plugin_path, $em_raw_file_path]);

        try {
            $process->mustRun();
            $output = $process->getOutput();

            return response()->json(['output' => $output]);
        } catch (ProcessFailedException $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    public function executeAnalysisPlugin(Request $request)
    {
        // Header parameters
        $emRawFileName = $request->header("em_raw_file_name");
        $analysisPluginName = $request->header("analysis_plugin_name");
        $analysisPluginMlModelName = $request->header("analysis_plugin_ml_model_name");

        // Set em preprocessing path
        $emPreprocessingFileName = explode(".", $emRawFileName)[0] . ".txt";
        $emPreprocessingFilePath = env("EM_PREPROCESSING_DIRECTORY_PATH") . "/" . $emPreprocessingFileName;

        // Set path variables
        $analysisPluginPath = env("ANALYSIS_PLUGIN_DIRECTORY_PATH") . "/" . $analysisPluginName;
        $analysisPluginMlModelPath = env("ML_MODEL_DIRECTORY_PATH") . "/" . $analysisPluginMlModelName;

        $output = execute_python_script($analysisPluginPath, $emPreprocessingFilePath, $analysisPluginMlModelPath);

        return response()->json(["output" => $output]);
    }
}
