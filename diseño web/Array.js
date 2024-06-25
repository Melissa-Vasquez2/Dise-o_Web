var arr=new Array(3,44,55,66);
let a=[3,4,77,66,55];
var nom=["Melissa","Vasquez","Zarate"];

// Función para imprimir los valores de los arreglos en los inputs
function imprimirValores() {
    document.getElementById('array1').value = arr.join(', ');
    document.getElementById('array2').value = a.join(', ');
    document.getElementById('array3').value = nom.join(', ');
}

// Llamar a la función cuando la página haya cargado completamente
window.onload = imprimirValores;