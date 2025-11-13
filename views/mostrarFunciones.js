const streamdeck = document.getElementsByClassName('streamdeck');
const botones = Array.from(document.getElementsByClassName('labelBoton'));
const funciones = document.getElementsByClassName('funciones');
const funcionAnterior = document.getElementsByClassName('direccionPrevia');
botones.forEach(boton => {
    boton.onclick = function(){
        streamdeck[0].style.transform = "translateX(0)";
        streamdeck[0].style.transition = "all 300ms";
        const seleccionado = document.getElementsByClassName('seleccionado');
        const funcionesActivo = document.getElementsByClassName('funcionesActivo');
        if(seleccionado[0] !== undefined){
            seleccionado[0].classList.remove('seleccionado');
            funciones[0].style.transform = "translateX(0)";
            funciones[0].style.transition = "all 300ms";   
            funcionesActivo[0].classList.remove('funcionesActivo');
        }
        boton.classList.add('seleccionado');
        funciones[0].classList.add('funcionesActivo');
        let encontrado = false;
        funcionesBotones.forEach(itemArray => {
            if(itemArray['boton'] == boton.id.slice(-1)){
                funcionAnterior[0].style.display = "block";
                funcionAnterior[0].textContent = "Direccion previa: " + itemArray['direccion'];
                encontrado = true;
            }
        });
        if(encontrado == false){
            funcionAnterior[0].style.display = "none";
        }
    }
});
const botonesPredeterminados = Array.from(document.getElementsByClassName('botonPredeterminado'));
const inputDireccion = document.getElementById('archivo');

botonesPredeterminados.forEach(botonPredeterminado => {
    botonPredeterminado.onclick = function(){
        inputDireccion.value = botonPredeterminado.value;
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