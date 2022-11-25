let validar = document.getElementById("validar").addEventListener("click", obtener_Clientes);

var formularioValido = new Array();
var valido = 0;

var barCuenta = document.getElementById("barCuenta");
var barCantidad = document.getElementById("barCantidad");
var barConcepto = document.getElementById("barConcepto");
var barContra = document.getElementById("barContra");

//VALIDANDO QUE LOS CAMPOS ESTEN BIEN ESCRITOS
//NUMERO DE CUENTA
var numeroCuenta = document.getElementById("numerocuenta");
numeroCuenta.addEventListener("keyup", e=>{   
    if((numeroCuenta.value == "") || (numeroCuenta.value.length != 18) ){
        barCuenta.classList.replace("bar","barError");
        formularioValido[0] = 0;
        verResultados();
    }else{
        barCuenta.classList.replace("barError","bar");
        formularioValido[0] = 1;
        verResultados();
    }
});
//CANTIDAD
var cantidad = document.getElementById("cantidad");
cantidad.addEventListener("keyup", e=>{
    if((cantidad.value == "") || (isNaN(cantidad.value) == true) ){
        barCantidad.classList.replace("bar","barError");
        formularioValido[2] = 0;
        verResultados();
    }else{
        barCantidad.classList.replace("barError","bar");
        formularioValido[2] = 1;
        verResultados();
    }
});
//CONCEPTO
var concepto = document.getElementById("concepto");
concepto.addEventListener("keyup", e=>{
    if((concepto.value == "") ){
        barConcepto.classList.replace("bar","barError");
        formularioValido[1] = 0;
        verResultados();
    }else{
        barConcepto.classList.replace("barError","bar");
        formularioValido[1] = 1;
        verResultados();
    }
});
//CONTRASEÑA
var contraseñaVerificacion = document.getElementById("contraseña");
contraseñaVerificacion.addEventListener("keyup", e=>{
    if((contraseñaVerificacion.value == "") || (isNaN(contraseñaVerificacion.value) == true) || (contraseñaVerificacion.value.length != 6) ){
        barContra.classList.replace("bar","barError");
        formularioValido[3] = 0;
        verResultados();
    }else{
        barContra.classList.replace("barError","bar");
        formularioValido[3] = 1;
        verResultados();
    }
});




function verResultados(){
    valido =  formularioValido.includes(0);

    if(formularioValido.length == 4){
        if(valido == false){
            document.getElementById("validar").disabled = false;
            document.getElementById("validar").style.backgroundColor = "#006346";
            document.getElementById("validar").style.color = "white";
        }else if(valido == true){
            document.getElementById("validar").disabled = true;
            document.getElementById("validar").style.backgroundColor = "grey";
            document.getElementById("validar").style.color = "#006346";
            document.getElementById("Etiqueta_cuenta").style.transform = "translateY(-25px)";
            document.getElementById("Etiqueta_cantidad").style.transform = "translateY(-25px)";
            document.getElementById("Etiqueta_concepto").style.transform = "translateY(-25px)";
            document.getElementById("Etiqueta_password").style.transform = "translateY(-25px)";

        }
    }
}




//VALIDAR SI EL NUMERO DE CUENTA SE ENCUENTRA EN LA BBDD
function obtener_Clientes(){
    
    peticion_http_clientes = inicializa_xhr();

    peticion_http_clientes.onreadystatechange = procesaRespuesta_clientes_php;

    peticion_http_clientes.open("POST", "../PHP/validarTransferencia.php", true);

    peticion_http_clientes.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var query_string = "numeroCuenta="+encodeURIComponent(numeroCuenta.value)+"&nocache=";

    
    peticion_http_clientes.send(query_string);
    
    function inicializa_xhr() {
        if(window.XMLHttpRequest) {
            return new XMLHttpRequest(); 
        }	
        else if(window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } 
    }
    
    function procesaRespuesta_clientes_php(){
            
        var cuentaOrigen = document.getElementById("cuentaTitular");    

        if(peticion_http_clientes.readyState == 4) {

            if(peticion_http_clientes.status == 200) {
                var cadena = peticion_http_clientes.responseText;
                if(cadena == ""){
                    document.getElementById("Validacion_numerocuenta").style.color = "red";
                    document.getElementById("Validacion_numerocuenta").innerHTML = "<span style='color:red'>El numero de cuenta introducido es incorrecto</span><br>";
                }else{
                    document.getElementById("Validacion_numerocuenta").innerHTML = "";
                    obtener_Pass(contraseñaVerificacion.value, document.getElementById("cuentaTitular").value);
                }
            }
        }
    }
}

//VALIDAR SI LA PASSWORD INTRODUCIDA ES CORRECTA Y SI EL SALDO INTRODUCIDO ESTA DISPONIBLE
function obtener_Pass(pass,cuenta){

    peticion_http_pass = inicializa_xhr_pass();

    peticion_http_pass.onreadystatechange = procesaRespuesta_pass_php;

    peticion_http_pass.open("POST", "../PHP/validarPass.php", true);

    peticion_http_pass.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var query_string = "contrasena="+encodeURIComponent(pass)+
    "&numeroCuentaOrigen="+encodeURIComponent(cuenta)+"&nocache=";

    
    peticion_http_pass.send(query_string);
    
    function inicializa_xhr_pass() {
        if(window.XMLHttpRequest) {
            return new XMLHttpRequest(); 
        }	
        else if(window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } 
    }
    
    function procesaRespuesta_pass_php(){
        
        if(peticion_http_pass.readyState == 4) {

            if(peticion_http_pass.status == 200) {
                var cadenaPass = peticion_http_pass.responseText;
                var separador = cadenaPass.split("|");
                console.log("separado "+separador[0]+" y la pass dada "+document.getElementById("contraseña").value);
                if(separador[0] != document.getElementById("contraseña").value){
                    console.log("entra?");
                    document.getElementById("Validacion_contrasena").style.color = "red";
                    document.getElementById("Validacion_contrasena").innerHTML = "<br><span style='color:red'>La contraseña introducida es incorrecta</span>";
                }else{
                    document.getElementById("Validacion_contrasena").innerHTML = "";
                    if(parseInt(separador[1]) < document.getElementById("cantidad").value){
                        document.getElementById("Validacion_saldo").innerHTML = "<br><span style='color:red'>La cantida es superior a la que dispones</span>";
                    }else{
                        document.getElementById("Validacion_saldo").innerHTML = "";
                        document.getElementById("validar").style.display = "none";
                        document.getElementById("enviar").style.display = "block";
                        document.getElementById("numerocuenta").readOnly = true;
                        document.getElementById("cantidad").readOnly = true;                    
                        document.getElementById("concepto").readOnly = true;
                        document.getElementById("contraseña").readOnly = true;
                    }
                }
               
            }
        }
    }
}
