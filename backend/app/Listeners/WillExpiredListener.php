<?php

namespace App\Listeners;

use App\Events\WillExpired;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class WillExpiredListener implements ShouldQueue
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
     * @param  WillExpired  $event
     * @return void
     */
    public function handle(WillExpired $event)
    {
        //
    }
}
