import {
  formatMoney,
  getCategoryById,
  getCountryLabel,
  getLocale,
  getLocalizedCategory,
  getLocalizedProduct,
  getLocalizedProducts,
  getProductById,
  getProductBySlug,
  getRestrictedNotice,
  searchProducts
} from './catalog.mjs';
import {
  calculateCartTotals,
  countCartItems,
  createCartItemKey,
  mergeCartLines,
  removeCartLine,
  updateCartLineQuantity
} from './cart.mjs';
import { buildWhatsAppOrderMessage } from './checkout.mjs';

const STORAGE_KEYS = {
  locale: 'aurum-natura.locale.v2',
  cart: 'aurum-natura.cart.v2'
};

const PRODUCT_LIST_PATH = 'productos.html';

const MEDIA_LIBRARY = {
  homeHero: 'assets/img/ia/home-hero.png',
  farmOrigin: 'assets/cultivos.jpeg',
  cultivos: 'assets/cultivos.jpeg',
  mentaVisual: 'assets/menta.jpeg',
  boxEssential: 'assets/productos/caja-huerto-basica.png',
  boxFamily: 'assets/productos/caja-huerto-campo.png',
  boxReserve: 'assets/productos/caja-huerto-atardecer.png',
  boxPremium: 'assets/productos/caja-huerto-premium.png',
  eggsHero: 'assets/huevos-finca.jpg',
  seasonKitchen: 'assets/fam2.png',
  familyTable: 'assets/fam1.png',
  vegetableHarvest: 'assets/cesta.png',
  fruitSelection: 'assets/frutas.png',
  soapLavender: 'assets/productos/jabon-lavanda-calendula.png',
  soapMint: 'assets/productos/jabon-menta-ceniza.png',
  soapAsh: 'assets/productos/jabon-menta-ceniza.png',
  soapRose: 'assets/productos/jabon-rosa-geranio.png',
  soapRosemary: 'assets/productos/jabon-romero-ortiga.png',
  soapHoney: 'assets/productos/jabon-miel-avena.png',
  soapChamomile: 'assets/productos/jabon-manzanilla-aciano.png',
  soapCollection: 'assets/productos/jabon-lavanda-calendula.png',
  driedHerbs: 'assets/productos/plantas-lavanda-romero-salvia.png',
  ceramicsEarth: 'assets/productos/ceramica-tierra.png',
  ceramicsCalm: 'assets/productos/ceramica-calma.png',
  plantsCollage: 'assets/productos/plantas-vivas-collage.png',
  plantsHerbs: 'assets/productos/plantas-lavanda-romero-salvia.png'
};

const COPY = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Nosotros',
      catalog: 'Productos',
      contact: 'Contacto',
      cart: 'Cesta',
      checkout: 'Confirmar pedido'
    },
    cart: {
      title: 'Tu cesta semanal',
      empty:
        'Todavia no has anadido ningun producto. Empieza por una caja y completa tu pedido con huevos, huerta o fruta de temporada.',
      view: 'Confirmar pedido',
      page: 'Ver cesta completa',
      continue: 'Seguir comprando',
      remove: 'Eliminar',
      subtotal: 'Subtotal',
      note: 'Confirmamos suscripcion, disponibilidad y siguiente entrega por WhatsApp.'
    },
    common: {
      addToCart: 'Anadir a la cesta',
      added: 'Producto anadido a la cesta',
      discover: 'Ver detalle',
      shopCategory: 'Ver seleccion',
      restrictions: 'Disponibilidad y entrega',
      prepared:
        'Atencion directa por WhatsApp para confirmar modalidad, disponibilidad y primera entrega.',
      backToCatalog: 'Volver a productos',
      directWhatsApp: 'Hablar por WhatsApp'
    },
    badges: {
      signature: 'Serie limitada',
      bestseller: 'La mas deseada',
      limited: 'Coleccion viva',
      'farm-fresh': 'Pieza unica',
      seasonal: 'De temporada',
      kitchen: 'Hecho a mano',
      family: 'Para el hogar',
      weekly: 'Edicion semanal',
      pantry: 'Seleccion reserva',
      handmade: 'Hecho a mano'
    },
    footer: {
      kicker: 'Aurum Natura',
      title: 'Finca de origen · Suscripcion de temporada · Nombela, Toledo.',
      statement:
        'Seleccion limitada de huevos camperos, huerta y fruta de temporada para hogares que han elegido comer con criterio.',
      rights: 'Todos los derechos reservados.'
    }
  }
};

