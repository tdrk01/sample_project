<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'Laravel\Passport\Events\AccessTokenCreated' => [
            'App\Listeners\RevokeOldTokensListener',
        ],
        'Laravel\Passport\Events\RefreshTokenCreated' => [
            'App\Listeners\PruneOldTokenListener',
        ],
        'App\Events\Registered' => [
            'App\Listeners\RegisteredListener',
        ],
        'App\Events\ForgotPassword' => [
            'App\Listeners\ForgotPasswordListener',
        ],
        'App\Events\ResetPassword' => [
            'App\Listeners\ResetPasswordListener',
        ],
        'App\Events\Purchased' => [
            'App\Listeners\PurchasedListener',
        ],
        'App\Events\Drawn' => [
            'App\Listeners\DrawnListener',
        ],
        'App\Events\Used' => [
            'App\Listeners\UsedListener',
        ],
        'App\Events\SendRequested' => [
            'App\Listeners\SendRequestedListener',
        ],
        'App\Events\WillExpired' => [
            'App\Listeners\WillExpiredListener',
        ],
        'App\Events\DidExpired' => [
            'App\Listeners\DidExpiredListener',
        ],
        'App\Events\Canceled' => [
            'App\Listeners\CanceledListener',
        ],
        'App\Events\Contacted' => [
            'App\Listeners\ContactedListener',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
