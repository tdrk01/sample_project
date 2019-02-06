<div class="uk-card uk-card-default uk-card-small uk-card-body">
    <h4>
        メニュー
    </h4>
    <ul class="uk-nav-default uk-nav-parent-icon" uk-nav="multiple: true">
        <li>
            <a href="{{route('admin.view')}}">
                <span uk-icon="icon: home"></span>
                ダッシュボード
            </a>
        </li>
        <li>
            <a href="{{route('admin.providers.index')}}">
                <span uk-icon="icon: users"></span>
                コンテンツ提供者の管理
            </a>
        </li>
        <li>
            <a href="{{route('admin.contents.index')}}">
                <span uk-icon="icon: copy"></span>
                コンテンツの管理
            </a>
        </li>
    </ul>
</div>