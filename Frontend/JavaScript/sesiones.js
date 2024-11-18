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
            const sesionItem = document.createElement("div");
            sesionItem.classList.add("sesion__item"); 
            sesionItem.innerHTML = `
              <article class="sesiones">
                 <div class="contSesion">
                  <p>${Sesion.fechaHora} </p>
                 </div> 
              </article>`;
            sesionesContainer.appendChild(sesionItem);

            const ButtonParaAsientos = sesionItem.querySelector('.contSesion');

                ButtonParaAsientos.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = `asientos.html?id=${Sesion.idSesion}`
                })

          });
        })
        .catch((error) => {
          console.error("Error:", error);
          sesionesContainer.innerHTML = "<p>Error al cargar las películas</p>";
        });
      });    