//Menu hamburguesa responsive
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

//nombre de la persona del portfolio
let name_profile = "Federico Villagra";
let elementos = document.querySelectorAll('.name-profile');
elementos.forEach(function(elemento) {
    elemento.textContent = name_profile;
});

// Año actual para derechos reservados
let fechaActual = new Date();
let anioActual = fechaActual.getFullYear();
document.getElementById('anio-actual').textContent = anioActual + " ";

// copiar mail
const mail = document.querySelector('.mail');
const copiarMail = () => {
  navigator.clipboard.writeText(mail.textContent);
  mostrarMensajeCopiado();
};
mail.addEventListener("click", copiarMail);
const mostrarMensajeCopiado = () => {
    // Crea el mensaje "copiado"
    var mensajeCopiado = document.createElement('div');
    mensajeCopiado.textContent = 'Copied';
    mensajeCopiado.id = 'mensaje-copiado';

    // Agrega el mensaje al cuerpo del documento
    document.body.appendChild(mensajeCopiado);

    // Obtiene la posición del cursor
    var posX = event.clientX;
    var posY = event.clientY;

    // Establece la posición del mensaje cerca del cursor
    mensajeCopiado.style.left = (posX + 10) + 'px'; // Añade 10px para separarlo del cursor
    mensajeCopiado.style.top = (posY + 10) + 'px'; // Añade 10px para separarlo del cursor

    // Muestra el mensaje
    mensajeCopiado.style.display = 'block';

    // Oculta el mensaje después de un tiempo
    setTimeout(function() {
        mensajeCopiado.style.display = 'none';
    }, 500); // Oculta el mensaje después de 0.5 segundos
}
