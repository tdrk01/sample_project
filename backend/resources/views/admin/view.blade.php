@extends('layouts.admin')

@section('sidebar')
@include("components.sidebar.admin")
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
                今月の売上
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
                今月の件数
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

@endsection