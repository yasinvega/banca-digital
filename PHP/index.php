<?php 
 session_start();
 if(isset($_SESSION['dni'])){
    header('LOCATION: ./pagina_principal.php');
 }
?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <link rel="stylesheet" href="../CSS/estilosLogin.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
        <title>Banco Nostro | Banca Digital</title>
        <link rel="shortcut icon" href="../Imagenes/dolar.png" type="image/x-icon">
    </head>


<body>


    <div class="container bg-light login">
            <div class="row">
                <div class="col">
                    <div class="enlaces">
                    <a href="./index.php" class="in">Sign In</a>
                    <a href="#" class="up" id="up">Sign Up</a>
                    </div>
                    <form action="./index.php" method="POST" enctype="multipart/form-data">
                    <section>
                        <div class="input-group">
                            <input class="input" autocomplete="off" name="dni" type="text" required="">
                            <label class="user-label">DNI</label>
                        </div>
                    </section>
                 
                    <section>
                        <div class="input-group">
                            <input class="input" autocomplete="off" name="contrasena" type="password" required="" maxlength="6">
                            <label class="user-label">Contraseña</label>
                        </div>
                    </section>

                    <button name="enviar"> ENTRAR </button>
                    </form>
                </div>
           
    </div>
        <?php 
        error_reporting(0);
        include('ConexionPDO.php');	  
            $dni = $_POST['dni'];
            $password = $_POST['contrasena'];

            if(!isset($_SESSION['dni'])){
                if(isset($_POST['enviar'])){
                try {
                    $statement = $pdo->prepare("SELECT DNI, Contraseña from clientes WHERE DNI like '".$_POST['dni']."' AND Contraseña like '".$_POST['contrasena']."'");
                    $statement->execute();
                                       //WHERE DNI like ".$_POST['dni']." AND Contraseña like ".$_POST['contrasena']."
                    while ($result = $statement->fetch()) {
                          
                        if(($dni == $result['DNI']) && ($password == $result['Contraseña'])){
                           
                            if(isset($_POST['dni'])){
                                $_SESSION['dni'] = $_POST['dni'];
                                setcookie("usuario", $_POST['dni'], time() + 84600 );
                                header('LOCATION: pagina_principal.php'); 
                               
                            }
                        
                        }else{
                            echo "<p class='error'>DNI o contraseña incorrecto</p>";
                            die();
                        }
                        
                    }	
                    $pdo = null;
                    } catch (PDOException $e) {
                    print "¡Error!: " . $e->getMessage() . "<br/>";
                    die();
                    }
                }
            }

        ?>
      
 </div>
 <div class="contenedorMensaje">
    <img src="../Imagenes/candado.png" alt="Seguridad" width='36' height='36'>
    <p class='mensaje'> Mantén tu contraseña en secreto y modifícala regularmente. <br>
                        Nunca te solicitaremos tus contraseñas o claves de firma confidenciales por teléfono o correo electrónico.
                        Nunca introduzcas todas las posiciones de tu clave de firma.</p>
 </div>

    <!--SCRIPTS-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous"></script>
    <script src="../JS/archivo.js"></script>
    <!--SWEETALERT 2-->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>