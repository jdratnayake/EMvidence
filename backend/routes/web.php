<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HelloWorldController;
use App\Http\Controllers\FileManageController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// For testing purposes
Route::get('/hello', [HelloWorldController::class, 'hello']);
Route::get('/get_csrf_token', [FileManageController::class, 'getCSRFToken']);
// Route::post('/upload_data_file', [FileManageController::class, 'store']);
Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
Route::get('/test', function () {
    return phpinfo();
});
require __DIR__.'/auth.php';