document.addEventListener("DOMContentLoaded", function () {
    const asientosContainer = document.querySelector(".asientos-container");
    const botonReserva = document.querySelector(".reservar-button");
    const divAsientosSeleccionados = document.querySelector(".asientos-seleccionados");
    const divPrecio = document.querySelector(".precio-total");
    let precioTotal = 0;
    let asientosSeleccionados = [];

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
                asientoItem.dataset.idAsiento = Asiento.idAsiento;
                asientoItem.dataset.precio = Asiento.precio;

                asientoItem.innerHTML = `
              <article class="asiento">
                 <div class="contSesion">
                  <p>${Asiento.idAsiento} </p>
                 </div> 
              </article>`;

                // Agregar evento de clic para seleccionar asientos
                if (!Asiento.estaReservado) {
                    asientoItem.addEventListener("click", function () {
                        const precio = parseFloat(asientoItem.dataset.precio);
                        if (asientoItem.classList.contains("seleccionado")) {
                            asientoItem.classList.remove("seleccionado");
                            asientosSeleccionados = asientosSeleccionados.filter(id => id !== Asiento.idAsiento);
                            precioTotal -= precio;
                            actualizarAsientosSeleccionados();
                        } else {
                            asientoItem.classList.add("seleccionado");
                            asientosSeleccionados.push(Asiento.idAsiento);
                            precioTotal +=precio;
                            actualizarAsientosSeleccionados();
                        }
                        console.log("Asientos seleccionados:", asientosSeleccionados);
                    });
                }

                asientosContainer.appendChild(asientoItem);

            });
        })
        .catch(error => {
            console.error("Error:", error);
            asientosContainer.innerHTML = "<p>Error al cargar los asientos</p>";
        });

    function actualizarAsientosSeleccionados() {
        if(asientosSeleccionados.length === 0){
            divAsientosSeleccionados.style.display = "none";
            divPrecio.style.display = "none";
        }else{
            divAsientosSeleccionados.style.display = "block";
            divPrecio.style.display = "block";
            divAsientosSeleccionados.textContent = `Asientos seleccionados: ${asientosSeleccionados.join(", ")}`;
            divPrecio.textContent = `Precio total: ${precioTotal.toFixed(2)}€`
        }
        }

    botonReserva.addEventListener("click", function () {
        if (asientosSeleccionados.length === 0) {
            alert("No has seleccionado ningún asiento.");
            return;
        }

        /*
        console.log("ID de la sesión:", idUrl);
        if (!idUrl) {
            console.error("El ID de la sesión no está definido.");
            return;
        }

        console.log(asientosSeleccionados.every(id => typeof id === "number"));

        console.log("Cuerpo de la solicitud:", JSON.stringify({ asientosIds: asientosSeleccionados }));
        */

        fetch(`https://localhost:7141/api/Sesion/${idUrl}/asientos/reservar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(asientosSeleccionados)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al reservar los asientos");
                }
                return response.json();
            })
            .then(data => {
                alert(data.Message || "Asientos reservados con éxito.");
                //location.reload(); // Recargar la página para actualizar el estado de los asientos
            })
            .catch(error => {
                console.error("Error al reservar los asientos:", error);
                alert("Hubo un problema al intentar reservar los asientos.");
            });
    });
});

