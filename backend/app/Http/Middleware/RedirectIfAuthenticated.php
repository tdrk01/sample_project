<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        // if (Auth::guard($guard)->check()) {
        //     switch ($guard) {
        //         case "admin":
        //             return redirect()->route("admin.login");
        //         case "provider":
        //             return redirect()->route("provider.login");
        //         default:
        //             return redirect('/');
        //     }
        // }
        return $next($request);
    }
}
