<?php

namespace App\Listeners;

use App\Events\Contacted;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Support\Facades\Mail;
use App\Mail\Contacted\User as UserTemplate;
use App\Mail\Contacted\Admin as AdminTemplate;

class ContactedListener implements ShouldQueue
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
     * @param  Contacted  $event
     * @return void
     */
    public function handle(Contacted $event)
    {
        Mail::to($event->contact)
            ->bcc( (object) config("mail.system") )
            ->send(new UserTemplate($event->contact));

        Mail::to( (object) [
            "name" => config("mail.from.name"),
            "email" => config("mail.from.address")
        ])->bcc( (object) config("mail.system") )
            ->send(new AdminTemplate($event->contact));
    }
}
