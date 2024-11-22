document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const idUrl = params.get('id'); // ID proporcionado en la URL

  // Seleccionar el contenedor de horarios
  const hoursContainer = document.querySelector(".formulario__hours");

  // Verificar si el contenedor existe en el DOM
  if (!hoursContainer) {
    console.error("Error: No se encontró el contenedor de horarios.");
    return;
  }

  // Realizar una solicitud `fetch` a la API para obtener las sesiones
  fetch(`https://localhost:7141/api/Sesion/${idUrl}/sesiones`) // Cambiar a HTTPS si el servidor lo soporta
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener las sesiones de la API");
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((sesiones) => {
      // Limpiar horarios existentes
      hoursContainer.innerHTML = "";

      // Iterar sobre las sesiones obtenidas y agregarlas al DOM
      sesiones.forEach((Sesion) => {
        // Crear un botón para cada horario
        const hourButton = document.createElement("button");
        hourButton.classList.add("formulario__hour-button");

        // Cambiar formato fecha
        const fechaOriginal = Sesion.fechaHora;
        const fecha = new Date(fechaOriginal);
        const opcionesDia = { weekday: "long" };
        const diaSemana = new Intl.DateTimeFormat("es-ES", opcionesDia).format(fecha);
        const opcionesFecha = { day: "numeric", hour: "2-digit", minute: "2-digit" };
        const fechaFormateada = new Intl.DateTimeFormat("es-ES", opcionesFecha).format(fecha);
        const resultado = `${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)} ${fechaFormateada}`;

        hourButton.textContent = resultado; // Mostrar la hora de la sesión
        hoursContainer.appendChild(hourButton);
        // Agregar un evento de clic para redirigir al selector de asientos
        hourButton.addEventListener("click", (event) => {
          event.preventDefault();
          // Redirigir a la página de asientos con el ID de la sesión
          localStorage.setItem("idPelicula", idUrl); 
          window.location.href = `asientos.html?id=${Sesion.idSesion}`;
        });

        // Agregar el botón al contenedor de horarios

      });
    })
    .catch((error) => {
      // Manejar errores en la solicitud `fetch`
      console.error("Error:", error);
      hoursContainer.innerHTML = "<p>Error al cargar los horarios. Inténtalo más tarde.</p>";
    });
});
