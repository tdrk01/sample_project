
{{$purchase->reciever->name}} さん、こんにちは！

tamate bacoサポートチームです。
チケットID【{{$purchase->id}}】の送付依頼を受付ました。

---- 送付先情報 ---------------------
郵便番号: {{ $purchase->post_code }}
住所   : {{ $purchase->address }}
------------------------------------

{{$purchase->reciever->name}} さんにとって、良い体験になることを願っております。

もしよろしければ、体験終了後に下記リンクからアンケートにお答えください。
{{ webRoute("items.questionary", ["hash" => $purchase->register_token ]) }}
アンケートにお答えいただいた人の中から、抽選で毎月5名様にtamate bacoを無料プレゼントキャンペーン中！

tamate bacoの送り主である {{$purchase->user->name}} さんにも、お礼のtamate bacoを送ってみてはいかがでしょうか。

この度は、ご利用いただき誠にありがとうございました。


@include("emails.components.footer")