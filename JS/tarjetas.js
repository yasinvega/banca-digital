//Jquery para el menu
$(document).ready(function(){

    $(".menuTarjetas li").hide();
    $("#listaConsulta").click(function(){
        $("#gestiones li").hide(500);
        $("#consultas li").toggle(500);
    });
    $("#listaGestion").click(function(){
        $("#consultas li").hide(500);
        $("#gestiones li").toggle(500);
    });
  
    
  });



  var selectTarjetas = document.getElementById("selectTarjetas").addEventListener("click", e=>{
        if((document.getElementById("selectTarjetas").value == "nada") || (document.getElementById("fechas").childNodes.length > 0 )){
            document.getElementById("selectTarjetas").style.borderColor = "red";
            document.getElementById("enviar").style.background = "grey";
            document.getElementById("enviar").style.color = "#f1f1f1";
            document.getElementById("enviar").disabled = true;
        }else{
            document.getElementById("selectTarjetas").style.borderColor = "#006a4b";
            document.getElementById("enviar").disabled = false;
            document.getElementById("enviar").style.background = "#eac839";
            document.getElementById("enviar").style.color = "#006a4b";

        }
  });
  var saldos = document.getElementById("saldos").addEventListener("click", e=>{
        document.getElementById("selectTarjetas").disabled =  false;
        location.reload();

  });

  
  var movimientos = document.getElementById("movimientos").addEventListener("click", e=>{

        
        var contenedorMovimientos = document.getElementById("fechas");
        contenedorMovimientos.innerHTML = "";
        document.getElementById("resultados").innerHTML = "";
        const fecha = new Date();
        const FechaHoy = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate();


        let div1 = document.createElement("div");
        div1.setAttribute("id", "Finicio");
        div1.setAttribute("class", "Finicio");

        let div2 = document.createElement("div");
        div2.setAttribute("id", "Ffin");
        div2.setAttribute("class", "Ffin");

        let label1 = document.createElement("label");
        label1.setAttribute("color", "#006a4b");
        label1.innerHTML = "Fecha Inicio";

        let label2 = document.createElement("label");
        label2.setAttribute("color", "#006a4b");
        label2.innerHTML = "Fecha Fin";

        let calendario1 = document.createElement("input");
        calendario1.setAttribute("type", "date");
        calendario1.setAttribute("name", "inicio");
        calendario1.setAttribute("width", "100");
        calendario1.setAttribute("color", "#006a4b");
        calendario1.setAttribute("max", FechaHoy);

        let calendario2 = document.createElement("input");
        calendario2.setAttribute("type", "date");
        calendario2.setAttribute("name", "fin");
        calendario2.setAttribute("width", "100");
        calendario2.setAttribute("color", "#006a4b");
        calendario2.setAttribute("max", FechaHoy);

        
        div1.appendChild(label1);
        div1.appendChild(calendario1);
        div2.appendChild(label2);
        div2.appendChild(calendario2);
        document.getElementById("etiquetatitu").innerHTML = "Movimientos"
        contenedorMovimientos.appendChild(div1);
        contenedorMovimientos.appendChild(div2);

        calendario1.addEventListener("change", e=>{
            if((calendario1.value > calendario2.value) || (calendario1.value == "")){
                document.getElementById("enviar").disabled =  true;
                document.getElementById("enviar").style.background = "#9d9d9d";
            }else{
                document.getElementById("enviar").disabled =  false;
                document.getElementById("enviar").style.background = "#fec14a";
                document.getElementById("enviar").style.color = "#006346";
            }
        })
        
        calendario2.addEventListener("change", e=>{
            if((calendario2.value < calendario1.value) || (calendario2.value == "")){
                document.getElementById("enviar").disabled =  true;
                document.getElementById("enviar").style.background = "#9d9d9d";
            }else{
                document.getElementById("enviar").disabled =  false;
                document.getElementById("enviar").style.background = "#fec14a";
                document.getElementById("enviar").style.color = "#006346";
            }
        })

        document.getElementById("enviar").name = "ConsultarMovimientos";
        document.getElementById("selectTarjetas").disabled =  false;
  });

  var opciones = Array.from(document.getElementById("selectTarjetas").options).map(e => e.value);

  var activar = document.getElementById("activar").addEventListener("click", e=>{
         if(opciones[2] == undefined){
            Swal.fire({
                title: '<img src="../Imagenes/error.png"><br>No puedes realizar esta accion. No dispones de tarjeta prepago.',
                width: 500,
                padding: '10',
                color: '#2f2f2f',
                background: '#fec14a',
                backdrop:`rgba(30, 30, 30, 0.4)`
              })
         }else{
            document.getElementById("etiquetatitu").innerHTML = "Activar Tarjeta Prepago"
            document.getElementById("fechas").innerHTML = "";
            document.getElementById("resultados").innerHTML = "";
            document.getElementById("selectTarjetas").disabled = true;
            document.getElementById("selectTarjetas").value = opciones[2];
            document.getElementById("enviar").name = "ConsultarActivar";
            document.getElementById("enviar").disabled =  false;
            document.getElementById("enviar").style.background = "#fec14a";
            document.getElementById("enviar").style.color = "#006346";
         }
  });

  var bloquear = document.getElementById("bloquear").addEventListener("click", e=>{
     if(opciones[2] == undefined){
        Swal.fire({
            title: '<img src="../Imagenes/error.png"><br>No puedes realizar esta accion. No dispones de tarjeta prepago.',
            width: 500,
            padding: '10',
            color: '#2f2f2f',
            background: '#fec14a',
            backdrop:`rgba(30, 30, 30, 0.4)`
          })
     }else{
        document.getElementById("etiquetatitu").innerHTML = "Bloquear Tarjeta Prepago"
        document.getElementById("fechas").innerHTML = "";
        document.getElementById("resultados").innerHTML = "";
        document.getElementById("selectTarjetas").disabled = true;
        document.getElementById("selectTarjetas").value = opciones[2];
        document.getElementById("enviar").name = "ConsultarBloquear";
        document.getElementById("enviar").disabled =  false;
        document.getElementById("enviar").style.background = "#fec14a";
        document.getElementById("enviar").style.color = "#006346";
     }
  });

