

function convertDataFromTable() {  // La tabla deberia llegar por parametro, en este caso se usa directamente del dom
    'use strict';					// Podemos usar jquery o no, hay que decidir
    var json = {};
    var tabla = document.getElementById('tablaejemplo');
    var theads = tabla.querySelectorAll('th');
   

   
  	for (var i= 1 ; i < tabla.querySelectorAll('tr').length ; i++) {
    	var row = (tabla.querySelectorAll('tr')[i]);
    	
    	for ( var j = 0 ; j < row.querySelectorAll('td').length ; j ++ ){
    		
    		json[theads[j].innerText] = row.querySelectorAll('td')[j].innerText;
    	}
    } 

    console.log(json);
}



