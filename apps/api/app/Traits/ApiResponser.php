<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait ApiResponser
{
    protected function successResponse($data, $message = null, $code = Response::HTTP_OK)
    {
        // Nếu $data là một Resource hoặc Collection, chuyển nó thành array/json
        if ($data instanceof \Illuminate\Http\Resources\Json\JsonResource) {
            $data = $data->response()->getData(true);
        }

        // Nếu $data đã có key 'data' (do Resource tạo ra), ta làm phẳng nó
        if (is_array($data) && isset($data['data'])) {
            $result = array_merge([
                'success' => true,
                'message' => $message,
            ], $data); // Merge để 'success' và 'message' nằm cùng cấp với pagination

            return response()->json($result, $code);
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $data
        ], $code, [], JSON_UNESCAPED_UNICODE);
    }
    protected function errorResponse($message, $code, $errors = null)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data'    => null,
            'errors'  => $errors
        ], $code, [], JSON_UNESCAPED_UNICODE);
    }
}
