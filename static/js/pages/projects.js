(function($, zcy) {

    if (typeof $ == 'undefined' || typeof zcy == 'undefined') return;
    
    zcy.add('extend.sortBy', function(s) {
        var tmpName = $(this).html();
        $.getJSON('/projectlist/' + s + '?' + (new Date()).getTime(), function(d) {
            if (d.succeed) {
                if (tmpName)
                $('span.sort-by-label').text(tmpName);
                var data = d.result;
                $('div.zcy-gridview').empty();
                for (var i = 0; i < data.length; i++) {
                    $('div.zcy-gridview').append(
                    '<div class="zcy-gridview-element" style="position:relative;display:inline-block;*display:inline;height:240px;width:180px;background-color:#eee;margin:24px;">' +
                        '<div class="zcy-gridview-element-preview" style="position:absolute;width:100%;height:100%;"></div>' +
                        '<div class="zcy-gridview-element-description" style="position:absolute;opacity:0.8;left:-5%;width: 110%;bottom:15%;padding:5px 0px;color:#eee;box-shadow:2px 2px 4px #666;text-align:center;overflow:hidden;background-color:#333;"><a href="' + data[i].url + '" style="color:#eee;">' + data[i].title + '</a></div>' +
                    '</div>'
                    );
                }
            } else {
                if (zcy.alert) {
                    zcy.alert('Error occured while loading list');
                } else {
                    alert('Error occured while loading list');
                }
            }
        });
    });
    
})(jQuery, zcy);

$(document).ready(function() {
    zcy.extend.sortBy('latest');
});