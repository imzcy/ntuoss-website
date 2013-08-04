<?php
function _projectlist($sort) {
	$projects = array('succeed' => false);
	switch($sort) {
		case 'latest':
			$projects = array(
                'succeed' => true,
                'result' => array(
                    array(
                        'title' => 'CPPWebPage',
                        'url' => 'https://github.com/imzcy/cppwebpage'
                        ),
                    array(
                        'title' => 'CPPWebPage (1)',
                        'url' => 'https://github.com/imzcy/cppwebpage'
                        )
                    )
                );
		break;
		case 'votes':
			$projects = array(
                'succeed' => true,
                'result' => array(
                    array(
                        'title' => 'CPPWebPage',
                        'url' => 'https://github.com/imzcy/cppwebpage'
                        ),
                    array(
                        'title' => 'CPPWebPage (1)',
                        'url' => 'https://github.com/imzcy/cppwebpage'
                        )
                    )
                );
		break;
		case 'views':
			$projects = array(
                'succeed' => true,
                'result' => array(
                    array(
                        'title' => 'CPPWebPage (1)',
                        'url' => 'https://github.com/imzcy/cppwebpage'
                        ),
                    array(
                        'title' => 'CPPWebPage',
                        'url' => 'https://github.com/imzcy/cppwebpage'
                        )
                    )
                );
		break;
		case 'random':
            $result = array(
                    array(
                        'title' => 'CPPWebPage',
                        'url' => 'https://github.com/imzcy/cppwebpage'
                        ),
                    array(
                        'title' => 'CPPWebPage (1)',
                        'url' => 'https://github.com/imzcy/cppwebpage'
                        )
                    );
            shuffle($result);
			$projects = array(
                'succeed' => true,
                'result' => $result
                );
		break;
	}
	echo json_encode($projects);
}
?>