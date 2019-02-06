@extends('layouts.provider')

@section('sidebar')
@include("components.sidebar.provider")
@endsection

@section('content')

<h1>
    ダッシュボード
</h1>

<div uk-grid class="uk-child-width-1-2@s">
    <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3>
                総売上
            </h3>
            <div class="uk-text-center">
                <span class="uk-heading-primary uk-text-primary">
                    {{ $total->price ?: 0 }}
                </span>
                <span>円</span>
            </div>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3>
                総購入件数
            </h3>
            <div class="uk-text-center">
                <span class="uk-heading-primary uk-text-primary">
                    {{ $total->count }}
                </span>
                <span>件</span>
            </div>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3>
                今月の価格
            </h3>
            <div class="uk-text-center">
                <span class="uk-heading-primary uk-text-primary">
                    {{ $today->price ?: 0 }}
                </span>
                <span>円</span>
            </div>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3>
                今月の購入数
            </h3>
            <div class="uk-text-center">
                <span class="uk-heading-primary uk-text-primary">
                    {{ $today->count }}
                </span>
                <span>件</span>
            </div>
        </div>
    </div>
</div>

@if( $provider->agreed_at == null )

<div id="term-modal" class="uk-flex-top" uk-modal="container: false;bg-close: false;esc-close: false;">
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <p>
           tamate bacoでコンテンツを提供するには、<a target="_blank" href="{{route('provider.term')}}">事業者向け利用規約</a>に同意する必要があります。
        </p>
        <div class="uk-margin uk-text-center">
            <form action="{{route('provider.agree')}}" method="POST">
                <button class="uk-button uk-button-primary">
                    規約に同意する
                </button>
                {{ csrf_field() }}
            </form>
        </div>
    </div>
</div>

<script type="text/javascript">
(window.onload = function() {
    UIkit.modal( document.querySelector("#term-modal"), {
        container: false,
        "bg-close": false,
        "esc-close": false
    }).show();
})();
</script>

@endif

@endsection