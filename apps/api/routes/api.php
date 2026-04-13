<?php

use App\Http\Controllers\Provider\ProviderController;
use App\Http\Controllers\Sim\SimController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Permission\PermissionController;
use App\Http\Controllers\Permission\RolePermissionController;
use App\Http\Controllers\Role\RoleController;
use App\Http\Controllers\Role\UserRoleController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json(['status' => 'ok'], 200);
});
Route::apiResource('users', UserController::class);
Route::apiResource('providers', ProviderController::class);
Route::apiResource('sims', SimController::class);


Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});


Route::middleware('auth:sanctum')->group(function () {
    // User module
    Route::apiResource('users', UserController::class);

    // Role module
    Route::apiResource('roles', RoleController::class);

    // Permission module
    Route::apiResource('permissions', PermissionController::class);

    // Assign / unassign role for user
    Route::post('/users/{user}/roles', [UserRoleController::class, 'assign']);
    Route::delete('/users/{user}/roles/{roleId}', [UserRoleController::class, 'unassign']);

    // Assign / unassign permission for role
    Route::post('/roles/{role}/permissions', [RolePermissionController::class, 'assign']);
    Route::delete('/roles/{role}/permissions/{permissionId}', [RolePermissionController::class, 'unassign']);

    // Test RBAC
    Route::get('/admin-only', function () {
        return response()->json([
            'success' => true,
            'message' => 'Bạn có quyền admin',
            'data' => null,
            'errors' => null,
        ]);
    })->middleware('permission:admin.access');
});
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
});
