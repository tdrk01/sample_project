<?php

namespace App\Services;

use Validator;
use App\Models\SocialAccount;
use App\Models\User;
use Carbon\Carbon;

class SocialAccountService
{
    public function merge( $providerUser, $provider ){

        $account = SocialAccount::where('authorizer_name', $provider)->where('authorizer_id', $providerUser->getId())->first();
        if ($account != null && $account->user != null) {
            return [
                "is_new" => false,
                "user" => $account->user
            ];
        }

        $is_new = false;

        $user = User::where('email', $providerUser->getEmail())->first();

        if (!$user) {
            $name = $providerUser->getRaw()["last_name"].$providerUser->getRaw()["first_name"];

            $gender = null;
            if( isset($providerUser->getRaw()["gender"]) ){
                if( $providerUser->getRaw()["gender"] == "male" ){
                    $gender = User::MALE;
                }else{
                    $gender = User::FEMALE;
                }
            }

            $birthday = null;
            if( isset($providerUser->getRaw()["birthday"]) ){
                $birthday = Carbon::parse($providerUser->getRaw()["birthday"]);
            }

            $user = User::create([  
                'email' => $providerUser->getEmail(),
                'name'  => $name,
                "gender" => $gender,
                "birthday" => $birthday
            ]);
            $is_new = true;
        }

        if($account==null){
            $account = SocialAccount::create([
                'authorizer_id'   => $providerUser->getId(),
                'authorizer_name' => $provider,
            ]);
        }
        $account->user_id = $user->id;
        $account->save();

        return [
            "is_new" => $is_new,
            "user" => $user
        ];
    }
}