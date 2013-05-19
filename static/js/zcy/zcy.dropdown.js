(function(zcy, $) {
    if (typeof $ == 'undefined') {
        alert('Internal scripting error:\n\nNo jQuery detected.\nDropdown cannot be loaded.');
        return;
    }
    if (typeof zcy == 'undefined') {
        alert('Internal scripting error:\n\nNo zcyFW detected.\nDropdown cannot be loaded.');
        return;
    }
    
    zcy.add('controls.dropdown.render', function(element) {
        $element = element instanceof $ ? element : $(element);
        $element.attr('tabindex', 0);
        $element.focusout(function(e) {
            $(this).find('ul').css('display', 'none');
            $(this).find('button').removeClass('zcy-dropdown-active');
            e.stopPropagation();
        });
        $element.find('button').bind('click', function(e) {
            if ($(this).hasClass('zcy-dropdown-active')) {
                // Deactivate this button
                $(this).focusout();
                return;
            }
            $(this).addClass('zcy-dropdown-active').parent().find('ul').css('display', 'block');
            e.stopPropagation();
        }).hover(function(e) {
            $(this).toggleClass('zcy-dropdown-button-hover', true);
        }, function(e) {
            $(this).toggleClass('zcy-dropdown-button-hover', false);
        });
    });
    
    $(document).ready(function() {
        $.each($('div.zcy-dropdown'), function() {
            zcy.controls.dropdown.render(this);
        });
    });

})(zcy, jQuery)