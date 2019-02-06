confirmDelete = function(event, message="本当に削除しますか？"){
    event.preventDefault();
    UIkit.modal.confirm(message).then(function () {
       event.target.submit();
    }, function () {
    });
}


document.addEventListener('DOMContentLoaded', function() {
    
    $(document).on("keypress", "input:not(.allow_submit)", function(event) {
        return event.which !== 13;
    });

    if( jQuery.datetimepicker != null ){
        jQuery.datetimepicker.setLocale('ja');
        $('.datetimepicker').datetimepicker({
            format: 'Y-m-d H:i',
            timepicker: true
        });

        $('.datepicker').datetimepicker({
            format: 'Y-m-d',
            timepicker: false
        });    
    }

    $('*[required]').each(function(index, el) {
        var name =     $(el).attr("name");
        $label = $(el).parents(".uk-form-controls").parent().children('label[for='+name+']');
        $label.append("<small class='uk-text-danger'>※必須</small>" );
    });
});