@switch($value)
@case ( \App\Models\Content::DO_SELF )
  自分で予約型
  @break
@case ( \App\Models\Content::SEND )
  商品送付型
  @break
@case ( \App\Models\Content::BY_TODOROKI )
  TODOROKIで予約型
  @break
@endswitch