document.addEventListener("DOMContentLoaded", function () {
    const HomePeliculas = document.querySelector(".cartelera__images");
    console.log("vinculado");
    
    /* global fetch, localStorage */

    fetch("http://34.225.199.154:7141/api/Pelicula")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener las películas");
            }
            return response.json();
        })
        .then(peliculas => {
            peliculas.slice(0, 4).forEach(Pelicula => {
                const movieItem = document.createElement("a");
                movieItem.href= "cartelera"
                movieItem.innerHTML = `
                <img src="${Pelicula.imagen}" alt="${Pelicula.nombre}" class="cartelera__image">
                `;

                movieItem.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = `pelicula?id=${Pelicula.id}`
                })
                HomePeliculas.appendChild(movieItem);

            });
        })
});