(function(zcy, $) {

    zcy.add('notification', function() {
        var prop = {};
        var STATUS_HIDDEN = 0;
        var STATUS_FADINGOUT = 1;
        var STATUS_FADINGIN = 2;
        var STATUS_VISIBLE = 3;
        
        prop.status = STATUS_HIDDEN;
        prop.timeout = 0;
        
        var dom = $('<span style="background-color:#1ba1e2;padding:4px 12px;color:#eee;font-size:14;font-family:\'Open Sans\', Arial;z-index:128;box-shadow: 0px 0px 6px #333;"></span>');
        var parent = $('<div style="position:fixed;bottom:15%;height:24px;line-height:1;text-align:center;width:100%;display:none;z-index:128"></div>');
        dom.appendTo(parent);
        parent.appendTo('body');
        
        this.show = function(message) {
            // Change message
            dom.text(message);
            
            switch (prop.status) {
            case STATUS_HIDDEN:
                // Fade in
                prop.status = STATUS_FADINGIN;
                parent.fadeIn(500, function() {
                    prop.status = STATUS_VISIBLE;
                });
                break;
            case STATUS_FADINGOUT:
                parent.stop(true, false);
                // Fade in
                prop.status = STATUS_FADINGIN;
                parent.fadeIn(500, function() {
                    prop.status = STATUS_VISIBLE;
                });
                break;
            case STATUS_FADINGIN:
                prop.status = STATUS_FADINGIN;
                parent.fadeIn(500, function() {
                    prop.status = STATUS_VISIBLE;
                });
                break;
            case STATUS_VISIBLE:
                break;
            }
            try {
                clearTimeout(prop.timeout);
            } catch (e) {}
            prop.timeout = setTimeout(function() {
                prop.status = STATUS_FADINGOUT;
                parent.fadeOut(500, function() {
                    prop.status = STATUS_HIDDEN;
                });
            }, 2000);
        }
    });

})(zcy, jQuery);

$(document).ready(function(){
    zcy.add('alert', (new zcy.notification()).show);
});