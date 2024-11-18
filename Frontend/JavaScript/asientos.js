document.addEventListener("DOMContentLoaded", function () {
    const asientosContainer = document.querySelector(".asientos-container");

    const params = new URLSearchParams(window.location.search);
    const idUrl = params.get('id');  

    fetch(`https://localhost:7141/api/Sesion/${idUrl}/asientos`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los asientos");
            }
            return response.json();
        })
        .then(asientos => {
            asientos.forEach(Asiento => {

            const asientoItem = document.createElement("div");
            asientoItem.classList.add("asiento");
            asientoItem.classList.add(Asiento.estaReservado ? "ocupado" : "disponible");
            
            asientoItem.innerHTML = `
              <article class="asiento">
                 <div class="contSesion">
                  <p>${Asiento.idAsiento} </p>
                 </div> 
              </article>`;


                asientosContainer.appendChild(asientoItem);

            });
        })
        .catch(error => {
            console.error("Error:", error);
            asientosContainer.innerHTML = "<p>Error al cargar los asientos</p>";
        });
});

