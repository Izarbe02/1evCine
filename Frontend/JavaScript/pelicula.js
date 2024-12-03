document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const idUrl = params.get('id');

  const peliculasContainer = document.querySelector(".main");
  /* global fetch, localStorage */
  fetch(`http://34.225.199.154:7141/api/Pelicula/${idUrl}`) 
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener las películas");
      }
      return response.json();
    })
    .then((pelicula) => {

      const peliculaHTML = `
            <article class="pelicula">
              <section class="pelicula__description">
                <h1 class="pelicula__title">${pelicula.nombre}</h1>
                <div class="pelicula__content">
                  <img src="${pelicula.imagen}" alt="${pelicula.nombre}" class="pelicula__image">
                  <div class="pelicula__text">
                    <iframe class="iframe__pelicula" src="${pelicula.urlTrailer}"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" ></iframe>
                    <h3 class="pelicula__subtitle">Descripción</h3>
                    <p class="pelicula__par">${pelicula.sinopsis}</p>
                    <h3 class="pelicula__subtitle__director">Director: ${pelicula.duracion}</h3>
                    <h3 class="pelicula__subtitle__director">Duración: ${pelicula.director}</h3>
                    <h3 class="pelicula__subtitle__director">Genero: ${pelicula.genero}</h3>
                    <h3 class="pelicula__subtitle__director">Fecha de estreno:  ${pelicula.fechaEstreno}</h3>
                    <h3 class="pelicula__subtitle__director">Pegi: ${pelicula.pegi}</h3>
                  </div>
                </div>
                <div class="section-pelicula__buttons">
                  <div class="pelicula__sala">
                    <button class="pelicula__sala-button"> Sala : ${pelicula.idSala}</button>
                    <a href="sesiones">
                      <button class="pelicula__seat-button">Elegir Fecha</button>
                    </a>
                  </div>
                </div>
              </section>
            </article>`;


      peliculasContainer.insertAdjacentHTML("beforeend", peliculaHTML);

      const elegirFecha = peliculasContainer.querySelector('.pelicula__seat-button');

      elegirFecha.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = `fecha?id=${pelicula.id}`
      })
    });
    
})
  