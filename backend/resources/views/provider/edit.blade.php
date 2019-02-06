@extends('layouts.provider')

@section('sidebar')
@include("components.sidebar.provider")
@endsection

@section('content')

<h1 class="">
    コンテンツ管理者情報の編集
</h1>

<div class="uk-margin-large">
    <h2>
        基本情報の変更
    </h2>
    <div class="uk-card uk-card-default uk-card-body">
        <form action="{{route('provider.edit')}}" method="POST">
            @include("components.editor.provider", [
                "provider" => $provider,
                "form" => "basic_only"
            ])
            <div class="uk-margin-small uk-text-right">
                <button class="uk-button uk-button-primary uk-width-medium@s" type="action">
                    更新する
                </button>
            </div>
            {{ csrf_field() }}
        </form>
    </div>
</div>

<div class="uk-margin-large">
    <h2>
        パスワードの変更
    </h2>
    <div class="uk-card uk-card-default uk-card-body">
        <form action="{{route('provider.pass')}}" method="POST">
            @include("components.editor.provider", [
                "provider" => $provider,
                "form" => "pass_only"
            ])
            <div class="uk-margin-small uk-text-right">
                <button class="uk-button uk-button-primary uk-width-medium@s" type="action">
                    更新する
                </button>
            </div>
            {{ csrf_field() }}
        </form>
    </div>
</div>

@endsection