const VICTORIAN_CORNER_SVG = `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 2C2 2 8 20 20 32C32 44 50 50 50 50" stroke="rgba(217,177,106,0.45)" stroke-width="1.2" fill="none"/>
  <path d="M2 2C2 2 14 8 26 14C38 20 50 50 50 50" stroke="rgba(217,177,106,0.3)" stroke-width="0.8" fill="none"/>
  <path d="M2 8C2 8 6 16 10 22" stroke="rgba(217,177,106,0.35)" stroke-width="0.6" fill="none"/>
  <path d="M8 2C8 2 16 6 22 10" stroke="rgba(217,177,106,0.35)" stroke-width="0.6" fill="none"/>
  <circle cx="6" cy="6" r="2.5" fill="rgba(217,177,106,0.3)"/>
  <circle cx="20" cy="20" r="1.5" fill="rgba(217,177,106,0.2)"/>
  <path d="M2 2L12 2L12 4L4 4L4 12L2 12Z" fill="rgba(217,177,106,0.25)"/>
</svg>`;

function injectVictorianBorder() {
  const positions = ['tl', 'tr', 'bl', 'br'];
  for (const pos of positions) {
    const el = document.createElement('div');
    el.className = `victorian-corner victorian-corner--${pos}`;
    el.innerHTML = VICTORIAN_CORNER_SVG;
    document.body.appendChild(el);
  }
}

export function getFakeStock(productId) {
  if (!productId) return null;
  const today = new Date();
  const daySeed = today.getUTCFullYear() * 10000 + (today.getUTCMonth() + 1) * 100 + today.getUTCDate();
  let hash = 0;
  const input = `${productId}-${daySeed}`;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
  }
  const pool = Math.abs(hash) % 18;
  return pool < 12 ? null : pool - 10;
}

export function getNextSundayCutoff() {
  const now = new Date();
  const day = now.getDay();
  const daysUntilSunday = day === 0 ? 0 : 7 - day;
  const target = new Date(now);
  target.setDate(now.getDate() + daysUntilSunday);
  target.setHours(22, 0, 0, 0);
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }
  return target;
}

export function formatCountdown(targetDate) {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) return '00d 00h 00m';
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;
}

export const FREE_SHIPPING_THRESHOLD = 35;

export async function bootStorefront(pageId, renderPage) {
  const catalog = await fetch('data/catalogo.json').then((response) => response.json());
  const app = createStorefrontApp(catalog, pageId);

  injectVictorianBorder();
  app.renderChrome();
  bindGlobalEvents(app);
  await renderPage(app);
  app.renderCartDrawer();
  initScrollAnimations();

  return app;
}

