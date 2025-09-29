<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Resources\UserResource;

/**
 * Auth Routes
 */

// Unified /user endpoint that works with both guards
Route::get('/user', function (Request $request) {
    $user = $request->user();
    
    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthenticated.',
        ], 401);
    }

    return response()->json([
        'success' => true,
        'data' => [
            'user' => new UserResource($user),
            'guard' => $request->attributes->get('guard', 'web'),
        ],
    ], 200);
})->middleware('auth.multi');

/**
 * User Routes
 */
Route::post('/register', [UserAuthController::class, 'register']);
Route::post('/login', [UserAuthController::class, 'login']);
Route::post('/logout', [UserAuthController::class, 'logout'])->middleware('auth:sanctum');

/**
 * Admin Routes
 */

Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::post('/logout', [AdminAuthController::class, 'logout'])->middleware('auth:sanctum,EnsureIsAdmin');
    Route::apiResource('categories', CategoryController::class);
});
