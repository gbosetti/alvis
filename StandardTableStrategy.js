

function convertDataFromTable() {  // La tabla deberia llegar por parametro, en este caso se usa directamente del dom
    'use strict';					// Podemos usar jquery o no, hay que decidir

    var tabla = document.getElementById('tablaejemplo');
    var theads = tabla.querySelectorAll('th');
    console.log(theads[0].innerText);
}