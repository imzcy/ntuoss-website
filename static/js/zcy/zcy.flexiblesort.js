(function(zcy, $, undefined) {
    
    // Bind zcy.alert if possible for displaying 'loading...'
    var alert = zcy.alert || function(){};
    
    zcy.add('flexiblesort', function(dom, loader) {
        var prop = {};
        $dom = dom instanceof jQuery ? dom : $(dom);
        var localdb = undefined;
        
        var loadercallback = function(data) {
            localdb = data;
        }
        
        loader.call(loadercallback);
        // Invoke loader
        
        this.sortby = function(property) {
            
        }
        
        // Do painting
        // Create container
        var width = $dom.innerWidth();
        var height = $dom.innerHeight();
        var eleWidth = 180;
        var eleHeight = 240;
        var wrapper = '<div style="position:relative;margin:0px;padding:0px;"></div>';
        var element = '<div class="zcy-listview-element" style="position:absolute;display:inline-block;*display:inline;height:' + eleHeight + 'px;width:' + eleWidth + 'px;background-color:#eee;margin:24px;">' + 
                    '<div class="zcy-listview-element-preview" style="position:absolute;width:100%;height:100%;"></div>' +
                    '<div class="zcy-listview-element-description" style="position:absolute;opacity:0.8;left:-5%;width: 110%;bottom:15%;padding:5px 0px;color:#eee;box-shadow:2px 2px 4px #666;text-align:center;overflow:hidden;background-color:#333;">Description lorem ipsum zcy</div>' +
                '</div>';
        
        var wrapperDom = $(wrapper);
        var wrapperEle = $(element);
    });
    
})(zcy, jQuery);