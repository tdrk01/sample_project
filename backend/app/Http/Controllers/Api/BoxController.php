<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Resources\BoxCollection;
use App\Http\Resources\BoxResource;
use App\Services\BoxService;
use App\Models\Box;

class BoxController extends Controller
{
    protected $boxService;

    public function __construct(BoxService $boxService){
        $this->boxService = $boxService;
    }

    public function index(Request $request){
        $boxes = $this->boxService->getAll();
        return $this->isSuccessResource( new BoxCollection($boxes));
    }

    public function view(Box $box){
        $box->load(["contents", "contents.contentImages", "contents.contentCategory"]);
        return $this->isSuccessResource( new BoxResource($box) );
    }


    public function sum(Box $box){
        $sum = $this->boxService->getSum($box->id);
        return $this->isSuccessData( [
            "sum" => $sum
        ], "取得しました" );
    }
}