var pin = document.getElementById("pin").addEventListener("click", e=>{
        document.getElementById("fechas").innerHTML = "";
        document.getElementById("etiquetatitu").innerHTML = "Consultar PIN"
        document.getElementById("enviar").name = "ConsultarPin";
        document.getElementById("selectTarjetas").disabled =  false;
});


var carga = document.getElementById("carga").addEventListener("click", e=>{
    if(opciones[2] == undefined){
        Swal.fire({
            title: '<img src="../Imagenes/error.png"><br>No puedes realizar esta accion. No dispones de tarjeta prepago.',
            width: 500,
            padding: '10',
            color: '#2f2f2f',
            background: '#fec14a',
            backdrop:`rgba(30, 30, 30, 0.4)`
          })

     }else{
            document.getElementById("etiquetatitu").innerHTML = "Carga / Descarga Tarjeta prepago";
            document.getElementById("enviar").name = "RecargaPrepago";
            document.getElementById("selectTarjetas").disabled = true;
            document.getElementById("selectTarjetas").value = opciones[2];
            var divFechas = document.getElementById("fechas");
            divFechas.innerHTML = ""
            document.getElementById("resultados").innerHTML = "";

            var cantidad = document.createElement("input");
            cantidad.setAttribute("id","cantidad");
            cantidad.setAttribute("class","cantidadRecarga");
            cantidad.setAttribute("name","cantidad");
            cantidad.addEventListener("keyup", e=>{
                if((cantidad.value.length == 0)  || (isNaN(cantidad.value) == true)){
                        cantidad.style.borderColor = "red";
                        document.getElementById("enviar").disabled = true;
                        document.getElementById("enviar").style.background = "grey";
                        document.getElementById("enviar").style.color = "#f1f1f1";
                }else{
                        document.getElementById("enviar").disabled =  false;
                        document.getElementById("enviar").style.background = "#fec14a";
                        document.getElementById("enviar").style.color = "#006346";
                }
            });

            var selectOpcion = document.createElement("select");
            selectOpcion.setAttribute("name","opcionesRecarga");
            selectOpcion.setAttribute("class","opcionesRecarga");
            var opcionesSelect1 = document.createElement("option");
            opcionesSelect1.setAttribute("value","carga");
            opcionesSelect1.innerHTML = "Carga";
            var opcionesSelect2 = document.createElement("option");
            opcionesSelect2.setAttribute("value","descarga");
            opcionesSelect2.innerHTML = "Descarga";

            let label1 = document.createElement("label");
            label1.setAttribute("color", "#006a4b");
            label1.innerHTML = "Cantidad de carga/Descarga ";
        
            let div1 = document.createElement("div");
            div1.setAttribute("class", "Finicio");
        
            let div2 = document.createElement("div");
            div2.setAttribute("id", "Ffin");
            div2.setAttribute("class", "Ffin");

            let label2 = document.createElement("label");
            label2.setAttribute("color", "#006a4b");
            label2.innerHTML = "*Seleccione Opcion";

            selectOpcion.appendChild(opcionesSelect1);
            selectOpcion.appendChild(opcionesSelect2);

            div1.appendChild(label1);
            div1.appendChild(cantidad);
            div2.appendChild(label2);
            div2.appendChild(selectOpcion);
            divFechas.appendChild(div1);
            divFechas.appendChild(div2);
    }
});


