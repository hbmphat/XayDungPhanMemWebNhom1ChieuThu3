<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json(['status' => 'ok'], 200);
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
});
