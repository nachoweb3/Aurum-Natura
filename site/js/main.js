/* 🜂 AURUM NATURA — JavaScript Principal */

// ============================================
   CONFIGURACIÓN
// ============================================
const CONFIG = {
  whatsapp: '+34640943669',
  colors: {
    dorado: 0xd4af37,
    doradoClaro: 0xf4cf57
  }
};

// ============================================
   CARGA DE PRODUCTOS
// ============================================
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

  // Renderizar productos
  grid.innerHTML = productos.map(producto => `
    <div class="product-card ${producto.featured ? 'featured' : ''}">
      ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}" class="placeholder-foto">` : `<div class="placeholder-product" ${producto.emoji ? 'data-emoji="' + producto.emoji + '"' : ''}>${producto.emoji || '🧺'}</div>`}
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
  `).join('');

  // Mensaje de escasez
  const totalStock = productos.reduce((sum, p) => sum + p.stock, 0);
  mensajeEscasez.textContent = escasez.mensaje.replace('{stock}', totalStock);
}

// ============================================
   WHATSAPP CONTACT
// ============================================
function whatsappContact(productoId = '') {
  let mensaje = CONFIG.whatsapp.mensaje;

  if (productoId) {
    mensaje = `Hola, quiero comprar la ${productoId}. ¿Está disponible?`;
  }

  const url = `https://wa.me/${CONFIG.whatsapp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

// ============================================
   NAV MÓVIL
// ============================================
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

// ============================================
   SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
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

// ============================================
   HEADER SCROLL BEHAVIOR
// ============================================
let lastScroll = 0;
const header = document.getElementById('header');

function initHeaderScroll() {
  if (!header) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Hide on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  });
}

// ============================================
   SMOOTH SCROLL
// ============================================
function scrollToCta() {
  document.getElementById('cta-final').scrollIntoView({
    behavior: 'smooth'
  });
}

// ============================================
   THREE.JS PARTICLES (Hero Background)
// ============================================
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Setup Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Create particles
  const particleCount = 100;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z

    // Gold color variations
    const colorMix = Math.random();
    colors[i * 3] = CONFIG.colors.dorado;
    colors[i * 3 + 1] = CONFIG.colors.dorado;
    colors[i * 3 + 2] = colorMix > 0.5 ? CONFIG.colors.dorado : CONFIG.colors.doradoClaro;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  camera.position.z = 5;

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Gentle floating motion
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Vertical floating
      positions[i3 + 1] += Math.sin(Date.now() * 0.001 + i) * 0.002;

      // Mouse influence
      positions[i3 + 1] += (mouseX * 0.5 - positions[i3 + 1]) * 0.02;
      positions[i3 + 1] += (mouseY * 0.5 - positions[i3 + 1]) * 0.02;
    }

    particles.geometry.attributes.position.needsUpdate = true;

    // Slow rotation
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ============================================
   FALLBACK: Three.js no disponible
// ============================================
function initFallbackParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3
    });
  }

  function animateFallback() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
      ctx.fill();

      p.y -= p.speedY;

      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animateFallback);
  }

  animateFallback();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ============================================
   INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Cargar productos
  cargarProductos();

  // Inicializar navegación móvil
  initNavMobile();

  // Inicializar scroll animations
  initScrollAnimations();

  // Inicializar header scroll
  initHeaderScroll();

  // Inicializar partículas (Three.js o fallback)
  if (typeof THREE !== 'undefined') {
    initHeroParticles();
  } else {
    console.log('Three.js no disponible, usando fallback');
    initFallbackParticles();
  }
});

// ============================================
   LOADER (Three.js desde CDN)
// ============================================
const threeScript = document.createElement('script');
threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
threeScript.onload = () => {
  console.log('Three.js cargado');
  initHeroParticles();
};
threeScript.onerror = () => {
  console.log('Error cargando Three.js, usando fallback');
  initFallbackParticles();
};
document.head.appendChild(threeScript);
