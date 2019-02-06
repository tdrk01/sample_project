<?php

namespace App\Listeners;

use Laravel\Passport\Events\AccessTokenCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Services\OauthService;

class RevokeOldTokensListener implements ShouldQueue
{
    protected $oauthService;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(OauthService $oauthService)
    {
        $this->oauthService = $oauthService;
    }

    /**
     * Handle the event.
     *
     * @param  AccessTokenCreated  $event
     * @return void
     */
    public function handle(AccessTokenCreated $event)
    {
        $this->oauthService->revokeToken( $event->userId, [$event->tokenId] );
    }
}
