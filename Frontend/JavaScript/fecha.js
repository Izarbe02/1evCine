document.addEventListener("DOMContentLoaded", function () {
  /* global fetch, localStorage */
  const params = new URLSearchParams(window.location.search);
  const idUrl = params.get('id');

  const hoursContainer = document.querySelector(".formulario__hours");

  fetch(`http://34.225.199.154:7141/api/Sesion/${idUrl}/sesiones`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener las sesiones de la API");
      }
      return response.json();
    })
    .then((sesiones) => {
      sesiones.forEach((Sesion) => {
        // Crear un botón para cada sesion
        const hourButton = document.createElement("button");
        hourButton.classList.add("formulario__hour-button");

        // Cambiar formato fecha
        const fechaOriginal = Sesion.fechaHora;
        const fecha = new Date(fechaOriginal);
        const diaSemana = new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(fecha);
        const fechaFormateada = new Intl.DateTimeFormat("es-ES", { day: "numeric", hour: "2-digit", minute: "2-digit" }).format(fecha);
        const resultado = `${diaSemana[0].toUpperCase()}${diaSemana.slice(1)} ${fechaFormateada}`;

        hourButton.textContent = resultado; // Mostrar la hora de la sesión
        hoursContainer.appendChild(hourButton);

        // Agregar un evento de clic para redirigir al selector de asientos
        hourButton.addEventListener("click", (event) => {
          event.preventDefault();
          localStorage.setItem("idPelicula", idUrl);
          window.location.href = `asientos?id=${Sesion.idSesion}`;
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      hoursContainer.innerHTML = "<p>Error al cargar los horarios</p>";
    });
});
