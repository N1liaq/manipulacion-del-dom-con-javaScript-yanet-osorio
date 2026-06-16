const personajes = [
  {
    id: 1,
    nombre: "A-Bomb",
    imagen:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
  },
  {
    id: 2,
    nombre: "Abe Sapien",
    imagen:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/2-abe-sapien.jpg",
  },
  {
    id: 3,
    nombre: "Abin Sur",
    imagen:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/3-abin-sur.jpg",
  },
  {
    id: 4,
    nombre: "Abomination",
    imagen:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/4-abomination.jpg",
  },
  {
    id: 5,
    nombre: "Abraxas",
    imagen:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/5-abraxas.jpg",
  },
];

let copiaPersonajes = [...personajes];

const rowContainer = document.querySelector("#rowContainer");
const advertencia = document.querySelector("#advertencia");
const reiniciar = document.querySelector("#reiniciar");
const recargar = document.querySelector("#recargar");
const formularioAgregarPersonaje = document.getElementById(
  "formularioAgregarPersonaje",
);

const cargarPersonajes = (mostrarPersonajes) => {
  rowContainer.innerHTML = "";

  mostrarPersonajes.forEach((personaje) => {
    rowContainer.innerHTML += `
                <div class="col-3 my-3 d-flex justify-content-center mb-5" data-id=${personaje.id}>
              <div class="card p-5" style="width: 25rem">
                <img
                  src=${personaje.imagen}
                  class="card-img-top"
                  alt=${personaje.nombre}
                  style="height: 350px; object-fit: contain"
                />
                <div class="card-body">
                  <h5 class="card-title text-center">${personaje.nombre}</h5>
                  <a href="#" class="btn btn-danger btn-eliminar d-flex justify-content-center mt-4"> Eliminar</a>
                </div>
              </div>
            </div>
            
            `;
  });
};

cargarPersonajes(personajes);

const buscador = document.getElementById("buscador");
const botonBusqueda = document.getElementById("botonBusqueda");

const personajeBuscar = (e) => {
  e.preventDefault();
  const valorBusqueda = buscador.value.toLowerCase();

  const filtradoPersonaje = personajes.filter((personaje) => {
    return personaje.nombre.toLowerCase().includes(valorBusqueda);
  });
  cargarPersonajes(filtradoPersonaje);
  if (filtradoPersonaje.length === 0) {
    rowContainer.innerHTML += `<h5 class="text-center">No se encontraron coincidencias.</h5>`;
  } else {
    cargarPersonajes(filtradoPersonaje);
  }
};
botonBusqueda.addEventListener("click", personajeBuscar);

formularioAgregarPersonaje.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombrePersonaje = formularioAgregarPersonaje.nombre.value;
  const imagenPersonaje = formularioAgregarPersonaje.imagen.value;

  const nuevoPersonaje = {
    id: personajes.length + 1,
    nombre: nombrePersonaje,
    imagen: imagenPersonaje,
  };
  if (nombrePersonaje === "" && imagenPersonaje === "") {
    advertencia.innerHTML += `<h5 class="text-center text-danger">No se agregaron valores.</h5>`;
  } else {
    personajes.push(nuevoPersonaje);
  }

  cargarPersonajes(personajes);
});

rowContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-eliminar")) {
    const personajeSeleccionado = e.target.closest(".col-3");
    const idDelPersonaje = Number(personajeSeleccionado.dataset.id);

    copiaPersonajes = personajes.filter((personaje) => {
      return personaje.id !== idDelPersonaje;
    });
    personajeSeleccionado.remove();
  }
});
