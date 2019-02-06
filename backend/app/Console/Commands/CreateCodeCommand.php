<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Services\PromotionCodeService;
use Carbon\Carbon;

class CreateCodeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'code:create {name} {count} {price} {--code=} {--expired=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'create promotion code';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(PromotionCodeService $promotionCodeService)
    {
        parent::__construct();
        $this->promotionCodeService = $promotionCodeService;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("start create promotion code");

        $name = $this->argument("name");
        $count = $this->argument("count");
        $price = $this->argument("price");

        $expired = Carbon::now()->addDays(90);
        if( $this->option("expired") ){
            $expired = new Carbon( $this->option("expired") );
        }

        if( $this->option("code") ){
            $promotionCodes = $this->promotionCodeService->createMany( $name, $count, $price, $this->option("code"), $expired);
            $this->info( $this->option("code") );
            $this->info( "count: ".$promotionCodes->count());
        }else{
            $promotionCodes = $this->promotionCodeService->createMany( $name, $count, $price, null, $expired);
            $promotionCodes->each( function($code){
                $this->info( $code->code );
            });
        }

        $this->info("end create promotion code");
    }
}
