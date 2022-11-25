function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
    document.getElementById("btn-menu").style.display = "none";

}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("btn-menu").style.display = "flex";
}
var contador = 0;
var ajustes = document.getElementById("ajustes").addEventListener("click", e =>{
    if(contador == 0){
        document.getElementById("listaajustes").style.display = "flex";
        document.getElementById("flecha").src = "../Imagenes/flecha-abajo.png";
        contador++;
    }else{
        document.getElementById("listaajustes").style.display = "none";
        document.getElementById("flecha").src = "../Imagenes/flecha-derecha.png";
        contador--;
    }
});
if(window.location.pathname == "/REPASO%20DEL%20CURSO/BANCA%20DIGITAL/PHP/pagina_principal.php"){
    window.onload = e => {
        document.addEventListener("scroll", ()=>{
            var y = window.scrollY;
            if(y >= 10 && y<=322){
                document.getElementById("main").style.backgroundColor = "transparent";
                document.getElementById("titulo").style.visibility = "hidden";
                document.getElementById("main").style.boxShadow = "none";

            }else if(y > 322){
                document.getElementById("main").style.backgroundColor = "#006346"
                document.getElementById("titulo").style.visibility = "visible";
                document.getElementById("main").style.boxShadow = " rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset";
            }else if(y < 10){
                document.getElementById("main").style.backgroundColor = "#006346";
                document.getElementById("titulo").style.visibility = "visible";
                document.getElementById("main").style.boxShadow = "none";
            }
        })
    };
}
// window.onscroll = function() {
//     var y = window.scrollY;
//     console.log(y);
// };


let slideIndex = [1,1];
let slideId = ["mySlides1", "mySlides2"]
showSlides(1, 0);
showSlides(1, 1);

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}    
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex[no]-1].style.display = "block";  
}


var botonSolicitud = document.getElementById("solicitudVirtual").addEventListener("click", e =>{
                    
    function recargarPagina() {
        location.reload();
    }

    setTimeout(recargarPagina, 3000);
});


