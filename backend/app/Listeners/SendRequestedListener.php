<?php

namespace App\Listeners;

use App\Events\SendRequested;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Support\Facades\Mail;
use App\Mail\SendRequested\User as UserTemplate;

class SendRequestedListener implements ShouldQueue
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
     * @param  SendRequested  $event
     * @return void
     */
    public function handle(SendRequested $event)
    {
        Mail::to($event->purchase->reciever)
            ->bcc( (object) config("mail.system") )
            ->send(new UserTemplate($event->purchase));
    }
}
