@extends('layouts.admin')

@section('content')

<div class="uk-section uk-section-default">
    <div class="uk-container">

        <div uk-grid class="uk-flex-center">
            <div class="uk-width-large@s">
                <form class="form-horizontal" method="POST" action="{{ route('admin.login') }}">
                    {{ csrf_field() }}
                    <div class="uk-card uk-card-default uk-card-body">
                        <div class="uk-margin">
                            <h1 class="uk-margin-small uk-text-center">
                                tamate baco
                            </h1>
                            <h4 class="uk-margin-small uk-text-center">
                                管理者ログイン
                            </h4>
                        </div>
                        <div class="uk-margin">
                            <label class="uk-form-label" for="email">
                                メールアドレス
                            </label>
                            <div class="uk-form-controls">
                                <input class="uk-input" id="email
                                " type="email" name="email" required>
                            </div>
                        </div>
                        <div class="uk-margin">
                            <label class="uk-form-label" for="password">
                                パスワード
                            </label>
                            <div class="uk-form-controls">
                                <input class="uk-input" id="password
                                " type="password" name="password" required>
                            </div>
                        </div>
                        <div class="uk-margin">
                            <button class="uk-button uk-button-primary uk-width-1-1" type="submit">
                                ログイン
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection
