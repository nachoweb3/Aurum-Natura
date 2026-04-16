/* AURUM NATURA - JavaScript Principal Animado */

const CONFIG = {
  whatsapp: '+34640943669',
  colors: {
    dorado: 0xd4af37,
    doradoClaro: 0xf4cf57
  }
};

function initFloatingBaskets() {
  // Desactivado - sin cestas flotantes
}

async function cargarProductos() {
  try {
    const response = await fetch('data/productos.json');
    const data = await response.json();
    renderizarProductos(data.productos, data.escasez);
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

function renderizarProductos(productos, escasez) {
  const grid = document.getElementById('productos-grid');
  const mensajeEscasez = document.getElementById('escasez-mensaje');

  grid.innerHTML = productos.map(producto => `
    <div class="product-card ${producto.featured ? 'featured' : ''}">
      ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}">` : `<div class="placeholder-product" data-emoji="${producto.emoji}">${producto.emoji || '🧺'}</div>`}
      <div class="product-card-content">
        <span class="product-badge">${producto.tagline}</span>
        <h3>${producto.nombre}</h3>
        <div class="product-price">${producto.precio}€<span>+ envío</span></div>
        <ul class="product-content">
          ${producto.contenido.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <button class="product-cta" onclick="whatsappContact('${producto.id}')">
          Comprar Ahora
        </button>
      </div>
    </div>
  `).join('');

  const totalStock = productos.reduce((sum, p) => sum + p.stock, 0);
  mensajeEscasez.textContent = escasez.mensaje.replace('{stock}', totalStock);
}

function whatsappContact(productoId = '') {
  const mensaje = productoId ? `Hola, quiero comprar la ${productoId}. ¿Está disponible?` : 'Hola, quiero acceder a la Caja Aurum. ¿Qué opciones tengo disponibles esta semana?';
  const url = `https://wa.me/${CONFIG.whatsapp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

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

let lastScroll = 0;
const header = document.getElementById('header');

function initHeaderScroll() {
  if (!header) return;

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

function scrollToCta() {
  document.getElementById('cta-final').scrollIntoView({
    behavior: 'smooth'
  });
}

function initHeroParticles() {
  // No usado - ahora usamos video
}

function initParallaxProducts() {
  const products = document.querySelectorAll('.product-card');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    products.forEach((card, index) => {
      const speed = 0.05 * (index + 1);
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        card.style.transform = `translateY(${scrollY * speed}px)`;
      }
    });
  });
}

function initTiltEffect() {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  initHeroVideoInteractive();
}

function initHeroVideoInteractive() {
  const hero = document.querySelector('.hero');
  const heroVideo = document.querySelector('.hero-video');

  if (!hero || !heroVideo) return;

  let currentTranslateX = 0;
  let currentTranslateY = 0;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    currentTranslateX = (x - 0.5) * 6;
    currentTranslateY = (y - 0.5) * 3;

    const scrollY = window.pageYOffset;
    const scale = 1.1 + (scrollY * 0.0001);
    const translateY = scrollY * 0.1;

    heroVideo.style.transform = `translate(-50%, -50%) scale(${scale}) translate(${currentTranslateX}%, ${translateY + currentTranslateY}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    const scrollY = window.pageYOffset;
    const scale = 1.1 + (scrollY * 0.0001);
    const translateY = scrollY * 0.1;
    heroVideo.style.transform = `translate(-50%, -50%) scale(${scale}) translateY(${translateY}px)`;
  });
}

function initTypingEffect() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  let index = 0;

  function type() {
    if (index < text.length) {
      heroTitle.textContent += text.charAt(index);
      index++;
      setTimeout(type, 50);
    }
  }

  setTimeout(type, 1000);
}

function initCounterAnimation() {
  const stockElement = document.getElementById('escasez-mensaje');
  if (!stockElement) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = stockElement.textContent;
        const numbers = text.match(/\d+/g);
        if (numbers) {
          numbers.forEach(num => {
            animateCounter(stockElement, num);
          });
        }
      }
    });
  }, { threshold: 0.5 });

  observer.observe(stockElement);
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = element.textContent.replace(/\d+/, Math.floor(target));
      clearInterval(timer);
    }
  }, 30);
}

document.addEventListener('DOMContentLoaded', () => {
  initFloatingBaskets();
  cargarProductos();
  initNavMobile();
  initScrollAnimations();
  initHeaderScroll();
  initParallaxProducts();
  initTiltEffect();
  initTypingEffect();
  initCounterAnimation();
  initHeroVideoParallax();
  initHeroVideoInteractive();
});

function initHeroVideoParallax() {
  const hero = document.querySelector('.hero');
  const heroVideo = document.querySelector('.hero-video');

  if (!hero || !heroVideo) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (scrollY < window.innerHeight) {
      const scale = 1.1 + (scrollY * 0.0001);
      const translateY = scrollY * 0.1;
      heroVideo.style.transform = `translate(-50%, -50%) scale(${scale}) translateY(${translateY}px)`;
    }
  });
}