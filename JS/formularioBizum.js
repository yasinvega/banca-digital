var formularioValido = new Array();
var valido = 0;


var Camponumero = document.getElementById("numero").addEventListener("keyup", function(){
        if((isNaN(document.getElementById("numero").value) == true) || (document.getElementById("numero").value.length != 9)){
            document.getElementById("numero").style.borderColor = "red";
            formularioValido[0] = 0;
            verResultados();
        }else{
            const regexp = /^[6-7]/;
            if(document.getElementById("numero").value.match(regexp) == null){
                document.getElementById("numero").style.borderColor = "red";
                formularioValido[0] = 0;
                verResultados();
            }else{
                document.getElementById("numero").style.borderColor = "#006346";
                formularioValido[0] = 1;
                verResultados();
            }      
        }
});


var Campoimporte = document.getElementById("importe").addEventListener("keyup", function(){
    if((isNaN(document.getElementById("importe").value) == true) || (document.getElementById("importe").value.length == 0)){
        document.getElementById("importe").style.borderColor = "red";
        formularioValido[1] = 0;
        verResultados();
    
    }else{
        if( document.getElementById("importe").value > parseInt(document.getElementById("disponible").textContent)){
            document.getElementById("importe").style.borderColor = "red";
            document.getElementById("limiteSaldo").innerHTML = "Superaste tu limite de saldo";
            formularioValido[1] = 0;
            verResultados();
        }else{
            document.getElementById("importe").style.borderColor = "#006346";
            document.getElementById("limiteSaldo").innerHTML = "";
            formularioValido[1] = 1;
            verResultados();
        }
    }
});


var Campoconcepto = document.getElementById("concepto").addEventListener("keyup", function(){
    if((document.getElementById("concepto").value.length == 0)){
        document.getElementById("concepto").style.borderColor = "red";
        formularioValido[2] = 0;
        verResultados();
    }else{
        document.getElementById("concepto").style.borderColor = "#006346";
        formularioValido[2] = 1;
        verResultados();
    }
});


function verResultados(){
    valido =  formularioValido.includes(0);
    if(formularioValido.length == 3){
        if(valido == false){
            document.getElementById("enviar").disabled = false;
            document.getElementById("enviar").style.backgroundColor = "#eac839";
            document.getElementById("enviar").style.color = "#006346";
            document.getElementById("numero").readOnly = true; 
            document.getElementById("importe").readOnly = true; 
        }else if(valido == true){
            document.getElementById("enviar").disabled = true;
            document.getElementById("enviar").style.backgroundColor = "#A9A9A9";
            document.getElementById("enviar").style.color = "#006346";
            document.getElementById("numero").readOnly = false;
            document.getElementById("importe").readOnly = false;
        }
    }
}

