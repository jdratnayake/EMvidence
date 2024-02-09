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
use ZipArchive;
use ZanySoft\Zip\Zip;

class FileManageController extends Controller
{
    public function index()
    {
        $emDataRecords = EmDataFile::where('user_id', 1)->get([
            'em_raw_file_id',
            'em_raw_file_name',
            'em_raw_file_visible_name',
            'em_raw_cfile_hash',
            'em_raw_upload_status',
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
        return $emDataRecords;
    }

    public function deleteFile(Request $request)
    {

        try {

            $emdata = EmDataFile::find($request->file_id);
            if ($emdata->delete() && unlink(storage_path('em_raw/' . $emdata->em_raw_file_name))) {
                return response()->json([
                    'response' => "deletion is succsess"
                ]);
            } else {
                return response()->json([
                    'response' => 'deletion is unsuccsess'
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'response' => 'Internal Server error'
            ]);
        }
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

    }

    public function sendRecord(Request $request)
    {

        try {
            $name = $request->input('name');
            $size = $request->input('size');
            $fileUniqueName = $request->input('unique_name');
            $deviceName = $request->input('device_name');
            $centerFreq = $request->input('center_freq');
            $samplingRate = $request->input('sampling_rate');
            $file_hash = $request->input('file_hash');

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
            if ($query) {
                return response()->json([
                    'status' => 200
                ]);
            }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'details' => $th
            ]);
        }
    }


    // public function processEMFile()
    // {
    //     // $zip = new ZipArchive();
    //     // $gzipFilePath = storage_path('em_raw/test.png_0ced56c7c6e692345a3ba9f19d8e9467d.gz');
    //     // if ($zip->open($gzipFilePath) === true){
    //     //     $zip->extractTo(storage_path('em_raw/'));
    //     //     $zip->close();
    //     //      return response()->json([
    //     //     'status' => 'ok'
    //     // ]);

    //     // }else{
    //     //      return response()->json([
    //     //     'status' => 'error'
    //     // ]);
    //     // }

    //     // $gzipFilePath = storage_path('em_raw/test.png_0ced56c7c6e692345a3ba9f19d8e9467d.gz');
    //     // $zip = Zip::open($gzipFilePath);
    //     // return response()->json([
    //     //     'status' => 'done'
    //     // ]);


    //     try {
    //         // arduino_for_loop.h5_cb770c1102af3aefd24faf4c38f1ce7e.gz
    //         $gzipFilePath = storage_path('em_raw/SamplePNGImage_10mbmb.png_6d7003a03b749661166ea31f96456db5.gz');
           
    //         $decompressedFilePath = storage_path('em_raw/SamplePNGImage_10mbmb_6d7003a03b749661166ea31f96456db5.png');

    //         $compressedContent = file_get_contents($gzipFilePath);

    //         $decompressedContent = gzdecode($compressedContent);

    //         file_put_contents($decompressedFilePath, $decompressedContent);


    //         // $gzipFile = fopen($gzipFilePath, 'rb');

    //         // // Open a new file for writing the decompressed content
    //         // $decompressedFile = fopen($decompressedFilePath, 'wb');

    //         // // Read and decompress the file in chunks
    //         // while (!feof($gzipFile)) {
    //         //     $chunk = fread($gzipFile, 8192); // Adjust the chunk size as needed
    //         //     $decompressedChunk = gzdecode($chunk);
    //         //     fwrite($decompressedFile, $decompressedChunk);
    //         // }

    //         // // Close the file handles
    //         // fclose($gzipFile);
    //         // fclose($decompressedFile);
    //         return response()->json([
    //             'status' => 'ok'
    //         ]);


    //     } catch (\Throwable $th) {
    //         return response()->json([
    //             'status' => 'Internal server error'
    //         ]);
    //     }
    //     // return response()->json([
    //     //     'status' => 'ok'
    //     // ]);

    // }

    public function processEMFile()
{
    try {
        $gzipFilePath = storage_path('em_raw/6gb.cfile_350a4e793d8ee24e571d5227821076d6.gz');
        $decompressedFilePath = storage_path('em_raw/6gb_350a4e793d8ee24e571d5227821076d6.cfile');

        // Open the compressed file for reading
        $gzipFileHandle = fopen($gzipFilePath, 'rb');
        // Open a writable file handle for the decompressed file
        $decompressedFileHandle = fopen($decompressedFilePath, 'wb');

        if ($gzipFileHandle === false || $decompressedFileHandle === false) {
            // Handle file opening errors
            return response()->json([
                'status' => 'Failed to open files'
            ]);
        }

        // Initialize decompression stream
        $gzipStream = gzopen($gzipFilePath, 'rb');

        if ($gzipStream === false) {
            // Handle decompression stream creation error
            fclose($gzipFileHandle);
            fclose($decompressedFileHandle);
            return response()->json([
                'status' => 'Failed to create decompression stream'
            ]);
        }

        // Stream decompressed content and write to the decompressed file
        while (!gzeof($gzipStream)) {
            $chunk = gzread($gzipStream, 8192); // Read 8KB at a time
            fwrite($decompressedFileHandle, $chunk);
        }

        // Close handles
        gzclose($gzipStream);
        fclose($gzipFileHandle);
        fclose($decompressedFileHandle);

        return response()->json([
            'status' => 'ok'
        ]);

    } catch (\Throwable $th) {
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
