<?php

use App\Traits\ApiResponser;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('api')
                ->prefix('api')
                ->name('api.')
                ->group(base_path('routes/api.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);

        $middleware->append(HandleCors::class);

        // $middleware->alias([
        //     'permission' => \App\Http\Middleware\CheckPermission::class,
        // ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $responder = new class
        {
            use ApiResponser;

            public function error($msg, $code, $err = null)
            {
                return $this->errorResponse($msg, $code, $err);
            }
        };

        $exceptions->render(function (AuthenticationException $e, Request $request) use ($responder) {
            if ($request->is('api/*')) {
                return $responder->error('Unauthorized', 401);
            }
        });

        $exceptions->render(function (AccessDeniedHttpException $e, Request $request) use ($responder) {
            if ($request->is('api/*')) {
                return $responder->error('Forbidden', 403);
            }
        });

        $exceptions->render(function (NotFoundHttpException $e, Request $request) use ($responder) {
            if ($request->is('api/*')) {
                return $responder->error('Resource not found', 404);
            }
        });

        $exceptions->render(function (ValidationException $e, Request $request) use ($responder) {
            if ($request->is('api/*')) {
                return $responder->error(
                    'Invalid data provided',
                    422,
                    $e->errors()
                );
            }
        });

        $exceptions->render(function (Throwable $e, Request $request) use ($responder) {
            if ($request->is('api/*')) {
                $message = config('app.debug') ? $e->getMessage() : 'An error occurred';

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
