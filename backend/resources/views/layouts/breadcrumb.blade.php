<div class="uk-section">
    <div class="uk-container">
        <ul class="uk-breadcrumb">
            @foreach( $pages as $page )
            @if( isset($page["url"]) && $page["url"] != null )
            <li>
                <a href="{{ $page["url"] }}">
                    {{ $page["title"] }}
                </a>
            </li>
            @else
            <li class="uk-disabled"><a>{{ $page["title"] }}</a></li>
            @endif
            @endforeach
        </ul>
    </div>
</div>