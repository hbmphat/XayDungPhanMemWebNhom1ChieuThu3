<?php

use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

// Test health check endpoint
Route::get('/health', function () {
    return response()->json(['status' => 'ok'], 200);
});
Route::apiResource('users', UserController::class);
