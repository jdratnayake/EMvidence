<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Device;

class DeviceController extends Controller
{
    public function index()
    {
        $devices = Device::orderBy('device_id', 'asc')->select('device_id', 'device_name')->get();

        $responseData = [
            'devices' => $devices,
        ];

        return response()->json($responseData);
    }
}
