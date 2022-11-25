<?php

header('Content-Type: text/html;charset=ISO-8859-1');
header("Access-Control-Allow-Origin: *");

$GLOBALS['DB_IP']   = 'localhost';
$GLOBALS['DB_USER'] = 'root';
$GLOBALS['DB_PASS'] = '';
$GLOBALS['DB_NAME'] = 'banca_online';

$db = mysqli_connect($GLOBALS['DB_IP'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS'],$GLOBALS['DB_NAME']);

$numeroCuenta = $_POST['numeroCuenta'];


if (!$db) 
{
echo "No pudo conectarse a la BD: " . mysqli_error();
exit();
}
	
	$consulta = "SELECT Numero_Cuenta FROM clientes where Numero_Cuenta = '".$numeroCuenta."'";
	
	$result = mysqli_query($db,$consulta);
	
	$respuesta ="";
	
	if (!$result) 
			{
				echo ("Error en la consulta".$result);
			} 
			else 
			{
				while ($valor = mysqli_fetch_array($result))
				{
					$numeroCuenta=$valor['Numero_Cuenta'];
                    $respuesta=($numeroCuenta);

				}
			echo $respuesta;
	
				
			}
			

mysqli_close($db);



?>