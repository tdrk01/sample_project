<?php

namespace App\Http\Controllers\Provider;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('guest:provider')->except(['logout', 'view']);
    }

    protected function guard()
    {
        return Auth::guard("provider");
    }

    public function redirectTo(){
        return route('provider.view');
    }

    public function showLoginForm(){
        return view("provider.login");
    }

    public function logout(Request $request)
    {
        $this->guard()->logout();
        return redirect()->route("provider.login");
    }

}
