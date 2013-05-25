<?php
function sponsorship() {
	$r = LoadObject('core.RenderTemplate', NULL, TRUE);
	
	// Define variables
	$r->bind('time', time());
	$r->bind('title', 'Sponsorship');
	
	// Render
	$r->render('sponsorship');
}
?>