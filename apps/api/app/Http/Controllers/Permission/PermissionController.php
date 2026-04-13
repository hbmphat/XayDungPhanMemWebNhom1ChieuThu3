<?php

namespace App\Http\Controllers\Permission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Permission\StorePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;
use App\Models\Permission;
use Illuminate\Http\JsonResponse;

class PermissionController extends Controller
{
    public function index(): JsonResponse
    {
        $permissions = Permission::query()
            ->with('roles')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Permissions fetched successfully',
            'data' => $permissions,
            'errors' => null,
        ]);
    }

    public function store(StorePermissionRequest $request): JsonResponse
    {
        $permission = Permission::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Permission created successfully',
            'data' => $permission,
            'errors' => null,
        ], 201);
    }

    public function show(Permission $permission): JsonResponse
    {
        $permission->load('roles');

        return response()->json([
            'success' => true,
            'message' => 'Permission fetched successfully',
            'data' => $permission,
            'errors' => null,
        ]);
    }

    public function update(UpdatePermissionRequest $request, Permission $permission): JsonResponse
    {
        $permission->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Permission updated successfully',
            'data' => $permission->fresh('roles'),
            'errors' => null,
        ]);
    }

    public function destroy(Permission $permission): JsonResponse
    {
        $permission->delete();

        return response()->json([
            'success' => true,
            'message' => 'Permission deleted successfully',
            'data' => null,
            'errors' => null,
        ]);
    }
}