<?php
function _lessons() {
	$r = LoadObject('core.RenderTemplate', NULL, TRUE);
	
	// Define variables
	$r->bind('time', time());
	$r->bind('title', 'Lessons');
	
	// Render
	$r->render('lessons');
}
?>