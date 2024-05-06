<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use \Firebase\JWT\JWT;

class AuthController extends Controller
{
    public function checkEmail(Request $request)
    {
        $email = $request->header('email');

        // Check if email exists in the database
        $isUnique = !User::where('email', $email)->exists();

        // Return JSON response indicating whether email is unique
        return response()->json(['unique' => $isUnique], 200);
    }

    // Generate JWT token for the user
    private function generateJWTToken($user)
    {
        // Define your secret key (keep it secure)
        $secret_key = env('JWT_SECRET_KEY');

        // Define the payload data
        $payload = [
            'user_id' => $user->id,
            'email' => $user->email,
            'exp' => strtotime('+100 day') // Token expiration time
        ];

        // Generate JWT token
        // HS256 specifies the algorithm to be used for encoding the JWT token
        $token = JWT::encode($payload, $secret_key, 'HS256');

        return $token;
    }

    public function register(Request $request)
    {
        // Check if password contains at least one uppercase letter, one lowercase letter, one number, and one special character
        Validator::extend('strong_password', function ($attribute, $value, $parameters, $validator) {
            return preg_match('/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/', $value);
        });

        // Custom validation message for strong password
        Validator::replacer('strong_password', function ($message, $attribute, $rule, $parameters) {
            return str_replace(':attribute', $attribute, 'The ' . $attribute . ' must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        });

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:64',
            'last_name' => 'required|string|max:64',
            'email' => 'required|email|unique:users|max:128',
            'user_type' => 'required|string|in:admin,investigator,developer',
            'password' => 'required|string|min:6|max:60|strong_password',
            'confirm_password' => 'required|string|min:6|max:60|same:password',
        ]);

        // If validation fails, return error messages
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            // Create a new user
            $user = User::create([
                'user_type' => $request->user_type,
                'account_status' => 'unverified', // Default account status
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => bcrypt($request->password), // Hash the password
                'phone_number' => null,
                'profile_picture' => 'default.svg',
                'account_creation_timestamp' => now(),
                'last_login_timestamp' => null,
                'updated_at' => now(),
            ]);
        } catch (\Exception $e) {
            // Log the exception for further investigation
            Log::error('Error creating user: ' . $e->getMessage());

            // Return an error response indicating that user creation failed
            return response()->json(['error' => 'User creation failed. Please try again later.'], 500);
        }


        // Generate JWT token for the registered user
        $token = $this->generateJWTToken($user);

        // Check if the token is empty
        if (empty($token)) {
            // Log the error
            Log::error('JWT token creation failed: Token is empty');

            // Return an error response
            return response()->json(['error' => 'JWT token creation failed'], 500);
        }

        // Return success response with token
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        // Check if password contains at least one uppercase letter, one lowercase letter, one number, and one special character
        Validator::extend('strong_password', function ($attribute, $value, $parameters, $validator) {
            return preg_match('/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/', $value);
        });

        // Custom validation message for strong password
        Validator::replacer('strong_password', function ($message, $attribute, $rule, $parameters) {
            return str_replace(':attribute', $attribute, 'The ' . $attribute . ' must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        });

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:128',
            'password' => 'required|string|min:6|max:60|strong_password',
        ]);

        // If validation fails, return error messages
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Retrieve the user from the database
        $user = User::where('email', $request->email)->first();

        // Check if the user exists and verify the password
        if ($user && Hash::check($request->password, $user->password)) {
            // Generate JWT token for the authenticated user
            $token = $this->generateJWTToken($user);

            // Return success response with token
            return response()->json([
                'user' => $user,
                'token' => $token
            ], 200);
        } else {
            // If login fails, return error message
            return response()->json(['error' => 'Invalid email or password'], 401);
        }
    }
}
