<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function isError($status, $message="失敗しました", $errors = []){
        return response()->json([
            "message" => $message,
            "errors" => $errors
        ], $status);
    }

    protected function isSuccessResource($resource, $message="更新しました", $addition=[]) {
        return $resource->additional( collect([
            "message" => $message,
        ])->merge($addition)->toArray() );
    }

    protected function isSuccessData($data, $message="更新しました") {
        return response()->json([
            'data' => $data,
            "message" => $message,
        ]);
    }
}
