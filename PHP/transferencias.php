<?php 
 session_start();
  if(!isset($_SESSION['dni'])){
     header('LOCATION: index.php');
  }
  include('ConexionPDO.php');
  $fechaActual = date('Y-m-d');
?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta http-equiv="Expires" content="0"> 
        <meta http-equiv="Last-Modified" content="0"> 
        <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate"> 
        <meta http-equiv="Pragma" content="no-cache">
        <link rel="shortcut icon" href="../Imagenes/dolar.png" type="image/x-icon">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
        <link rel="stylesheet" href="../CSS/estilosMenu.css">
        <link rel="stylesheet" href="../CSS/estilosTransferencias.css">
        <!--GOOGLE FONTS -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">     
        <title>Banco Nostro | Banca Digital</title>
        
        <!--SWEETALERT 2-->
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        
    </head>


<body>
        <div id="mySidebar" class="sidebar">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
            <div class="perfil">
                <img src="../Imagenes/perfil.png" alt="Perfil" width="60px" height="60px">
                <p class="nombre">
                <?php
                        $nombre_usuario = $pdo->query('select Nombre FROM clientes where DNI LIKE "'.$_COOKIE['usuario'].'"')->fetchColumn(); 
                        $apellido_usuario = $pdo->query('select Apellidos FROM clientes where DNI LIKE "'.$_COOKIE['usuario'].'"')->fetchColumn(); 
                        echo $nombre_usuario." ".$apellido_usuario;
                ?>
                </p>
            </div>
            <a href="./pagina_principal.php">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z"/></svg>
                Inicio
            </a>
            <a href="./cuentas.php">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 4h8v19h-24v-19h8v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2zm7 1h-22v17h22v-17zm-3 4v1h-16v-1h16zm-5-6.5c0-.133-.053-.26-.146-.354-.094-.093-.221-.146-.354-.146h-5c-.133 0-.26.053-.354.146-.093.094-.146.221-.146.354v1.5h6v-1.5z"/></svg>
                Cuentas
            </a>
            <a href="./transferencias.php">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 2c5.519 0 10 4.481 10 10s-4.481 10-10 10-10-4.481-10-10 4.481-10 10-10zm2 12v-3l5 4-5 4v-3h-9v-2h9zm-4-6v-3l-5 4 5 4v-3h9v-2h-9z"/></svg>
                Transferencias
            </a>
            <a href="./tarjetas.php">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M22 3c.53 0 1.039.211 1.414.586s.586.884.586 1.414v14c0 .53-.211 1.039-.586 1.414s-.884.586-1.414.586h-20c-.53 0-1.039-.211-1.414-.586s-.586-.884-.586-1.414v-14c0-.53.211-1.039.586-1.414s.884-.586 1.414-.586h20zm1 8h-22v8c0 .552.448 1 1 1h20c.552 0 1-.448 1-1v-8zm-15 5v1h-5v-1h5zm13-2v1h-3v-1h3zm-10 0v1h-8v-1h8zm-10-6v2h22v-2h-22zm22-1v-2c0-.552-.448-1-1-1h-20c-.552 0-1 .448-1 1v2h22z"/></svg>
                Tarjetas
            </a>
            <p id='ajustes'>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126"/></svg>
                Ajustes
                <img src="../Imagenes/flecha-derecha.png" id="flecha">                
            </p>
            <ul class="listaajustes" id='listaajustes'>
                    <li><a href="ajustes.php?alertas"> Mis alertas</a></li>
                    <li><a href="ajustes.php?seguridad"> Seguridad y claves</a></li>
                    <li><a href="ajustes.php?datos"> Datos Personales</a></li>
            </ul>
            <a href="cerrar_session.php" class="cerrar">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 21h8.033v-2l1-1v4h-9.033v2l-10-3v-18l10-3v2h9.033v5l-1-1v-3h-8.033v18zm-1 1.656v-21.312l-8 2.4v16.512l8 2.4zm11.086-10.656l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z"/></svg>
                Cerrar Sesion
            </a>

        </div>

        <div id="main">
            <button class="openbtn" id="btn-menu" onclick="openNav()">☰</button> 
            <div class="titulo" id="titulo">
                <img src="../Imagenes/logo.png" alt="Banco Nostro" width="50px" height="50px">
                <h2>Banco Nostro</h2>
            </div> 
        </div>

        <div class="container formu-transferencia">
              <div class="row">  
                <div class="col">
                    <form action="./transferencias.php" method="post" enctype="multipart/form-data">  
                    <h3>Datos Remitente</h3>
                        <?php 
                        
                            try {
                                    $statement = $pdo->prepare("SELECT Nombre, Apellidos, Numero_Cuenta FROM clientes WHERE DNI = '".$_COOKIE['usuario']."'");
                                    $statement->execute();
                                    while ($result = $statement->fetch()) {
                                        $cadena = $result['Numero_Cuenta'];
                                        $format = substr($cadena,0,2)." "."".substr($cadena,2,4)."-"."".substr($cadena,6,4)."-".substr($cadena,10,4)."-".substr($cadena,14,4);                                     
                                echo "
                                    <div class='in'>
                                        <input required='' type='text'  value='".$cadena."' id='cuentaTitular' name='cuentaTitular' readOnly>                                    
                                    </div>
                                    ";
                                    echo "
                                    <div class='in'>
                                    <input required='' type='text'  value='".$result['Nombre']." ".$result['Apellidos']."' disabled >                                   
                                    </div>
                                ";
                                    }	
                                            
                            } catch (PDOException $e) {
                                print "¡Error!: " . $e->getMessage() . "<br/>";
                                die();
                            }
                        ?>
                                <h3>Datos Beneficiario</h3>
                                <div class="group">
                                    <input required="" type="text" class="input" name='numerocuenta' id='numerocuenta'>
                                    <span class="highlight"></span>
                                    <span class="bar" id='barCuenta'></span>
                                    <label id='Etiqueta_cuenta'>Nº Cuenta Beneficiario</label>
                                </div>
                                <div class="group">
                                    <input required="" type="text" class="input" name='cantidad' id='cantidad'>
                                    <span class="highlight"></span>
                                    <span class="bar" id='barCantidad'></span>
                                    <label id='Etiqueta_cantidad'>Cantidad</label>
                                </div>
                                <div class="group">
                                    <input required="" type="text" class="input" name='concepto' id='concepto'>
                                    <span class="highlight"></span>
                                    <span class="bar" id='barConcepto'></span>
                                    <label id='Etiqueta_concepto'>Concepto</label>
                                </div>
                                <div class="group">
                                    <input required="" type="password" class="input" name='contraseña' id='contraseña' maxlength='6'>
                                    <span class="highlight"></span>
                                    <span class="bar" id='barContra'></span>
                                    <label id='Etiqueta_password'>Contraseña de verificacion</label>
                                </div>
                                <div id='errorCampos'>
                                    <ul  style='list-style-type: none'>
                                        <li id='Validacion_numerocuenta'></li>
                                        <li id='Validacion_contrasena'></li>
                                        <li id='Validacion_saldo'></li>
                                    </ul>
                                </div>
                                <input type="submit" value="Realizar Transferencia" name='enviar' id='enviar'>
                    </form>
                    <button id='validar' disabled>Validar datos</button>
                </div>
            </div>
        </div>
                        <?php
                        if(isset($_POST['enviar'])){
                            //INSERTAR EN MOVIMIENTOS
                            try {
                                $idcliente =  $pdo->query('select Id_cliente FROM clientes where DNI LIKE "'.$_COOKIE['usuario'].'"')->fetchColumn(); 
                                $statement2 = $pdo->prepare("INSERT INTO movimientos (id_cliente, cuenta_origen, cuenta_destino, cantidad, fecha_movimiento, concepto, Tarjeta_Virtual) VALUES(:id_cliente, :cuenta_origen,:cuenta_destino,:cantidad,:fecha_movimiento,:concepto,'0')");
                                $statement2->bindValue(':id_cliente', $idcliente);
                                $statement2->bindValue(':cuenta_origen', $_POST['cuentaTitular']);
                                $statement2->bindValue(':cuenta_destino', $_POST['numerocuenta']);
                                $statement2->bindValue(':cantidad', $_POST['cantidad']);
                                $statement2->bindValue(':fecha_movimiento', $fechaActual);
                                $statement2->bindValue(':concepto', $_POST['concepto']);
                           
                                $statement2->execute();
                                       
                            } catch (PDOException $e) {
                                print "¡Error!: " . $e->getMessage() . "<br/>";
                                die();
                            }
                            //ACTUALIZAR REMITENTE
                            try {
                                $statement3 = $pdo->prepare("UPDATE clientes set Saldo = Saldo - '".$_POST['cantidad']."' WHERE Numero_Cuenta LIKE '".$_POST['cuentaTitular']."'");
                                $statement3->execute();
                                       
                            } catch (PDOException $e) {
                                print "¡Error!: " . $e->getMessage() . "<br/>";
                                die();
                            }
                            //ACTUALIZAR DESTINATARIO
                            try {
                                $statement4 = $pdo->prepare("UPDATE clientes set Saldo = Saldo + '".$_POST['cantidad']."' WHERE Numero_Cuenta LIKE '".$_POST['numerocuenta']."'");
                                $statement4->execute();
                                       
                            } catch (PDOException $e) {
                                print "¡Error!: " . $e->getMessage() . "<br/>";
                                die();
                            }
                        }
                        
                        
                        ?>
        <div class="container-fluid footer mt-5 p-4">          
            <div class="row ">
                <div class="col d-flex justify-content-center align-items-center">
                    <h5 class='text-center'> © Proyecto realizado por  Yasin Vega</h5>
                </div>
                <div class="col redes">
                    <ul>
                        <li class="redes"><a href="https://www.linkedin.com/in/yasin-vega/"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z"/></svg></a></li>
                        <li class="redes"><a href="https://github.com/yasinvega"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.686-6 6 0 2.651 1.719 4.9 4.104 5.693.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615.479-.133.992-.199 1.502-.202.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288 2.383-.793 4.1-3.041 4.1-5.691 0-3.314-2.687-6-6-6z"/></svg></a></li>
                        <li class="redes"><a href="mailto:yasinpreubas@gmail.com"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.021 17.824c-3.907 0-6.021-2.438-6.021-5.586 0-3.363 2.381-6.062 6.638-6.062 3.107 0 5.362 2.019 5.362 4.801 0 4.356-5.165 5.506-4.906 3.021-.354.555-.927 1.177-2.026 1.177-1.257 0-2.04-.92-2.04-2.403 0-2.222 1.461-4.1 3.19-4.1.829 0 1.399.438 1.638 1.11l.232-.816h1.169c-.122.416-1.161 4.264-1.161 4.264-.323 1.333.675 1.356 1.562.648 1.665-1.29 1.75-4.664-.499-6.071-2.411-1.445-7.897-.551-7.897 4.347 0 2.806 1.976 4.691 4.914 4.691 1.719 0 2.771-.465 3.648-.974l.588.849c-.856.482-2.231 1.104-4.391 1.104zm-1.172-7.153c-.357.67-.588 1.538-.588 2.212 0 1.805 1.761 1.816 2.626.12.356-.697.586-1.586.586-2.265 0-1.458-1.748-1.717-2.624-.067z"/></svg></a></li>
                    </ul>
                </div>
            </div>
        </div>

            <!--SCRIPTS-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <script src="../JS/pagina_principal.js"></script>
    <script src="../JS/transferencias.js"></script>


</body>
</html>