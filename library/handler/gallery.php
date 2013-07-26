<?php


function _gallery($params) {

    LoadObject('core.utils.ContentType', array('json'));
    echo json_encode(array(
            'succeed' => TRUE,
            'result' => array(
                'displayName' => 'Gallery ' . $params[0],
                'items' => array('1', 
                    '1', 
                    '2', 
                    '3', 
                    '1', 
                    '2', 
                    '3', 
                    '1', 
                    '2', 
                    '3', 
                    '1', 
                    '2', 
                    '3', 
                    '1', 
                    '2', 
                    '3', 
                    '1', 
                    '2', 
                    '3'
                )
            )
        )
    );
    return 0;
}