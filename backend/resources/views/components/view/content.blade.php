<div class="uk-card uk-card-default">
    <div uk-grid>
        <div class="uk-width-small@s">
            <div class="uk-grid-small" uk-grid>
                @foreach( $content->contentImages as $key => $contentImage )
                @if($key == 0)
                <div class="uk-width-1-1">
                    <div class="uk-height-medium uk-image-wrapper">
                        <img src="{{ $contentImage->image }}" />
                    </div>
                </div>
                @else
                <div class="uk-width-1-2">
                    <div class="uk-height-small uk-image-wrapper">
                        <img src="{{ $contentImage->image }}" />
                    </div>
                </div>
                @endif
                @endforeach
            </div>
        </div>
        <div class="uk-width-expand uk-card-body">
        </div>
    </div>
</div>