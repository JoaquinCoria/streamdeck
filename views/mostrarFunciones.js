const streamdeck = document.getElementsByClassName('streamdeck');
const botones = Array.from(document.getElementsByClassName('labelBoton'));
const funciones = document.getElementsByClassName('funciones');
botones.forEach(boton => {
    boton.onclick = function(){
        streamdeck[0].style.transform = "translateX(0)";
        streamdeck[0].style.transition = "all 300ms";
        const seleccionado = document.getElementsByClassName('seleccionado');
        const funcionesActivo = document.getElementsByClassName('funcionesActivo');
        if(seleccionado[0] !== undefined){
            // console.log(funciones.style.transform);
            seleccionado[0].classList.remove('seleccionado');
            funciones[0].style.transform = "translateX(0)";
            funciones[0].style.transition = "all 300ms";   
            funcionesActivo[0].classList.remove('funcionesActivo');
        }
        boton.classList.add('seleccionado');
        console.log(funciones);
        funciones[0].classList.add('funcionesActivo');
        numeroBoton = boton.id.slice(-1);
    }
});
const info = document.getElementsByClassName("info1");
window.addEventListener('scroll', function() {
    if (window.scrollY > 750) {
        info[0].style.transform = "translateX(0)";
        info[1].style.color = "red";
    } else {
        
    }
});