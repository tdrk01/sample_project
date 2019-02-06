<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    public function __construct(){
        $this->middleware('guest:admin')->except(['logout', 'view']);
    }

    protected function guard()
    {
        return Auth::guard("admin");
    }

    public function redirectTo(){
        return route('admin.view');
    }

    public function showLoginForm(){
        return view("admin.login");
    }

    public function logout(Request $request)
    {
        $this->guard()->logout();
        return redirect()->route("admin.login");
    }
}
