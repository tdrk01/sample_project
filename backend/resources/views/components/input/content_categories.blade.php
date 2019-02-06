@inject("contentCategoryService", "App\Services\ContentCategoryService")

<select class="uk-select" 
    name="{{isset($name) ? $name: 'contact_type_id'}}" {{isset($required) && $required ? "required": null}}>
    <option value>選択してください</option>
    @foreach ($contentCategoryService->getAll() as $option)

        @if(isset($value) && $value==$option->id )
            <option value="{{$option->id}}" selected>
                {{$option->label}}
            </option>
        @else
            <option value="{{$option->id}}">
                {{$option->label}}
            </option>
        @endif

    @endforeach
</select>