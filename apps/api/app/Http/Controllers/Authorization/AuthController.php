<?php

namespace App\Http\Controllers\Authorization;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // ==========================
    // ĐĂNG KÝ
    // ==========================
    public function register(Request $request)
    {
        $request->validate([
            'user_name'   => 'required|unique:users,user_name',
            'email'       => 'required|email|unique:users,email',
            'password'    => 'required|min:6',
            'first_name'  => 'required',
            'last_name'   => 'required',
        ]);

        $user = User::create([
            'user_name'     => $request->user_name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),

            // Thông tin bổ sung
            'first_name'    => $request->first_name,
            'last_name'     => $request->last_name,
            'phone'         => $request->phone,
            'address'       => $request->address,
            'date_of_birth' => $request->date_of_birth,

            // Mặc định
            'role'          => 'customer',
            'status'        => 1,
        ]);

        return response()->json([
            'message' => 'Đăng ký thành công',
            'user'    => $user
        ], 201);
    }

    // ==========================
    // ĐĂNG NHẬP
    // ==========================
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Sai email hoặc mật khẩu'
            ], 400);
        }

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'user'    => $user
        ], 200);
    }
}
