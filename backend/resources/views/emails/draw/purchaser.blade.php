{{ $purchase->user->name }} さん、こんにちは！

tamate bacoサポートチームです。
購入したtamate baco「{{ $purchase->box->name }}」の体験が決まりました。

下記の購入情報にもとづいて引き落とされますので、ご確認ください。

◇購入情報
------------------------------------------------------
【決済金額】
{{ $purchase->price }}円

------------------------------------------------------

この度は、ご利用ありがとうございました。

@include("emails.components.footer")