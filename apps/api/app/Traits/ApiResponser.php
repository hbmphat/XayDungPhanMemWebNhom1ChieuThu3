<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait ApiResponser
{
    protected function successReponse($data, $message = null, $code = Response::HTTP_OK)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $data,
            'errors'  => null
        ], $code);
    }
    protected function errorResponse($message, $code, $errors = null)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data'    => null,
            'errors'  => $errors
        ], $code);
    }
}
