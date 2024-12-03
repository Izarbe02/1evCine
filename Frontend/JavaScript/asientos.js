document.addEventListener("DOMContentLoaded", function () {
    // Referencias al DOM y variables
    /* global fetch, localStorage */
    const asientosContainer = document.querySelector(".asientos-container");
    const botonReserva = document.querySelector(".reservar-button");
    const divAsientosSeleccionados = document.querySelector(".asientos-seleccionados");
    const divPrecio = document.querySelector(".precio-total");
    let precioTotal = 0; 
    let asientosSeleccionados = []; 
    
    const params = new URLSearchParams(window.location.search);
    const idSesion = params.get('id');


    fetch(`http://34.225.199.154:7141/api/Sesion/${idSesion}/asientos`)
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
                // Agregar clases segun el estado del asiento
                asientoItem.classList.add(Asiento.estaReservado ? "ocupado" : "disponible");

                asientoItem.innerHTML = `
                    <article class="asiento">
                        <div class="contSesion">
                            <p>${Asiento.idAsiento}</p>
                        </div> 
                    </article>`;

                // Evento para seleccionar un asiento
                if (!Asiento.estaReservado) {
                    asientoItem.addEventListener("click", function () {
                        const precio = parseFloat(Asiento.precio);
                        if (asientoItem.classList.contains("seleccionado")) {
                            asientoItem.classList.remove("seleccionado");
                            asientosSeleccionados = asientosSeleccionados.filter(id => id !== Asiento.idAsiento); // Eliminar del array
                            precioTotal -= precio;
                        } else {
                            asientoItem.classList.add("seleccionado");
                            asientosSeleccionados.push(Asiento.idAsiento); 
                            precioTotal += precio;
                        }
                        actualizarAsientosSeleccionados();
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

    // Evento del boton de reserva
    botonReserva.addEventListener("click", function () {
        if (asientosSeleccionados.length === 0) {
            alert("No has seleccionado ningún asiento.");
            return; 
        }

        // Guardar los datos en LocalStorage
        localStorage.setItem("asientosSeleccionados", JSON.stringify(asientosSeleccionados));
        localStorage.setItem("precioTotal", precioTotal); 
        localStorage.setItem("idSesion", idSesion); 
        const idPelicula = localStorage.getItem("idPelicula");
        localStorage.setItem("idPelicula", idPelicula);

        // Redirigir a checkout con los datos del LocalStorage
        window.location.href = `Checkout`;
    });
});