function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  // Auto-tag common blocks with .reveal if not already flagged
  const autoTargets = document.querySelectorAll(
    '.section-block, .editorial-band, .product-card, .category-card, .testimonial-card, .glass-card, .soap-landing, .manifesto-band, .quote-band, .cta-panel, .page-hero'
  );
  autoTargets.forEach((el, idx) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(idx % 6, 5) * 80}ms`;
    }
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -10% 0px' }
  );

  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el) => io.observe(el));

  // Fallback: ensure nothing stays hidden after 2.5s (safety net for mobile / tall blocks)
  setTimeout(() => {
    reveals.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        el.classList.add('is-visible');
      }
    });
  }, 2500);

  // Parallax: video hero background and any .parallax element
  const hero = document.querySelector('.video-hero__media');
  const heroVideo = hero?.querySelector('video');
  const parallaxEls = document.querySelectorAll('.parallax, .parallax-bg');

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const y = window.scrollY;
      if (heroVideo) {
        heroVideo.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.05)`;
      }
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax ?? '0.25');
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function createStorefrontApp(catalog, pageId) {
  const url = new URL(window.location.href);
  const savedLocale = safeStorageGet(STORAGE_KEYS.locale);
  const locale = getLocale(catalog, url.searchParams.get('lang') ?? savedLocale);
  const cart = safeStorageGet(STORAGE_KEYS.cart, true) ?? [];

  const app = {
    catalog,
    pageId,
    state: {
      locale,
      cart,
      navOpen: false,
      cartOpen: false
    },
    shell: {
      header: document.getElementById('site-header'),
      footer: document.getElementById('site-footer'),
      cartDrawer: document.getElementById('cart-drawer'),
      pageRoot: document.getElementById('page-root')
    }
  };

  app.copy = COPY[locale] ?? COPY.es;
  app.categories = catalog.categories.map((category) => getLocalizedCategory(category, locale));
  app.getProducts = () => getLocalizedProducts(catalog, app.state.locale);
  app.getProductBySlug = (slug) =>
    getLocalizedProduct(getProductBySlug(catalog, slug), app.state.locale);
  app.getProductById = (id) => getLocalizedProduct(getProductById(catalog, id), app.state.locale);
  app.getCategoryById = (id) =>
    getLocalizedCategory(getCategoryById(catalog, id), app.state.locale);
  app.search = (term = '', categoryId = 'all') =>
    searchProducts(catalog, app.state.locale, term, categoryId);
  app.formatMoney = (amount) => formatMoney(amount, catalog.store.currency, app.state.locale);
  app.createUrl = (path, params = {}) => {
    const next = new URL(path, window.location.href);
    const supportsLocales = (catalog.store.supportedLocales ?? []).length > 1;

    if (supportsLocales) {
      next.searchParams.set('lang', app.state.locale);
    } else {
      next.searchParams.delete('lang');
    }

    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined || value === '') {
        next.searchParams.delete(key);
      } else {
        next.searchParams.set(key, value);
      }
    }

    return `${next.pathname}${next.search}`;
  };
  app.setLocale = (nextLocale) => {
    safeStorageSet(STORAGE_KEYS.locale, nextLocale);
    const next = new URL(window.location.href);
    next.searchParams.set('lang', nextLocale);
    window.location.href = `${next.pathname}${next.search}`;
  };
  app.getCartLines = () =>
    app.state.cart.map((line) => {
      const product = app.getProductById(line.productId);
      return {
        ...line,
        name: product?.name ?? line.name,
        slug: product?.slug ?? line.slug,
        restrictedCountries: product?.restrictedCountries ?? line.restrictedCountries ?? [],
        imageMarkup: renderProductVisual(product, 'mini')
      };
    });
  app.getCartTotals = () => calculateCartTotals(app.state.cart);
  app.getCartCount = () => countCartItems(app.state.cart);
  app.addToCart = (productId, quantity = 1) => {
    const product = getProductById(catalog, productId);
    const localized = app.getProductById(productId);

    if (!product || !localized) {
      return;
    }

    const merged = mergeCartLines([
      ...app.state.cart,
      {
        productId: product.id,
        quantity,
        unitPrice: product.price,
        slug: product.slug,
        name: localized.name,
        shipClass: product.shipClass,
        restrictedCountries: product.restrictedCountries
      }
    ]);

    app.state.cart = merged;
    safeStorageSet(STORAGE_KEYS.cart, app.state.cart);
    app.renderCartDrawer();
    app.openCart();
    showToast(app, app.copy.common.added);
  };
  app.removeCartLine = (itemKey) => {
    app.state.cart = removeCartLine(app.state.cart, itemKey);
    safeStorageSet(STORAGE_KEYS.cart, app.state.cart);
    app.renderCartDrawer();
  };
  app.updateCartLine = (itemKey, quantity) => {
    app.state.cart = updateCartLineQuantity(app.state.cart, itemKey, quantity);
    safeStorageSet(STORAGE_KEYS.cart, app.state.cart);
    app.renderCartDrawer();
  };
  app.clearCart = () => {
    app.state.cart = [];
    safeStorageSet(STORAGE_KEYS.cart, app.state.cart);
    app.renderCartDrawer();
  };
  app.openCart = () => {
    app.state.cartOpen = true;
    document.body.classList.add('cart-open');
    app.renderCartDrawer();
  };
  app.closeCart = () => {
    app.state.cartOpen = false;
    document.body.classList.remove('cart-open');
    app.renderCartDrawer();
  };
  app.renderChrome = () => {
    if (app.shell.header) {
      app.shell.header.innerHTML = renderHeader(app);
    }

    if (app.shell.footer) {
      app.shell.footer.innerHTML = renderFooter(app);
    }
  };
  app.renderCartDrawer = () => {
    if (!app.shell.cartDrawer) {
      return;
    }

    const lines = app.getCartLines();
    const totals = app.getCartTotals();

    app.shell.cartDrawer.innerHTML = `
      <div class="cart-overlay" data-action="close-cart"></div>
      <aside class="cart-panel">
        <div class="cart-panel__header">
          <div>
            <p class="eyebrow">Cesta</p>
            <h2>${app.copy.cart.title}</h2>
          </div>
          <button type="button" class="icon-button" data-action="close-cart" aria-label="Cerrar cesta">×</button>
        </div>
        ${
          lines.length
            ? `
              <div class="cart-lines">
                ${lines
                  .map(
                    (line) => `
                      <article class="cart-line">
                        <div class="cart-line__media">${line.imageMarkup}</div>
                        <div class="cart-line__body">
                          <a href="${app.createUrl('producto.html', { slug: line.slug })}" class="cart-line__name">${line.name}</a>
                          <p>${app.formatMoney(line.unitPrice)}</p>
                          <div class="cart-line__actions">
                            <button type="button" data-action="decrease-line" data-line-key="${createCartItemKey(line)}">−</button>
                            <span>${line.quantity}</span>
                            <button type="button" data-action="increase-line" data-line-key="${createCartItemKey(line)}">+</button>
                            <button type="button" class="link-button" data-action="remove-line" data-line-key="${createCartItemKey(line)}">${app.copy.cart.remove}</button>
                          </div>
                        </div>
                      </article>
                    `
                  )
                  .join('')}
              </div>
              <div class="cart-panel__footer">
                <div class="cart-summary">
                  <span>${app.copy.cart.subtotal}</span>
                  <strong>${app.formatMoney(totals.subtotal)}</strong>
                </div>
                <p class="cart-note">${app.copy.cart.note}</p>
                <div class="cart-panel__actions">
                  <a href="${app.createUrl('carrito.html')}" class="button button--ghost">${app.copy.cart.page}</a>
                  <a href="${app.createUrl('checkout.html')}" class="button button--primary">${app.copy.cart.view}</a>
                </div>
              </div>
            `
            : `
              <div class="cart-empty">
                <p>${app.copy.cart.empty}</p>
                <a href="${app.createUrl(PRODUCT_LIST_PATH)}" class="button button--secondary">${app.copy.cart.continue}</a>
              </div>
            `
        }
      </aside>
    `;
  };
  app.collectRestrictions = (countryCode) =>
    app.getCartLines()
      .map((line) => {
        const product = getProductById(catalog, line.productId);
        const notice = getRestrictedNotice(product, countryCode, app.state.locale);

        if (!notice) {
          return null;
        }

        return {
          ...notice,
          productName: line.name,
          country: countryCode
        };
      })
      .filter(Boolean);
  app.buildWhatsAppUrl = ({ orderCode, customer, restrictions }) => {
    const lines = app.getCartLines().map((line) => ({
      name: line.name,
      quantity: line.quantity,
      price: line.unitPrice
    }));
    const totals = app.getCartTotals();
    const message = buildWhatsAppOrderMessage({
      locale: app.state.locale,
      orderCode,
      customer,
      lines,
      totals,
      restrictions
    });

    return `https://wa.me/${catalog.store.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return app;
}

function bindGlobalEvents(app) {
  document.addEventListener('click', (event) => {
    const actionTarget = event.target.closest('[data-action]');

    if (!actionTarget) {
      return;
    }

    const { action } = actionTarget.dataset;

    if (action === 'toggle-nav') {
      event.preventDefault();
      app.state.navOpen = !app.state.navOpen;
      document.body.classList.toggle('nav-open', app.state.navOpen);
      return;
    }

    if (action === 'toggle-cart') {
      event.preventDefault();
      app.state.cartOpen ? app.closeCart() : app.openCart();
      return;
    }

    if (action === 'close-cart') {
      event.preventDefault();
      app.closeCart();
      return;
    }

    if (action === 'set-locale') {
      event.preventDefault();
      app.setLocale(actionTarget.dataset.locale);
      return;
    }

    if (action === 'add-to-cart') {
      event.preventDefault();
      app.addToCart(actionTarget.dataset.productId, Number(actionTarget.dataset.quantity ?? 1));
      return;
    }

    if (action === 'remove-line') {
      event.preventDefault();
      app.removeCartLine(actionTarget.dataset.lineKey);
      return;
    }

    if (action === 'increase-line') {
      event.preventDefault();
      const line = app.state.cart.find(
        (cartLine) => createCartItemKey(cartLine) === actionTarget.dataset.lineKey
      );
      if (line) {
        app.updateCartLine(actionTarget.dataset.lineKey, line.quantity + 1);
      }
      return;
    }

    if (action === 'decrease-line') {
      event.preventDefault();
      const line = app.state.cart.find(
        (cartLine) => createCartItemKey(cartLine) === actionTarget.dataset.lineKey
      );
      if (!line) {
        return;
      }
      if (line.quantity === 1) {
        app.removeCartLine(actionTarget.dataset.lineKey);
      } else {
        app.updateCartLine(actionTarget.dataset.lineKey, line.quantity - 1);
      }
    }
  });
}

function renderHeader(app) {
  const links = [
    { page: 'home', href: app.createUrl('index.html'), label: app.copy.nav.home },
    { page: 'about', href: app.createUrl('sobre-nosotros.html'), label: app.copy.nav.about },
    { page: 'catalog', href: app.createUrl(PRODUCT_LIST_PATH), label: app.copy.nav.catalog },
    { page: 'contact', href: app.createUrl('contacto.html'), label: app.copy.nav.contact }
  ];
  const showLocaleSwitcher = (app.catalog.store.supportedLocales ?? []).length > 1;

  const cornerSvg = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
    <path d="M2 2 L2 30 M2 2 L30 2" />
    <path d="M2 14 C 10 14, 14 10, 14 2" />
    <path d="M2 22 C 18 22, 22 18, 22 2" />
    <circle cx="14" cy="14" r="2.4" fill="currentColor" />
    <path d="M2 30 Q 8 30 12 26 Q 16 22 16 16" />
    <path d="M30 2 Q 30 8 26 12 Q 22 16 16 16" />
    <path d="M6 6 L10 10" />
    <path d="M20 4 Q 22 8 22 12" />
    <path d="M4 20 Q 8 22 12 22" />
  </svg>`;

  return `
    <div class="header-shell">
      <span class="corner corner--tl">${cornerSvg}</span>
      <span class="corner corner--tr">${cornerSvg}</span>
      <span class="corner corner--bl">${cornerSvg}</span>
      <span class="corner corner--br">${cornerSvg}</span>
      <a href="${app.createUrl('index.html')}" class="brand">
        <span class="brand__seal"><img src="assets/img/logo.png" alt="Aurum Natura" /></span>
        <span>
          <strong>Aurum Natura</strong>
          <small>Nombela · Toledo</small>
        </span>
      </a>
      <button type="button" class="icon-button mobile-only" data-action="toggle-nav" aria-label="Abrir menu">☰</button>
      <nav class="main-nav">
        ${links
          .map(
            (link) => `
              <a href="${link.href}" class="${isPageActive(app.pageId, link.page) ? 'is-active' : ''}">${link.label}</a>
            `
          )
          .join('')}
      </nav>
      <div class="header-actions">
        ${
          showLocaleSwitcher
            ? `
              <div class="locale-switcher">
                ${app.catalog.store.supportedLocales
                  .map(
                    (locale) => `
                      <button type="button" class="${app.state.locale === locale ? 'is-active' : ''}" data-action="set-locale" data-locale="${locale}">
                        ${locale.toUpperCase()}
                      </button>
                    `
                  )
                  .join('')}
              </div>
            `
            : ''
        }
        <button type="button" class="cart-button" data-action="toggle-cart">
          <span>${app.copy.nav.cart}</span>
          <strong>${app.getCartCount()}</strong>
        </button>
      </div>
    </div>
  `;
}

