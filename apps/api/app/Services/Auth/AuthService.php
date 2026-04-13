<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data): array
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'user_name' => $data['user_name'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'address' => $data['address'] ?? null,
                'date_of_birth' => $data['date_of_birth'] ?? null,
                'password' => $data['password'],
                'role' => 'customer',
                'status' => 'active',
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'user' => $user->refresh(),
                'token' => $token,
            ];
        });
    }

    public function login(array $credentials): array
    {
        $login = trim($credentials['login']);

        $user = User::query()
            ->where('email', $login)
            ->orWhere('user_name', $login)
            ->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw new AuthenticationException('Invalid credentials');
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function logout(Request $request): void
    {
        $token = $request->user()?->currentAccessToken();

        if ($token) {
            $token->delete();
            return;
        }

        $request->user()?->tokens()->delete();
    }
}
