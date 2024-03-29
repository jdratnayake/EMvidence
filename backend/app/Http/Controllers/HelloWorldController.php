<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloWorldController extends Controller
{
    public function hello()
    {
        return response()->json(['message' => 'Hello World!!']);
    }
}
