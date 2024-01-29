<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'first_name'=>'required',
            'last_name'=>'required',
            'role'=>'required',
            'email'=>'required|email',
            'password'=>'required',
        ]);

        try {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'role'=> $request->role,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 380,
                'message' => 'email_address_in_use.',
            ]);
        }

        
        $token = Auth::login($user);

        if (!$token) {
            return response()->json([
                'status' => 401,
                'message' => 'registration fail',
            ]);

        }else{
            return response()->json([
                'status' => 200,
                'message' => 'user registered successfully',
                'user' => $user,
                'token' => $token
            ]);
        }

        

    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {  

        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $credentials = $request->only('email', 'password') ;

        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => 401,
                'message' => 'Login fail',
            ]);

        }else{
            return response()->json([
                'status' => 200,
                'message' => 'Login Success',
                'token' => $token,
                'user' => auth()->user(),
                'expires_in' => auth()->factory()->getTTL() * 60,
            ]);
        }

        
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}