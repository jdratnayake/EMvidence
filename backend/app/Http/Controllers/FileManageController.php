<?php

namespace App\Http\Controllers;

use App\Models\EmDataFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;


use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use Pion\Laravel\ChunkUpload\Exceptions\UploadMissingFileException;
use Pion\Laravel\ChunkUpload\Exceptions\UploadFailedException;
use Carbon\Carbon;

class FileManageController extends Controller
{
    public function index()
    {
        $emDataRecords = EmDataFile::where('user_id',1)->get([
                          'em_raw_file_id', 
                          'em_raw_file_name',
                          'em_raw_file_visible_name',
                          'em_raw_cfile_hash',
                          'em_preprocess_file_name',
                          'em_raw_cfile_file_size',
                          'em_raw_h5_file_size',
                          'em_raw_h5_hash',
                          'device_name',
                          'center_frequency',
                          'sampling_rate',
                          'user_id',
                          'file_upload_timestamp'
           ]);
        return  $emDataRecords;
    }

    public function deleteFile(Request $request)
    {

        // try {
        //      //$query = DB::table('em_data_files')->select('em_raw_file_name')->where('em_raw_file_id',$request->file_id)->first();
        // //print $query->path;
        // $emdata = EmDataFile::find($request->file_id);
        // if($emdata->delete() && unlink(storage_path('em_raw/'.$emdata->file_path))){
        //  return response()->json([
        //     'response' => "deletion is succsess"
        // ]);
        // }else{
        //     return response()->json([
        //         'response' => 'deletion is unsuccsess'
        //     ]);
        // }
        // } catch (\Throwable $th) {
        //     return response()->json([
        //         'response' => 'Internal Server error'
        //     ]);
        // }
        
        return response()->json([
                    'response' => $request->file_id
                ]);
            

    }

    public function store(Request $request)
    {
        // create the file receiver
        $receiver = new FileReceiver("file", $request, HandlerFactory::classFromRequest($request));

        // check if the upload is success, throw exception or return response you need
        if ($receiver->isUploaded() === false) {
            throw new UploadMissingFileException();
        }

        // receive the file
        $save = $receiver->receive();

        // check if the upload has finished (in chunk mode it will send smaller files)
        if ($save->isFinished()) {
            // save the file and return any response you need, current example uses `move` function. If you are
            // not using move, you need to manually delete the file by unlink($save->getFile()->getPathname())
            return $this->saveFile($save->getFile());
        }

        // we are in chunk mode, lets send the current progress
        $handler = $save->handler();

        return response()->json([
            "done" => $handler->getPercentageDone(),
            'status' => true
        ]);
    }

    protected function createFilename(UploadedFile $file)
    {
        $extension = $file->getClientOriginalExtension();
        $filename = str_replace("." . $extension, "", $file->getClientOriginalName()); // Filename without extension
        // Add timestamp hash to name of the file
        $filename .= "_" . md5(time()) . "." . $extension;

        return $filename;
    }

    protected function saveFile(UploadedFile $file)
    {
        try {
        $fileName = $this->createFilename($file);
        // Group files by mime type
        $realFileName = $file->getClientOriginalName();
        $mime = str_replace('/', '-', $file->getMimeType());

        // Build the file path
        $filePath = "em_raw";
        $finalPath = storage_path($filePath);
        // 'file_path' => $filePath .'/'. $fileName,
        // move the file name
        $file->move($finalPath, $fileName);
        return response()->json([
            'file_unique_name' => $fileName
        ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'Internal server error'
            ]);
        }

        // $query = DB::table('em_data_files')->insert([
        //     'user_id' => 1,
        //     'em_raw_file_name' => $fileName,
        //     'em_raw_file_visible_name' => 'test',
        //     'device_name' => 'test',
        //     'center_frequency' => 100,
        //     'sampling_rate' => 10,
        //     'em_raw_cfile_file_size' => 100,
        //     'em_raw_h5_file_size' => 0,
        //     'em_raw_h5_hash' => 'test',
        //     'em_raw_cfile_hash' => 'test',
        //     'file_upload_timestamp' => Carbon::create(now())->format("Y-m-d H:i:s"),
        // ]);


        // $query = EmDataFile::create([
        //     'user_id' => 1,
        //     'em_raw_file_name' => $fileName,
        //     'em_raw_file_visible_name' => 'test',
        //     'device_name' => 'test',
        //     'center_frequency' => 100,
        //     'sampling_rate' => 10,
        //     'em_raw_cfile_file_size' => 100,
        //     'em_raw_h5_file_size' => 0,
        //     'em_raw_h5_hash' => 'test',
        //     'em_raw_cfile_hash' => 'test',
        //     'file_upload_timestamp' => Carbon::create(now())->format("Y-m-d H:i:s"),
        // ]);

    }

    public function sendRecord(Request $request)
    {

        $name = $request->input('name');
        $size = $request->input('size');
        $fileUniqueName = $request->input('unique_name');
        $deviceName = $request->input('device_name');
        $centerFreq = $request->input('center_freq');
        $samplingRate = $request->input('sampling_rate');
        $file_hash = $request->input('file_hash');


        // $query = DB::table('em_data_files')
        //     ->where('em_raw_file_name', $fileUniqueName)
        //     ->update([
        //         'em_raw_file_visible_name' => $name,
        //         'em_raw_cfile_file_size' => $size,
        //         'file_upload_timestamp' => Carbon::create(now('Asia/Colombo'))->format("Y-m-d H:i:s"),
        //         'device_name' => $deviceName,
        //         'center_freq' => $centerFreq,
        //         'sampling_rate' => $samplingRate,
        //         'em_raw_cfile_hash' => $file_hash,
        //     ]);

         $query = EmDataFile::create([
            'user_id' => 1,
            'em_raw_file_name' => $fileUniqueName,
            'em_raw_file_visible_name' => $name,
            'device_name' => $deviceName,
            'center_frequency' => $centerFreq,
            'sampling_rate' => $samplingRate,
            'em_raw_cfile_file_size' => $size,
            'em_raw_h5_file_size' => 0,
            'em_raw_h5_hash' => 'test',
            'em_raw_cfile_hash' => $file_hash,
            'file_upload_timestamp' => Carbon::create(now())->format("Y-m-d H:i:s"),
        ]);

        // $query = DB::table('em_data_files')->insert([
        //     'user_id' => 1,
        //     'em_raw_file_name' => $fileUniqueName,
        //     'em_raw_file_visible_name' => $name,
        //     'device_name' => $deviceName,
        //     'center_frequency' => $centerFreq,
        //     'sampling_rate' => $samplingRate,
        //     'em_raw_cfile_file_size' => $size,
        //     'em_raw_h5_file_size' => 0,
        //     'em_raw_h5_hash' => 'test',
        //     'em_raw_cfile_hash' => $file_hash,
        //     'file_upload_timestamp' => Carbon::create(now())->format("Y-m-d H:i:s"),
        // ]); 

        if ($query) {
            return response()->json([
                'status' => 'Success'
            ]);
        } else {
            return response()->json([
                'status' => 'Internal server error'
            ]);
        }
      
    }

    public function getCSRFToken()
    {
        return csrf_token();
    }
}
