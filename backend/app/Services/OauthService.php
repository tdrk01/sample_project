<?php

namespace App\Services;

use Laravel\Passport\Token;
use Carbon\Carbon;

class OauthService
{
    public function revokeToken($userId, $tokenIds=[]){
        Token::where("user_id", $userId)
            ->whereNotIn("id", $tokenIds)
            ->where("created_at", "<=", Carbon::now()->subDays(2) )
            ->delete();
    }
}
