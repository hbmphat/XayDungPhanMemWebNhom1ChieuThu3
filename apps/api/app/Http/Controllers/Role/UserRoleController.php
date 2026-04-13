<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\AssignRoleRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserRoleController extends Controller
{
    public function assign(AssignRoleRequest $request, User $user): JsonResponse
    {
        $user->roles()->syncWithoutDetaching([$request->validated()['role_id']]);

        return response()->json([
            'success' => true,
            'message' => 'Role assigned to user successfully',
            'data' => $user->fresh('roles'),
            'errors' => null,
        ]);
    }

    public function unassign(User $user, string $roleId): JsonResponse
    {
        $user->roles()->detach($roleId);

        return response()->json([
            'success' => true,
            'message' => 'Role removed from user successfully',
            'data' => $user->fresh('roles'),
            'errors' => null,
        ]);
    }
}