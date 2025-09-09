<?php

namespace App\Http\Controllers\Store;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\AuthResource;
use App\Http\Requests\Store\RegisterRequest;
use Illuminate\Validation\ValidationException;

class UserAuthController extends Controller
{
    protected $authService;
    public function __construct()
    {
        $this->authService = new AuthService(User::class);
    }
    public function register(RegisterRequest $request)
    {
        $data = $this->authService->register($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => new AuthResource([
                'user' => $data['user'],
                'token' => $data['token']
            ])
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $data = $this->authService->login($request->validated());

        if (!$data) {
            return response()->json([
                'success' => false,
                'message' => 'email or password is incorrect',
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'User logged in successfully',
            'data' => new AuthResource([
                'user' => $data['user'],
                'token' => $data['token']
            ])
        ], 200);
    }

    public function logout()
    {
        $this->authService->logout();

        return response()->json([
            'success' => true,
            'message' => 'User logged out successfully',
        ], 200);
    }
}
