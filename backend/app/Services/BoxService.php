<?php

namespace App\Services;

use App\Models\Box;
use App\Models\Content;

class BoxService
{
    public function getAll(){
        return Box::withCount(["contents"])->with(["contents" => function($query) {
            return $query->where("contents.display_priority", "<>", Content::NOT_SHOW)->orderBy("contents.display_priority", "desc");
        }, "contents.contentImages", "contents.contentCategory"])->orderBy("priority", "asc")->get();
    }

    public function getSum($boxId){
        $result = Content::selectRaw(" sum( contents.win_rate ) as sum ")->where( "box_id", $boxId )->first();
        if( $result == null || $result->sum == null ){
            return 0;
        }else{
            return $result->sum;
        }
    }
}
