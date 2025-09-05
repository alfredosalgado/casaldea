// Funcionalidad del menú móvil
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navToggle = document.querySelector('.nav-toggle');

// Función para alternar menú móvil con animación de hamburguesa
const toggleMobileMenu = (element) => {
    const hamburgerIcon = element.querySelector('.hamburger-icon');
    if (hamburgerIcon) {
        hamburgerIcon.classList.toggle('active');
        
        // Animación de transformación a X
        const bunTop = hamburgerIcon.querySelector('.bun-top');
        const meat = hamburgerIcon.querySelector('.meat');
        const bunBottom = hamburgerIcon.querySelector('.bun-bottom');
        
        if (hamburgerIcon.classList.contains('active')) {
            bunTop.style.transform = 'rotate(45deg) translateY(8px)';
            meat.style.opacity = '0';
            bunBottom.style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            bunTop.style.transform = 'none';
            meat.style.opacity = '1';
            bunBottom.style.transform = 'none';
        }
    }
    console.log('Menú móvil activado');
};

// Event listeners
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => toggleMobileMenu(mobileMenuToggle));
}

if (navToggle) {
    navToggle.addEventListener('click', () => toggleMobileMenu(navToggle));
}

// Smooth scrolling para enlaces internos
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Función para manejar el scroll del navbar
const handleNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(165, 42, 42, 0.95)';
        } else {
            navbar.style.backgroundColor = 'var(--primary-color)';
        }
    }
};

// Event listener para el scroll
window.addEventListener('scroll', handleNavbarScroll);

// Función para detectar el dispositivo y ajustar la visualización
const detectDevice = () => {
    const isMobile = window.innerWidth <= 768;
    const heroDesktop = document.querySelector('.hero');
    const heroMobile = document.querySelector('.hero-mobile');
    const navbar = document.querySelector('.navbar');
    
    if (isMobile) {
        if (heroDesktop) heroDesktop.style.display = 'none';
        if (heroMobile) heroMobile.style.display = 'block';
        if (navbar) navbar.style.display = 'none';
    } else {
        if (heroDesktop) heroDesktop.style.display = 'flex';
        if (heroMobile) heroMobile.style.display = 'none';
        if (navbar) navbar.style.display = 'block';
    }
};

// Ejecutar al cargar la página
window.addEventListener('load', detectDevice);
window.addEventListener('resize', detectDevice);

// Función para animar elementos al hacer scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.hero-text, .mobile-hero-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Event listener para animaciones en scroll
window.addEventListener('scroll', animateOnScroll);

// Función para manejar clicks en botones
const handleButtonClicks = () => {
    const topBurgersBtn = document.querySelector('.btn-top-burgers');
    const verCartaBtn = document.querySelector('.btn-ver-carta');
    
    if (topBurgersBtn) {
        topBurgersBtn.addEventListener('click', () => {
            console.log('Navegando a Top 25 Burgers');
            // Aquí se puede agregar la navegación correspondiente
        });
    }
    
    if (verCartaBtn) {
        verCartaBtn.addEventListener('click', () => {
            console.log('Navegando a la carta');
            // Aquí se puede agregar la navegación correspondiente
        });
    }
};

// Inicializar funcionalidades al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    handleButtonClicks();
    detectDevice();
    
    // Precargar imágenes
    const preloadImages = () => {
        const images = ['burger-hero.jpg'];
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    
    preloadImages();
});

// Función para optimizar el rendimiento en dispositivos móviles
const optimizeForMobile = () => {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
};

optimizeForMobile();

// Función para manejar errores de carga de imágenes
const handleImageErrors = () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log(`Error cargando imagen: ${this.src}`);
            // Se puede agregar una imagen placeholder aquí
        });
    });
};

// Ejecutar manejo de errores de imágenes
window.addEventListener('load', handleImageErrors);