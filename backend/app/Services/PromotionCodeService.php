<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Models\Campaign;
use App\Models\PromotionCode;

use Carbon\Carbon;

class PromotionCodeService
{
    public function check($code, $userId=null, $boxId=null){
        return PromotionCode::where("code", $code)
            ->where(function($query) use($userId) {
                $query->whereNull("user_id")->orWhere("user_id", $userId);
            })
            ->where(function($query) use($boxId) {
                $query->whereNull("box_id")->orWhere("box_id", $boxId);
            })
            ->where(function($query) use($boxId) {
                $query->whereNull("expired_at")->orWhere("expired_at", ">=", Carbon::now());
            })
            ->first();
    }

    public function createMany($name, $count=0, $price=0, $code=null, $expired = null){
        $result = [];
        DB::transaction(function () use (&$result, $name, $count, $price, $code, $expired) {
            for ($i=0; $i < $count; $i++) { 
                $promotionCode = $this->create([
                    "name" => $name,
                    "code" => $this->generateCode($code),
                    "price" => $price,
                    "expired_at" => $expired
                ]);
                $result[] = $promotionCode;
            }
        });
        return collect($result);
    }

    public function create($data){
        $campaign = Campaign::firstOrCreate([
            "name" => $data["name"]
        ]);
        $data["campaign_id"] = $campaign->id;
        return PromotionCode::create($data);
    }

    public function generateCode( $code = null ){
        if($code != null){
            return $code; 
        }
        return "".rand(1000, 9999).rand(1000, 9999).rand(1000, 9999).rand(1000, 9999);
    }
}
