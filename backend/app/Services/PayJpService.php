<?php
namespace App\Services;

use Exception;
use Validator;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Carbon\Carbon;
use Payjp\Payjp;
use Payjp\Customer;
use Payjp\Charge;
use Payjp\Card;
use Payjp\Token;
use Payjp\Error\InvalidRequest;

class PayJpService
{
    //与信を取得
    public function createTokenId( $price, $tokenId ){
        try {
            $param = [
                "amount" => $price,
                "capture" => false,
                "expiry_days" => 60,
                "currency" => "jpy",
                "card" => $tokenId
            ];
            $charge = Charge::create($param);
        }catch( InvalidRequest $e ){
            //失敗したらエラーで終了
            Log::error($e->getJsonBody());
            return null;
        }catch( Exception $e ){
            //失敗したらエラーで終了
            Log::error($e);
            return null;
        }

        return $charge->id;
    }

    //請求処理
    public function doClaim( $token ){
        try {
            $charge = Charge::retrieve($token);
            $charge->capture();
            return true;
        }catch( Exception $e ){
            Log::error($e);
            return false;
        }
    }

    //与信を確定
    public function releaseCredit( $token ){
        try {
            $charge = Charge::retrieve($token);
            $charge->refund();
            return true;
        }catch( Exception $e ){
            Log::error($e);
            return false;
        }
    }
}