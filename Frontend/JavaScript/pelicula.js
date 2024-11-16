document.addEventListener("DOMContentLoaded", function () {
    const peliculasContainer = document.querySelector(".main");
  
    fetch("https://localhost:7141/api/Pelicula") // Cambia la URL si es necesario
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las películas");
        }
        return response.json();
      })
      .then((peliculas) => {
        peliculas.forEach((pelicula) => {
          const peliculaHTML = `
            <article class="pelicula">
              <section class="pelicula__description">
                <h1 class="pelicula__title">${pelicula.nombre}</h1>
                <div class="pelicula__content">
                  <img src="${pelicula.imagen}" alt="${pelicula.nombre}" class="pelicula__image">
                  <div class="pelicula__text">
                    <h3 class="pelicula__subtitle">Descripción</h3>
                    <p class="pelicula__par">${pelicula.sinopsis}</p>
                    <h3 class="pelicula__subtitle__director">Director: ${pelicula.director}</h3>
                  </div>
                </div>
                <div class="section-pelicula__buttons">
                  <div class="pelicula__sala">
                    <button class="pelicula__sala-button">SALA</button>
                    <a href="../Html/fecha.html">
                      <button class="pelicula__seat-button">Elegir Fecha</button>
                    </a>
                  </div>
                </div>
              </section>
            </article>`;
          peliculasContainer.insertAdjacentHTML("beforeend", peliculaHTML);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        peliculasContainer.innerHTML = "<p>Error al cargar las películas</p>";
      });
  });
  