console.log("hola");
const info = document.getElementsByClassName("info1");
window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
        info[0].style.transform = "translateX(0)";
        info[1].style.color = "red";
    } else {
    }
});