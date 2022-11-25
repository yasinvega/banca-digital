<?php
include_once "../vendor/autoload.php";
include './ConexionPDO.php';



//CREAR PDF
use Dompdf\Dompdf;
$dompdf = new Dompdf();
ob_start();
include "./contenido.php";
$html = ob_get_clean();
$dompdf->loadHtml($html);
$dompdf->render();
$contenido = $dompdf->output();
$nombreDelDocumento = "Tarjeta_Virtual.pdf";
$bytes = file_put_contents($nombreDelDocumento, $contenido);
header('LOCATION: '.$nombreDelDocumento.'');
?>