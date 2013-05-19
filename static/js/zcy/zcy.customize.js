(function(zcy, $) {
    if (typeof $ == 'undefined') {
        alert('Internal scripting error:\n\nNo jQuery detected.\nDropdown cannot be loaded.');
        return;
    }
    if (typeof zcy == 'undefined') {
        alert('Internal scripting error:\n\nNo zcyFW detected.\nDropdown cannot be loaded.');
        return;
    }
    
    zcy.add('customize._.assignedNames', {});
    zcy.add('customize._.assignedShortcuts', {});
    zcy.add('customize', function(name, callback, dom, _shortcut) {
        // If dom is provided but shortcut is not provided, an arbitrary shortkey is assigned. 
        // ^ To be implemented
        $dom = dom instanceof jQuery ? dom : $(dom);
        var _ = zcy.customize._.assignedNames[name] = {callback: callback, ison: false, dom: $dom};
        $dom.css('padding-right', '88px').bind('mousedown', function() {
            var _obj = zcy.customize._.assignedNames[name];
            _obj.ison = !_obj.ison;
            _obj.ison ? _obj.dom.addClass('selected') : _obj.dom.removeClass('selected');
            setTimeout(function() {_obj.callback(_obj.ison)}, 1);
            return false;
        }).append('<span>' + _shortcut + '</span>');
        shortcut.add(_shortcut, function() {
            var _obj = zcy.customize._.assignedNames[name];
            _obj.ison = !_obj.ison;
            _obj.ison ? _obj.dom.addClass('selected') : _obj.dom.removeClass('selected');
            _obj.callback(_obj.ison);
        });
    });
    
})(zcy, jQuery)