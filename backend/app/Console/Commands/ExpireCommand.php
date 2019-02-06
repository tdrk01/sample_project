<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Services\PurchaseService;
use App\Events\DidExpired;

class ExpireCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:expire';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'expire';

    protected $purchaseService;
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(PurchaseService $purchaseService)
    {
        parent::__construct();
        $this->purchaseService = $purchaseService;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("start expired");
        $purchases = $this->purchaseService->getDrawExpireds();

        $this->info("will expired: count=".$purchases->count());

        $purchases->each( function($purchase){
            $result = $this->purchaseService->release( $purchase->id);
            if( is_string($result) ){
                $this->error($result);
                return;
            }
            event( new DidExpired($purchase) );
            $this->info("did expired: id=".$purchase->id);            
        });

        $this->info("end expired");
    }
}
