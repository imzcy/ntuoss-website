(function($, zcy) {
    /*
     * Exported function
     *  zcy.gallery(dom, SourceFunction, Callback, {item: {width: *, height: *}})
     *    @Dom (DOM_DIV)
     *      Where gallery will be applied to
     *    @SourceFunction (function)
     *      Where the source data can be retrieved, function parameter list is as following
     *      SourceFunction(Index, DetailedInformation)
     *        @Index (int): Index of information
     *        @DetailedInformation (bool): Brief introduction if false, complex data if true
     *        @RETURN (object): {status: zcy.gallery.status.*, dom: dom}
     *    @Callback (function)
     *      Callback(Index)
     *        @Index (int): Index of the block which was clicked
     *    @RETURN (bool)
     *      Return true when gallery succeed applied to target
     */
     
    if (typeof $ == 'undefined') {
        alert('Internal scripting error:\n\nNo $ detected.\nGallery cannot be loaded.');
        return;
    }
    if (typeof zcy == 'undefined') {
        alert('Internal scripting error:\n\nNo zcyFW detected.\nGallery cannot be loaded.');
        return;
    }
    
    var LOAD_SUCCEED = 0;
    var LOAD_WAIT = 1;
    var LOAD_END = 2;
    zcy.add('gallery.status.LOAD_SUCCEED', LOAD_SUCCEED);
    zcy.add('gallery.status.LOAD_WAIT', LOAD_WAIT);
    zcy.add('gallery.status.LOAD_END', LOAD_END);
    
    zcy.add('gallery.resize.list', []);
    $(window).bind('resize', function() {
        var resizecall = zcy.gallery.resize.list;
        for (var i = 0; i < resizecall.length; i++) {
            resizecall[i]();
        }
    });
    zcy.add('gallery.resize', function(func) {
        zcy.gallery.resize.list.push(func);
    });
    
    var gallery = function(dom, sourceFunction, callback, params) {
        // Parameter validation
        var $dom = dom instanceof $ ? dom : $(dom);
        dom = $dom[0];
        if (typeof sourceFunction !== 'function') {
            alert('A valid function is not provided.');
            return false;
        }
        params = (typeof params == 'undefined') ? {item: {width: 176, height: 176}, debug: false} : params;
        var debug = params.debug;
        var itemWidth = params.item.width;
        var itemHeight = params.item.height;
        
        // Data container
        var data = {}
        data.offset = 0; // Read-Write required
        data.elements = [];
        data.nextLeftElement = -1;
        data.nextRightElement = 0;
        data.lengthLeft = 0;
        data.lengthRight = 0;
        data.lastDragPos = 0;
        data.previousWidth = 0;
        
        // ##### Mouse Event Handler and Bug Workaround #####
        var mouseevent = function(event) {
            if (event.target === dom) {
                if (event.offsetX) {
                    return [event.offsetX, event.offsetY];
                } else {
                    // Firefox bug
                    
                    var targetOffset = $(event.target).closest('div.zcy-gallery').offset();
                    return [event.pageX - targetOffset.left, event.pageY - targetOffset.top];
                }
            }
            var targetOffset = $(event.target).closest('div.zcy-gallery').offset();
            return [event.pageX - targetOffset.left - 2, event.pageY - targetOffset.top - 2];
        }
        var androidbug = function(iScale) {
            // To workaround android chrome (webkit) touch event bug
            // Although I am also not sure whether it is a bug or not
            var sViewport = '<meta name="viewport" content="width=device-width, initial-scale=' + iScale + '">';
            var jViewport = $('meta[name="viewport"]');
            if (jViewport.length > 0) {
                jViewport.replaceWith(sViewport);
            } else {
                $('head').append(sViewport);
            }
        }
        // ^^^^^ Mouse Event Handler and Bug Workaround ^^^^^
        
        // ##### Events Dependency #####
        
        var resize = function(firstrun) {
            stopevent();
            var width = $dom.innerWidth();
            var prevWidth = data.previousWidth;
            
            //console.log('Container width: ' + width);
            
            var expansion = width - prevWidth;
            if (expansion > 0) {
                // Window expands
                var lengthRequiredAtRight = expansion - data.lengthRight;
                if (lengthRequiredAtRight > 0)  {
                    // Try to load elements at the right
                    var elementsRequiredRight = Math.ceil(lengthRequiredAtRight / itemWidth);
                    elementLoader(elementsRequiredRight, false);
                    lengthRequiredAtRight = expansion - data.lengthRight;
                    if (lengthRequiredAtRight > 0) {
                        // Data not enough, just try best to move data to the right
                        if (lengthRequiredAtRight < data.lengthLeft) {
                            // Take from left
                            data.lengthRight += lengthRequiredAtRight;
                            data.lengthLeft -= lengthRequiredAtRight;
                            data.offset += lengthRequiredAtRight;
                        } else {
                            data.lengthRight += data.lengthLeft;
                            data.offset += data.lengthLeft;
                            data.lengthLeft = 0;
                        }
                    }
                }
                data.lengthRight -= expansion;
            } else {
                // Window not change or shrinks
                // Because left didnot change, extra spance goes to lengthRight
                data.lengthRight -= expansion;
            }
            data.previousWidth = width;
            moveElements(0, false);
        }
        var firstChild = function() {
            return data.nextLeftElement;
        }
        var lastChild = function() {
            return data.nextRightElement;
        }
        var elementLoader = function(elementCount, leftDirection) {
            var first = firstChild();
            var last = lastChild();
            var lastStatus = LOAD_END;
            if (leftDirection) {
                for (var i = 0; i < elementCount; i++) {
                    var nextInt = first - i;
                    if (nextInt < 0) {
                        break;
                    }
                    var extRet = sourceFunction(nextInt, false);
                    lastStatus = extRet.status;
                    if (lastStatus != LOAD_SUCCEED) {
                        break;
                    }
                    var $retDom = extRet.dom instanceof $ ? extRet.dom : $(extRet.dom);
                    $dom.prepend($retDom.addClass('zcy-gallery-item'));
                    data.elements.unshift({index: nextInt, dom: $retDom});
                    data.lengthLeft += itemWidth;
                    data.nextLeftElement --;
                }
            } else {
                for (var i = 0; i < elementCount; i++) {
                    var nextInt = last + i;
                    if (nextInt < 0) {
                        break;
                    }
                    var extRet = sourceFunction(nextInt, false);
                    lastStatus = extRet.status;
                    if (lastStatus != LOAD_SUCCEED) {
                        break;
                    }
                    var $retDom = extRet.dom instanceof $ ? extRet.dom : $(extRet.dom);
                    $dom.append($retDom.addClass('zcy-gallery-item'));
                    data.elements.push({index: nextInt, dom: $retDom});
                    data.lengthRight += itemWidth;
                    data.nextRightElement ++;
                }
            }
            return lastStatus;
        }
        var trimElements = function() {
            var extraLeft = Math.floor(data.lengthLeft / itemWidth) - 5;
            if (extraLeft > 0) {
                $dom.children('.zcy-gallery-item').slice(0, extraLeft).remove();
                data.elements = data.elements.slice(extraLeft, data.elements.length);
                data.lengthLeft -= extraLeft * itemWidth;
                data.nextLeftElement += extraLeft;
                //console.log('Extra elements at left removed: ' + extraLeft);
            }
            var extraRight = Math.floor(data.lengthRight / itemWidth) - 5;
            if (extraRight > 0) {
                $dom.children('.zcy-gallery-item').slice(data.elements.length - extraRight, data.elements.length).remove();
                data.elements = data.elements.slice(0, data.elements.length - extraRight);
                data.lengthRight -= extraRight * itemWidth;
                data.nextRightElement -= extraRight;
                //console.log('Extra elements at right removed: ' + extraRight);
            }
        }
        var moveElements = function(offset, endIndicator) {
            data.offset += offset;
            var absOffset = data.offset;
            var elements = data.elements;
            for (var i = 0; i < elements.length; i++) {
                var $element = elements[i].dom;
                var index = elements[i].index;
                $element.css('left', absOffset + index * itemWidth);
            }
            data.lengthLeft -= offset;
            data.lengthRight += offset;
            if (endIndicator) {
                if (endIndicator == -1) {
                    $dom.children('.zcy-gallery-leftmost').stop(true).fadeTo(200, 1, function(){
                        $(this).fadeOut(1000)
                    });
                } else if (endIndicator == 1) {
                    $dom.children('.zcy-gallery-rightmost').stop(true).fadeTo(200, 1, function(){
                        $(this).fadeOut(1000)
                    });
                }
            }
        }
        // ^^^^^ Events Dependency ^^^^^
        
        // ##### Events #####
        var scrollevent = function(speed) {
            stopevent();
            if (Math.abs(speed) < 0.2) {
                return;
            }
            var interval = 30; // milliseconds
            var frames = 50; // Scroll lasts for interval * frames milliseconds
            var func = $.easing.easeOutExpo;
            data.currentFrame = 1;
            data.lastPos = func(0);
            var multiplier = 1 / (func(1 / frames) - data.lastPos);
            var initialSpeed = speed * interval * multiplier;
            data.animationTimer = setInterval(function() {
                //console.log('Current frame: ' + data.currentFrame);
                var curPos = initialSpeed * func(data.currentFrame / frames);
                offset = curPos - data.lastPos;
                data.lastPos = curPos;
                //console.log('Speed: ' + offset);
                if (offset > 0) {;
                    offsetDifference = data.lengthLeft - offset;
                    if (offsetDifference >  0) {
                        // Just move left offset
                        moveElements(offset, false);
                    } else {
                        var elementsRequired = Math.ceil(-offsetDifference / itemWidth);
                        elementLoader(elementsRequired, true);
                        offsetDifference = data.lengthLeft - offset;
                        if (offsetDifference > 0) {
                            // Just move left offset
                            moveElements(offset, false);
                        } else {
                            // Just move data.lengthLeft
                            if (data.lengthLeft > 0) {
                                moveElements(data.lengthLeft, -1);
                            } else {
                                moveElements(0, -1);
                                clearInterval(data.animationTimer);
                            }
                        }
                    }
                } else if (offset < 0) {
                    offset = -offset;
                    offsetDifference = data.lengthRight - offset;
                    if (offsetDifference >  0) {
                        // Just move left offset
                        moveElements(-offset, false);
                    } else {
                        var elementsRequired = Math.ceil(-offsetDifference / itemWidth);
                        elementLoader(elementsRequired, false);
                        offsetDifference = data.lengthRight - offset;
                        if (offsetDifference > 0) {
                            // Just move left offset
                            moveElements(-offset, false);
                        } else {
                            // Just move data.lengthLeft
                            if (data.lengthRight > 0) {
                                moveElements(-data.lengthRight, 1);
                            } else {
                                moveElements(0, 1);
                                clearInterval(data.animationTimer);
                            }
                        }
                    }
                }
                trimElements();
                if (data.currentFrame == frames) {
                    clearInterval(data.animationTimer);
                }
                data.currentFrame += 1;
            }, interval);
            //console.log('Scroll: ' + speed + '@div => ' + this.attr('class'));
        }
        var clickevent = function(position) {
            stopevent();
            //console.log('Click: [' + position.join(', ') + ']@div => ' + this.attr('class'));
            if (data.lengthRight < 0) {
                if (position[0] > (data.previousWidth + data.lengthRight)) {
                    return;
                }
            }
            callback(Math.floor((position[0] - data.offset) / itemWidth));
        }
        var dragevent = function(offsetXY, startdrag) {
            stopevent();
            if (startdrag) {
                data.lastDragPos = offsetXY[0];
                return;
            }
            offset = offsetXY[0] - data.lastDragPos;
            //console.log('Drag: ' + offset + '@div => ' + this.attr('class'));
            data.lastDragPos = offsetXY[0];
            var offsetDifference;
            if (offset > 0) {;
                offsetDifference = data.lengthLeft - offset;
                if (offsetDifference >  0) {
                    // Just move left offset
                    moveElements(offset, false);
                } else {
                    var elementsRequired = Math.ceil(-offsetDifference / itemWidth);
                    elementLoader(elementsRequired, true);
                    offsetDifference = data.lengthLeft - offset;
                    if (offsetDifference > 0) {
                        // Just move left offset
                        moveElements(offset, false);
                    } else {
                        // Just move data.lengthLeft
                        if (data.lengthLeft > 0) {
                            moveElements(data.lengthLeft, -1);
                        } else {
                            moveElements(0, -1);
                        }
                    }
                }
            } else if (offset < 0) {
                offset = -offset;
                offsetDifference = data.lengthRight - offset;
                if (offsetDifference >  0) {
                    // Just move left offset
                    moveElements(-offset, false);
                } else {
                    var elementsRequired = Math.ceil(-offsetDifference / itemWidth);
                    elementLoader(elementsRequired, false);
                    offsetDifference = data.lengthRight - offset;
                    if (offsetDifference > 0) {
                        // Just move left offset
                        moveElements(-offset, false);
                    } else {
                        // Just move data.lengthLeft
                        if (data.lengthRight > 0) {
                            moveElements(-data.lengthRight, 1);
                        } else {
                            moveElements(0, 1);
                        }
                    }
                }
            }
            trimElements();
        }
        var stopevent = function() {
            try {
                clearInterval(data.animationTimer);
            } catch(e) {}
            //console.log('Stop Event');
        }
        // ^^^^^ Events ^^^^^
        
        // ##### Raw Events #####
        var mousedown = function(event) {
            event.preventDefault();
            var offset = mouseevent(event);
            
            // If mousedown detected, stop all animation
            stopevent();
            // Record this action
            data.mousedown = true;
            data.lastpos = {time: (new Date()).getTime(), position: offset};
            data.mousemove = false;
        }
        var mouseup = function(event) {
            event.preventDefault();
            var offset = mouseevent(event);

            data.mousedown = false;
            if (!data.mousemove) {
                // If event not handled by mouse move, treat it as click
                clickevent.call($dom, offset);
            } else {
                // If event last handled by mouse move, treat it as scroll
                var lastpos = data.lastpos;
                var time = (new Date()).getTime();
                var xspeed = (offset[0] - lastpos.position[0]) / (time - lastpos.time);
                
                scrollevent.call($dom, xspeed);
            }
        }
        var mousemove = function(event) {
            event.preventDefault();
            var offset = mouseevent(event);

            // If mousedown, drag
            if (data.mousedown) {
                if (data.mousemove) {
                    dragevent.call($dom, offset);
                } else {
                    dragevent.call($dom, offset, true);
                }
                // Handled by mousemove
                data.mousemove = true;
            }
        }
        
        var touchstart = function(event) {
            event.preventDefault();
            if (event.originalEvent.touches.length > 1) {
                return;
            }
            
            var offset = mouseevent(event.originalEvent.touches[0]);

            // If touchstart detected, stop all animation
            stopevent();
            // If no consequence touchmove occurs, the event is 'click'
            data.touchtimer = setTimeout(function() {
                clickevent.call($dom, offset);
            }, 200);
            data.lastpos = {time: (new Date()).getTime(), position: offset}
            data.touchstart = true;
        }
        var touchmove = function(event) {
            event.preventDefault();
            if (event.originalEvent.touches.length > 1) {
                return;
            }
            
            var offset = mouseevent(event.originalEvent.touches[0]);

            // Cancel the touchstart just now if exists, the event is now 'scroll'
            if (Math.abs(offset[0] < 3)) {
                return;
            } else {
                try {
                    clearTimeout(data.touchtimer);
                } catch(e) {}
            }
            
            var lastpos = data.lastpos;
            var time = (new Date()).getTime();
            var xspeed = (offset[0] - lastpos.position[0]) / (time - lastpos.time);
            if (data.touchstart) {
                // New drag event
                dragevent.call($dom, offset, true);
                data.touchstart = false;
            } else {
                dragevent.call($dom, offset);
            }
            data.lastpos = {time: (new Date()).getTime(), position: offset}
            
            // Clear last scroll timeout
            try {
                clearTimeout(data.scrolltimeout);
            } catch(e) {}
            data.scrolltimeout = setTimeout(function() {
                scrollevent.call($dom, xspeed);
            }, 50);
        }
        var touchend = function(event) {
            // Touch end seems never get triggered
            // So it's better to ignore this event
            event.preventDefault();
            if (event.originalEvent.touches.length > 1) {
                return;
            }
            
            var tevent = mouseevent(event.originalEvent.touches[0]);
        }
        
        // Add a class to identify registered dom
        $dom.addClass('zcy-gallery');
        
        // Bind events
        if ('ontouchend' in document) {
            $dom.bind('touchstart', touchstart);
            $dom.bind('touchmove', touchmove);
            $dom.bind('touchend', touchend);
            
            // Workaround android bug(Is that a bug?) - zcy
            androidbug(1.1);
            androidbug(1);

        } else {
            $dom.bind('mousedown', mousedown);
            $dom.bind('mousemove', mousemove);
            $dom.bind('mouseup', mouseup);
        }
        
        // Call resize to initialize
        resize(true);
        // Register resize handler
        zcy.gallery.resize(resize);
        
        $dom.prepend('<div class="zcy-gallery-leftmost"></div>');
        $dom.append('<div class="zcy-gallery-rightmost"></div>');
    }
    
    zcy.add('gallery', gallery);

})($, zcy)