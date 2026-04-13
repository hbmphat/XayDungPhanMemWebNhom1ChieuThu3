<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Permission\PermissionController;
use App\Http\Controllers\Provider\ProviderController;
use App\Http\Controllers\Role\RoleController;
use App\Http\Controllers\Sim\SimController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json(['status' => 'ok'], 200);
});

// Các module chính
Route::apiResource('users', UserController::class);
Route::apiResource('providers', ProviderController::class);
Route::apiResource('sims', SimController::class);
Route::apiResource('roles', RoleController::class);
Route::apiResource('permissions', PermissionController::class);

// Auth
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/me', [AuthController::class, 'me']);
});

// Test Route
Route::get('/admin-only', function () {
    return response()->json(['message' => 'Hệ thống đã mở khóa hoàn toàn']);
});
