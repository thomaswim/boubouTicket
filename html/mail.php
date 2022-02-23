<?php

echo "Hello world";

     $to      = 'thomasboursac@gmail.com';
     $subject = 'le sujet';
     $message = 'Bonjour !';
     $headers = 'From: thomasboursac@gmail.com' . "\r\n" .
     'Reply-To: webmaster@example.com' . "\r\n" .
     'X-Mailer: PHP/' . phpversion();

     mail($to, $subject, $message, $headers);
 ?>
