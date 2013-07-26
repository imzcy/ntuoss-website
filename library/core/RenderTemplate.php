<?php

class _RenderTemplate {

	private $var;
	
	public function escape($string) {
		return htmlspecialchars($string);
	}
	
	public function bind($name, $variable) {
		$this->var[$name] = $variable;
	}
	
	public function render($template) {
		extract($this->var);
		require(TEMPLATE_ROOT . $template . '.html');
	}

}

?>