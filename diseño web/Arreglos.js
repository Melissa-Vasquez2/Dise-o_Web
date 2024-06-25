//VALORES DE ALMACENAMIENO LOCAL:
window.onload = function() {
    var nombre = prompt("Introduce tu nombre: ");
    if (nombre) {  // Solo guardar si el usuario ha introducido un nombre
        localStorage.setItem("nombre_variable", nombre);
    }
};
function leer() {
    let txtnom = document.getElementById("txtnombre");
    var nombre = localStorage.getItem("nombre_variable");
    if (nombre) {  // Solo mostrar si hay un nombre guardado
        txtnom.value = nombre;
    } else {
        txtnom.value = "No se ha guardado ningún nombre.";
    }
}
//SOLICITAR MATRICULA PARA LA REALIZACION: VALORES DE ALMACENAMIENTO LOCAL:
window.onload = function() {
    // Obtener los valores de localStorage
    var nombre = localStorage.getItem('nombre');
    var matricula = localStorage.getItem('matricula');

    // Mostrar los valores en los elementos correspondientes
    document.getElementById('mostrarNombre').textContent = nombre;
    document.getElementById('mostrarMatricula').textContent = matricula;
};

function regresar() {
    window.location.href = 'inicio.html';
}
