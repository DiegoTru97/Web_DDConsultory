document.getElementById('currentYear').textContent = new Date().getFullYear();

const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const icon = btn.querySelector('i');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    if (menu.classList.contains('hidden')) {
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
    } else {
        icon.classList.remove('ph-list');
        icon.classList.add('ph-x');
    }
});

menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
    });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('shadow-lg', 'shadow-black/20');
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
    } else {
        navbar.classList.remove('shadow-lg', 'shadow-black/20');
        navbar.style.background = 'rgba(15, 23, 42, 0.7)';
    }
});

document.getElementById('form-contacto').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = event.currentTarget;
    const successMessage = document.getElementById('success-message');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    const name = document.getElementById('name').value.trim();
    const service = document.getElementById('service').value;
    const contactoInfo = document.getElementById('contacto_info').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !contactoInfo || !message) {
        alert('Completa nombre, teléfono/correo y mensaje antes de enviar.');
        return;
    }

    submitButton.innerHTML = '<i class="ph ph-spinner-gap animate-spin"></i> Enviando...';
    submitButton.disabled = true;

    const datos = {
        Nombre_del_Cliente: name,
        Servicio_de_Interes: service,
        Medio_de_Contacto: contactoInfo,
        Mensaje: message
    };

    try {
        const formspreeURL = 'https://formspree.io/f/xvkpjklg';
        const respuesta = await fetch(formspreeURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (respuesta.ok) {
            successMessage.classList.remove('hidden');
            form.reset();
        } else {
            alert('Hubo un problema al enviar el formulario. Verifica tu conexión o intenta más tarde.');
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión. Revisa tu internet e intenta de nuevo.');
    } finally {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        event.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});
