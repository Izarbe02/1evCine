
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