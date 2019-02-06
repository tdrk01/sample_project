<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Services\PurchaseService;
use App\Services\UserService;
use App\Models\Purchase;
use App\Http\Resources\PurchaseResource;
use App\Http\Resources\AnswerCollection;

use App\Events\Drawn;
use App\Events\Used;
use App\Events\Purchased;
use App\Events\SendRequested;

class PurchaseController extends Controller
{
    protected $purchaseService;
    protected $userService;

    public function __construct(PurchaseService $purchaseService, UserService $userService){
        $this->middleware("auth:api")->except(['view']);
        $this->purchaseService = $purchaseService;
        $this->userService = $userService;
    }

    public function add(Request $request){
        $userId = Auth::guard("api")->id();
        $result = $this->purchaseService->add( 
            $userId, 
            $request->input("box_id"), 
            $request->input("code"), 
            $request->input("token_id")
        );
        if( is_string($result) ){
            return $this->isError(400, $result);
        }else{
            event( new Purchased($result) );
            return $this->isSuccessResource( new PurchaseResource($result) );
        }
    }

    public function view(Purchase $purchase){
        $purchase->load(["box", "content", "content.provider", "content.contentImages", "content.contentCategory"]);
        return $this->isSuccessResource( new PurchaseResource($purchase) );
    }

    public function edit(Request $request, Purchase $purchase){
        $this->authorize("update", $purchase);
        if( $purchase->post_code == null ){
            $purchase = $this->purchaseService->edit( 
                $purchase->id, $request->only(["post_code", "address"])
            );
            $this->userService->editAddress( 
                Auth::guard("api")->id(), $request->only(["post_code", "address"])
            );    
            event( new SendRequested( $purchase ) );
        }
        return $this->isSuccessResource( new PurchaseResource($purchase) );
    }

    public function detail(Purchase $purchase){
        $this->authorize("detail", $purchase);
        $purchase->load(["user", "reciever", "box", "content", "content.provider", "content.contentImages", "content.contentCategory"]);
        return $this->isSuccessResource( new PurchaseResource($purchase) );
    }

    public function draw(Request $request, Purchase $purchase){
        $this->authorize("draw", $purchase);

        $currentStatus = $purchase->status;

        $result = $this->purchaseService->draw( $purchase->id, Auth::guard("api")->id() );

        if( is_string($result) ){
            return $this->isError(400, $result);
        }
        if( $currentStatus == Purchase::ORDERED && $result->status == Purchase::DRAWED ){
            event( new Drawn($result));
        }
        return $this->isSuccessResource( new PurchaseResource($result) );
    }

    public function use(Purchase $purchase){
        $this->authorize("use", $purchase);

        $currentStatus = $purchase->status;
        if( $currentStatus != Purchase::DRAWED ){
            return $this->isError(400, "このチケットは既に利用されています。心当たりのない場合はお問い合わせよりご連絡ください。");
        }
        $result = $this->purchaseService->use($purchase->id);

        if( is_string($result) ){
            return $this->isError(400, $result);
        }
        event( new Used($result) );
        return $this->isSuccessResource( new PurchaseResource($result) );
    }
}
