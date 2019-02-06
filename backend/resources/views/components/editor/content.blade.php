@inject("boxService", "App\Services\BoxService")

@if ( !isset($form) || $form != "admin_only")

<div class="uk-margin-small uk-grid-small" uk-grid>

    <div class="uk-width-1-1@s">
        <label class="uk-form-label" for="title">
            タイトル
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="text" name="title" required value="{{old('title', isset($content) ? $content->title: null )}}">
        </div>
    </div>

    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="name">
            コンテンツ名
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="text" name="name" required value="{{old('name', isset($content) ? $content->name: null )}}">
        </div>
    </div>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="number">
            利用人数(ペアチケット・3人チケットなど)
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="text" name="number" required value="{{old('number', isset($content) ? $content->number: null )}}">
        </div>
    </div>

    <div class="uk-width-1-1@s">
        <label class="uk-form-label" for="description">
            概要(100字以上)
        </label>
        <div class="uk-form-controls">
            <textarea class="uk-textarea uk-height-small" name="description" required>{{old('description', isset($content) ? $content->description: null )}}</textarea>
        </div>
    </div>

    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="summary">
            体験のサマリ
        </label>
        <div class="uk-form-controls">
            <textarea class="uk-textarea uk-height-small" name="summary" required>{{old('summary', isset($content) ? $content->summary: null )}}</textarea>
        </div>
    </div>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="reserve_way">
            予約方法
        </label>
        <div class="uk-form-controls">
            <textarea class="uk-textarea uk-height-small" name="reserve_way" required>{{old('reserve_way', isset($content) ? $content->reserve_way: null )}}</textarea>
        </div>
    </div>


    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="address">
            コンテンツを実施する住所
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="text" name="address" required value="{{old('address', isset($content) ? $content->address: null )}}">
        </div>
    </div>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="access">
            アクセス方法
        </label>
        <div class="uk-form-controls">
            <textarea class="uk-textarea uk-height-small" name="access" required>{{old('access', isset($content) ? $content->access: null )}}</textarea>
        </div>
    </div>

</div>
<hr />
<div class="uk-margin-small uk-grid-small" uk-grid>

    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="length">
            所要時間
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="text" name="length" required value="{{old('length', isset($content) ? $content->length: null )}}">
        </div>
    </div>

    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="tools">
            必要なもの
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="text" name="tools" required value="{{old('tools', isset($content) ? $content->tools: null )}}">
        </div>
    </div>

    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="tel">
            電話番号
            ※電話番号もしくはメールアドレスのどちらかが必須です
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="text" name="tel" value="{{old('tel', isset($content) ? $content->tel: null )}}">
        </div>
    </div>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="email">
            メールアドレス ※電話番号もしくはメールアドレスのどちらかが必須です
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="email" name="email" value="{{old('email', isset($content) ? $content->email: null )}}">
        </div>
    </div>

    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="link_url">
            詳細ページへのリンクURL
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="text" name="link_url" required value="{{old('link_url', isset($content) ? $content->link_url: null )}}">
        </div>
    </div>

</div>

@else

<div class="uk-margin-small uk-grid-small" uk-grid>
    <div class="uk-width-1-3@s">
        <label class="uk-form-label" for="box_id">
            tamate baco
        </label>
        <div class="uk-form-controls">
            @include("components.input.boxes", [
                "name" => "box_id",
                "value" => old('box_id', isset($content) ? $content->box_id: null ),
                "onChange" => "onChange"
            ])
        </div>
    </div>
    <div class="uk-width-1-3@s">
        <label class="uk-form-label" for="reserve_type">
            予約タイプ
        </label>
        <div class="uk-form-controls">
            @include("components.input.reserve_type", [
                "value" => old('reserve_type', isset($content) ? $content->reserve_type: 0 ),
            ])
        </div>
    </div>
    <div class="uk-width-1-3@s">
        <label class="uk-form-label" for="link_url">
            カテゴリ
        </label>
        <div class="uk-form-controls">
            @include("components.input.content_categories", [
                "name" => "content_category_id",
                "value" => old('content_category_id', isset($content) ? $content->content_category_id: null )
            ])
        </div>
    </div>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="link_url">
            コンテンツ提供者
        </label>
        <div class="uk-form-controls">
            @include("components.input.providers", [
                "name" => "provider_id",
                "value" => old('provider_id', isset($content) ? $content->provider_id: null )
            ])
        </div>
    </div>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="price">
            コンテンツ価格
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="number" name="price" required value="{{old('price', isset($content) ? $content->price: 0 )}}">
        </div>
    </div>
</div>

<script type="text/javascript">
var onChange = function(event) {
    pull(event.target.value);
}
var pull = function(boxId) {
    axios.get("{{route('api.boxes.index')}}/"+boxId+"/sum").then( function( res ){
        $('#sum_rate').each(function(index, el) {
            $(el).text('合計値:'+res.data.data.sum);
        });
    }).catch( function(error) {
        console.log(error);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    var boxId = {{old('box_id', isset($content) ? $content->box_id: null )}};
    if( boxId != null){
        pull(boxId);    
    }
});
</script>

@if ( !isset($is_add) || !$is_add )

<div class="uk-margin-small uk-grid-small" uk-grid>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="win_rate">
            当たりレート(初期値1)
        </label>
        <small id="sum_rate"></small>
        <div class="uk-form-controls">
            <input class="uk-input" type="number" name="win_rate" required value="{{old('win_rate', isset($content) ? $content->win_rate: 1 )}}">
        </div>
    </div>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="link_url">
            例として画面に表示
        </label>
        <div class="uk-form-controls">
            @include("components.input.select", [
                "name" => "display_priority",
                "value" => old('display_priority', isset($content) ? $content->display_priority: null ),
                "options" => [
                    "非表示" => App\Models\Content::NOT_SHOW,
                    "表示" => App\Models\Content::SHOW
                ]
            ])
        </div>
    </div>
</div>

<div class="uk-margin-small uk-grid-small" uk-grid>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="expired_at">
            チケットの利用期限
        </label>
        <div class="uk-form-controls">
            <input class="uk-input datepicker" type="text" name="expired_at" value="{{old('expired_at', isset($content) ? $content->expired_at: null )}}">
        </div>
    </div>
    <div class="uk-width-1-2@s">
        <label class="uk-form-label" for="link_url">
            チケットが有効な日数
        </label>
        <div class="uk-form-controls">
            <input class="uk-input" type="number" name="expired_date" value="{{old('expired_date', isset($content) ? $content->expired_date: null )}}">
        </div>
    </div>
    <div class="uk-width-1-1">
        <div class="uk-alert">
            <p>
                利用期限と有効な日数のうち、期限が近い方が優先して適用されます。
            </p>
        </div>
    </div>
</div>

@endif

@endif