<?php
function projects() {
	$r = LoadObject('core.RenderTemplate', NULL, TRUE);
	
	// Define variables
	$r->bind('time', time());
	$r->bind('title', 'Projects');
	
	// Render
	$r->render('projects');
}
?>