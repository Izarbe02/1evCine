document.addEventListener("DOMContentLoaded", function () {
    // Recuperar los datos de localStorage
    const asientosSeleccionados = JSON.parse(localStorage.getItem("asientosSeleccionados")) || [];
    const precioTotal = localStorage.getItem("precioTotal") || "0.00";
    const idSesion = localStorage.getItem("idSesion");
    const idPelicula = localStorage.getItem("idPelicula");
    console.log(asientosSeleccionados);
    console.log(precioTotal);
    // Elementos del DOM donde se mostrarán los datos
    const orderText2Element = document.querySelector(".checkout__order-text2:nth-child(4)"); // Para los asientos
    const totalElement = document.querySelector(".checkout__total2"); // Para el precio total
    const paymentMethodElement = document.querySelector(".checkout__order-text2:nth-child(10)"); // Método de pago

    // Rellenar los datos dinámicamente
    if (orderText2Element) {
        orderText2Element.textContent = asientosSeleccionados.join(", "); // Mostrar los asientos seleccionados
    }
    if (totalElement) {
        totalElement.textContent = `${precioTotal} €`; // Mostrar el precio total
    }
    if (paymentMethodElement) {
        paymentMethodElement.textContent = "Añade un método de pago"; // Placeholder para el método de pago
    }

    // Evento para el botón CONFIRM
    const confirmButton = document.querySelector(".checkout__confirm-button");
    confirmButton.addEventListener("click", function () {
        // Obtener el método de pago seleccionado
        const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked');
        if (!selectedPaymentMethod) {
            alert("Por favor, selecciona un método de pago.");
            return;
        }

        // Confirmar la reserva con los datos del cliente
        const reserva = {
            idSesion,
            idPelicula,
            asientos: asientosSeleccionados,
            precioTotal,
            metodoPago: selectedPaymentMethod.value,
        };

        console.log("Reserva confirmada:", reserva);

        // Aquí puedes realizar un POST al backend para completar la reserva
        fetch(`https://localhost:7141/api/Reserva`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reserva),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al procesar la reserva.");
                }
                return response.json();
            })
            .then((data) => {
                alert("Reserva confirmada con éxito. ¡Gracias por tu compra!");
                // Redirigir a una página de confirmación o limpiar datos
                localStorage.clear(); // Limpiar el localStorage después de confirmar
                window.location.href = "confirmation.html"; // Redirige a una página de confirmación
            })
            .catch((error) => {
                console.error("Error al confirmar la reserva:", error);
                alert("Hubo un problema al procesar tu reserva. Por favor, inténtalo de nuevo.");
            });
    });
});
