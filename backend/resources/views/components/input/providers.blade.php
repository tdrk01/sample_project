@inject("providerService", "App\Services\ProviderService")

<select class="uk-select" 
    name="{{isset($name) ? $name: 'contact_type_id'}}" {{isset($required) && $required ? "required": null}}>
    <option value>選択してください</option>
    @foreach ($providerService->getAll() as $option)

        @if(isset($value) && $value==$option->id )
            <option value="{{$option->id}}" selected>
                {{$option->company_name}}
            </option>
        @else
            <option value="{{$option->id}}">
                {{$option->company_name}}
            </option>
        @endif

    @endforeach
</select>