<?php

namespace App\Http\Controllers;

use App\Models\EmDataFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Crypt;


use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use Pion\Laravel\ChunkUpload\Exceptions\UploadMissingFileException;
use Pion\Laravel\ChunkUpload\Exceptions\UploadFailedException;
use Carbon\Carbon;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use GuzzleHttp\Client;


class FileManageController extends Controller
{
    public function index(Request $request)
    {

        $userId = $request->header('user_id');

        $emDataRecords = EmDataFile::where('user_id', $userId)
            ->join('devices', 'em_data_files.device_id', '=', 'devices.device_id')
            ->select('em_data_files.*', 'devices.device_name')
            ->orderBy('file_upload_timestamp', 'asc')
            ->get();

        $responseData = [
            'em_raw_files' => $emDataRecords,
        ];

        return $responseData;
    }

    public function getEmFile(Request $request)
    {
        $em_raw_file_id = $request->header('em_raw_file_id');

        $emDataRecord = EmDataFile::where('em_raw_file_id', $em_raw_file_id)
            ->join('devices', 'em_data_files.device_id', '=', 'devices.device_id')
            ->select('em_data_files.*', 'devices.device_name')
            ->get();

        $responseData = [
            'em_raw_file' => $emDataRecord[0],
        ];

        return $responseData;
    }

    public function deleteFile(Request $request)
    {

        try {

            $emdata = EmDataFile::find($request->file_id);
            info($emdata->em_raw_file_name);
            unlink(env("EM_RAW_DIRECTORY_PATH") . "/" . $emdata->em_raw_file_name);
            if ($emdata->delete()) {

                return response()->json([
                    'status' => 200
                ]);
            } else {
                return response()->json([
                    'status' => 500
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500
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
            $userid = $request->input('user_id');
            $name = $request->input('name');
            $size = $request->input('size');
            $fileUniqueName = $request->input('unique_name');
            $deviceId = $request->input('device_id');
            $centerFreq = $request->input('center_freq');
            $samplingRate = $request->input('sampling_rate');
            $file_hash = $request->input('file_hash');


            $currentDateTime = Carbon::now();

            // Add 5 hours and 30 minutes
            $localDateTime = $currentDateTime->addHours(5)->addMinutes(30);

            // Format the future time as desired
            $formattedDateTime = $localDateTime->format("Y-m-d H:i:s");

            $query = EmDataFile::create([
                'user_id' =>  $userid,
                'em_raw_file_name' => $fileUniqueName,
                'em_raw_file_visible_name' => $name,
                'device_id' => $deviceId,
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
        // $msg = 'AAAAAAAAAAAAAAAA';
        // $encryptedMessage = Crypt::encrypt($msg);
        // info('encrypted msg --------');
        // info($encryptedMessage);
        // $decryptedMessage = Crypt::decrypt($encryptedMessage);
        // info('decrypted msg --------');
        // info($decryptedMessage);

        // $sec = env('APP_KEY');
        // info($sec);

        // // Create a new client instance
        // $client = new Client();

        // // Set your HCP client ID and secret
        // $clientId = env('HCP_CLIENT_ID');
        // $clientSecret = env('HCP_CLIENT_SECRET');

        // // Make the POST request
        // $response = $client->request('POST', 'https://auth.idp.hashicorp.com/oauth2/token', [
        //     'form_params' => [
        //         'client_id' => $clientId,
        //         'client_secret' => $clientSecret,
        //         'grant_type' => 'client_credentials',
        //         'audience' => 'https://api.hashicorp.cloud'
        //     ]
        // ]);
        // // Get the response body
        // $body = $response->getBody();

        // // Parse the JSON response
        // $data = json_decode($body, true);

        // // Now you can access your API token
        // $apiToken = $data['access_token'];
        // info('--- api token ----');
        // info($apiToken);

        // // Set your HCP Vault API endpoint
        // $endpoint = 'https://api.cloud.hashicorp.com/secrets/2023-06-13/organizations/27a8d745-402a-421f-a6eb-8683496356f6/projects/635a7238-60de-4394-85d6-66b72a486eec/apps/emvidence/open';

        // // Make the GET request
        // $response = $client->request('GET', $endpoint, [
        //     'headers' => [
        //         'Authorization' => "Bearer $apiToken"
        //     ]
        // ]);

        // // Get the response body
        // $body = $response->getBody();

        // // Parse the JSON response
        // $data = json_decode($body, true);

        // // Now you can access your secret data
        // info($data);
        // $secretValue = $data['secrets'][0]['version']['value'];
        // info($secretValue);




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
                $hashContext = hash_init('md5');

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

                // ----------------- Convert cfile to h5 format, calculate the hash and encrypt the file -----------------


                $h5FileName = convertFileName($item['em_raw_file_name']) . ".h5";
                $h5FilePath = env("EM_RAW_DIRECTORY_PATH") . "/" . $h5FileName;

                $encrptH5FilePath = env("EM_RAW_DIRECTORY_PATH") . "/" . $h5FileName . ".enc";
                info($encrptH5FilePath);
                $getKey = env('APP_KEY');
                $output = execute_python_script(
                    env("CFILE_TO_H5_FILE_PATH"),
                    $decompressedFilePath,
                    $h5FilePath,
                    $getKey,
                    $encrptH5FilePath
                );
                info($output->status);
                if ($output->status == 200) {

                    // Delete the zip file
                    unlink(env("EM_RAW_DIRECTORY_PATH") . "/" . $item['em_raw_file_name']);
                    // Delete the cfile
                    unlink(env("EM_RAW_DIRECTORY_PATH") . "/" . convertFileName($item['em_raw_file_name']) . ".cfile");
                    // Delete the h5 file
                    unlink($h5FilePath);

                    $currentDateTime = Carbon::now();

                    // Add 5 hours and 30 minutes
                    $localDateTime = $currentDateTime->addHours(5)->addMinutes(30);

                    // Format the future time as desired
                    $formattedDateTime = $localDateTime->format("Y-m-d H:i:s");

                    // Update the relevent records.
                    EmDataFile::where('em_raw_file_id', $item['em_raw_file_id'])->update([
                        'em_raw_upload_status' => 'processed',
                        'em_raw_file_name' => $h5FileName . ".enc",
                        'em_raw_h5_file_size' => $output->file_size,
                        'em_raw_h5_hash' => $output->file_hash,
                        'preprocessing_file_creation_timestamp' => $formattedDateTime
                    ]);
                } else {
                    // ********   need to add what happens to the file  status ************
                    continue;
                }
            }
            info("all files are processed");
            return "all files are processed";
        } else {
            info("no files to process");
            return "no files to process";
        }
    }



    public function getCSRFToken()
    {
        return csrf_token();
    }

    // for traditional upload method
    public function testStore(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);

            return response()->json(['success' => true, 'message' => 'File uploaded successfully']);
        } else {
            return response()->json(['success' => false, 'message' => 'No file uploaded'], 400);
        }
    }

    public function sendRecordTest(Request $request)
    {


        return response()->json([
            'status' => 200
        ]);
    }
}
