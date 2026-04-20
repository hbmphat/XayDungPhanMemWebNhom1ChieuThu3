<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Authorization\PermissionController;
use App\Http\Controllers\Authorization\RoleController;
use App\Http\Controllers\Authorization\AuthController;

// Kiểm tra API hoạt động
Route::get('/health', function () {
    return response()->json(['status' => 'ok'], 200);
});

// USER
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);

// PERMISSION
Route::get('/permissions', [PermissionController::class, 'index']);
Route::post('/permissions', [PermissionController::class, 'store']);

// ROLE
Route::get('/roles', [RoleController::class, 'index']);
Route::post('/roles', [RoleController::class, 'store']);
Route::post('/roles/{id}/permissions', [RoleController::class, 'givePermission']);

// AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
