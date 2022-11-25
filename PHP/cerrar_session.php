<?php

session_start();

unset($_SESSION['dni']);

setcookie(session_name(),"usuario",time()-3600);

session_destroy();

header("LOCATION: ./index.php");

?>