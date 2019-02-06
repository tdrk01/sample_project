{{ $user->name }} さん、こんにちは！

tamate bacoサポートチームです。
パスワードのリセットを承りました。

下記リンクより、再設定をお願い致します。
{{ webRoute("auth.reset", ["token" => $user->init_token ]) }}


@include("emails.components.footer")