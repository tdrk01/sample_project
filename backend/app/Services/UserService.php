<?php

namespace App\Services;

use App\Models\User;
use Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{
    public function getByEmail($email){
        return User::where("email", $email)->first();
    }

    public function login($email, $password)
    {
        $user = User::where("email", $email)->first();
        if ( $user == null ){
            return null;
        }
        if (!Hash::check($password, $user->password)) {
            return null;
        }
        return $user;
    }

    public function forget($email){
        $user = User::where("email", $email)->firstOrFail();
        $user->init_token = Str::random(20);
        $user->save();
        return $user;
    }

    public function reset($token, $password){
        Validator::make([
            "token" => $token,
            "password" => $password
        ], [
            'token' => 'required|string|max:255',
            'password' => 'required|string|min:8|max:255',
        ])->validate();

        $user = User::where("init_token", $token)->firstOrFail();

        $user->password = $password;
        $user->init_token = null;
        $user->save();
        return $user;
    }

    public function add($data)
    {
        if( !isset($data["opted_out"]) || !$data["opted_out"] ){
            $data["opted_out"] = 0;
        }
        Validator::make($data, [
            'email' => "required|email|max:255|unique:users,email,NULL,id,deleted_at,NULL",
            'password' => 'required|string|min:8|max:255',
            'name' => 'required|string|max:255',
            'tel' => 'required|string|max:255',
            'gender' => 'required|integer',
            'birthday' => 'required|date',
            "opted_out" => 'required|integer',
        ])->validate();

        return User::create($data);
    }

    public function edit($userId, $data){

        $user = User::find($userId);

        if( !isset($data["opted_out"]) || !$data["opted_out"] ){
            $data["opted_out"] = 0;
        }
        $collection = collect($user->makeVisible(["password"])->toArray())->merge($data);
        Validator::make($collection->toArray(), [
            'name' => 'required|string|max:255',
            'email' => "required|email|max:255|unique:users,email,NULL,id,deleted_at,NULL,id,!".$userId,
            'tel' => 'required|string|max:255',
            'gender' => 'required|integer',
            'birthday' => 'required|date',
            "opted_out" => 'required|integer',
        ])->validate();

        $user->fill($data);
        $user->save();
        $user->makeHidden(["password"]);
        return $user;
    }

    public function editAddress($userId, $data){
        $user = User::find($userId);
        Validator::make($data, [
            'post_code' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ])->validate();
        $user->fill($data);
        $user->save();
        return $user;
    }

    public function editPassword($userId, $data){

        Validator::make($data, [
            'current_password' => 'required',
            'password' => 'required|string|min:8|max:255',
        ])->validate();

        $user = User::find($userId);
        if (!Hash::check($data["current_password"], $user->password)) {
            Validator::make([], [
                'current_password' => 'required',
            ], [
                "current_password.required" => "現在のパスワードが間違っています。"
            ])->validate();
        }
        $user->password = $data["password"];
        $user->save();
        return $user;
    }

    public function delete($userId){
        $user = User::find($userId);
        $user->delete();
    }

    public function getPurchases($userId) {
        $user = User::with([
            "purchases" => function($query) {
                $query->orderBy("created_at", "desc");
            }, "purchases.reciever", "purchases.box", "purchases.content", 
            "recieves" => function($query) {
                $query->orderBy("created_at", "desc");
            }, "recieves.user", "recieves.box", "recieves.content",
        ])->find($userId);

        return $user;
    }
}
