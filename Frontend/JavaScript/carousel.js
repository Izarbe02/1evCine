document.addEventListener('DOMContentLoaded', function() {
    
let currentIndex = 0;

document.querySelector('.prev-button').addEventListener('click', () => {
    navigate(-1);
});

document.querySelector('.next-button').addEventListener('click', () => {
    navigate(1);
});

function navigate(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const totalImages = items.length;
    
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + totalImages) % totalImages;
    items[currentIndex].classList.add('active');
}

// Inicializar la galería mostrando la primera imagen
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.carousel-item');
    if (items.length > 0) {
        items[currentIndex].classList.add('active');
    }
});

// AUTOPLAY
let autoplayInterval = null;

function startAutoplay(interval) {
    stopAutoplay();  // Detiene cualquier autoplay anterior para evitar múltiples intervalos.
    autoplayInterval = setInterval(() => {
        navigate(1);  // Navega a la siguiente imagen cada intervalo de tiempo.
    }, interval);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Iniciar autoplay con un intervalo de 3 segundos.
startAutoplay(3000);

// Opcional: Detener autoplay cuando el usuario interactúa con los botones de navegación.
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', stopAutoplay);
});

   
  });

