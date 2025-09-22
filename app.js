
let amigos = [];


// Función que agrega nombres al arreglo 'amigos', con el botón 'Añadir'
function agregarAmigo(){
    //obtener el valor del input
    let amigo = document.getElementById('amigo').value;

    //si el nombre es válido:
    if (validarNombre(amigo)){
        amigos.push(amigo);         // se agrega al arreglo 'amigos'
        actualizarListaAmigos();   // se actualiza la lista visible para el usuario
        limpiarElemento('amigo'); //  se limpia el valor de la caja de textos   
        limpiarElemento('resultado');  //  se limpia el mensaje de sorteo  
    }
}

// Función que valida el nombre ingresado
function validarNombre(amigo){
    // validar campo vacío
    if (amigo.trim() ===''){
        alert("Por favor, inserte un nombre.");
        return false;
    } 

    // validar que solo tenga letras 
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(amigo)) {
        alert("El nombre solo puede incluir letras.");
        return false;
    }

    // validar longitud menor a 20 caracteres
    if (amigo.length > 20) {
        alert("El nombre no debe superar los 20 caracteres.");
        return false;
    }

    // validar nombre reptido
    if (amigos.includes(amigo)){
        alert("El nombre ya fue ingresado.\n" +
                "Inserte un nuevo nombre.")
        return false;
    } 

    // nombre válido: si ya pasó todas las validaciones
    return true; 
}


// Función que actualiza la lista visible para el usuario
function actualizarListaAmigos(){
   
    let lista = document.getElementById('listaAmigos');  // obtener lista
    lista.innerHTML = ""                                // limpiar lista 
    
    // Agregar cada amigo como un elemento <li>
    for (let i = 0; i < amigos.length; i++) {
        let li = document.createElement("li"); // crear elemento li
        li.textContent = amigos[i];            // asignarle el texto
        lista.appendChild(li);                // Agregar elemento a lista
    }
}


// Función que limpia el elemento seleccionado
function limpiarElemento(id) {
    const elemento = document.getElementById(id);
  
    if ('value' in elemento) {
        elemento.value = '';
        elemento.focus();
    } else {
        elemento.innerHTML = '';
    }
}

// Función que selecciona alteoriamente uno de los nombres
function sortearAmigo(){

    // Si se agregaron menos de 2 nombres
    if (amigos.length < 2) {
        document.getElementById('resultado').innerHTML = 'Ingrese al menos dos amigos para realizar el sorteo.';
        return; // se sale de la función
    } 

    // Si se agregaron al menos 2 nombres
    let i = Math.floor(Math.random()* amigos.length);  // se genera un valor de índice aleatorio
    let nombreSorteado = amigos[i];                    // se guarda el nombre del amigo de ese índice
    document.getElementById('resultado').innerHTML = `El amigo secreto sorteado es: ${nombreSorteado}`;

    // condiciones al finalizar juego
    limpiarElemento('listaAmigos');          // limpiar la lista visible
    deshabilitarElemento('#amigo');         // deshabilitar input
    deshabilitarElemento('.button-add');    // deshabilitar botón añadir
    deshabilitarElemento('.button-draw');   // deshabilitar botón sortear  
    actualizarMensajeTitulo("🎉 ¡Juego Finalizado! Reiniciar para volver a empezar."); 
}



// Función que deshabilita el elemento indicado
function deshabilitarElemento(selector) {
    const elemento = document.querySelector(selector);
    elemento.setAttribute('disabled', 'true');
}

// Función que habilita el elemento indicado
function habilitarElemento(selector) {
    const elemento = document.querySelector(selector);
    elemento.removeAttribute('disabled');
}

// Función para actualizar el mensaje del título
function actualizarMensajeTitulo(mensaje) {
    const titulo = document.querySelector('.section-title');
    titulo.textContent = mensaje;
}


// Función que reinicia el juego, reestablece las condiciones iniciales. 
// (se puede reiniciar el juego tanto antes como después del sorteo)
function reiniciarJuego() {
    amigos = [];  // vaciar el array global

    // limpiar elementos:
    limpiarElemento('amigo');            // nombre en el input
    limpiarElemento('listaAmigos');      // lista visible
    limpiarElemento('resultado');        // mensaje de sorteo
    
    // Habilitar elementos:
    habilitarElemento('#amigo');         // input
    habilitarElemento('.button-add');    // botón añadir
    habilitarElemento('.button-draw');   // botón sortear

    // Restaurar texto original del título
    actualizarMensajeTitulo("Digite el nombre de sus amigos");
}
