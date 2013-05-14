<?php

/* ##### Change Parameters Here ##### */

define('SITE_URL', 'http://ntuoss.sitex.imzcy.com');
define('MYSQL_HOST', 'localhost');
define('MYSQL_USER', 'ntuoss');
define('MYSQL_PASS', 'ntuoss');
define('MYSQL_DBNAME', 'ntuoss');


/* ^^^^^ Change Parameter Here ^^^^^ */

/* ##### Don't Change Here If Not Have To ##### */

// Define Constants
$include_path = array();
define('SITE_ROOT', rtrim(dirname(__FILE__), '/\\') . DIRECTORY_SEPARATOR);
define('LIBRARY_ROOT', SITE_ROOT . 'library' . DIRECTORY_SEPARATOR);

define('SIGNIN_URL', SITE_URL . '/signin/');

date_default_timezone_set('Asia/Singapore');

// Load Loader Modules
require_once(LIBRARY_ROOT . 'Loader.php');

// Load Modules
LoadObject('core.DefaultErrorHandler');

/* ^^^^^ Don't Change Here If Not Have To ^^^^^ */
?>