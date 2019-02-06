@if ( !isset($form) || $form != "pass_only")

<div class="uk-margin-small uk-grid-small" uk-grid>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="company_name">
            会社名/屋号など
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="text" name="company_name" required value="{{old('company_name', isset($provider) ? $provider->company_name: null )}}">
        </div>
    </div>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="email">
            メールアドレス
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="email" name="email" required value="{{old('email', isset($provider) ? $provider->email: null )}}">
        </div>
    </div>
    <div class="uk-width-1-1">
        <label class="uk-form-label" for="address">
            住所
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="text" name="address"  value="{{old('address', isset($provider) ? $provider->address: null )}}">
        </div>
    </div>
</div>
@endif

@if ( !isset($form) || $form != "basic_only")
<div class="uk-margin-small uk-grid-small" uk-grid>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="password">
            パスワード
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="password" name="password" required>
        </div>
    </div>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="password_confirmation">
            パスワードの確認
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="password" name="password_confirmation" required>
        </div>
    </div>    
</div>
@endif