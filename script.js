// --- Menu hamburguesa responsive ---
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
// ---------------------------------------------------------------------------------------------

// --- Nombre de la persona del portfolio ----
let name_profile = "Federico Villagra";
let elementos = document.querySelectorAll('.name-profile');
elementos.forEach(function(elemento) {
    elemento.textContent = name_profile;
});
// ---------------------------------------------------------------------------------------------

// --- Año actual footer ---
let fechaActual = new Date();
let anioActual = fechaActual.getFullYear();
document.getElementById('anio-actual').textContent = anioActual;
// ---------------------------------------------------------------------------------------------

// --- Construir los cuadros de experiencia ---
// Definir un objeto con la estructura de datos de las experiencias
const experiences = {
  "Frontend Development": [
    { technology: "HTML", level: "Experienced" },
    { technology: "CSS", level: "Experienced" },
    { technology: "JavaScript", level: "Experienced" },
    { technology: "Bootstrap", level: "Intermediate" },
    { technology: "Tailwind", level: "Experienced" },
    { technology: "React", level: "Experienced" }
  ],
  "Backend Development": [
    { technology: "Node JS", level: "Experienced" },
    { technology: "Express JS", level: "Experienced" },
    { technology: "MongoDB", level: "Experienced" },
    { technology: "Git", level: "Intermediate" },
    { technology: "PHP", level: "Experienced" },
    { technology: "MySQL", level: "Experienced" }
  ]
};

// Obtener el contenedor de experiencia
const experienceContainer = document.getElementById("experiencee");

// Iterar sobre el objeto de experiencias
for (const category in experiences) {
  // Crear elementos HTML para cada categoría
  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("details-container");

  const categoryTitle = document.createElement("h2");
  categoryTitle.classList.add("experience-sub-title", "translate");
  categoryTitle.textContent = category;

  const articleContainer = document.createElement("div");
  articleContainer.classList.add("article-container");

  // Iterar sobre las tecnologías de cada categoría
  experiences[category].forEach(tech => {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = "./assets/checkmark.png";
    img.alt = "Experience icon";
    img.classList.add("icon");

    const div = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.textContent = tech.technology;

    const p = document.createElement("p");
    p.textContent = tech.level;

    div.appendChild(h3);
    div.appendChild(p);

    article.appendChild(img);
    article.appendChild(div);

    articleContainer.appendChild(article);
  });

  // Agregar los elementos creados al contenedor de experiencia
  categoryContainer.appendChild(categoryTitle);
  categoryContainer.appendChild(articleContainer);
  experienceContainer.appendChild(categoryContainer);
}
// ---------------------------------------------------------------------------------------------

