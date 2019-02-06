<div class="uk-card uk-card-default uk-card-small uk-card-body">
    <h4>
        メニュー
    </h4>
    <ul class="uk-nav-default uk-nav-parent-icon" uk-nav="multiple: true">
        <li>
            <a href="{{route('provider.view')}}">
                <span uk-icon="icon: menu"></span>
                ダッシュボード
            </a>
        </li>
        <li>
            <a href="{{route('provider.contents.index')}}">
                <span uk-icon="icon: copy"></span>
                コンテンツの管理
            </a>
        </li>
        <li>
            <a href="{{route('provider.edit')}}">
                <span uk-icon="icon: cog"></span>
                設定
            </a>
        </li>
    </ul>
</div>