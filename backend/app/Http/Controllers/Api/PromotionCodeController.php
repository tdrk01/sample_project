<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Services\PromotionCodeService;
use App\Models\PromotionCode;
use App\Http\Resources\PromotionCodeResource;

class PromotionCodeController extends Controller
{
    protected $promotionCodeService;

    public function __construct(PromotionCodeService $promotionCodeService){
        $this->middleware("auth:api");
        $this->promotionCodeService = $promotionCodeService;
    }

    public function check(Request $request){
        $code = $this->promotionCodeService->check( $request->input("code"), $request->input("user_id"), $request->input("box_id") );
        if($code == null){
            return $this->isError(412, "プロモーションコードが無効です");
        }else{
            return $this->isSuccessResource( new PromotionCodeResource($code) );
        }
    }
}
