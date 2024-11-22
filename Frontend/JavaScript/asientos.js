document.addEventListener("DOMContentLoaded", function () {
    // Referencias al DOM
    const asientosContainer = document.querySelector(".asientos-container");
    const botonReserva = document.querySelector(".reservar-button");
    const divAsientosSeleccionados = document.querySelector(".asientos-seleccionados");
    const divPrecio = document.querySelector(".precio-total");
    let precioTotal = 0; 
    let asientosSeleccionados = []; 

    
    const params = new URLSearchParams(window.location.search);
    const idSesion = params.get('id');

    // Fetch para cargar los asientos de la sesión desde la API
    fetch(`https://localhost:7141/api/Sesion/${idSesion}/asientos`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los asientos");
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(asientos => {
            // Iterar sobre cada asiento recibido del backend
            asientos.forEach(Asiento => {
                const asientoItem = document.createElement("div");
                asientoItem.classList.add("asiento");
                // Agregar clases según el estado del asiento (ocupado o disponible)
                asientoItem.classList.add(Asiento.estaReservado ? "ocupado" : "disponible");
                asientoItem.dataset.idAsiento = Asiento.idAsiento; // Guardar el ID del asiento
                asientoItem.dataset.precio = Asiento.precio; // Guardar el precio del asiento

                asientoItem.innerHTML = `
                    <article class="asiento">
                        <div class="contSesion">
                            <p>${Asiento.idAsiento}</p>
                        </div> 
                    </article>`;

                // Evento para seleccionar/desseleccionar un asiento
                if (!Asiento.estaReservado) {
                    asientoItem.addEventListener("click", function () {
                        const precio = parseFloat(asientoItem.dataset.precio); // Obtener el precio del asiento
                        if (asientoItem.classList.contains("seleccionado")) {
                            asientoItem.classList.remove("seleccionado"); // Quitar selección
                            asientosSeleccionados = asientosSeleccionados.filter(id => id !== Asiento.idAsiento); // Eliminar del array
                            precioTotal -= precio; // Restar el precio al total
                        } else {
                            asientoItem.classList.add("seleccionado"); // Marcar como seleccionado
                            asientosSeleccionados.push(Asiento.idAsiento); // Agregar al array
                            precioTotal += precio; // Sumar al total
                        }
                        actualizarAsientosSeleccionados(); // Actualizar la UI
                        console.log("Asientos seleccionados:", asientosSeleccionados);
                    });
                }

                asientosContainer.appendChild(asientoItem); // Agregar el asiento al contenedor
            });
        })
        .catch(error => {
            console.error("Error:", error);
            asientosContainer.innerHTML = "<p>Error al cargar los asientos</p>";
        });

    // Función para actualizar la UI con los asientos seleccionados y el precio total
    function actualizarAsientosSeleccionados() {
        if (asientosSeleccionados.length === 0) {
            divAsientosSeleccionados.style.display = "none";
            divPrecio.style.display = "none";
        } else {
            divAsientosSeleccionados.style.display = "block";
            divPrecio.style.display = "block";
            divAsientosSeleccionados.textContent = `Asientos seleccionados: ${asientosSeleccionados.join(", ")}`;
            divPrecio.textContent = `Precio total: ${precioTotal.toFixed(2)}€`;
        }
    }

    // Evento del botón de reserva
    botonReserva.addEventListener("click", function () {
        if (asientosSeleccionados.length === 0) {
            alert("No has seleccionado ningún asiento.");
            return; 
        }

        // Guardar los datos seleccionados y la ID de sesión en localStorage
        localStorage.setItem("asientosSeleccionados", JSON.stringify(asientosSeleccionados));
        localStorage.setItem("precioTotal", precioTotal); 
        localStorage.setItem("idSesion", idSesion); 
        const idPelicula = localStorage.getItem("idPelicula");
        localStorage.setItem("idPelicula", idPelicula);

        // Redirigir a la página de Checkout con los datos almacenados en localStorage
        window.location.href = `Checkout.html`;
    });
});
