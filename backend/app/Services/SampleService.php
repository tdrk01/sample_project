<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Sample;
use Illuminate\Support\Facades\Storage;

class SampleService
{
    public function draw(){
        return Sample::orderByRaw("RAND() * `samples`.`win_rate` DESC")->first();
    }

    public function import($data, $file){
        $filePath = "samples/".$data["image_url"];
        Storage::put($filePath, $file, "public");
        $data["image_url"] = $filePath;
        return Sample::create($data);
    }

    public function clearAll(){
        $samples = Sample::get();
        $samples->each( function($sample) {
            Storage::delete($sample->image_url);
            $sample->delete();
        });
    }
}
