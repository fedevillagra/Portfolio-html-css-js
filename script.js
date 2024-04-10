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

/*
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
*/

// ---  Contruir las cards con js ----
// Datos de los proyectos
const proyectos = [
  {
      nombre: "E-commerce app",
      imagen: "./assets/project-1.png",
      github: "https://github.com/fedevillagra/React.js",
      open: "https://proyecto-final-federico-villagra.vercel.app/"
  },
  {
      nombre: "Weather app",
      imagen: "./assets/project-2.png",
      github: "https://github.com/fedevillagra/weather-app-next.js",
      open: "https://weather-app-next-js-fedevillagra.vercel.app/"
  },
  {
      nombre: "Shopping app",
      imagen: "./assets/project-3.png",
      github: "https://github.com/fedevillagra/Proyecto_Final_Backend",
      open: "https://github.com/fedevillagra"
  },
  {
      nombre: "Tic-Tac-Toe app",
      imagen: "./assets/project-4.png",
      github: "https://github.com/fedevillagra/tic-tac-toe",
      open: "https://fv-tic-tac-toe.vercel.app/TicTacToe"
  }
];
// Función para construir las cards de proyectos
function construirCards() {
  const container = document.querySelector('#cards');

  proyectos.forEach(proyecto => {
      // Crear contenedor principal
      const cardContainer = document.createElement('div');
      cardContainer.classList.add('details-container', 'color-container');

      // Crear contenedor de imagen
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('article-container');
      const imagen = document.createElement('img');
      imagen.src = proyecto.imagen;
      imagen.alt = proyecto.nombre;
      imagen.classList.add('project-img');
      imgContainer.appendChild(imagen);

      // Crear título del proyecto
      const titulo = document.createElement('h2');
      titulo.textContent = proyecto.nombre;
      titulo.classList.add('experience-sub-title', 'project-title');

      // Crear contenedor de botones
      const btnContainer = document.createElement('div');
      btnContainer.classList.add('btn-container');
      const btnGithub = crearBoton("Github", proyecto.github);
      const btnOpen = crearBoton("Open", proyecto.open);
      btnContainer.appendChild(btnGithub);
      btnContainer.appendChild(btnOpen);

      // Agregar elementos al contenedor principal
      cardContainer.appendChild(imgContainer);
      cardContainer.appendChild(titulo);
      cardContainer.appendChild(btnContainer);

      // Agregar contenedor principal al contenedor padre
      container.appendChild(cardContainer);
  });
}
// Función para crear botones
function crearBoton(texto, enlace) {
  const boton = document.createElement('button');
  boton.classList.add('btn', 'btn-color-2', 'project-btn');
  boton.textContent = texto;
  boton.onclick = function() {
      window.open(enlace, '_blank');
  };
  return boton;
}
// Llamar a la función para construir las cards
construirCards();