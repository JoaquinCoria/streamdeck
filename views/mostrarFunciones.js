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
    if (window.scrollY > 550) {
        info[0].style.transition = "all 800ms";
        info[0].style.transform = "translateX(0)";
    } else {
        info[0].style.transform = "translateX(-100vw)";
    }
    if (window.scrollY > 900) {
        info[1].style.transition = "all 800ms";
        info[1].style.transform = "translateX(0)";
    } else {
        info[1].style.transform = "translateX(100vw)";
    }
    if (window.scrollY > 1200) {
        info[2].style.transition = "all 800ms";
        info[2].style.transform = "translateX(0)";
    } else {
        info[2].style.transform = "translateX(-100vw)";
    }
});