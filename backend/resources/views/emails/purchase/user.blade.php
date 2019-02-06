{{ $purchase->user->name }} さん、こんにちは！

tamate bacoサポートチームです。
この度は、tamate baco「{{ $purchase->box->name }}」のご購入ありがとうございます！

◇購入情報
------------------------------------------------------
【決済金額】
{{$purchase->price}} 円

【開封先リンク】
{{ webRoute("items.draw", ["hash" => $purchase->register_token ]) }}
※リンク先から{{ $purchase->box->name }}を開けることができます
※1回しか有効ではありません。ご自分で開けないようご注意ください

【開封期限】
@php
$date = new \Carbon\Carbon( $purchase->created_at );
$date->addDays( \App\Services\PurchaseService::EXPIRED_DATE );
echo $date->format("Y/m/d")."\n";
@endphp
------------------------------------------------------

開封先リンクを、お相手にお送りください。
この度は、ご利用ありがとうございました。


@include("emails.components.footer")