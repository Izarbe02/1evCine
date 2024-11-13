document.addEventListener("DOMContentLoaded", function () {
    const HomePeliculas = document.querySelector(".cartelera__images");

    fetch("https://localhost:7141/api/Pelicula")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener las películas");
            }
            return response.json();
        })

        
        .then(peliculas => {
            peliculas.slice(0, 4).forEach(Pelicula => {
                const movieItem = document.createElement("a");
                movieItem.href= "../Html/cartelera.html"
                movieItem.innerHTML = `
                <img src="${Pelicula.imagen}" alt="${Pelicula.nombre}" class="cartelera__image">
                `;
                HomePeliculas.appendChild(movieItem);

            });
        })
        .catch(error => {
            console.error("Error:", error);
            peliculasContainer.innerHTML = "<p>Error al cargar las películas</p>";
        });
});
