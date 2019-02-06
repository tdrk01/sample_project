<?php

namespace App\Listeners;

use App\Events\Drawn;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Support\Facades\Mail;

use App\Mail\Draw\Purchaser as PurchaserTemplate;
use App\Mail\Draw\Provider as ProviderTemplate;
use App\Mail\Draw\User as UserTemplate;

class DrawnListener implements ShouldQueue
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
     * @param  Drawn  $event
     * @return void
     */
    public function handle(Drawn $event)
    {
        Mail::to($event->purchase->user)
            ->bcc( (object) config("mail.system") )
            ->send(new PurchaserTemplate($event->purchase));
        
        Mail::to($event->purchase->content->provider)
            ->bcc( (object) config("mail.system") )
            ->send(new ProviderTemplate($event->purchase));

        Mail::to($event->purchase->reciever)
            ->bcc( (object) config("mail.system") )
            ->send(new UserTemplate($event->purchase));
    }
}