function renderFooter(app) {
  return `
    <div class="footer-shell">
      <div>
        <p class="eyebrow">${app.copy.footer.kicker}</p>
        <h3>${app.copy.footer.title}</h3>
      </div>
      <p>${app.copy.footer.statement}</p>
      <div class="footer-links">
        <a href="${app.createUrl('sobre-nosotros.html')}">${app.copy.nav.about}</a>
        <a href="${app.createUrl(PRODUCT_LIST_PATH)}">${app.copy.nav.catalog}</a>
        <a href="${app.createUrl('contacto.html')}">${app.copy.nav.contact}</a>
        <a href="${app.createUrl('checkout.html')}">${app.copy.nav.checkout}</a>
      </div>
      <div class="social-links">
        <a href="https://instagram.com/nacho_web3" target="_blank" rel="noopener" class="social-link">Instagram</a>
        <a href="https://x.com/nachoweb3__x" target="_blank" rel="noopener" class="social-link">X</a>
      </div>
      <p class="footer-legal">&copy; ${new Date().getFullYear()} ${app.catalog.store.name}. ${app.copy.footer.rights}</p>
    </div>
  `;
}

function showToast(app, message) {
  let toast = document.getElementById('site-toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'site-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('is-visible');

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 1800);
}

function safeStorageGet(key, parseJson = false) {
  try {
    const value = window.localStorage.getItem(key);

    if (!parseJson) {
      return value;
    }

    return value ? JSON.parse(value) : null;
  } catch {
    return parseJson ? null : '';
  }
}

