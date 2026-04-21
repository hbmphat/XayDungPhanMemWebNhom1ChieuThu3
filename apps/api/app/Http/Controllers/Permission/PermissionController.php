<?php

namespace App\Http\Controllers\Permission;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function index()
    {
        return $this->successResponse(
            Permission::all(),
            'Permission list'
        );
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:permissions,name']);
        $permission = Permission::create(['name' => $request->name]);

        return $this->successResponse(
            $permission,
            'Created successfully',
            201
        );
    }

    public function destroy($id)
    {
        Permission::findOrFail($id)->delete();

        return $this->successResponse(
            null,
            'Deleted successfully'
        );
    }
}
