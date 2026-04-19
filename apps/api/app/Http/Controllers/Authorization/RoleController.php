<?php

namespace App\Http\Controllers\Authorization;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        // Trả về mảng bọc trong 'data' để code Frontend của Quân không bị trống
        return response()->json([
            'data' => Role::with('permissions')->orderBy('id', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:roles,name']);
        $role = Role::create(['name' => $request->name]);
        return response()->json($role, 201);
    }

    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->update($request->only('name'));
        return response()->json($role);
    }

    public function givePermission(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        // Sync permission ids từ request gửi lên
        $role->permissions()->sync($request->permission_ids);
        return response()->json(['message' => 'Gán quyền thành công']);
    }

    public function destroy($id)
    {
        Role::findOrFail($id)->delete();
        return response()->json(['message' => 'Xóa thành công']);
    }
}