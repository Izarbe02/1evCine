document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const idUrl = params.get('id');  
    
    const sesionesContainer = document.querySelector(".sesiones-container");
    
      fetch(`https://localhost:7141/api/Sesion/${idUrl}/sesiones`) 
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener las sesiones");
          }
          return response.json();
        })
        .then(sesiones => {
          sesiones.forEach(Sesion => {
         
            const sesionHTML = `
              <article class="sesiones">
                <p>${Sesion.fechaHora} </p>
              </article>`;
            sesionesContainer.insertAdjacentHTML("beforeend", sesionHTML);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          sesionesContainer.innerHTML = "<p>Error al cargar las películas</p>";
        });
      });    