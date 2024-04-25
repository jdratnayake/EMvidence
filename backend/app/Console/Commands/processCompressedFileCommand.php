<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\FileManageController;
use App\Models\EmDataFile;

class processCompressedFileCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'process:compressed-file1';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // $emDataRecords = EmDataFile::where('em_raw_upload_status', 'processing')->get([
        //     'em_raw_file_id',
        //     'em_raw_file_name',
        //     'em_raw_file_visible_name',
        //     'em_raw_cfile_hash',
        //     'em_raw_upload_status',
        //     'em_preprocess_file_name',
        //     'em_raw_cfile_file_size',
        //     'em_raw_h5_file_size',
        //     'em_raw_h5_hash',
        //     'device_id',
        //     'center_frequency',
        //     'sampling_rate',
        //     'user_id',
        //     'file_upload_timestamp'
        // ]);
       
        // info(json_encode($emDataRecords));
        $fileManager = new FilemanageController();
        $fileManager->processEMFile();
        
   
    }
}
