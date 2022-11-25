//FECHA DE HOY
const fecha = new Date();
const FechaHoy = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate();


var inicio = document.getElementById("inicio");
var fin = document.getElementById("fin");

inicio.setAttribute("max", FechaHoy);
fin.setAttribute("max", FechaHoy);

inicio.addEventListener("change", e=>{
        if((inicio.value > fin.value) || (inicio.value == "")){
            document.getElementById("enviar").disabled =  true;
            document.getElementById("enviar").style.background = "#9d9d9d";
        }else{
            document.getElementById("enviar").disabled =  false;
            document.getElementById("enviar").style.background = "#fec14a";
            document.getElementById("enviar").style.color = "#006346";
        }
})

fin.addEventListener("change", e=>{
    if((fin.value < inicio.value) || (fin.value == "")){
        document.getElementById("enviar").disabled =  true;
        document.getElementById("enviar").style.background = "#9d9d9d";
    }else{
        document.getElementById("enviar").disabled =  false;
        document.getElementById("enviar").style.background = "#fec14a";
        document.getElementById("enviar").style.color = "#006346";
    }
})

var movimientos = document.getElementById("movimientos").addEventListener("click", e=>{

    eliminarContenido();
    document.getElementById("carga").style.background = "none";
    document.getElementById("carga").style.zIndex = "-1";
    location.href = "./cuentas.php";
});

var datos = document.getElementById("datos").addEventListener("click", e=>{

        eliminarContenido();
        document.getElementById("carga").style.background = "grey";
        document.getElementById("carga").style.zIndex = "1";
        document.getElementById("carga").innerHTML = "<div class='contenedorLoader'><div class='loader'></div></div>";
        function carga() {
            asignarFormulario();
        }
        const myTimeout = setTimeout(carga, 3000);
        document.getElementById("enviar").name = "datos";
   
});

var saldo = document.getElementById("saldo").addEventListener("click", e=>{

        eliminarContenido();
        document.getElementById("carga").style.background = "grey";
        document.getElementById("carga").style.zIndex = "1";
        document.getElementById("carga").innerHTML = "<div class='contenedorLoader'><div class='loader'></div></div>";
        function carga() {
            asignarFormulario();
        }
        const myTimeout = setTimeout(carga, 4000);       
        document.getElementById("enviar").name = "saldo";   
      
      
   
});

function eliminarContenido(){
    if(document.getElementById("tablaMovimientos")){
        document.getElementById("tablaMovimientos").remove();
        document.getElementById("movimientosTitu").remove();
        if( document.getElementById("pdfDescarga")){
            document.getElementById("pdfDescarga").remove();
        }
    }
    if(document.getElementById("tablaSaldo")){
        document.getElementById("tablaSaldo").remove();
        document.getElementById("datosTitu").remove();
        if( document.getElementById("pdfDescarga")){
            document.getElementById("pdfDescarga").remove();
        }
    }
    
}

function asignarFormulario(){

    var formulario = document.getElementById("formulario");
    let divfecha = document.getElementById("fecha");

    formulario.style.display = "flex";
    formulario.style.flexDirection = "column";

    document.getElementById("enviar").disabled = false;
    document.getElementById("enviar").style.background = "#fec14a";
    document.getElementById("enviar").style.color = "#006346";

    document.getElementById("carga").style.background = "none";
    document.getElementById("carga").style.zIndex = "-1";
    document.getElementById("carga").innerHTML = "";
    
    formulario.removeChild(divfecha);
   
}

