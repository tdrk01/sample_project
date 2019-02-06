<?php

namespace App\Listeners;

use App\Events\Used;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Support\Facades\Mail;
use App\Mail\Used\Provider as ProviderTemplate;
use App\Mail\Used\User as UserTemplate;

class UsedListener implements ShouldQueue
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
     * @param  Used  $event
     * @return void
     */
    public function handle(Used $event)
    {
        Mail::to($event->purchase->content->provider)
            ->bcc( (object) config("mail.system") )
            ->send(new ProviderTemplate($event->purchase)); 

        Mail::to($event->purchase->reciever)
            ->bcc( (object) config("mail.system") )
            ->send(new UserTemplate($event->purchase));
    }
}
