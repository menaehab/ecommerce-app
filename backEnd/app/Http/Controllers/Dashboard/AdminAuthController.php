<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Admin;
use App\Services\AuthService;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\AuthResource;

class AdminAuthController extends Controller
{
    protected $authService;
    public function __construct()
    {
        $this->authService = new AuthService(Admin::class,'admin');
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
            'message' => 'Admin logged in successfully',
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
            'message' => 'Admin logged out successfully',
        ], 200);
    }
}
