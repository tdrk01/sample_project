<?php

namespace App\Listeners;

use App\Events\Purchased;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Support\Facades\Mail;
use App\Mail\Purchase\User as UserTemplate;

class PurchasedListener implements ShouldQueue
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
     * @param  Purchased  $event
     * @return void
     */
    public function handle(Purchased $event)
    {
        Mail::to($event->purchase->user)
            ->bcc( (object) config("mail.system") )
            ->send(new UserTemplate($event->purchase));
    }
}
