<?php
function _default() {
	$r = LoadObject('core.RenderTemplate', NULL, TRUE);
	
	// Define variables
	$r->bind('time', time());
	$r->bind('title', 'Welcome Page');
	
	// Render
	$r->render('default');
}
?>