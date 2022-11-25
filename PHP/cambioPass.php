<?php

header('Content-Type: text/html;charset=ISO-8859-1');
header("Access-Control-Allow-Origin: *");

$GLOBALS['DB_IP']   = 'localhost';
$GLOBALS['DB_USER'] = 'root';
$GLOBALS['DB_PASS'] = '';
$GLOBALS['DB_NAME'] = 'banca_online';

$db = mysqli_connect($GLOBALS['DB_IP'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS'],$GLOBALS['DB_NAME']);

$pass = $_POST['contrasena'];


if (!$db) 
{
echo "No pudo conectarse a la BD: " . mysqli_error();
exit();
}
	
	$consulta = "SELECT Contraseña FROM clientes where DNI LIKE '".$_COOKIE['usuario']."'";
	
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
					$contrasena=$valor['Contraseña'];
                    if($pass == $contrasena){
                        $respuesta.=("1");
                    }else{
                        $respuesta.=("0");
                    }
                    

				}
			echo $respuesta;
	
				
			}
			

mysqli_close($db);



?>