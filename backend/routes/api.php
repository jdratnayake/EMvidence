<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\FileManageController;
use App\Http\Controllers\PluginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DeviceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// --------- this routes are for file upload testing --------------------
Route::post('/TestUpload', [FileManageController::class, 'testStore']);
Route::post('/uploadChunk', [FileManageController::class, 'uploadChunk']);
Route::post('/send_to_database_test', [FileManageController::class, 'sendRecordTest']);



Route::post('v1/upload_data_file', [FileManageController::class, 'store']);
Route::post('v1/send_to_database', [FileManageController::class, 'sendRecord']);
Route::get("v1/em_data_records", [FileManageController::class, 'index']);
Route::get("v1/em-data-record", [FileManageController::class, 'getEmFile']);
Route::get("v1/process", [FileManageController::class, 'processEMFile']);
Route::post("v1/process_file", [FileManageController::class, 'processRawFile']);
Route::post('v1/delete_file', [FileManageController::class, 'deleteFile']);
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix("v1/plugin")->group(function () {
    Route::get("/", [PluginController::class, "index"])->middleware('jwt');
    Route::delete("/", [PluginController::class, "deletePlugin"])->middleware('jwt');
    Route::get("/developer", [PluginController::class, "getDeveloperPlugins"])->middleware('jwt');
    Route::get("/single", [PluginController::class, "getPlugin"])->middleware('jwt');
    Route::get("/filter", [PluginController::class, "getFilteredPlugin"])->middleware('jwt');
    Route::get("/pending", [PluginController::class, "getPendingPlugins"])->middleware('jwt');
    Route::get("/verified", [PluginController::class, "getVerifiedPlugins"])->middleware('jwt');
    Route::get("/compatible", [PluginController::class, "getCompatiblePlugins"])->middleware('jwt');
    Route::get("/preprocessing", [PluginController::class, "executePreprocessingPlugin"])->middleware('jwt');
    Route::get("/analysis", [PluginController::class, "executeAnalysisPlugin"])->middleware('jwt');
    Route::post("/upload", [PluginController::class, "uploadPlugin"])->middleware('jwt');
    Route::get("/icon", [PluginController::class, "getPluginIcon"])->middleware('jwt');
    Route::get("/report-details", [PluginController::class, "getReportDetails"])->middleware('jwt');
    Route::get("/report", [PluginController::class, "getAnalysisReport"])->middleware('jwt');
    Route::delete("/report", [PluginController::class, "deleteReport"])->middleware('jwt');
    Route::get("/dependency", [PluginController::class, "installPipLibrariesFromFile"])->middleware('jwt');
    Route::get("/compatibility", [PluginController::class, "updatePluginCompatibilityStatus"])->middleware('jwt');
    Route::get("/compatibility-verify", [PluginController::class, "changePluginCompatibilityStatusToVerify"])->middleware('jwt');
    Route::post("/analysis-report", [PluginController::class, "generateAnalysisReport"])->middleware('jwt');
});

Route::prefix("v1/auth")->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/check-email', [AuthController::class, 'checkEmail']);
});


Route::post('/v1/update-user', [UserController::class, 'updateUserInfo']);

Route::prefix("v1/user")->group(function () {
    Route::get('/', [UserController::class, 'index'])->middleware('jwt');
    Route::get('/get-user', [UserController::class, 'getUser'])->middleware('jwt');
    Route::get('/user-profile-image', [UserController::class, 'getUserProfileImage'])->middleware('jwt');
    Route::post('/update-user', [UserController::class, 'updateUserInfo'])->middleware('jwt');
    Route::post('/update-password', [UserController::class, 'updatePassword'])->middleware('jwt');
    Route::get('/admin-stat', [UserController::class, 'getAdminStat'])->middleware('jwt');
    Route::put('/ban-status-change', [UserController::class, 'changeBanStatus'])->middleware('jwt');
});

Route::prefix("v1/device")->group(function () {
    Route::get('/', [DeviceController::class, 'index'])->middleware('jwt');
    Route::get('/single', [DeviceController::class, 'getDevice'])->middleware('jwt');
});

// Route::prefix("analysis-plugin")->group(function (){
//     Route::post("/", [PluginController::class, "test"]);
// });