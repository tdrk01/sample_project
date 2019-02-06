@inject("boxService", "App\Services\BoxService")

<select class="uk-select" 
    name="{{isset($name) ? $name: 'contact_type_id'}}" {{isset($required) && $required ? "required": null}} {{ isset($onChange) ? "onChange=".$onChange."(event)" : null }} >
    <option value>選択してください</option>
    @foreach ($boxService->getAll() as $option)

        @if(isset($value) && $value==$option->id )
            <option value="{{$option->id}}" selected>
                {{$option->name}}
            </option>
        @else
            <option value="{{$option->id}}">
                {{$option->name}}
            </option>
        @endif

    @endforeach
</select>