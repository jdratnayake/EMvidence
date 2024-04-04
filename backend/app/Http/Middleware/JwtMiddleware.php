<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtMiddleware
{

    public function handle($request, Closure $next)
    {
        // Check if Authorization header is present
        if (!$request->hasHeader('Authorization')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Extract JWT token from Authorization header
        $authorizationHeader = $request->header('Authorization');
        $token = str_replace('Bearer ', '', $authorizationHeader);

        $secretKey = env('JWT_SECRET_KEY'); // Your secret key for decoding the token

        try {
            // Decode JWT token
            $decodedToken = JWT::decode($token, new Key($secretKey, 'HS256'));

            // Add decoded token to request object
            $request->decodedToken = $decodedToken;

            // Proceed to the next middleware or route handler
            return $next($request);
        } catch (\Exception $e) {
            // Handle invalid or expired token
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
