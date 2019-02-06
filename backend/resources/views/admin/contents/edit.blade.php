@extends('layouts.admin')

@section('sidebar')
@include("components.sidebar.admin")
@endsection

@section('content')

<div>
    <h1 class="uk-inline uk-margin-remove">
        コンテンツの編集
    </h1>
    <a class="uk-margin-small-left uk-button uk-button-text" href="{{route('admin.contents.index')}}">
        < 戻る
    </a>
</div>

<div class="uk-margin-large">
    <h2>
        コンテンツ情報の変更
    </h2>
    <div class="uk-card uk-card-default uk-card-body">
        <form action="{{route('admin.contents.edit', [
            'content' => $content
        ])}}" method="POST">
            <h3>
                基本情報
            </h3>
            @include("components.editor.admin_content", [
                "content" => $content,
            ])

            <h3>
                管理情報
            </h3>

            @include("components.editor.admin_content", [
                "content" => $content,
                "form" => "admin_only"
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
        画像の登録
    </h2>
    <div class="uk-card uk-card-default uk-card-body">
        <div class="uk-margin-small">
            <form class="form-horizontal" method="POST" action="{{ route('admin.contentImages.add', [
                'content' => $content
            ])}}" enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="uk-margin" uk-margin>
                    <div uk-form-custom="target: true">
                        <input type="file" name="image" required>
                        <input class="uk-input uk-form-width-medium" type="text" placeholder="ファイルを選ぶ" disabled>
                    </div>
                    <button class="uk-button uk-button-default" type="submit">アップロード</button>
                </div>
            </form>
        </div>
        <div class="uk-margin-small uk-grid-small" uk-grid>
            @foreach($content->contentImages as $contentImage )
            <div class="uk-image-wrapper uk-height-small uk-width-1-3@s uk-position-relative">
                <img src="{{$contentImage->image}}">
                <div class="uk-position-bottom-right uk-padding-small">
                    <form class="form-horizontal" method="POST" action="{{ route('admin.contentImages.delete', [
                        'content' => $content, 
                        'contentImage' => $contentImage
                    ])}}">
                        {{ csrf_field() }}
                        <button class="uk-icon-button uk-button-danger" uk-icon="icon: trash;"></button>
                    </form>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</div>

<div class="uk-margin-large uk-alert uk-alert-danger">
    <p>
        コンテンツの削除
    </p>
    <form class="uk-text-right" method="POST" action="{{ route('admin.contents.delete', [
        'content' => $content, 
    ])}}" onsubmit="confirmDelete(event)">
        <button class="uk-button uk-button-danger">
            削除する
        </button>
        {{ csrf_field() }}
    </form>
</div>


@endsection