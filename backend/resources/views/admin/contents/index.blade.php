@extends('layouts.admin')

@section('sidebar')
@include("components.sidebar.admin")
@endsection

@section('content')


<div class="uk-margin">
    <h1 class="uk-inline uk-margin-remove">
        コンテンツ一覧
    </h1>
    <a class="uk-margin-left uk-button uk-button-primary" href="#add-modal" uk-toggle>
        追加
    </a>
</div>

<div class="uk-margin uk-card uk-card-default uk-card-small uk-card-body">
    <ul uk-accordion>
        <li class="uk-open">
            <h2 class="uk-accordion-title">
                フィルター
            </h2>
            <div class="uk-accordion-content">        
                <form class="form-horizontal" method="GET">
                    <div class="uk-grid-small uk-flex-bottom" uk-grid> 
                        <div class="uk-width-1-3@s">
                            <label class="uk-form-label" for="email">
                                tamate baco
                            </label>
                            <div class="uk-form-controls">
                                @include("components.input.boxes", [
                                    "name" => "box_id",
                                    "value" => isset($params["box_id"]) ? $params["box_id"]: null
                                ])
                            </div>
                        </div>
                        <div class="uk-width-1-3@s">
                            <label class="uk-form-label" for="email">
                                カテゴリ
                            </label>
                            <div class="uk-form-controls">
                                @include("components.input.content_categories", [
                                    "name" => "content_category_id",
                                    "value" => isset($params["content_category_id"]) ? $params["content_category_id"]: null
                                ])
                            </div>
                        </div>
                        <div class="uk-width-1-3@s">
                            <label class="uk-form-label" for="company_name">
                                コンテンツ提供者
                            </label>
                            <div class="uk-form-controls">
                                @include("components.input.providers", [
                                    "name" => "provider_id",
                                    "value" => isset($params["provider_id"]) ? $params["provider_id"]: null
                                ])
                            </div>
                        </div>
                        <div class="uk-width-small">
                            <label class="uk-form-label" for="reserve_type">
                                予約タイプ
                            </label>
                            <div class="uk-form-controls">
                                @include("components.input.reserve_type", [
                                    "required" => false,
                                    "value" => isset($params["reserve_type"]) ? $params["reserve_type"]: null
                                ])
                            </div>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="uk-form-label" for="email">
                                コンテンツ名
                            </label>
                            <div class="uk-form-controls">
                                <input class="uk-input" type="text" name="email" value="{{ isset($params['email']) ? $params['email']: null }}">
                            </div>
                        </div>
                        <div class="uk-width-auto">
                            <button type="submit" class="uk-button uk-button-primary">
                                検索
                            </button>
                        </div>
                        <div class="uk-width-auto">
                            <a class="uk-button uk-button-default" href="?">
                                クリア
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </li>
    </ul>
</div>

<div class="uk-margin uk-overflow-auto">
    <table class="uk-table uk-table-small uk-table-divider uk-table-striped">
        <thead>
            <tr>
                <th class="uk-table-shirink">
                    @include("components.part.sorter", ["order" => "created_at", "label" => "登録日", "params" => $params])
                </th>
                <th class="uk-table-shirink">
                    @include("components.part.sorter", ["order" => "reserve_type", "label" => "予約タイプ", "params" => $params])
                </th>
                <th class="uk-width-auto">
                    @include("components.part.sorter", ["order" => "box_id", "label" => "tamate baco", "params" => $params])
                </th>
                <th class="uk-width-auto">
                    @include("components.part.sorter", ["order" => "provider_id", "label" => "コンテンツ提供者", "params" => $params])
                </th>
                <th class="uk-table-expand">
                    @include("components.part.sorter", ["order" => "name", "label" => "コンテンツ名", "params" => $params])
                </th>
                <th class="uk-table-shirink">
                    操作
                </th>
            </tr>
        </thead>
        <tbody>
            @foreach ($contents as $content)
            <tr>
                <td>
                    <div class="uk-width-auto">
                       @date($content->created_at)
                    </div>
                </td>
                <td>
                    <div class="uk-width-auto">
                        @include("components.part.content_type", [
                            "value" => $content->reserve_type
                        ])
                    </div>
                </td>
                <td>
                    <div class="uk-width-small">
                       {{$content->box->name}}
                    </div>
                </td>
                <td>
                    <div class="uk-width-small">
                       {{$content->provider->company_name}}
                    </div>
                </td>
                <td>
                    {{$content->name}}
                </td>
                <td>
                    <span class="uk-margin-small-right">
                        <a class="uk-icon-button" uk-icon="icon: file-edit" href="{{route('admin.contents.edit', [
                            'content' => $content
                        ])}}">
                        </a>
                    </span>
                    <span class="uk-margin-small-right">
                        <a class="uk-icon-button" uk-icon="icon: search" target="_blank" href="{{webRoute('contents.preview', [
                            'hash' => $content->hash
                        ])}}">
                        </a>
                    </span>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

<div class="uk-margin">
    {{ $contents->appends(isset($params)? $params: [])->links() }}
</div>

<div id="add-modal" class="uk-modal-container" uk-modal>
    <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
            <h2 class="uk-modal-title">コンテンツの新規追加</h2>
        </div>
        <form class="form-horizontal" method="POST" action="{{ route('admin.contents.add') }}">
            {{ csrf_field() }}
            <div class="uk-modal-body" uk-overflow-auto>
                @component('components.editor.admin_content', [
                    "form" => "admin_only",
                    "is_add" => true
                ])
                @endcomponent
                <hr/>
                @component('components.editor.admin_content', [
                ])
                @endcomponent
            </div>
            <div class="uk-modal-footer uk-text-right">
                <a class="uk-button uk-button-default uk-modal-close">キャンセル</a>
                <button class="uk-button uk-button-primary" type="submit">保存</button>
            </div>
        </form>
    </div>
</div>

@endsection