function safeStorageSet(key, value) {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
  } catch {
    return null;
  }

  return value;
}

function isPageActive(pageId, candidate) {
  const map = {
    home: ['home'],
    catalog: ['catalog'],
    about: ['about'],
    contact: ['contact'],
    checkout: ['checkout']
  };

  return map[candidate]?.includes(pageId);
}

export function renderProductVisual(product, variant = 'card') {
  if (!product) {
    return '<div class="product-visual product-visual--empty"></div>';
  }

  const image = product.art?.media ? MEDIA_LIBRARY[product.art.media] : '';
  const palette = product.art?.palette ?? 'gold';
  const scene = product.art?.scene ?? 'farm-box';
  const label = getVisualLabel(product.name);

  if (image) {
    return `
      <div class="product-visual product-visual--${variant} palette-${palette} scene-${scene}">
        <img src="${image}" alt="${product.name}" loading="lazy" />
        <div class="product-visual__overlay"></div>
        <span class="product-visual__label">${label}</span>
      </div>
    `;
  }

  return `
    <div class="product-visual product-visual--${variant} palette-${palette} scene-${scene}">
      <div class="product-visual__glow"></div>
      <div class="product-visual__plane"></div>
      <div class="product-visual__object"></div>
      <span class="product-visual__label">${label}</span>
    </div>
  `;
}

