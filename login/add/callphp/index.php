<?php

if ($_SERVER['REQUEST_METHOD']=='POST') {
    $user = filter_var($_POST['username'],   FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'],   FILTER_SANITIZE_EMAIL);
    $msg = filter_var($_POST['msg'],   FILTER_SANITIZE_STRING);
    
    $headers = 'From: ' .$email. '\r\n';
    $myEml = 'slimani.abdelhadi@outlook.sa';
    $subject = 'contact user';

    mail($myEml ,$subject ,$msg , $headers)

    
    header("Location: https://cnfrmpage.firebaseapp.com/call/index.min.html#successfully");
    
        exit();
    
}
