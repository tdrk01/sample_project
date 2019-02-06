<?php

namespace App\Http\Middleware;

use Closure;

class ApiIntersepter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        \Debugbar::disable();
        return $next($request);
    }
}
