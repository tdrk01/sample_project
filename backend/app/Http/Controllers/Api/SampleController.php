<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Services\SampleService;
use App\Models\Sample;
use App\Http\Resources\SampleResource;

class SampleController extends Controller
{
    protected $sampleService;

    public function __construct(SampleService $sampleService){
        $this->sampleService = $sampleService;
    }

    public function draw(Request $request){
        $sample = $this->sampleService->draw();   
        if( $sample == null ){
            return $this->isError(400, "在庫がありません。時間をおいて再度ご利用ください。");
        }
        return $this->isSuccessResource( new SampleResource($sample));
    }

    public function view(Sample $sample){
        return $this->isSuccessResource( new SampleResource($sample));
    }
}
