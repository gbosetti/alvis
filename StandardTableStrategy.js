// ==UserScript==
// @name         StandardTableStrategy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tampermonkey.net/index.php?version=4.7&ext=dhdg&updated=true
// @grant        none
// ==/UserScript==

(function convertDataFromTable() {  // La tabla deberia llegar por parametro, en este caso se usa directamente del dom
    'use strict';					// Podemos usar jquery o no, hay que decidir

    var tabla = document.getElementById('tablaejemplo');
    var theads =; 
})();