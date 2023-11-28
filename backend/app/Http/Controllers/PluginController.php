<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

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

    // public function
}