export function getMediaAsset(key) {
  return MEDIA_LIBRARY[key] ?? MEDIA_LIBRARY.homeHero;
}

export function getProductMediaGallery(product) {
  if (!product) {
    return [MEDIA_LIBRARY.homeHero];
  }

  const categoryFallbacks = {
    subscriptions: ['boxFamily', 'familyTable', 'seasonKitchen'],
    eggs: ['eggsHero', 'seasonKitchen', 'familyTable'],
    vegetables: ['vegetableHarvest', 'seasonKitchen', 'farmOrigin'],
    fruit: ['seasonKitchen', 'familyTable', 'farmOrigin']
  };

  const keys = [
    product.art?.media,
    ...(product.art?.gallery ?? []),
    ...(categoryFallbacks[product.category] ?? ['homeHero'])
  ].filter(Boolean);

  return Array.from(new Set(keys)).map((key) => getMediaAsset(key)).slice(0, 4);
}

export function renderProductCard(app, product) {
  const category = app.getCategoryById(product.category);
  const badge = app.copy.badges[product.badge] ?? product.badge;
  const rawProduct = app.catalog.products.find((p) => p.id === product.id);
  const compareAt = rawProduct?.compareAt;
  const savingsPct = compareAt && compareAt > product.price
    ? Math.round(((compareAt - product.price) / compareAt) * 100)
    : 0;
  const compareMarkup = compareAt
    ? `<span class="product-card__compare">${app.formatMoney(compareAt)}</span>${savingsPct > 0 ? `<span class="product-card__savings">-${savingsPct}%</span>` : ''}`
    : '';
  const stock = getFakeStock(product.id);
  const stockBadge = stock !== null && stock <= 6
    ? `<span class="product-card__stock ${stock <= 3 ? 'product-card__stock--low' : ''}">Sólo ${stock} ${stock === 1 ? 'unidad' : 'unidades'}</span>`
    : '';

  return `
    <article class="product-card">
      <a href="${app.createUrl('producto.html', { slug: product.slug })}" class="product-card__media">
        ${renderProductVisual(product, 'card')}
        <span class="pill">${badge}</span>
        ${stockBadge}
      </a>
      <div class="product-card__body">
        <div class="product-card__meta">
          <span>${category?.label ?? ''}</span>
          <div class="product-card__pricing">
            <strong>${app.formatMoney(product.price)}</strong>
            ${compareMarkup}
          </div>
        </div>
        <h3><a href="${app.createUrl('producto.html', { slug: product.slug })}">${product.name}</a></h3>
        <p>${product.shortDescription}</p>
        <div class="product-card__actions">
          <a href="${app.createUrl('producto.html', { slug: product.slug })}" class="button button--ghost">${app.copy.common.discover}</a>
          <button type="button" class="button button--primary" data-action="add-to-cart" data-product-id="${product.id}">
            ${app.copy.common.addToCart}
          </button>
        </div>
      </div>
    </article>
  `;
}

