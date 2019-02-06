@php
$linkParam = isset($params) ? $params : [];
if(isset($linkParam["order"])&&$linkParam["order"] == $order){
    $sorted = !isset($params["sort"]) || $params["sort"] == "asc" ? "order_asc": "order_desc";
}else{
    $sorted = null;    
}
$linkParam["order"] = isset($order) ? $order: "id"; 
$linkParam["sort"] = !isset($params["sort"]) || $params["sort"] == "desc" ? "asc": "desc";
@endphp
<a class="uk-display-block {{$sorted}}" href="?{{http_build_query($linkParam)}}">
   {{$label}}
</a>