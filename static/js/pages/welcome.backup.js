// Load Galleries

(function(zcy, $) {
    $.ajaxSetup({cache: false}); // For IE
    // Gallery loader
    $(document).ready(function() {
        var availableGalleries = [
            {
                name: 'events',
                show: true,
                shortcut: 'Ctrl+1'
            }, {
                name: 'votes',
                show: false,
                shortcut: 'Ctrl+2'
            }, {
                name: 'projects',
                show: true,
                shortcut: 'Ctrl+3'
            }, {
                name: 'test',
                show: false,
                shortcut: 'Ctrl+T'
            }
        ];
        var $menu = $('.feed-menu');
        var zcycustomize = zcy.customize;
        var zcygallery = zcy.gallery;
        var registerLoad = []; for (var i = 0; i < availableGalleries.length; registerLoad.push(0), i++);
        
        var loadedGalleries = {};
        var domReference = {};
        
        var register = function(gallery, ison, i) {
            var $menuitem = $('<li>' + loadedGalleries[gallery].displayName + '</li>');
            var insertAfter = 0;
            for (var j = 0; j < i; j++) {
                insertAfter += registerLoad[j];
            }
            if (insertAfter == 0) {
                $menu.prepend($menuitem);
            } else {
                $child = $menu.children(':first');
                while (--insertAfter > 0) {
                    $child = $child.next();
                }
                $child.after($menuitem);
            }
            zcy.customize(gallery, function(ison) {
                toggle(gallery, ison);
            }, $menuitem, ison, availableGalleries[i].shortcut);
            registerLoad[i] = 1;
        }
        
        var itemLoader = function(gallery, index) {
            var colors = [
                '#a4c400', '#60a917', '#008a00', '#00aba9',
                '#1ba1e2', '#0050ef', '#6a00ff', '#aa00ff',
                '#fa72d0', '#d80073', '#a20025', '#e51400',
                '#fa6800', '#f0a30a', '#e3c800', '#825a2c',
                '#6d8764', '#647687', '#76608a', '#87794e']
            var items = loadedGalleries[gallery].items;
            if (index < items.length) {
                return {
                    status: zcy.gallery.status.LOAD_SUCCEED,
                    dom: '<div class="zcy-gallery-item" style="background-color: ' + colors[Math.floor(Math.random() * colors.length)] + ';">' + 
                    items[index] + 
                    '</div>'
                };
            } else {
                return {status: zcy.gallery.status.LOAD_END};
            }
        }
        var itemClicked = function(gallery, index) {
            alert('Item ' + index + '@' + gallery + ' was clicked.');
        }
        var toggle = function(gallery, show) {
            if (!domReference[gallery] == !show) return; // Status matches
            if (show) {
                var title = loadedGalleries[gallery].displayName;
                var $child = $('<div></div>');
                var $parent = $('<div class="zcy-gallery-item-wrapper">' + 
                    '<p>' + title + '</p>' + 
                    '</div>');
                domReference[gallery] = $parent;
                    
                $parent.append($child);
                
                $parent.animate({'opacity': 0}, 0).prependTo('div.zcy-gallery-list');
                
                // Render current gallery
                zcygallery($child, function(index) { // Item loader
                    return itemLoader(gallery, index);
                }, function(index) { // Click handler
                    return itemClicked(gallery, index);
                });
                $parent.hide().slideDown('fast').animate({'left': -48, 'top': -4}, 0).animate({'opacity': 1, 'left': 0, 'top': 0}, 400);
            } else {
                domReference[gallery].fadeTo(200, 0).slideUp(function() {$(this).remove()});
                domReference[gallery] = undefined;
            }
        }
        
        var loader = function(gallery, show, i) {
            setTimeout(function() {
                $.getJSON('/gallery/' + gallery + '/less', function(data) {
                    if (data.succeed) {
                        // If successfully loaded
                        // ^ Save data to data object
                        loadedGalleries[gallery] = data.result;
                        if (show) {
                            // ^ Add menu and register access key
                            register(gallery, true, i);
                        } else {
                            register(gallery, false, i);
                        }
                    }
                });
            }, 1);
        }
        
        var load = function() {
            var keys = [], key, delayed = [];
            (function() {
                var length = availableGalleries.length, i = 0;
                while (i < length) {
                    this.push(availableGalleries[i].name);
                    i++;
                }
            }).call(keys);
            
            var i = 0;
            while (key = keys.shift()) {
                if (!availableGalleries[i].show) {
                    delayed.push([key, i]);
                    i++;
                    continue;
                }
                loader(key, true, i);
                i++;
            }
            while (keyV = delayed.shift()) {
                loader(keyV[0], false, keyV[1]);
            }
        }
        
        load();
    });
})(zcy, jQuery);