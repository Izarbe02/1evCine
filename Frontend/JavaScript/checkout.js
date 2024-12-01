document.addEventListener("DOMContentLoaded", function () {
    const asientos = JSON.parse(localStorage.getItem("asientosSeleccionados"));
    const precioTotal = parseInt(localStorage.getItem("precioTotal"));
    const idSesion = parseInt(localStorage.getItem("idSesion"));
    const idPelicula = parseInt(localStorage.getItem("idPelicula"));

    console.log("Asientos:", asientos);
    console.log("Precio Total:", precioTotal);
    console.log("ID Sesión:", idSesion);
    console.log("ID Película:", idPelicula);

    const checkoutContainer = document.querySelector(".checkout__order")

    fetch(`https://localhost:7141/api/Pelicula/${idPelicula}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener las películas");
      }
      return response.json();
    })
    .then((pelicula) => {

      checkoutContainer.innerHTML = `
                    <h2 class="checkout__order-title">ORDER</h2>
                    <p class="checkout__order-text">Pelicula</p>
                    <p class="checkout__order-text2">${pelicula.nombre}</p>
                    <p class="checkout__order-text">Asientos</p>
                    <p class="checkout__order-text2">${asientos}</p>
                    <p class="checkout__order-text">Id de la Sesion</p>
                    <p class="checkout__order-text2">${pelicula.id}</p>
                    <p class="checkout__order-text">Metodo de pago</p>
                    <p class="checkout__order-text2">Añade un metodo de pago</p>
                    <p class="checkout__total">Total</p>
                    <p class="checkout__total2">${precioTotal} €</p>
                `;
    });

    const confirmButton = document.querySelector(".checkout__confirm-button");

    confirmButton.addEventListener("click", function () {
        const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked');
        if (!selectedPaymentMethod) {
            
            alert("Por favor, selecciona un método de pago.");
            return;
        }
        
        const reserva = {
            idReserva: 0,
            idPelicula,
            idSesion,
            precioReserva: precioTotal,
            idAsientosReservados: asientos,
            fechaReserva: new Date().toISOString()
        };

        console.log("Reserva:", reserva);

        fetch(`https://localhost:7141/api/Sesion/${idSesion}/asientos/reservar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(asientos),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al reservar los asientos");
                }
                return response.json();
            })
            .then(data => {
                console.log("Asientos reservados con éxito:", data);
                console.log("Cuerpo de la solicitud:", JSON.stringify(reserva, null, 2));
                return fetch(`https://localhost:7141/api/Reserva`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reserva),
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al procesar la reserva.");
                }
                return response.json();
            })
            .then(data => {
                console.log("Reserva confirmada con éxito:", data);
                alert("Reserva confirmada con éxito. ¡Gracias por tu compra!");
                localStorage.clear();
                window.location.href = "compraFinalizada.html";
            })
            .catch(error => {
                console.error("Error en el proceso de reserva:", error);
                alert("Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.");
                });
        });

    });