// --- Contruir las cards con js ---
// Datos de los proyectos
const proyectos = [
  {
      nombre: "E-commerce App",
      imagen: "./assets/project-1.avif",
      github: "https://github.com/fedevillagra/React.js",
      open: "https://hendrick.vercel.app/"
  },
  {
      nombre: "Weather App",
      imagen: "./assets/project-2.avif",
      github: "https://github.com/fedevillagra/weather-app-next.js",
      open: "https://weather-app-next-js-fedevillagra.vercel.app/"
  },
  {
      nombre: "Shopping App",
      imagen: "./assets/project-3.avif",
      github: "https://github.com/fedevillagra/Proyecto_Final_Backend",
      open: "https://backend-proyect-federicovillagra.koyeb.app/"
  },
  {
      nombre: "Tic-Tac-Toe App",
      imagen: "./assets/project-4.avif",
      github: "https://github.com/fedevillagra/tic-tac-toe",
      open: "https://fv-tic-tac-toe.vercel.app/"
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
      titulo.classList.add('experience-sub-title', 'project-title', 'translate');

      // Crear contenedor de botones
      const btnContainer = document.createElement('div');
      btnContainer.classList.add('btn-container');
      const btnGithub = crearBoton("GitHub", proyecto.github);
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
// ---------------------------------------------------------------------------------------------

// --- Agregar el boton de Darkmode a las dos Navbar ---
async function moverDivANavbar() {
  // Función para crear una promesa que se resuelve cuando el elemento existe en el DOM
  function waitForElement(selector) {
      return new Promise((resolve) => {
          const element = document.querySelector(selector);
          if (element) {
              resolve(element);
          } else {
              const observer = new MutationObserver((mutationsList) => {
                  for (const mutation of mutationsList) {
                      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                          const addedElement = Array.from(mutation.addedNodes).find(node => node.id === 'nightowl-switcher-default');
                          if (addedElement) {
                              observer.disconnect();
                              resolve(addedElement);
                          }
                      }
                  }
              });
              observer.observe(document.body, { childList: true, subtree: true });
          }
      });
  }

  // Esperar a que el elemento se cree en el DOM
  const nightOwlSwitcher = await waitForElement('#nightowl-switcher-default');
  
  // Tomar los dos nav
  const navbar = document.getElementById('desktop-nav');
  const navbarResponsive = document.getElementById('hamburger-nav');

  navbar.appendChild(nightOwlSwitcher);

  // Función para mover el elemento entre navbars
  function moverElementoSegunAnchoDePantalla() {
    if (window.innerWidth <= 1200) {
        navbarResponsive.appendChild(nightOwlSwitcher);
    } else {
        navbar.appendChild(nightOwlSwitcher);
    }
}

// Llamar a la función inicialmente para establecer el padre correcto
moverElementoSegunAnchoDePantalla();

// Escuchar cambios en el tamaño de la ventana y llamar a la función para actualizar el padre del elemento
window.addEventListener('resize', moverElementoSegunAnchoDePantalla);
}
moverDivANavbar();
// ---------------------------------------------------------------------------------------------

// ---- Traducir WEB -----
function translatePage(targetLanguage) {
  const apiKey = 'AIzaSyCWIh_sFCHC-G67NRLFnGRqio53kG0m_Eo';

  // Seleccionar todos los elementos con la clase "translate"
  const elementsToTranslate = document.querySelectorAll('.translate');

  // Array para almacenar las promesas de traducción
  const translationPromises = [];

  // Iterar sobre los elementos y traducir su texto
  elementsToTranslate.forEach(element => {
      const textToTranslate = element.textContent.trim();
      if (textToTranslate !== '') {
          // URL de la API de Traducción de Google
          const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

          // Parámetros de la solicitud
          const params = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  q: textToTranslate,
                  target: targetLanguage
              })
          };

          // Realizar la solicitud a la API de Traducción de Google
          const translationPromise = fetch(apiUrl, params)
              .then(response => response.json())
              .then(data => {
                  const translatedText = data.data.translations[0].translatedText;
                  element.textContent = translatedText; // Actualizar el texto del elemento con la traducción
              })
              .catch(error => console.error('Error al traducir el texto:', error));

          translationPromises.push(translationPromise);
      }
  });

  // Esperar a que todas las traducciones se completen antes de continuar
  Promise.all(translationPromises)
      .then(() => console.log('Traducción completada'))
      .catch(error => console.error('Error al traducir la página:', error));
}

// Obtener el idioma del navegador del usuario
const userLanguage = navigator.language || navigator.userLanguage;

// Traducir la página al idioma del usuario automáticamente
(userLanguage!='en-US') && translatePage(userLanguage);
// ---------------------------------------------------------------------------------------------

//----------------- visibility ------------------

  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a, .menu-links a");
  
    function hideAllSections() {
      sections.forEach(section => {
        section.style.display = "none";
      });
    }
  
    function showSection(sectionId) {
      hideAllSections();
      const sectionToShow = document.querySelector(sectionId);
      if (sectionToShow) {
        sectionToShow.style.display = "";
        sectionToShow.style.animation= "appear .7s linear both";
      }
    }
  
    navLinks.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetSection = this.getAttribute("href");
        showSection(targetSection);

      /* Scroll to top when a footer link is clicked
      if (this.closest("footer")) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }*/

      // Add clicked class for scale effect
     //navLinks.forEach(navLink => navLink.classList.remove("clicked"));
     //this.classList.add("clicked");

      });
    });
  
    // Mostrar una sección por defecto
    //showSection("#profile"); //el problema es que cuando carga la página por primera vez hace el efecto
    sections.forEach(section => {
      (section.id!="profile") && (section.style.display = "none");
    });

  });

// ---------------------------------------------------------------------------------------------