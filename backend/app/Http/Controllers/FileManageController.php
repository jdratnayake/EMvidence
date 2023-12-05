<?php

namespace App\Http\Controllers;

use App\Models\EmFileModel;
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
        $emDataRecords = EmFileModel::where('upload_user_id',1)->get(['file_id', 'upload_user_id', 'file_name','created_time','file_size' ,'file_unique_name']);
        return  $emDataRecords;
        
        //echo 'hello';

    }

    public function deleteFile(Request $request)
    {
        $query = DB::table('em_data_file')->select('file_path')->where('file_id',$request->file_id)->first();
        //print $query->path;
        $emdata = EmFileModel::find($request->file_id);
        if($emdata->delete() && unlink(storage_path(''.$query->file_path))){
         return response()->json([
            'response' => "deletion is succsess"
        ]);
        }
        return response()->json([
            'response' => "deletion is unsuccsess"
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

        $fileName = $this->createFilename($file);
        // Group files by mime type
        $realFileName = $file->getClientOriginalName();
        $mime = str_replace('/', '-', $file->getMimeType());

        // Group files by the date (week
        $dateFolder = date("Y-m-W");

        // Build the file path
        $filePath = "em_raw/{$mime}/{$dateFolder}";
        $finalPath = storage_path($filePath);
        // move the file name
        $file->move($finalPath, $fileName);
        $query = DB::table('em_data_file')->insert([
            'upload_user_id' => 1,
            'file_unique_name' => $fileName,
            'file_path' => $filePath .'/'. $fileName,
            'file_name' => 'test',
            'file_size' => 100,
            'created_time' => Carbon::create(now())->format("Y-m-d H:i:s"),

        ]);
        if ($query) {
            return response()->json([
                'file_unique_name' => $fileName
                // 'mime_type' => $mime
            ]);
        } else {
            return response()->json([
                'status' => 'Internal server error'
            ]);
        }
    }

    public function sendRecord(Request $request)
    {

        $name = $request->input('name');
        $size = $request->input('size');
        $fileUniqueName = $request->input('unique_name');

        $query = DB::table('em_data_file')
            ->where('file_unique_name', $fileUniqueName)
            ->update([
                'file_name' => $name,
                'file_size' => $size,
                'created_time' => Carbon::create(now('Asia/Colombo'))->format("Y-m-d H:i:s"),
            ]);

        if ($query) {
            return response()->json([
                'file_unique_name' => $fileUniqueName
                // 'mime_type' => $mime
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
