<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\Storage;
use Illuminate\Console\Command;
use App\Services\SampleService;
use SplFileObject;

class SampleImportCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:sample';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'import sample';


    protected $sampleService;
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(SampleService $sampleService)
    {
        parent::__construct();
        $this->sampleService = $sampleService;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("start");

        $this->sampleService->clearAll();

        $file = new SplFileObject( storage_path("samples/data.csv") ); 
        $file->setFlags(SplFileObject::READ_CSV); 
        foreach ($file as $line) {
          if(isset($line[0]) ){
            $data = [
                "title" => $line[0],
                "image_url" => $line[1],
                "is_rare" => $line[2],
                "win_rate" => $line[3],
            ];
            
            if( Storage::disk("sample")->exists( $data["image_url"] ) ){
                $file = Storage::disk("sample")->get( $data["image_url"] );
                $sample = $this->sampleService->import( $data, $file );
            }
          }
        } 

        $this->info("end");

    }
}
