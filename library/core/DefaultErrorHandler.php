<?php

function __DefaultErrorHandler($errno, $errstr, $errfile, $errline) {
    echo $errno . "\n";
    echo $errstr . "\n";
    echo $errfile . "\n";
    echo $errline . "\n";
    
    //die();
}

set_error_handler('__DefaultErrorhandler', E_ALL);

// Dummy Function for Loader
function DefaultErrorHandler() {

}

?>