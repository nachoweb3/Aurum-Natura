/* AURUM NATURA - JavaScript Compartido para Todas las Páginas */

const CONFIG = {
  whatsapp: '+34640943669',
  colors: {
    dorado: 0xd4af37,
    doradoClaro: 0xf4cf57
  }
};

// Navegación móvil
function initNavMobile() {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      toggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }
}

// Header scroll behavior
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  });

  header.addEventListener('mouseenter', () => {
    header.classList.remove('hidden');
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// WhatsApp contact
function whatsappContact(productoId = '') {
  const mensaje = productoId ?
    `Hola, quiero comprar la ${productoId}. ¿Está disponible?` :
    'Hola, quiero información sobre Aurum Natura. ¿Podrían ayudarme?';

  const url = `https://wa.me/${CONFIG.whatsapp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

// Smooth scroll
function smoothScroll(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize animations for editorial bands
function initEditorialAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.editorial-band, .editorial-featured, .editorial-story').forEach(el => {
    observer.observe(el);
  });
}

// Inicialización común
document.addEventListener('DOMContentLoaded', () => {
  initNavMobile();
  initHeaderScroll();
  initScrollAnimations();
  initEditorialAnimations();
});