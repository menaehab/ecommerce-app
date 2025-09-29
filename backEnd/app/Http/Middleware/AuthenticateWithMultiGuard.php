<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateWithMultiGuard
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get the token from the Authorization header
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
            ], 401);
        }

        // Find the token in the database
        $accessToken = PersonalAccessToken::findToken($token);

        if (!$accessToken) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid token.',
            ], 401);
        }

        // Get the tokenable (user or admin)
        $tokenable = $accessToken->tokenable;

        if (!$tokenable) {
            return response()->json([
                'success' => false,
                'message' => 'Token owner not found.',
            ], 401);
        }

        // Determine which guard to use based on token name
        $tokenName = $accessToken->name;
        
        if (str_contains($tokenName, 'admin')) {
            auth()->shouldUse('admin');
            auth()->guard('admin')->setUser($tokenable);
            $request->attributes->set('guard', 'admin');
        } else {
            auth()->shouldUse('web');
            auth()->guard('web')->setUser($tokenable);
            $request->attributes->set('guard', 'web');
        }

        // Set the authenticated user for Sanctum
        $request->setUserResolver(function () use ($tokenable) {
            return $tokenable;
        });

        return $next($request);
    }
}
