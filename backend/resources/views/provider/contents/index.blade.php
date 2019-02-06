@extends('layouts.provider')

@section('sidebar')
@include("components.sidebar.provider")
@endsection

@section('content')


<div class="uk-margin">
    <h1 class="uk-inline uk-margin-remove">
        コンテンツ一覧
    </h1>
</div>

<div class="uk-margin" uk-grid>
@foreach( $contents as $content )
    <div class="uk-width-1-2@s">
        @include("components.part.content", [
            "content" => $content
        ])
    </div>
@endforeach
</div>

<div class="uk-margin">
    {{ $contents->appends(isset($params)? $params: [])->links() }}
</div>


@endsection