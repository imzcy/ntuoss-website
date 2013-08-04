(function($, zcy) {

    if (typeof $ == 'undefined' || typeof zcy == 'undefined') return;
    
    var status = {
        IDLE: 0,
        HOVER: 1, 
        ACTIVE: 2
    }
    
    var click = function(e) {
        if (e.target.nodeName == 'li') {
            $(e.target).closest('div.dropdown').blur();
        }
    }
    
    var blur = function($e, force) {
        if (force || $e.find('*:focus').length == 0) {
            $e.removeClass('zcy-dropdown-active').removeClass('zcy-dropdown-mousedown');
        }
    }

    var dropdown = function(i, e) {
        var data = {};
        data.$e = e instanceof $ ? e : $(e);
        data.$e.find('a').bind('click', function() {
            data.$e.addClass('zcy-dropdown-active');
        }).bind('mousedown', function() {
            data.$e.addClass('zcy-dropdown-mousedown');
            data.isdown = true;
        })
        $('body').bind('mouseup', function() {
            if (data.isdown) {
                data.$e.removeClass('zcy-dropdown-mousedown');
                data.isdown = false;
            }
        });
        data.$e.attr('tabindex', 0);
        data.$e.bind('blur', function() { // For Chrome, FF
            blur(data.$e);
        }).find('*').bind('blur', function() { // For IE
            blur(data.$e);
        });
        data.$e.addClass('zcy-dropdown-initialized');
        data.$e.find('li').bind('click', function() {
            blur(data.$e, true);
        });
    }
    
    zcy.add('dropdown', dropdown);
})(jQuery, zcy)

$(document).ready(function() {
    $.each($('div.zcy-dropdown'), zcy.dropdown);
});