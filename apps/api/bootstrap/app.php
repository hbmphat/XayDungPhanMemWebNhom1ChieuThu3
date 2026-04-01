<?php

use App\Traits\ApiResponser;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('api')
                ->prefix('api')
                ->name('api.')
                ->group(base_path('routes/api.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Nhúng ApiResponser vào để sử dụng
        $responder = new class {
            use ApiResponser;
            public function error($msg, $code, $err = null)
            {
                return $this->errorResponse($msg, $code, $err);
            }
        };
        // Bắt lỗi Authenticate (401)
        $exceptions->render(function (AuthenticationException $e, Request $request) use ($responder) {
            if ($request->is('api/*')) {
                return $responder->error('Yêu cầu xác thực', 401);
            }
        });
        // Bắt lỗi Authorize (403)
        $exceptions->render(function (AccessDeniedHttpException $e, Request $request) use ($responder) {
            if ($request->is('api/*')) {
                return $responder->error('Không có quyền truy cập', 403);
            }
        });
        // Bắt lỗi Not Found (404)
        $exceptions->render(function (NotFoundHttpException $e, Request $request) use ($responder) {
            if ($request->is('api/*')) {
                return $responder->error('Tài nguyên không tồn tại', 404);
            }
        });
        // Bắt lỗi Validation (422)
        $exceptions->render(function (ValidationException $e, Request $request) use ($responder) {
            if ($request->is('api/*')) {
                return $responder->error(
                    'Dữ liệu không hợp lệ',
                    422,
                    $e->errors()
                );
            }
        });
        // Bắt lỗi hệ thống (500)
        $exceptions->render(function (Throwable $e, Request $request) use ($responder) {
            if ($request->is('api/*')) {
                $message = config('app.debug') ? $e->getMessage() : 'Có lỗi hệ thống xảy ra';
                return $responder->error(
                    $message,
                    500,
                    config('app.debug') ? [
                        'file' => $e->getFile(),
                        'line' => $e->getLine(),
                    ] : null
                );
            }
        });
    })->create();
