document.addEventListener("DOMContentLoaded", function () {
    const peliculasContainer = document.querySelector(".movie-grid");
    /* global fetch, localStorage */
    fetch("http://34.225.199.154:7141/api/Pelicula")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener las películas");
            }
            return response.json();
        })
        .then(peliculas => {
            peliculas.forEach(Pelicula => {
                const movieItem = document.createElement("div");
                movieItem.classList.add("movie-grid__item"); 
                movieItem.innerHTML = `
                    <img src="${Pelicula.imagen}" alt="${Pelicula.nombre}" class="movie-grid__image">
                    <a href="#" class="movie-grid__button">SABER MÁS</a>
                `;


                movieItem.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = `pelicula?id=${Pelicula.id}`
                })

                peliculasContainer.appendChild(movieItem);

            });
        })
        .catch(error => {
            console.error("Error:", error);
            peliculasContainer.innerHTML = "<p>Error al cargar las películas</p>";
        });
});