<?php

header('Content-Type: text/html;charset=ISO-8859-1');
header("Access-Control-Allow-Origin: *");

$GLOBALS['DB_IP']   = 'localhost';
$GLOBALS['DB_USER'] = 'root';
$GLOBALS['DB_PASS'] = '';
$GLOBALS['DB_NAME'] = 'banca_online';

$db = mysqli_connect($GLOBALS['DB_IP'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS'],$GLOBALS['DB_NAME']);

$contrasena = $_POST['contrasena'];
$numeroCuentaOrigen = $_POST['numeroCuentaOrigen'];

if (!$db) 
{
echo "No pudo conectarse a la BD: " . mysqli_error();
exit();
}
	
	$consulta = "SELECT Contraseña, Saldo FROM clientes where Numero_Cuenta = '".$numeroCuentaOrigen."'";
	
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
					$pass=$valor['Contraseña'];
                    $saldo=$valor['Saldo'];
                    $respuesta=($pass."|".$saldo);

				}
			echo $respuesta;
	
				
			}
			

mysqli_close($db);



?>