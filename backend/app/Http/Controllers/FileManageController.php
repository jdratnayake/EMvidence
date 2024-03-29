<?php

namespace App\Http\Controllers;

use App\Models\EmDataFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use Pion\Laravel\ChunkUpload\Exceptions\UploadMissingFileException;
use Pion\Laravel\ChunkUpload\Exceptions\UploadFailedException;
use Carbon\Carbon;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;


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
            //$finalPath = storage_path($filePath);
            $finalPath = env("EM_RAW_DIRECTORY_PATH");
            // 'file_path' => $filePath .'/'. $fileName,
            // move the file name
            $file->move($finalPath, $fileName);
            return response()->json([
                'file_unique_name' => $fileName
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500
            ]);
        }

    }

    public function convertFileName($inputString)
    {
        //arduino_2_for_loops.cfile_074e61716ee3ac559fd596cd558de405.gz
        // Split the string by "_"
        $parts = explode('.cfile', $inputString);

        // Extract the file extension
        $extension = pathinfo($parts[1], PATHINFO_EXTENSION);

        // Remove the file extension from the second part
        $uniqIdentifier = Str::replaceLast('.' . $extension, '', $parts[1]);

        // Reorder the parts and concatenate
        $outputString = $parts[0] . $uniqIdentifier . '.cfile';

        return $outputString;
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


            $currentDateTime = Carbon::now();

            // Add 5 hours and 30 minutes
            $localDateTime = $currentDateTime->addHours(5)->addMinutes(30);

            // Format the future time as desired
            $formattedDateTime = $localDateTime->format("Y-m-d H:i:s");

            $query = EmDataFile::create([
                'user_id' => 1,
                'em_raw_file_name' => $fileUniqueName,
                'em_raw_file_visible_name' => $name,
                'device_name' => $deviceName,
                'center_frequency' => $centerFreq,
                'sampling_rate' => $samplingRate,
                'em_raw_cfile_file_size' => $size,
                'em_raw_h5_file_size' => 0,
                'em_raw_h5_hash' => 'not_yet_calculated',
                'em_raw_cfile_hash' => $file_hash,
                'file_upload_timestamp' => $formattedDateTime,
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






    public function processEMFile()
    {
        function convertFileName($inputString)
        {

            $parts = explode('.cfile', $inputString);

            // Extract the file extension
            $extension = pathinfo($parts[1], PATHINFO_EXTENSION);

            // Remove the file extension from the second part
            $uniqIdentifier = Str::replaceLast('.' . $extension, '', $parts[1]);

            // Reorder the parts and concatenate
            $outputString = $parts[0] . $uniqIdentifier;

            return $outputString;
        }

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

        $getEmDataRecords = EmDataFile::where('em_raw_upload_status', 'processing')->get([
            'em_raw_file_id',
            'em_raw_file_name',
            'em_raw_cfile_hash',
            'em_raw_upload_status',
            'user_id',
        ])->toArray();

        if (count($getEmDataRecords) > 0) {

            foreach ($getEmDataRecords as $item) {

                // ----------------- Decomprerss the file -----------------

                $gzipFilePath = env("EM_RAW_DIRECTORY_PATH") . "/" . $item['em_raw_file_name'];
                $cfileName = convertFileName($item['em_raw_file_name']) . ".cfile";
                $decompressedFilePath = env("EM_RAW_DIRECTORY_PATH") . "/" . $cfileName;

                // Open the compressed file for reading
                $gzipFileHandle = fopen($gzipFilePath, 'rb');

                // Open a writable file handle for the decompressed file
                $decompressedFileHandle = fopen($decompressedFilePath, 'wb');

                if ($gzipFileHandle === false || $decompressedFileHandle === false) {
                    // Handle file opening errors, go to next iteration.
                    fclose($gzipFileHandle);
                    fclose($decompressedFileHandle);
                    continue;
                }

                // Initialize decompression stream
                $gzipStream = gzopen($gzipFilePath, 'rb');

                if ($gzipStream === false) {
                    // Handle decompression stream creation error
                    fclose($gzipFileHandle);
                    fclose($decompressedFileHandle);
                    continue;
                }

                // Stream decompressed content and write to the decompressed file
                while (!gzeof($gzipStream)) {
                    $chunk = gzread($gzipStream, 1024 * 1024 * 5); // Read 5MB at a time
                    fwrite($decompressedFileHandle, $chunk);
                }

                // Close handles
                gzclose($gzipStream);
                fclose($gzipFileHandle);
                fclose($decompressedFileHandle);

                // ----------------- Calculate cfile hash -----------------

                // Specify the path to your large file
                $filePath = $decompressedFilePath;

                // Open the file for reading
                $fileHandle = fopen($filePath, 'r');

                // Initialize the hash context
                $hashContext = hash_init('sha256');

                // Read the file in chunks and update the hash context
                while (!feof($fileHandle)) {
                    hash_update($hashContext, fread($fileHandle, 1024 * 1024 * 5)); // Read 5MB at a time
                }

                // Finalize the hash computation and get the resulting hash
                $hash = hash_final($hashContext);

                // Close the file handle
                fclose($fileHandle);

                if ($item['em_raw_cfile_hash'] != $hash) {

                    // update relevat database record em_raw_upload_status = 'faild'
                    EmDataFile::where('em_raw_file_id', $item['em_raw_file_id'])->update([
                        'em_raw_upload_status' => 'faild'
                    ]);

                    continue;
                }

                // ----------------- Convert cfile to h5 format can calculate the hash -----------------


                $h5FileName = convertFileName($item['em_raw_file_name']) . ".h5";
                $h5FilePath = env("EM_RAW_DIRECTORY_PATH") . "/" . $h5FileName;
                $output = execute_python_script(env("CFILE_TO_H5_FILE_PATH"), $decompressedFilePath, $h5FilePath);

                if ($output->status == 200) {

                    // Delete the zip file
                    unlink(env("EM_RAW_DIRECTORY_PATH") . "/" . $item['em_raw_file_name']);

                    $currentDateTime = Carbon::now();

                    // Add 5 hours and 30 minutes
                    $localDateTime = $currentDateTime->addHours(5)->addMinutes(30);

                    // Format the future time as desired
                    $formattedDateTime = $localDateTime->format("Y-m-d H:i:s");

                    // Update the relevent records.
                    EmDataFile::where('em_raw_file_id', $item['em_raw_file_id'])->update([
                        'em_raw_upload_status' => 'processed',
                        'em_raw_file_name' => $cfileName,
                        'em_preprocess_file_name' => $h5FileName,
                        'em_raw_h5_file_size' => $output->file_size,
                        'em_raw_h5_hash' => $output->file_hash,
                        'preprocessing_file_creation_timestamp' => $formattedDateTime
                    ]);

                } else {
                    continue;
                }

            }

            return "all files are processed";

        } else {

            return "no files to process";
        }
    }


    public function getCSRFToken()
    {
        return csrf_token();
    }
}
