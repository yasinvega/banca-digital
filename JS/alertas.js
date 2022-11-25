var alertas = document.getElementById("alertas").addEventListener("click", e =>{

        var contenedorAlertas = document.getElementById("contenedorAlertas");
        contenedorAlertas.innerHTML = "";

        contenedorAlertas.innerHTML = "<div class='contenedorLoader'><div class='loader'></div></div>";

        function carga() {
            cargarFormularioAlertas();
        }

        const myTimeout = setTimeout(carga, 4000);

        function cargarFormularioAlertas(){
            contenedorAlertas.innerHTML = "";
            var formularioAlerta = document.createElement("form");
            formularioAlerta.setAttribute("action", "./pagina_principal.php");
            formularioAlerta.setAttribute("method", "POST");


            var label = document.createElement("label");
            label.setAttribute("class", "etiquetaAlerta");
            label.textContent = "Saldo Minimo";

            
            var botonAlerta = document.createElement("button");
            botonAlerta.setAttribute("id", "btnAlerta");
            botonAlerta.setAttribute("class", "btnAlerta");
            botonAlerta.setAttribute("name", "btnAlerta");
            botonAlerta.textContent = "Crear Alerta" ;
            botonAlerta.setAttribute("disabled", "true");
            botonAlerta.style.background = "#A9A9A9";
            botonAlerta.style.color= "#006346";
            
            var contenedorRango = document.createElement("div");
            contenedorRango.setAttribute("class", "contedorRango");

            var outputRange = document.createElement("output")
            outputRange.setAttribute("id", "cantidad");
            outputRange.innerHTML = "0€";

            var input = document.createElement("input");
            input.setAttribute("type", "range");
            input.setAttribute("min", "0");
            input.setAttribute("max", parseInt(document.getElementById("disponible").textContent));
            input.setAttribute("id", "alertaInput");
            input.setAttribute("class", "alertaInput");
            input.setAttribute("name", "alertaInput");
            input.addEventListener("mousemove", ()=>{
                outputRange.innerHTML = input.value+" €";
                if(input.value == 0){
                     botonAlerta.disabled =  true;
                     botonAlerta.style.background = "#A9A9A9";
                     botonAlerta.style.color= "#006346";
                 }else{
                     botonAlerta.disabled =  false;
                     botonAlerta.style.background = "#eac839";
                     botonAlerta.style.color= "#006346";
                }
            });
         

            formularioAlerta.appendChild(label);
            contenedorRango.appendChild(input);
            contenedorRango.appendChild(outputRange);
            formularioAlerta.appendChild(contenedorRango);
            formularioAlerta.appendChild(botonAlerta);
            contenedorAlertas.appendChild(formularioAlerta);
        }
});