$(document).ready(function(){

    $(".menuAjustes li").hide();
    $("#listaAlertas").click(function(){
        $("#seguridad li").hide(500);
        $("#datos li").hide(500);
        $("#alertas li").toggle(500);
    });
    $("#listaSeguridad").click(function(){
        $("#alertas li").hide(500);
        $("#datos li").hide(500);
        $("#seguridad li").toggle(500);
    });
    $("#listaDatos").click(function(){
        $("#alertas li").hide(500);
        $("#seguridad li").hide(500);
        $("#datos li").toggle(500);
    });
    
  });

    if(location.search == "?alertas"){
        document.getElementById("listaAlertas").click();
        formularioAlertas();
    }
    if(location.search == "?seguridad"){
        document.getElementById("listaSeguridad").click();
        formularioSeguridad();
    }
    if(location.search == "?datos"){
        document.getElementById("listaDatos").click();
        formularioDatos();
    }

     let listaAlertas = document.getElementById("gestionAlertas").addEventListener("click", e=>{
         location.search = "?alertas";
         formularioAlertas();
     });
     let listaSeguridad = document.getElementById("modificar").addEventListener("click", e=>{
         location.search = "?seguridad";
         formularioSeguridad();
     });
     let listaDatos = document.getElementById("MostrarDatos").addEventListener("click", e=>{
         location.search = "?datos";
         formularioDatos();
     });



     //FORMULARIO ALERTAS --------------------------------------------------------------------------------------
     function formularioAlertas(){   
        let contenedorFormularios = document.getElementById("formularioAjustes");
        let contendorFormularioAlertas = document.createElement("div");

        let titulo = document.createElement("h3");
        titulo.innerHTML = "Gestion de alertas";

        let formulario = document.createElement("form");
        formulario.setAttribute("action", "ajustes.php");
        formulario.setAttribute("method", "POST");
        formulario.setAttribute("id", "formularioAlertas");

        let divCantidad = document.createElement("div");
        divCantidad.setAttribute("class", "divCantidad");

        let selectAlertas = document.createElement("select");
        selectAlertas.setAttribute("class", "selectAlertas");
        selectAlertas.setAttribute("id", "selectAlertas");
        selectAlertas.setAttribute("name", "selectAlertas");
        selectAlertas.addEventListener("click", e=>{
           if(selectAlertas.value == "crear"){
                divCantidad.innerHTML = "";
                let labelCantidad = document.createElement("label");
                labelCantidad.innerHTML = "(*) Indique la cantidad minima para su alerta ";

                let campoCantidad = document.createElement("input");
                campoCantidad.setAttribute("id","campoCantidad");
                campoCantidad.setAttribute("class","campoCantidad");
                campoCantidad.setAttribute("name","campoCantidad");
                campoCantidad.addEventListener("keyup", e=>{
                        if((campoCantidad.value == "") || (isNaN(campoCantidad.value) == true)){
                            botonSubmit.disabled = true;
                            botonSubmit.style.color = "#006a4b";
                            botonSubmit.style.background = "grey";
                        }else{
                            botonSubmit.disabled = false;
                            botonSubmit.style.color = "#006a4b";
                            botonSubmit.style.background = "#eac839";
                        }   
                })
                botonSubmit.name = "crearAlerta"
                divCantidad.appendChild(labelCantidad);
                divCantidad.appendChild(campoCantidad);
           }else if(selectAlertas.value == "eliminar"){
                divCantidad.innerHTML = "";
                botonSubmit.disabled = false;
                botonSubmit.style.color = "#006a4b";
                botonSubmit.style.background = "#eac839";
                botonSubmit.name = "eliminarAlerta";
           }
        });
        let optionsSelectAlertas0 = document.createElement("option");
        optionsSelectAlertas0.setAttribute("value", "");
        optionsSelectAlertas0.disabled = true;
        optionsSelectAlertas0.selected = true;
        optionsSelectAlertas0.innerHTML = "Seleccione el tipo de gestion";
        let optionsSelectAlertas1 = document.createElement("option");
        optionsSelectAlertas1.setAttribute("value", "crear");
        optionsSelectAlertas1.innerHTML = "Crear Alerta";
        let optionsSelectAlertas2 = document.createElement("option");
        optionsSelectAlertas2.setAttribute("value", "eliminar");
        optionsSelectAlertas2.innerHTML = "Eliminar Alerta";

        let botonSubmit = document.createElement("input") ;
        botonSubmit.setAttribute("type", "submit");
        botonSubmit.setAttribute("class", "btnEnviar");
        botonSubmit.setAttribute("id", "btnEnviar");
        botonSubmit.setAttribute("value", "Aceptar");
        botonSubmit.setAttribute("style", "color:#006a4b; background: #c7c7c7;");
        botonSubmit.disabled = true;

        selectAlertas.appendChild(optionsSelectAlertas0);
        selectAlertas.appendChild(optionsSelectAlertas1);
        selectAlertas.appendChild(optionsSelectAlertas2);
        formulario.appendChild(selectAlertas);
        formulario.appendChild(divCantidad);
        formulario.appendChild(botonSubmit);

        contendorFormularioAlertas.appendChild(titulo);
        contendorFormularioAlertas.appendChild(formulario);
        contenedorFormularios.appendChild(contendorFormularioAlertas);
     }
   // FIN FORMULARIO ALERTAS --------------------------------------------------------------------------------------
 
   
    var formularioValido = new Array();
    var valido = 0;

   //FORMULARIO SEGURIDAD --------------------------------------------------------------------------------------
     function formularioSeguridad(){
        let contenedorFormularios = document.getElementById("formularioAjustes");
        let contendorFormularioSeguridad = document.createElement("div");
        contendorFormularioSeguridad.setAttribute("class", "divSeguridad");
        let titulo = document.createElement("h3");
        titulo.innerHTML = "Modificar contraseña";

        let formulario = document.createElement("form");
        formulario.setAttribute("action", "ajustes.php");
        formulario.setAttribute("method", "POST");
        formulario.setAttribute("id", "formularioDatos");

        //contraseña actual
        let divActual = document.createElement("div");
        divActual.setAttribute("class","actual");

        let labelActual = document.createElement("label");
        labelActual.innerHTML = "(*) Establece la contraseña actual";

        let inputActual = document.createElement("input");
        inputActual.setAttribute("type","password");
        inputActual.setAttribute("name","passActual");
        inputActual.setAttribute("id","passActual");        
        inputActual.setAttribute("maxlength","6");
        inputActual.addEventListener("keyup", e=>{
            if(isNaN(inputActual.value) == true){
                inputActual.style.borderColor = "red";
                formularioValido[0] = 0;
                verResultados();
            }else{
                if(inputActual.value.length == 6){

                    peticion_http_pass = inicializa_xhr_pass();
                    peticion_http_pass.onreadystatechange = procesaRespuesta_pass_php;
                    peticion_http_pass.open("POST", "../PHP/CambioPass.php", true);
                    peticion_http_pass.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    var query_string = "contrasena="+encodeURIComponent(inputActual.value)+"&nocache=";               
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
                                if(cadenaPass == "0"){
                                    inputActual.style.borderColor = "red";
                                    formularioValido[0] = 0;
                                    verResultados();
                                }else{
                                    inputActual.style.borderColor = "#006a4b";
                                    inputActual.readOnly = true;
                                    formularioValido[0] = 1;
                                    verResultados();
                                }                          
                                // cadenaPass == "0" ? inputActual.style.borderColor = "red" : inputActual.style.borderColor = "#006a4b", inputActual.readOnly = true;
                            }
                        }
                    }
                }
            }
        });
        //contraseña nueva
        let divNuevo = document.createElement("div");
        divNuevo.setAttribute("class","nuevo");

        let labelNuevo = document.createElement("label");
        labelNuevo.innerHTML = "(*) Establece la nueva contraseña";

        let inputNueva = document.createElement("input");
        inputNueva.setAttribute("type","password");
        inputNueva.setAttribute("name","passNueva");
        inputNueva.setAttribute("id","passNueva"); 
        inputNueva.setAttribute("maxlength","6"); 
        inputNueva.addEventListener("keyup", e=>{
                if((isNaN(inputNueva.value) == true) || (inputNueva.value == inputActual.value) || (inputNueva.value.length != 6)){
                        inputNueva.style.borderColor = "red";
                        formularioValido[1] = 0;
                        verResultados();
                }else{
                    let valido = true;
                    let numerosIguales = ["111111","222222","333333", "444444", "555555", "666666", "777777", "888888", "999999"];
                    for(var i = 0; i<numerosIguales.length; i++){
                            if(inputNueva.value == numerosIguales[i]){
                                valido = false;
                                i = numerosIguales.length;
                            }
                    }
                    if(valido == false){
                        inputNueva.style.borderColor = "red";
                        formularioValido[1] = 0;
                        verResultados();
                    }else{
                        inputNueva.style.borderColor = "#006a4b";
                        formularioValido[1] = 1;
                        verResultados();
                    }
                }
        });
        //contraseña repetida
        let divRepNuevo = document.createElement("div");
        divRepNuevo.setAttribute("class","Repnuevo");

        let labelRepNuevo = document.createElement("label");
        labelRepNuevo.innerHTML = "(*) Repite la nueva contraseña";

        let inputRepNueva = document.createElement("input");
        inputRepNueva.setAttribute("type","password");
        inputRepNueva.setAttribute("name","passRepNueva");
        inputRepNueva.setAttribute("id","passRepNueva");
        inputRepNueva.setAttribute("maxlength","6"); 
        inputRepNueva.addEventListener("keyup", e=>{
            if(inputRepNueva.value != inputNueva.value){
                inputRepNueva.style.borderColor = "red";
                formularioValido[2] = 0;
                verResultados();
            }else{
                inputRepNueva.style.borderColor = "#006a4b";
                formularioValido[2] = 1;
                verResultados();
            }
        }); 

        let botonSubmit = document.createElement("input");
        botonSubmit.setAttribute("type", "submit");
        botonSubmit.setAttribute("class", "btnSeguridad");
        botonSubmit.setAttribute("id", "btnEnviar");
        botonSubmit.setAttribute("style", "color:#006a4b; background: #c1c1c1;");

        botonSubmit.value = "Aceptar";
        botonSubmit.name = "cambiarPassword";

        let divAviso = document.createElement("div");
        divAviso.setAttribute("class", "aviso");
        divAviso.innerHTML = "<span>AVISO:</span> Por tu seguridad, la nueva contraseña debe ser numérica de 6 posiciones y distinta a la anterior. <br> No debe contener numeros repetidos(Ej: 111111)";


        divActual.appendChild(labelActual);
        divActual.appendChild(inputActual);
        divNuevo.appendChild(labelNuevo);
        divNuevo.appendChild(inputNueva);
        divRepNuevo.appendChild(labelRepNuevo);
        divRepNuevo.appendChild(inputRepNueva);
        formulario.appendChild(titulo);
        formulario.appendChild(divActual);
        formulario.appendChild(divNuevo);
        formulario.appendChild(divRepNuevo);     
        formulario.appendChild(contendorFormularioSeguridad);      
        formulario.appendChild(botonSubmit);
        formulario.appendChild(divAviso);
        contenedorFormularios.appendChild(formulario);
     }
   //FIN FORMULARIO SEGURIDAD --------------------------------------------------------------------------------------


   //FORMULARIO DATOS --------------------------------------------------------------------------------------

     function formularioDatos(){
        let contenedorFormularios = document.getElementById("formularioAjustes");
        let contendorFormularioDatos = document.createElement("div");

        let titulo = document.createElement("h3");
        titulo.innerHTML = "Mostrar Datos del usuario";

        let formulario = document.createElement("form");
        formulario.setAttribute("action", "ajustes.php");
        formulario.setAttribute("method", "POST");
        formulario.setAttribute("id", "formularioDatos");

        
        let botonSubmit = document.createElement("input") ;
        botonSubmit.setAttribute("type", "submit");
        botonSubmit.setAttribute("class", "btnEnviar");
        botonSubmit.setAttribute("id", "btnEnviar");
        botonSubmit.setAttribute("value", "Mostrar Datos");
        botonSubmit.setAttribute("style", "color:#006a4b; background: #eac839;");
        botonSubmit.name = "datosPersonales";

        formulario.appendChild(botonSubmit);
        contendorFormularioDatos.appendChild(titulo);
        contendorFormularioDatos.appendChild(formulario);
        contenedorFormularios.appendChild(contendorFormularioDatos);
     }

        if(document.getElementById('volver')){
            var volver = document.getElementById('volver');
            volver.addEventListener('click', e=>{
                location.href = "ajustes.php?alertas";
            });
        }


        function verResultados(){
            valido =  formularioValido.includes(0);
            if(formularioValido.length == 3){
                if(valido == false){
                    document.getElementById("btnEnviar").disabled = false;
                    document.getElementById("btnEnviar").style.backgroundColor = "#eac839";
                    document.getElementById("btnEnviar").style.color = "#006346";

                }else if(valido == true){
                    document.getElementById("btnEnviar").disabled = true;
                    document.getElementById("btnEnviar").style.backgroundColor = "#A9A9A9";
                    document.getElementById("btnEnviar").style.color = "#006346";

                }
            }
        }