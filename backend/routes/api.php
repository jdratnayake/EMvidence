<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\FileManageController;
use App\Http\Controllers\PluginController;

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
Route::post('/upload_data_file', [FileManageController::class, 'store']);
Route::post('/send_to_database', [FileManageController::class, 'sendRecord']);
Route::get("/em_data_records",[FileManageController::class,'index']);
Route::post('/delete_file', [FileManageController::class, 'deleteFile']);
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix("v1/plugin")->group(function (){
    Route::get("/preprocessing", [PluginController::class, "executePreprocessingPlugin"]);
    Route::get("/analysis", [PluginController::class, "executeAnalysisPlugin"]);
});

// Route::prefix("analysis-plugin")->group(function (){
//     Route::post("/", [PluginController::class, "test"]);
// });