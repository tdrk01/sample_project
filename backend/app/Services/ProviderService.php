<?php

namespace App\Services;

use App\Models\Provider;
use Validator;
use Carbon\Carbon;

class ProviderService
{
    public function getAll(){
        return Provider::get(); 
    }

    public function search( $param=[], $pagesize = 20, $order = "created_at", $sort = "asc" ){

        $query = Provider::orderBy($order, $sort);
        if(isset( $param["company_name"] )){
            $query = $query->where("company_name", "like", "%".$param["company_name"]."%" );
        }
        if(isset( $param["email"] )){
            $query = $query->where("email", "like", "%".$param["email"]."%" );
        }
        return $query->paginate($pagesize);
    }

    public function add($data){
        Validator::make($data, [
            'company_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => "required|string|email|max:255|unique:providers,email,NULL,id,deleted_at,NULL"
        ])->validate();

        return Provider::create($data);
    }

    public function agree( $providerId ){
        $provider = Provider::find($providerId);
        $provider->agreed_at = Carbon::now(); 
        $provider->save();
        return $provider;
    }


    public function edit( $providerId, $data ){
        $provider = Provider::find($providerId);
        
        $collection = collect($provider->makeVisible(["email"])->toArray())->merge($data);
        Validator::make($collection->toArray(), [
            'company_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => "required|string|email|max:255|unique:providers,email,NULL,id,deleted_at,NULL,id,!".$providerId,
        ])->validate();

        $provider->fill($data);
        $provider->save();
        return $provider;
    }

    public function editPassword( $providerId, $data ){
        $provider = Provider::find($providerId);
        
        Validator::make($data, [
            'password' => 'required|string|min:6|max:256',
        ])->validate();

        $provider->fill($data);
        $provider->save();
        return $provider;
    }

    public function delete($providerId){
        $provider = Provider::find($providerId);
        $provider->contents->each( function($content) {
            $content->contentImages->each( function($contentImage) {
                $contentImage->delete();
            });
            $content->delete();
        });
        $provider->delete();
    }
}
