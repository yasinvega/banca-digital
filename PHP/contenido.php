<?php
include './ConexionPDO.php';

?>

<style>
     /* *{
        border:1px solid black;
    }  */
    
    .titulo{
        display:flex;
        justify-content: center;
        align-items: center;
        margin:auto;
        padding:20px;
        border-bottom:3px solid #006346;
    }
    .titulo h2{
        color: #006346;
    }
    
    .fecha{
        margin-top:20px;
        margin-bottom:20px;
        padding:20px;
        margin:auto;
        display:flex;
        justify-content:end;
        float:right;
    }
    .presentacion{
        margin:auto;
        padding:20px;
    }
    .contenido{
        margin:auto;
        padding:10px;
    }
    .footer{
        margin:auto;
        padding:20px;
    }
    .info{
        margin:auto;
        padding:20px;
        border-top:3px solid #006346;
        margin-top:10vh;
    }
    p{
        font-size:15px;
    }
    .contenedor-tarjeta{
        margin:auto;
        padding:20px;
        display: flex;
        justify-content: end;
        color:white;
       
        margin-bottom:40px;
    }
    .tarjeta{
        background-color:#006346;
        padding: 5px 10px 5px 10px;
        border: 1px solid black;
        border-radius: 20px;
        width: 50%;
    }
    .logo{
        display: flex;
        flex-direction:row;
        color:white;

    }
    .logo span{
        width:40px;
        height:40px;
        background:gold;
        border-radius:100%;
    }
    .chip{
        background:#bba637;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        padding:0;
    }
    .numero{
        padding:0;
    }
    .numero .cvv-validez{
        display:flex;
        flex-direction:row;
        justify-content: space-between;
    }
   
</style>

<div class="titulo">
    <center><h2> BANCO NOSTRO </h2></center>
</div>
<div class="contenido">
    <?php       
        $fechaActual = date('D M Y');
        echo "<p class='fecha'>Madrid, <b>".$fechaActual."</b></p>";        
        
        $nombre_usuario = $pdo->query('select Nombre FROM clientes where DNI LIKE "'.$_COOKIE['usuario'].'"')->fetchColumn(); 
        $apellido_usuario = $pdo->query('select Apellidos FROM clientes where DNI LIKE "'.$_COOKIE['usuario'].'"')->fetchColumn(); 
        $dni = $pdo->query('select DNI FROM clientes where DNI LIKE "'.$_COOKIE['usuario'].'"')->fetchColumn(); 
        $residencia = $pdo->query('select Localidad FROM clientes where DNI LIKE "'.$_COOKIE['usuario'].'"')->fetchColumn(); 
        echo "<p class='presentacion'>Estimado: <span>".$nombre_usuario." ".$apellido_usuario."</span></p>";
      
    ?>
    <p> Por la presente y a traves de su solicitud para adquirir nuestra tarjeta virtual le hago entrega de dicha tarjeta 
        a traves de este escrito a nombre de D./Dna <?php echo "<b>".$nombre_usuario." ".$apellido_usuario."</b>"; ?> con DNI <?php echo "<b>".$dni."</b>"; ?>
        Residente en <?php echo "<b>".$residencia."</b>"?>.<br><br><br>
        Gracias por despositar su confianza en nosotros y adquirir su tarjeta virtual con Banco Nostro</p>
</div>
<div class="footer">
    <p>Atte. Dueño de la sucursal. </p>
</div>
<div class="contenedor-tarjeta">
    <?php 
        $numero_tarjeta = rand(1000000000000000, 9999999999999999);
        $cvv = rand(100, 999);
        $fecha = date("d-m-Y");
        $validez = date("m/y",strtotime($fecha."+ 4 years")); 
        $validezbbd = date("Y-m-d",strtotime($fecha."+ 4 years"));
    ?>
    <div class="tarjeta">
            <div class="logo"  style='font-weight: bold;'>
                <center><span>  </span>BANCO NOSTRO</center>

            </div>
            <div class="chip"> </div>
            <div class="numero">
                <?php
                    $format = substr($numero_tarjeta,0,4)." "."".substr($numero_tarjeta,4,4)." "."".substr($numero_tarjeta,8,4)." ".substr($numero_tarjeta,12,4);

                     echo "<p style='font-weight: bold;'>".$format."</p>";
                     echo"<div class='cvv-validez'>";
                     echo "<p  style='font-weight: bold;'> cvv: ".$cvv." &nbsp; &nbsp; &nbsp; validez: ".$validez."</p> ";
                     echo"</div>";
                 ?>
            </div>
    </div>
</div>
<br><br><br><br>
<br><br><br><br>
<br><br><br>

<div class="info">
    <p>En Madrid, calle falsa, 123 a <?php echo "<b>".$fechaActual."</b>";  ?></p>
</div>




<?php 

//DATOS DEL USUARIO
  try {
      $statement0 = $pdo->prepare("UPDATE clientes SET Tarjeta_virtual = '1' WHERE DNI LIKE '".$_COOKIE['usuario']."'");
      $statement0->execute();  
  } catch (PDOException $e) {
      print "¡Error!: " . $e->getMessage() . "<br/>";
      die();
  }
  
  try {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $idClient = $pdo->query('select Id_cliente FROM clientes where DNI LIKE "'.$_COOKIE['usuario'].'"')->fetchColumn(); 
    $statement1 = $pdo->prepare("INSERT INTO tarjeta_virtual (Id_cliente, Numero, Pin, Saldo, Fecha_Validez) VALUES ( :Id_cliente, :Numero, :Pin, '0', :Fecha_Validez)");
    $statement1->bindValue(':Id_cliente', $idClient);
    $statement1->bindValue(':Numero', $numero_tarjeta);
	$statement1->bindValue(':Pin', $cvv);
	$statement1->bindValue(':Fecha_Validez', $validezbbd);

	$statement1->execute();
	$pdo = null;
  } catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
    die();
  }
    
?>