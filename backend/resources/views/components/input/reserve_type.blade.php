@include("components.input.select", [
  "required" => isset($required) ? $required : true,
  "name" => "reserve_type",
  "value" => isset($value) ? $value : null,
  "options" => [
    "自分で予約型" => \App\Models\Content::DO_SELF,
    "商品送付型" => \App\Models\Content::SEND,
    "TODOROKIで予約型" => \App\Models\Content::BY_TODOROKI
  ]
])