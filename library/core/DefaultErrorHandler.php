<?php

function __DefaultErrorHandler($errno, $errstr, $errfile, $errline) {
    echo '<pre>';
    echo 'Error No.: ' . $errno . "\n";
    echo 'Error Description: ' . $errstr . "\n";
    echo 'Error File: ' . $errfile . "\n";
    echo 'Error Line: ' . $errline . "\n";
    echo '</pre>';
    //die();
}

set_error_handler('__DefaultErrorhandler', E_ALL);

// Dummy Function for Loader
function DefaultErrorHandler() {

}

?>