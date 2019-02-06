{{ $purchase->reciever->name }} さん、こんにちは！

tamate bacoサポートチームです。
{{ $purchase->box->name }}をひらき、体験が決定しました！

◇体験詳細ページ
{{ webRoute("items.detail", ["hash" => $purchase->register_token ]) }}

◇チケットページ
{{ webRoute("items.ticket", ["hash" => $purchase->register_token ]) }}

◇体験情報
------------------------------------------------------
【体験名】
{{ $purchase->content->name }}

【事業者名】
{{ $purchase->content->provider->name }}
{{ $purchase->content->link_url }}

【予約連絡先】
{{ $purchase->content->tel }}
{{ $purchase->content->provider->email }}

【アクセス】
{{ $purchase->content->address }}

【チケットID】
{{ $purchase->id }}

------------------------------------------------------

◇体験までのフロー
{{ webRoute("items.detail", ["hash" => $purchase->register_token ])."#flow" }}

新しい体験を、お楽しみください。

@include("emails.components.footer")