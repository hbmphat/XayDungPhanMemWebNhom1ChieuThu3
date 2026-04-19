<?php

namespace App\Http\Controllers\Authorization;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function index()
    {
        // Bọc trong một mảng 'data' để khớp với code Frontend của Quân
        // Khi Interceptor bóc lần 1, nó còn lại { data: [...] }
        // Khi code page.tsx gọi res.data lần 2, nó sẽ lấy được đúng mảng [...]
        return response()->json([
            'data' => Permission::orderBy('id', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:permissions,name']);
        $permission = Permission::create(['name' => $request->name]);
        
        // Trả về đúng object để code Frontend không bị lỗi
        return response()->json($permission, 201);
    }

    public function destroy($id)
    {
        Permission::findOrFail($id)->delete();
        return response()->json(['message' => 'Xóa thành công']);
    }
}