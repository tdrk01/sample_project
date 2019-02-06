<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\User;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use App\Http\Requests\PasswordConfirmRequest;

use App\Events\ForgotPassword;
use App\Events\Registered;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService){
        $this->middleware("auth:api")->except(['login', 'register', 'forget', 'reset', 'email']);
        $this->userService = $userService;
    }

    public function register(PasswordConfirmRequest $request){
        $user = $this->userService->add( $request->all() );
        event( new Registered($user) );
        return $this->isSuccessResource( new UserResource($user), "ユーザーを作成しました", [
            "auth_token" => $user->createToken('web', ['user'])->accessToken
        ]);
    }

    public function forget(Request $request){
        $user = $this->userService->forget( $request->input("email"));
        event( new ForgotPassword($user) );
        return $this->isSuccessResource( new UserResource($user), "パスワードリセット用のメールを送信しました");
    }

    public function reset(PasswordConfirmRequest $request){
        $user = $this->userService->reset( $request->input("token"), $request->input("password") );
        return $this->isSuccessResource( new UserResource($user), "パスワードをリセットしました");
    }

    public function email(Request $request){
        $user = $this->userService->getByEmail( $request->input("email") );
        return $this->isSuccessData( [ "found" => ($user != null) ]);
    }

    public function login(Request $request){
        $user = $this->userService->login( $request->input("email"), $request->input("password") );
        if( $user == null ){
            return $this->isError(403, "メールアドレスかパスワードが間違っています。");
        }
        return $this->isSuccessResource( new UserResource($user), "ログインしました", [
            "auth_token" => $user->createToken('web', ['user'])->accessToken
        ]);
    }

    public function view(User $user){
        $this->authorize("view", $user);
        return $this->isSuccessResource( new UserResource($user));
    }

    public function edit(Request $request, User $user){
        $this->authorize("update", $user);
        $user = $this->userService->edit($user->id, $request->all());
        return $this->isSuccessResource( new UserResource($user));
    }

    public function password(PasswordConfirmRequest $request, User $user){
        $this->authorize("update", $user);
        $user = $this->userService->editPassword($user->id, $request->all());
        return $this->isSuccessResource( new UserResource($user));
    }

    public function delete(User $user){
        $this->authorize("delete", $user);
        $this->userService->delete($user->id);
        return $this->isSuccessResource( new UserResource($user), "削除しました");    
    }

    public function purchases(User $user){
        $this->authorize("view", $user);
        $user = $this->userService->getPurchases($user->id);
        return $this->isSuccessResource( new UserResource($user));

    }
}
