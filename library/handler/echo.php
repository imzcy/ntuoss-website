<?php

function _echo($args)
{
?>
<!DOCTYPE html>
<head>
<title>ECHO Page</title>
<style>
body{font-family: 'Consolas';}
</style>
</head>
<body>
<p><h1>Welcome to <em>imzcy.com</em></h1></p>
<p>URL you've requested: <em><u>https://secure.imzcy.com/echo/<?php echo $args ?></u></em></p>
<p><b>ECHO &gt;&gt; <?php echo $args; ?>.</b></p>
<?php
}

?>