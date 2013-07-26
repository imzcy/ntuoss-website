<?php

function _ContentType($params) {

    // From http://php.net/manual/en/function.header.php
    $contentType = $params[0];
    
    $mime_types = array(
         'txt' => 'text/plain',
         'htm' => 'text/html',
         'html' => 'text/html',
         'php' => 'text/html',
         'css' => 'text/css',
         'js' => 'application/javascript',
         'json' => 'application/json',
         'xml' => 'application/xml',
         'swf' => 'application/x-shockwave-flash',
         'flv' => 'video/x-flv',

         // images
         'png' => 'image/png',
         'jpe' => 'image/jpeg',
         'jpeg' => 'image/jpeg',
         'jpg' => 'image/jpeg',
         'gif' => 'image/gif',
         'bmp' => 'image/bmp',
         'ico' => 'image/vnd.microsoft.icon',
         'tiff' => 'image/tiff',
         'tif' => 'image/tiff',
         'svg' => 'image/svg+xml',
         'svgz' => 'image/svg+xml',

         // video
         '3gp' => 'video/3gpp',
         '3g2' => 'video/3g2',
         'avi' => 'video/avi',
         'mp4' => 'video/mp4',
         'asf' => 'video/asf',
         'mov' => 'video/quicktime',
     );
    if (array_key_exists($contentType, $mime_types)) {
        $mm_type=$mime_types[$contentType];
     }else{
        $mm_type="application/octet-stream";
     }
    header("Content-Type: " . $mm_type);
}
?>