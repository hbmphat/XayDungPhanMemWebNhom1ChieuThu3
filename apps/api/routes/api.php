<?php

use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Authorization\PermissionController;
use App\Http\Controllers\Authorization\RoleController;


Route::get('/health', function () {
    return response()->json(['status' => 'ok'], 200);
});
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);

Route::get('/permissions', [PermissionController::class, 'index']);
Route::post('/permissions', [PermissionController::class, 'store']);

Route::get('/roles', [RoleController::class, 'index']);
Route::post('/roles', [RoleController::class, 'store']);
// Thêm dòng này vào file routes/api.php
Route::post('/roles/{id}/permissions', [App\Http\Controllers\Authorization\RoleController::class, 'givePermission']);