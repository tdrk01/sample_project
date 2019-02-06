<?php

namespace App\Services;

use App\Models\Content;
use Validator;
use Illuminate\Support\Str;

class ContentService
{
    public function search( $param=[], $pagesize = 20, $order = "created_at", $sort = "asc" ){
        $query = Content::with(["box", "contentCategory", "contentImages"]);

        if(isset( $param["box_id"] )){
            $query = $query->where("box_id", $param["box_id"] );
        }

        if(isset( $param["provider_id"] )){
            $query = $query->where("provider_id", $param["provider_id"] );
        }

        if(isset( $param["reserve_type"] )){
            $query = $query->where("reserve_type", $param["reserve_type"] );
        }

        if(isset( $param["name"] )){
            $query = $query->where("name", "like", "%".$param["name"]."%" );
        }

        if(isset( $param["display_priority"] )){
            $query = $query->where("display_priority", "<>", Content::NOT_SHOW)->orderBy("display_priority", "DESC");
        }

        if(isset( $param["content_category_id"] )){
            if( is_array($param["content_category_id"]) ){
                $query = $query->whereIn("content_category_id", $param["content_category_id"] );
            }else{
                $query = $query->where("content_category_id", $param["content_category_id"] );  
            }
        }

        if(isset( $param["condition_id"] )){
             $query = $query->whereNotExists( function($query) use ($param) {
                if( is_array($param["filters.condition_id"]) ) {
                    $query->from("filters")
                    ->whereIn("filters.condition_id", $param["filters.condition_id"])
                    ->whereRaw("filters.content_id = contents.id");
                }else{
                    $query->from("filters")
                    ->where("filters.condition_id", $param["filters.condition_id"])
                    ->whereRaw("filters.content_id = contents.id");    
                }
             });
        }

        return $query->orderBy($order, $sort)->paginate($pagesize);
    }

    public function getValidator( $data ) {
        if( !isset($data["reserve_type"]) || $data["reserve_type"] == Content::DO_SELF ){
            //自分で予約型
            $data["reserve_type"] = 0;
            return Validator::make($data, [
                'box_id' => 'required|integer|exists:boxes,id',
                'content_category_id' => 'required|integer|exists:content_categories,id',
                'provider_id' => 'required|integer|exists:providers,id,deleted_at,NULL',
                'hash' => 'required|string|max:100',
                'title' => 'required|string|max:255',
                'name' => 'required|string|max:255',
                'number' => 'required|string|max:255',
                'tel' => 'nullable|required_without:email|string|max:255',
                'email' => 'nullable|required_without:tel|email|max:255',
                'summary' => 'required|string',
                'description' => 'required|string|min:100',
                'link_url' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'price' => 'required|integer',
                'win_rate' => 'required|integer',
                'expired_at' => 'nullable|date',
                'expired_date' => 'nullable|integer',
                'reserve_type' => 'required|integer',
                'reserve_way' => 'required|string',
                'access' => 'required|string',
                'length' => 'required|string|max:255',
                'tools' => 'required|string|max:255',
            ]);
        }else if( $data["reserve_type"] == Content::SEND ){
            //送付型
            return Validator::make($data, [
                'box_id' => 'required|integer|exists:boxes,id',
                'content_category_id' => 'required|integer|exists:content_categories,id',
                'provider_id' => 'required|integer|exists:providers,id,deleted_at,NULL',
                'hash' => 'required|string|max:100',
                'title' => 'required|string|max:255',
                'name' => 'required|string|max:255',
                'number' => 'required|string|max:255',
                'description' => 'required|string|min:100',
                'price' => 'required|integer',
                'win_rate' => 'required|integer',
                'expired_at' => 'nullable|date',
                'expired_date' => 'nullable|integer',
                'reserve_type' => 'required|integer'
            ]);
        }else{
            //自分で予約型
            return Validator::make($data, [
                'box_id' => 'required|integer|exists:boxes,id',
                'content_category_id' => 'required|integer|exists:content_categories,id',
                'provider_id' => 'required|integer|exists:providers,id,deleted_at,NULL',
                'hash' => 'required|string|max:100',
                'title' => 'required|string|max:255',
                'name' => 'required|string|max:255',
                'number' => 'required|string|max:255',
                'summary' => 'required|string',
                'description' => 'required|string|min:100',
                'link_url' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'price' => 'required|integer',
                'win_rate' => 'required|integer',
                'expired_at' => 'nullable|date',
                'expired_date' => 'nullable|integer',
                'reserve_type' => 'required|integer',
                'access' => 'required|string',
                'length' => 'required|string|max:255',
                'tools' => 'required|string|max:255',
            ]);
        }
    }

    public function add($data){
        $data["win_rate"] = 0;
        $data["hash"] = Str::random(64);

        $validator = $this->getValidator($data);
        $validator->validate();

        return Content::create($data);
    }

    public function edit($contentId, $data){

        $content = Content::find($contentId);
        
        $collection = collect($content->toArray())->merge($data);
        $validator = $this->getValidator($collection->toArray());
        $validator->validate();

        $content->fill($data);
        $content->save();
        return $content;
    }

    public function delete( $contentId ){
        $content = Content::find($contentId);
        $content->contentImages->each( function($contentImage) {
            $contentImage->delete();
        });
        $content->delete();
    }
}
