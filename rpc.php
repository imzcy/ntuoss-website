<?php

/********************************
 *
 * Remote Procedure Call Handler
 *
 ********************************/

// Include Bootstrap
require_once('bootstrap.php');

$handler = isset($_GET['command']) ? $_GET['command'] : 'default';
$param = isset($_GET['param']) ? $_GET['param'] : '';

if (strlen($handler) == 0) {
    $handler = 'default';
}

$handlerName = 'handler.' . $handler;
$result = LoadObject($handlerName, $param, FALSE);

?>
