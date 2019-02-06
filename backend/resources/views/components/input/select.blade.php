<select class="uk-select" 
    name="{{isset($name) ? $name: 'contact_type_id'}}" {{isset($required) && $required ? "required": null}}>
    <option value>選択してください</option>
    @foreach ($options as $key => $option)

        @if(isset($value) && $option == $value )
            <option value="{{$option}}" selected>
                {{$key}}
            </option>
        @else
            <option value="{{$option}}">
                {{$key}}
            </option>
        @endif

    @endforeach
</select>