<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Services\PurchaseService;
use App\Events\Canceled;

class CancelCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:cancel {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'cancel command';

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
        $purchaseId = $this->argument("id");
        $this->info("start cancel: purchaseId=".$purchaseId);

        $result = $this->purchaseService->release($purchaseId);
        if( is_string($result) ){
            $this->error($result);
            return;
        }
        $result->load(["content.provider"]);
        event( new Canceled($result) );
        $this->info("end cancel");
    }
}