export function renderCategoryCard(app, category) {
  const sample = app.getProducts().find((product) => product.category === category.id);

  return `
    <article class="category-card palette-${category.tone}">
      <div class="category-card__media">
        ${renderProductVisual(sample, 'card')}
      </div>
      <div class="category-card__body">
        <p class="eyebrow">${category.label}</p>
        <h3>${category.description}</h3>
        <a href="${app.createUrl(PRODUCT_LIST_PATH, { category: category.id })}" class="button button--secondary">${app.copy.common.shopCategory}</a>
      </div>
    </article>
  `;
}

export function getRestrictionMarkup(app, product, countryCode) {
  const notice = getRestrictedNotice(product, countryCode, app.state.locale);

  if (!notice) {
    return '';
  }

  return `
    <div class="notice notice--warn">
      <strong>${app.copy.common.restrictions}</strong>
      <p>${notice.message}</p>
    </div>
  `;
}

export function createOrderCode(prefix = 'AN') {
  const suffix = Date.now().toString().slice(-6);
  return `${prefix}-${suffix}`;
}

export function getCountryOptions(locale) {
  return ['ES', 'PT', 'FR'].map((code) => ({
    code,
    label: getCountryLabel(code, locale)
  }));
}

export function getVisualLabel(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .join(' ');
}
