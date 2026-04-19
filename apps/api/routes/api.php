<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Authorization\PermissionController;
use App\Http\Controllers\Authorization\RoleController;

// Đảm bảo các route này nằm ngoài middleware auth nếu Quân chưa làm phần Login
Route::get('/permissions', [PermissionController::class, 'index']);
Route::post('/permissions', [PermissionController::class, 'store']);

Route::get('/roles', [RoleController::class, 'index']);
Route::post('/roles', [RoleController::class, 'store']);
// Thêm dòng này vào file routes/api.php
Route::post('/roles/{id}/permissions', [App\Http\Controllers\Authorization\RoleController::class, 'givePermission']);