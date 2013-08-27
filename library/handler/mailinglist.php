<?php
// Debug show error
error_reporting(E_ALL);
// Set include path
//require_once('../library/set_include_path.php');

// Include headers
// ^Zend Framework
function _mailinglist($args) {
    require_once('Zend/Loader.php');
    // ^zcy
    $Gdata_User = 'temp@imzcy.com';
    $Gdata_Pass = '1234567890123';

    // Load Zend Framework modules
    Zend_Loader::loadClass('Zend_Gdata_Spreadsheets');
    Zend_Loader::loadClass('Zend_Gdata_ClientLogin');

    // Define constants
    $ERR_SUCCESS = 0;
    $ERR_FORMINCOMPLETE = -1;
    $ERR_INVALID = -2;
    // $ERR_EMAILEXISTS = -3; // Currently allow multiple registration
    $ERR_QUERYERROR = -4;

    // Data pre-processing
    $email = isset($_POST['email'])?$_POST['email']:'';

    // Generate transation code
    $transactionCode = ''; //Should be 32 bytes, from 0000 0000 0000 0000 0000 0000 0000 0000 to zzzz zzzz zzzz zzzz zzzz zzzz zzzz zzzz
    for ($i = 0; $i < 8; $i++) {
        $transactionCode .= str_pad(base_convert(rand(0, 1679615), 10, 36),4,"0",STR_PAD_LEFT);
    }
    define("TRANSACTIONCODE", $transactionCode);

    // Data validation
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Save to Google Spreadsheets
        try {
            $service = Zend_Gdata_Spreadsheets::AUTH_SERVICE_NAME;
            $client = Zend_Gdata_ClientLogin::getHttpClient($Gdata_User, $Gdata_Pass, $service);
            $service = new Zend_Gdata_Spreadsheets($client);

            // Spreadsheet key
            $ssKey = '0AoGXsfr_1zFwdGoxN0dlZWEwUlR1ODNqeUtBci1vX0E';
            // Worksheet key
            $wsKey = 'od6';
            
            // Prepare data
            // ^Set timezone
            date_default_timezone_set('Asia/Singapore');
            // ^Generate row data
            $row = array(
                'email' => $email,
                'transactioncode' => TRANSACTIONCODE,
                'submissiontime' => date("Y-m-d H:i:s")
            );
            
            // Insert new row
            $entryResult = $service->insertRow($row, $ssKey, $wsKey);
            
            // Send response to client browser
            errHandler($ERR_SUCCESS);
        } catch (Exception $e) {
            $errorNo = -1;
            //$errorDesc = 'An error occured while processing your request.\n' . $e->getMessage();
            //echo $e->getMessage();
            errHandler($ERR_QUERYERROR);
        }
    } else {
        errHandler($ERR_INVALID);
    }
}

function errHandler($errorNo) {
    echo json_encode(array(
        'status' => $errorNo,
        'transactioncode' => TRANSACTIONCODE
    ));
    flush();
    exit(0);
}
?>