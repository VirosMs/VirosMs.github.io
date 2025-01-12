document.addEventListener('DOMContentLoaded', () => {
    const toogleButton = document.getElementById('darkmode-toggle');
    toogleButton.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        const logoImg = document.querySelector('.logo a img');

        // Cambiar iconos y colores según el tema
        if (document.body.classList.contains('dark-mode')) {
            logoImg.setAttribute('src', '/images/1-dark.png');
            var primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
            var secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
            darkOn(primaryColor, secondaryColor); // Cambia a modo oscuro
        } else {
            logoImg.setAttribute('src', '/images/2-light.png');
            var primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
            var secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
            lightOn(primaryColor, secondaryColor); // Cambia a modo claro
        }
    });
});

function lightOn(primaryColor, secondaryColor) {
    // Sol y luna
    var sun = document.getElementById('sun');
    var moon = document.getElementById('moon');
    const paths = sun.querySelectorAll('path');
    
    // Cambio de color de los iconos en el modo claro
    paths.forEach(path => {
        path.style.stroke = 'white'; // Sol amarillo
    });
    moon.style.fill = secondaryColor; // Luna de color negro
}

function darkOn(primaryColor, secondaryColor) {
    // Sol y luna
    var sun = document.getElementById('sun');
    var moon = document.getElementById('moon');
    const paths = sun.querySelectorAll('path');
    
    // Cambio de color de los iconos en el modo oscuro
    paths.forEach(path => {
        path.style.stroke = primaryColor; // Sol gris claro
    });
    moon.style.fill = 'white'; // Luna de color blanco
}
