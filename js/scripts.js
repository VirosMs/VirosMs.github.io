let btnMenu = document.getElementById('btn-menu');
let menuMobile = document.getElementById('menu-mobile');
let overlayMenu = document.getElementById('overlay-menu');


document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var mensaje = document.getElementById('mensaje').value;

    if (!validarEmail(email)) {
        alert('Email inválido');
        e.preventDefault();
        return;
    }
    if (!validarTelefono(telefono)) {
        alert('Teléfono inválido');
        e.preventDefault();
        return;
    }

    var body =
        `--------------------------%0A` +
        `📝 Solicitud de Contacto%0A` +
        `--------------------------%0A%0A` +
        `👤 Nombre Completo: ${nombre}%0A` +
        `✉️ Email: ${email}%0A` +
        `📞 Teléfono: ${telefono}%0A%0A` +
        `💬 Mensaje:%0A${mensaje}%0A%0A` +
        `--------------------------%0A` +
        `Recibido automáticamente desde la web.%0A%0A`;

    // Uso en mailto:
    var mailtoLink = `mailto:contact@virosms.com?subject=Nuevo Contacto Web de ${nombre}&body=${body}`;
    window.location.href = mailtoLink;

});

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function validarTelefono(telefono) {
    const regex = /^[0-9 +-]{7,16}$/; // solo números, espacios, + y -
    return telefono.trim() === '' || regex.test(telefono); // opcional pero válido
}





btnMenu.addEventListener('click', () => {
    menuMobile.classList.add('open-menu');
});

menuMobile.addEventListener('click', () => {
    menuMobile.classList.remove('open-menu');
});

overlayMenu.addEventListener('click', () => {
    menuMobile.classList.remove('open-menu');
});




