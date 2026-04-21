<?php

namespace App\Http\Controllers\Authorization;

use App\Http\Controllers\Controller;
use App\Models\Role;
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
            'password'      => $request->password,
            'first_name'    => $request->first_name,
            'last_name'     => $request->last_name,
            'phone'         => $request->phone,
            'address'       => $request->address,
            'date_of_birth' => $request->date_of_birth,
            'status'        => 'active',
        ]);

        $role = Role::where('name', 'Customer')->first();

        if ($role) {
            $user->roles()->attach($role->id);
        }

        return response()->json([
            'message' => 'Đăng ký thành công',
            'user'    => $user->load('roles')
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
            ], 401);
        }

        if ($user->status !== 'active') {
            return response()->json([
                'message' => 'Tài khoản bị khóa'
            ], 403);
        }

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'user'    => $user->load('roles')
        ]);
    }
}
