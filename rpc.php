<?php

/********************************
 *
 * Remote Procedure Call Handler
 *
 ********************************/

// Include Bootstrap
require_once('bootstrap.php');

$handler = isset($_GET['command']) ? $_GET['command'] : '';
$param = isset($_GET['param']) ? json_decode($_GET['param'], true) : array();

$handlerName = 'handler.' . $handler;
$result = LoadObject($handlerName, $param, FALSE);

?>
