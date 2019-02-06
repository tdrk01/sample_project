<footer class="uk-section uk-section-secondary uk-section-large">
    <div class="uk-container">
        <div class="uk-margin uk-text-center">
            <a class="uk-margin-right uk-margin-left" href="{{route('root.index')}}">
                トップページ
            </a>
            <a target="_blank" class="uk-margin-right uk-margin-left" href="{{route('provider.term')}}">
                事業者向け利用規約
            </a>
            <a target="_blank" class="uk-margin-right uk-margin-left" href="{{route('root.term')}}">
                一般ユーザー向け利用規約
            </a>
            <a target="_blank" class="uk-margin-right uk-margin-left" href="{{route('root.privacy')}}">
                プライバシーポリシー
            </a>
            <a target="_blank" class="uk-margin-right uk-margin-left" href="{{route('root.contact')}}">
                お問い合わせ
            </a>
            <a target="_blank" class="uk-margin-right uk-margin-left" href="{{route('root.company')}}">
                会社情報
            </a>
        </div>
        <p class="uk-text-center">
            <small>
                © {{ config('app.name') }}
            </small>
        </p>
    </div>
</footer>