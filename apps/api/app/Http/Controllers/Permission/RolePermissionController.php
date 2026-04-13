<?php

namespace App\Http\Controllers\Permission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Permission\AssignPermissionRequest;
use App\Models\Role;
use Illuminate\Http\JsonResponse;

class RolePermissionController extends Controller
{
    public function assign(AssignPermissionRequest $request, Role $role): JsonResponse
    {
        $role->permissions()->syncWithoutDetaching([$request->validated()['permission_id']]);

        return response()->json([
            'success' => true,
            'message' => 'Permission assigned to role successfully',
            'data' => $role->fresh('permissions'),
            'errors' => null,
        ]);
    }

    public function unassign(Role $role, string $permissionId): JsonResponse
    {
        $role->permissions()->detach($permissionId);

        return response()->json([
            'success' => true,
            'message' => 'Permission removed from role successfully',
            'data' => $role->fresh('permissions'),
            'errors' => null,
        ]);
    }
}