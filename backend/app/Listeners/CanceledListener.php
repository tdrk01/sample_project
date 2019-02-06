<?php

namespace App\Listeners;

use App\Events\Canceled;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CanceledListener implements ShouldQueue
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
     * @param  Canceled  $event
     * @return void
     */
    public function handle(Canceled $event)
    {
        //
    }
}
