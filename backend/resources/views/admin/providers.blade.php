@extends('layouts.admin')

@section('sidebar')
@include("components.sidebar.admin")
@endsection

@section('content')

<div class="uk-margin">
    <h1 class="uk-inline uk-margin-remove">
        コンテンツ提供者一覧
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
                        <div class="uk-width-expand@s">
                            <label class="uk-form-label" for="company_name">
                                会社名
                            </label>
                            <div class="uk-form-controls">
                                <input class="uk-input" type="text" name="company_name" value="{{ isset($params['company_name']) ? $params['company_name']: null }}">
                            </div>
                        </div>
                        <div class="uk-width-expand@s">
                            <label class="uk-form-label" for="email">
                                メールアドレス
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
                <th class="uk-width-auto">
                    @include("components.part.sorter", ["order" => "created_at", "label" => "登録日", "params" => $params])
                </th>
                <th class="uk-width-auto">
                    @include("components.part.sorter", ["order" => "company_name", "label" => "会社名", "params" => $params])
                </th>
                <th class="uk-width-auto">
                    @include("components.part.sorter", ["order" => "email", "label" => "メールアドレス", "params" => $params])
                </th>
                <th class="uk-table-expand">
                    住所
                </th>
                <th class="uk-table-shirink">
                    操作
                </th>
            </tr>
        </thead>
        <tbody>
            @foreach ($providers as $provider)
            <tr>
                <td>
                    <div class="uk-width-small">
                       @date($provider->created_at)
                    </div>
                </td>
                <td>
                    <div class="uk-width-small">
                       {{$provider->company_name}}
                    </div>
                </td>
                <td>
                    <div class="uk-width-small">
                       {{$provider->email}}
                    </div>
                </td>
                <td>
                    {{$provider->address}}
                </td>
                <td>
                    <span class="uk-margin-small-right">
                        <button class="uk-icon-button" uk-icon="icon: file-edit" href="#edit-modal_{{$provider->id}}" uk-toggle>
                        </button>
                        <div id="edit-modal_{{$provider->id}}" uk-modal>
                            <div class="uk-modal-dialog">
                                <button class="uk-modal-close-default" type="button" uk-close></button>
                                <div class="uk-modal-header">
                                    <h2 class="uk-modal-title">店舗の編集</h2>
                                </div>
                                <form class="form-horizontal" method="POST" action="{{ route('admin.providers.edit', ['provider' => $provider]) }}">
                                    {{ csrf_field() }}
                                    <div class="uk-modal-body" uk-overflow-auto>
                                        @include('components.editor.provider', [
                                            'provider' => $provider, 
                                            'form'=>'basic_only',
                                        ])
                                    </div>
                                    <div class="uk-modal-footer uk-text-right">
                                        <a class="uk-button uk-button-default uk-modal-close">キャンセル</a>
                                        <button class="uk-button uk-button-primary" type="submit">保存</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </span>
                    <span class="uk-margin-small-right">
                        <button class="uk-icon-button" uk-icon="icon: lock" href="#edit-password-modal_{{$provider->id}}" uk-toggle>
                        </button>
                        <div id="edit-password-modal_{{$provider->id}}" uk-modal>
                            <div class="uk-modal-dialog">
                                <button class="uk-modal-close-default" type="button" uk-close></button>
                                <div class="uk-modal-header">
                                    <h2 class="uk-modal-title">パスワードの再設定</h2>
                                </div>
                                <form class="form-horizontal" method="POST" action="{{ route('admin.providers.pass', ['provider' => $provider]) }}">
                                    {{ csrf_field() }}
                                    <div class="uk-modal-body" uk-overflow-auto>
                                        @include('components.editor.provider', [
                                            'provider' => $provider, 
                                            'form'=>'pass_only',
                                        ])
                                    </div>
                                    <div class="uk-modal-footer uk-text-right">
                                        <a class="uk-button uk-button-default uk-modal-close">キャンセル</a>
                                        <button class="uk-button uk-button-primary" type="submit">保存</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </span>
                    <span class="uk-margin-small-right">
                        <form class="uk-display-inline-block" method="POST" action="{{ route('admin.providers.delete', ['provider' => $provider]) }}" onSubmit="confirmDelete(event)">
                            {{ csrf_field() }}
                            <button class="uk-icon-button uk-button-danger" uk-icon="icon: trash">
                            </button>
                        </form>
                    </span>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
<div class="uk-margin">
    {{ $providers->appends(isset($params)? $params: [])->links() }}
</div>


<div id="add-modal" uk-modal>
    <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
            <h2 class="uk-modal-title">店舗の新規追加</h2>
        </div>
        <form class="form-horizontal" method="POST" action="{{ route('admin.providers.add') }}">
            {{ csrf_field() }}
            <div class="uk-modal-body" uk-overflow-auto>
                @component('components.editor.provider')
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