<?php

namespace App\Services;

use Illuminate\Support\Str;
use Validator;
use App\Models\PromotionCode;
use App\Models\Purchase;
use App\Models\Content;
use App\Models\Box;

use App\Services\PromotionCodeService;
use App\Services\PaymentService;

use Carbon\Carbon;

class PurchaseService
{
    const EXPIRED_DATE = 14;

    protected $promotionCodeService;
    protected $paymentService;

    public function __construct(PromotionCodeService $promotionCodeService, PaymentService $paymentService){
        $this->promotionCodeService = $promotionCodeService;
        $this->paymentService = $paymentService;
    }

    public function add( $userId, $boxId, $code=null, $tokenId=null ){
        //値段のチェック
        $box = Box::withCount(["contents" => function($query) {
            $query->where("win_rate", "<>", 0);
        }])->find( $boxId );

        if($box->contents_count == 0){
            return "現在".$box->name."は在庫がありません。\n別のtamate bacoをお買い求めください。";
        }

        $price = $box->price;
        $promotionCode = null;
        if( $code != null ){
            $promotionCode = $this->promotionCodeService->check(
                $code, $userId, $boxId
            );
            if( $promotionCode == null ){
                return "プロモーションコードが無効です。\n番号を再度確認してください。";
            }
            $price = ($price - $promotionCode->price) > 0 ? ($price - $promotionCode->price) : 0;
        }

        //決済情報の確認
        $token = null;
        $paymentType = null;
        if( $price > 0 ){
            $token = $this->paymentService->checkCredit($price, $tokenId);
            if( $token == null ){
                return "決済に失敗しました。\nクレジットカードの入力内容を確認してください。";
            }
            $paymentType = Purchase::CARD;
        }else{
            $paymentType = Purchase::CODE_ONLY;
        }

        //作成
        $purchase = Purchase::create([
            "user_id" => $userId,
            "box_id" => $box->id,
            "list_price" => $box->price,
            "payment_token" => $token,
            "payment_type" => $paymentType,
            "status" => Purchase::ORDERED,
            "register_token" => Str::random(64)
        ]);

        //クーポンの利用
        if( $promotionCode != null ){
            $promotionCode->user_id = $userId;
            $promotionCode->box_id = $boxId;
            $promotionCode->purchase_id = $purchase->id;
            $promotionCode->save();
        }

        return $purchase;
    }

    public function edit($purchaseId, $data){
        $purchase = Purchase::find($purchaseId);
        Validator::make($data, [
            'post_code' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ])->validate();
        $purchase->fill($data);
        $purchase->save();
        return $purchase;
    }

    public function draw( $purchaseId, $userId ){
        $purchase = Purchase::find($purchaseId);

        if( $purchase->status == Purchase::CANCELED ){
            return "このtamate bacoは有効期限が切れたかキャンセルされたため開封できません。";
        }

        if( $purchase->status == Purchase::ORDERED ){

            if( $purchase->created_at < Carbon::now()->subDays( PurchaseService::EXPIRED_DATE ) ){
                return "このtamate bacoの有効期限(購入から".PurchaseService::EXPIRED_DATE."日)が切れたため開封できません。";
            }

            $purchase->reciever_id = $userId;
            $content = Content::where("box_id", $purchase->box_id)->orderByRaw("RAND() * `contents`.`win_rate` DESC ")->where( function($query) {
                return $query->whereNull("contents.expired_at")
                    ->orWhere( "contents.expired_at", ">=", Carbon::now()->addDays(60));
            })->first();
            if( $content == null ){
                return "tamate bacoの在庫がありませんでした。\nお急ぎの場合は大変恐縮ですがページ下部の問い合わせリンクより、弊社にご連絡ください。";
            }

            $result = $this->claim($purchaseId);
            if($result == null){
                return "決済に失敗しました。\n大変申し訳ございませんが、しばらく時間を置いて再度実行ください。\nお急ぎの場合は大変恐縮ですがページ下部の問い合わせリンクより、弊社にご連絡ください。";
            }
            $purchase->content_id  = $content->id;
            $purchase->status = Purchase::DRAWED;
            $purchase->drawn_at = Carbon::now();
            $purchase->expired_at = $content->expired;
            $purchase->save();
        }

        $purchase->load(["user", "reciever", "content", "content.contentImages", "content.contentCategory", "box", "user"]);
        return $purchase;
    }

    public function use( $purchaseId ){
        $purchase = Purchase::find($purchaseId);

        if( $purchase->status == Purchase::CANCELED ){
            return "チケットはキャンセルされたため利用できません。";
        }

        if( $purchase->expired_at < Carbon::now() ){
            return "チケットの有効期限が切れたため利用できません。";
        }
        $purchase->status = Purchase::PLAYED;
        $purchase->played_at = Carbon::now();
        $purchase->save();
        return $purchase;
    }

    public function claim( $purchaseId ){
        $purchase = Purchase::find($purchaseId);
        if( $purchase->status == Purchase::ORDERED ){
            $result = $this->paymentService->doClaim($purchase->payment_token);
            if( !$result ){
                return null;
            }
            $purchase->status = Purchase::PAYED;
            $purchase->save();
        }
        return $purchase;
    }

    public function getDrawExpireds(){
        return Purchase::where("status", "<>", Purchase::CANCELED)->where("created_at", "<", Carbon::now()->subDays(PurchaseService::EXPIRED_DATE))->get();
    }

    public function release($purchaseId){
        $purchase = Purchase::find($purchaseId);
        $result = $this->paymentService->releaseCredit( $purchase->payment_token );
        if(!$result){
            return "返金処理に失敗しました";
        }
        $purchase->status = Purchase::CANCELED;
        $purchase->save();

        return $purchase;
    }
}
