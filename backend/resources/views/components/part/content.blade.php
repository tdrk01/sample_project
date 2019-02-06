<div class="uk-display-block uk-reset-link uk-card uk-card-default uk-height-medium uk-image-wrapper uk-position-relative">
    <img src="{{ 
        $content->contentImages->first() != null ?
        $content->contentImages->first()->image : route('noimage')
     }}" />

     <div class="uk-position-bottom uk-card-body uk-overlay-default uk-grid-small uk-flex-middle" uk-grid>
        <div class="uk-width-expand">
            <h3 class="uk-overflow-hidden">
                {{ $content->name }}
            </h3>
        </div>
        <div class="uk-width-auto">
            <a class="uk-icon-button uk-margin-small-right" uk-icon="icon: file-edit" href="{{route('provider.contents.edit', [ 'content' => $content ])}}">
            </a>
            <a class="uk-icon-button" target="_blank" uk-icon="icon: search" href="{{webRoute('contents.preview', [
                'hash' => $content->hash
            ])}}">
            </a>
        </div>
     </div>

</div>