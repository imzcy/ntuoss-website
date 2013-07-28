<?php
function _people() {
	$r = LoadObject('core.RenderTemplate', NULL, TRUE);
	
	// Define variables
	$r->bind('time', time());
	$r->bind('title', 'People');
    $management_array = array("Prisident"=>"XX", "Honorable Secretory"=>"YY");
    $r->bind('management_array', $management_array);
    
    $member = array("ABC", "BCD", "Ahmen", "Arthur");
    $r->bind('member_array', $member);
	// Render
	$r->render('people');
}
?>