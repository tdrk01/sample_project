<?php

namespace App\Listeners;

use App\Events\DidExpired;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class DidExpiredListener implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  DidExpired  $event
     * @return void
     */
    public function handle(DidExpired $event)
    {
        //
    }
}
