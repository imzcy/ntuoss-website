(function(zcy, $) {     // Console
    var console = function(dom) {
        var $dom = dom instanceof jQuery ? dom : $(dom);
        var lastCursor = {$dom: undefined, timer: undefined};
        var showPrompt = function() {
            $dom.append('<div class="command">[ntuoss@ntuoss ~]$ <a class="command"></a></div>');
        }
        var removeCursor = function() {
            if (lastCursor.$dom) {
                clearInterval(lastCursor.timer);
                lastCursor.$dom.empty();
            }
        }
        var blinkCursor = function() {
            var $cursorPos = $dom.find('div.command').last().find('a.command');
            var lastStatus = {a: false};
            lastCursor.$dom = $cursorPos;
            lastCursor.timer = setInterval( function() {
                lastStatus.a = !lastStatus.a;
                if (lastStatus.a) {
                    $cursorPos.html('&#9608;');
                } else {
                    $cursorPos.empty();
                }
            }, 500);
        }
        this.print = function(command, html) {
            removeCursor();
            $dom.find('div.command').last().find('a.command').html(command);
            $dom.append('<div>' + html + '</div>');
            $dom.animate({
                scrollTop: $dom[0].scrollHeight
            }, 'fast');
            showPrompt();
            blinkCursor();
        }
        
        showPrompt();
        blinkCursor();
    }
    
    zcy.add('console', console);
})(zcy, jQuery);

(function(zcy, $) {     // Exec
    var exec = function(command, param) {
        switch(command)
        {
            case 'whoarewe':
                return "Who are we?";
                break;
            case 'whatwedo':
                return "What we do?";
                break;
            default:
                return "-bash: " + command + ": command not found";
        }
    }
    
    zcy.add('exec', exec);
})(zcy, jQuery);

(function(zcy, $) {
    $(document).ready(function() {
        var console = new zcy.console('div.console');
        var exec = zcy.exec;
        
        $('input.console-input').keydown(function(event) {
            if (event.which == 13) {
                location.hash = $(this).val();
                $(this).val('');
                return false;
            } else {
                return true;
            }
        }).focus();
        
        $('input.console-input-enter').click(function(event) {
            location.hash = $('input.console-input').val();
            $('input.console-input').val('');
        });
        
        $(window).hashchange(function() {
            var command = location.hash.substring(1);
            if (command) {
                console.print(command, exec(command));
            }
        });
        
        $(window).hashchange();
    });
})(zcy, jQuery);