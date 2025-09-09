<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthService
{
    protected $model;
    protected $guard;
    public function __construct($model,$guard = 'web')
    {
        $this->model = $model;
        $this->guard = $guard;
    }
    public function register(array $data)
    {
        $user = $this->model::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken($this->guard.'-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function login(array $data)
    {
        if (!Auth::guard($this->guard)->attempt($data)) {
            return null;
        }

        $user = $this->model::where('email', $data['email'])->first();

        $token = $user->createToken($this->guard.'-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function logout(bool $allDevices = false)
    {
        $user = Auth::guard($this->guard)->user();
        if (!$user) {
            return;
        }
        if ($allDevices) {
            $user->tokens()->delete();
        } else {
            $user->currentAccessToken()->delete();
        }
    }
}

