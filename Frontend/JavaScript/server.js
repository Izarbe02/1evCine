const express = require('express');
const path = require('path');
const app = express();

// Configurar carpetas estáticas para CSS, JS e imágenes
app.use('/css', express.static(path.join(__dirname, '../Sass/build'))); // Servir archivos CSS desde Sass/build
app.use('/js', express.static(path.join(__dirname, '../JavaScript'))); // Servir archivos JS desde JavaScript
app.use('/images', express.static(path.join(__dirname, '../Images'))); // Servir imágenes desde Images

// Servir páginas HTML dinámicamente
app.get('/:page', (req, res) => {
  const page = req.params.page; // Capturar el nombre de la página desde la URL
  const filePath = path.join(__dirname, `../Html/${page}.html`); // Construir la ruta al archivo HTML
  res.sendFile(filePath, (err) => { // Enviar el archivo HTML al cliente
    if (err) {
      console.error(`Error al cargar ${page}.html:`, err); // Mostrar error en consola si no se encuentra
      res.status(404).send('Página no encontrada'); // Respuesta de error 404
    }
  });
});

// Redirigir todas las rutas no definidas a main.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Html/main.html'), (err) => { // Ruta al archivo main.html
    if (err) {
      console.error('Error al cargar main.html:', err); // Mostrar error si no se puede cargar
      res.status(500).send('Error en el servidor'); // Respuesta de error 500
    }
  });
});

// Configurar el puerto y arrancar el servidor
const PORT = process.env.PORT || 5500; // Puerto dinámico o el 5500 por defecto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`); // Mensaje cuando el servidor está activo
});
