<?php
  include('ConexionPDO.php'); 
  $fechaActual = date('Y-m-d');


   if(isset($_POST['enviar'])){

     $cuentaOrigen = $pdo->query('select Numero_Cuenta FROM clientes where DNI LIKE "'.$_COOKIE['usuario'].'"')->fetchColumn(); 
     $cuentaDestino = $pdo->query('select Numero_Cuenta FROM clientes where Telefono LIKE "'.$_POST['numero'].'"')->fetchColumn(); 
     $telefono = $pdo->query('select Telefono FROM clientes where DNI LIKE "'.$_COOKIE['usuario'].'"')->fetchColumn(); 

     if(($cuentaDestino == "") || ($_POST['numero'] == $telefono)){      
         header('Location: pagina_principal.php');
     }else{
         //REALIZAR MOVIMIENTO
         try{
             $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
             $idClient = $pdo->query('select id_cliente FROM clientes where DNI LIKE "'.$_COOKIE['usuario'].'"')->fetchColumn(); 
             $statement5 = $pdo->prepare("INSERT INTO movimientos (id_cliente, cuenta_origen, cuenta_destino, cantidad, fecha_movimiento,concepto,Tarjeta_Virtual) VALUES ( :id_cliente, :cuenta_origen, :cuenta_destino, :cantidad, :fecha_movimiento, :concepto , '0')");
             $statement5->bindValue(':id_cliente', $idClient);
             $statement5->bindValue(':cuenta_origen', $cuentaOrigen);
             $statement5->bindValue(':cuenta_destino', $cuentaDestino);
             $statement5->bindValue(':cantidad', $_POST['importe']);
             $statement5->bindValue(':fecha_movimiento', $fechaActual);
             $statement5->bindValue(':concepto', $_POST['concepto']);
        
             $statement5->execute();

         }catch(PDOException $e) {
             print "¡Error!: " . $e->getMessage() . "<br/>";
             die();
         }
         //RETIRAR DE LA CUENTA
         try{
             $statement6 = $pdo->prepare("UPDATE clientes set saldo = saldo - '".$_POST['importe']."' where id_cliente like $idClient");
             $statement6->execute();


         }catch(PDOException $e) {
             print "¡Error!: " . $e->getMessage() . "<br/>";
             die();
         }
          //INGRESAR EN DESTINATARIO
          try{
             $statement6 = $pdo->prepare("UPDATE clientes set saldo = saldo + '".$_POST['importe']."' where Numero_Cuenta like $cuentaDestino");
             $statement6->execute();
             $pdo = null;

         }catch(PDOException $e) {
             print "¡Error!: " . $e->getMessage() . "<br/>";
             die();
         }
          header('Location: pagina_principal.php');
        
     } 
    }   
?>