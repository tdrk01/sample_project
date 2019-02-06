<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\Content;
use App\Models\Purchase;

class CreateHashCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:rehash';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("start hashing");

        $contents = Content::whereNull("hash")->get();
        $contents->each( function($content) {
            $content->hash = str_random(64);
            $content->save();
        });

        $this->info("contents:".$contents->count());

        $purchases = Purchase::whereNull("register_token")->get();
        $purchases->each( function($purchase) {
            $purchase->register_token = str_random(64);
            $purchase->save();
        });

        $this->info("purchases:".$purchases->count());

        $this->info("end hashing");
    }
}
