<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof AuthorizationException) {
            return $this->accessDenied($request, $exception);
        }
        if ($exception instanceof ValidationException && $request->expectsJson() ){
            return response()->json(['message' => __('validation.message'), 'errors' => $exception->validator->getMessageBag()], 422);  
        }
        return parent::render($request, $exception);
    }

    /**
     * 未認証でアクセスした際の処理
     *
     * jsonリクエストの場合は404エラーを返す
     * それ以外の場合は全てのガードからログアウトし、ログインページへリダイレクト
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception){
        if($request->expectsJson()) {
            return response()->json([
                'message' => 'アクセスできません', 
                'errors' => [ 'auth' => ['認証が必要です'] ]
            ], 401);
        }

        Auth::guard("provider")->logout();
        Auth::guard("admin")->logout();

        switch($exception->guards()[0]){
        case "admin":
            return redirect()->route("admin.login");
        case "provider":
            return redirect()->route("provider.login");
        default:
            return redirect('/');
        }
    }

    /**
     * 認証済みユーザが権限不足のエンドポイントにアクセスした時のハンドリング
     *
     * jsonリクエストの場合は404エラーを返す
     * それ以外の場合は全てのガードからログアウトし、ログインページへリダイレクト
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    protected function accessDenied($request, AuthorizationException $exception){
        if($request->expectsJson()) {
            return response()->json([
                'message' => 'アクセスできません', 
                'errors' => [ 'auth' => ['権限がありません'] ]
            ], 403);
        }

        Auth::guard("provider")->logout();
        Auth::guard("admin")->logout();
        return abort(403);
    }
}
