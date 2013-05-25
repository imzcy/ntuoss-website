<?php
function people() {
	$r = LoadObject('core.RenderTemplate', NULL, TRUE);
	
	// Define variables
	$r->bind('time', time());
	$r->bind('title', 'People');
	
	// Render
	$r->render('people');
}
?>