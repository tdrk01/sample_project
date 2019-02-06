<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\SocialAccountService;
use App\Events\Registered;
use Socialite;
use Exception;

class SocialAccountController extends Controller
{
    protected $socialAccountService;

    public function __construct(SocialAccountService $socialAccountService){
        $this->socialAccountService = $socialAccountService;
    }

    public function redirectToProvider(Request $request, $provider)
    {
        if( $provider == "facebook" ){
            return Socialite::driver($provider)->fields([
                'first_name', 'last_name', 'email', 'gender', 'birthday'
            ])->scopes([
                'email', 'user_birthday'
            ])->redirect();
        }else{
            return Socialite::driver($provider)->redirect();
        }
    }

    public function handleProviderCallback(Request $request, $provider)
    {
        try {
            if( $provider == "facebook" ){
                $providerUser = Socialite::with($provider)->fields([
                    'first_name', 'last_name', 'email', 'gender', 'birthday'
                ])->scopes([
                    'email', 'user_birthday'
                ])->user();
            }else{
                $providerUser = Socialite::with($provider)->user();
            }
        } catch (Exception $e) {
            \Log::info($e);
            return redirect()->away( webRoute("auth.login") )->withErrors(["ログインに失敗しました"]);
        }

        $result = $this->socialAccountService->merge(
            $providerUser, $provider
        );
        $user = $result["user"];
        if( $result["is_new"] ){
            event( new Registered($user));
        }
        return redirect()->away( webRoute("auth.social", ["user" => $user->id ,"token" => $user->createToken('web', ['user'])->accessToken ]) );
    }
}
