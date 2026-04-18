import { renderProductCard, getNextSundayCutoff, formatCountdown, FREE_SHIPPING_THRESHOLD } from '../runtime.mjs';

const CATALOG_COPY = {
  es: {
    eyebrow: 'Suscripciones y compra puntual',
    title: 'Elige tu caja y completa la semana con producto de temporada.',
    body:
      'Aurum Natura vende suscripcion primero y compra puntual despues. Compara las tres cajas principales y, si lo necesitas, anade huevos camperos, huerta o fruta a tu ritmo.',
    comparisonKicker: 'Tres niveles claros',
    comparisonTitle: 'La suscripcion es la mejor forma de entrar en la marca.',
    comparisonBody:
      'Las cajas concentran la mejor lectura del proyecto: origen, regularidad y una compra semanal mucho mas resuelta para casa.',
    all: 'Todo',
    search: 'Buscar por nombre o descripcion',
    results: 'resultados',
    subcategoryLabels: {
      soaps: 'Jabones',
      ceramics: 'Cerámica',
      plants: 'Plantas',
      herbs: 'Hierbas'
    },
    supportKicker: 'Por que cambia el contenido',
    supportCards: [
      {
        title: 'La temporada manda',
        body: 'El contenido se adapta al mejor momento de la finca y de la huerta. Eso es parte del valor, no una falta de control.'
      },
      {
        title: 'Precio premium con sentido',
        body: 'Pagas seleccion, escala corta, huevos de gallinas de raza y una experiencia mas fiable que la compra impersonal.'
      },
      {
        title: 'Compra puntual o suscripcion',
        body: 'Puedes probar con una primera caja o entrar directamente en la modalidad semanal o quincenal.'
      }
    ]
  }
};

export async function renderCatalogPage(app) {
  const copy = CATALOG_COPY[app.state.locale] ?? CATALOG_COPY.es;
  const query = new URL(window.location.href);
  const initialCategory = query.searchParams.get('category') ?? 'all';
  const initialSub = query.searchParams.get('sub') ?? 'all';
  const initialSearch = query.searchParams.get('search') ?? '';
  const subscriptionBoxes = app.getProducts().filter((product) => product.category === 'subscriptions');

  const cutoff = getNextSundayCutoff();
  const cartTotal = (app.state.cart ?? []).reduce((sum, line) => {
    const p = app.catalog.products.find((prod) => prod.id === line.productId);
    return sum + (p ? p.price * (line.quantity ?? 1) : 0);
  }, 0);
  const shippingMissing = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const shippingProgress = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100));

  app.shell.pageRoot.innerHTML = `
    <section class="urgency-banner">
      <div class="urgency-banner__item urgency-banner__item--countdown">
        <span class="urgency-banner__label">Cierre de pedidos semanal</span>
        <strong id="urgency-countdown">${formatCountdown(cutoff)}</strong>
        <small>domingo 22:00 · cosecha del lunes</small>
      </div>
      <div class="urgency-banner__item urgency-banner__item--shipping">
        <span class="urgency-banner__label">
          ${shippingMissing > 0
            ? `Te faltan <strong>${shippingMissing.toFixed(2)}€</strong> para envío gratis`
            : '<strong>¡Envío gratis conseguido!</strong>'}
        </span>
        <div class="shipping-bar">
          <div class="shipping-bar__fill" style="width: ${shippingProgress}%;"></div>
        </div>
        <small>Envío gratis a partir de ${FREE_SHIPPING_THRESHOLD}€</small>
      </div>
    </section>

    <section class="page-hero">
      <p class="eyebrow">${copy.eyebrow}</p>
      <h1>${copy.title}</h1>
      <p>${copy.body}</p>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${copy.comparisonKicker}</p>
        <h2>${copy.comparisonTitle}</h2>
        <p>${copy.comparisonBody}</p>
      </div>
      <div class="product-grid">
        ${subscriptionBoxes.map((product) => renderProductCard(app, product)).join('')}
      </div>
    </section>

    <section class="filters-bar filters-bar--sticky">
      <div class="chip-row" id="catalog-category-row"></div>
      <div class="chip-row chip-row--sub" id="catalog-sub-row" hidden></div>
      <label class="search-field">
        <span>⌕</span>
        <input id="catalog-search" type="search" value="${initialSearch}" placeholder="${copy.search}" />
      </label>
    </section>

    <section class="section-block">
      <div class="section-heading section-heading--inline">
        <h2 id="catalog-results-count"></h2>
      </div>
      <div class="product-grid" id="catalog-grid"></div>
    </section>

    <section class="detail-card-grid">
      ${copy.supportCards
        .map(
          (card) => `
            <article class="glass-card">
              <strong>${card.title}</strong>
              <p>${card.body}</p>
            </article>
          `
        )
        .join('')}
    </section>
  `;

  const categoryRow = document.getElementById('catalog-category-row');
  const subRow = document.getElementById('catalog-sub-row');
  const searchInput = document.getElementById('catalog-search');
  const grid = document.getElementById('catalog-grid');
  const count = document.getElementById('catalog-results-count');

  let category = initialCategory;
  let sub = initialSub;
  let search = initialSearch;

  const render = () => {
    let matches = app.search(search, category);
    if (category === 'artisan' && sub !== 'all') {
      matches = matches.filter((p) => p.subcategory === sub);
    }

    categoryRow.innerHTML = `
      <button type="button" class="filter-chip ${category === 'all' ? 'is-active' : ''}" data-category="all">${copy.all}</button>
      ${app.categories
        .map(
          (item) => `
            <button type="button" class="filter-chip ${category === item.id ? 'is-active' : ''}" data-category="${item.id}">
              ${item.label}
            </button>
          `
        )
        .join('')}
    `;

    if (category === 'artisan') {
      const subs = ['soaps', 'ceramics', 'plants', 'herbs'];
      subRow.hidden = false;
      subRow.innerHTML = `
        <button type="button" class="filter-chip filter-chip--sub ${sub === 'all' ? 'is-active' : ''}" data-sub="all">${copy.all}</button>
        ${subs
          .map(
            (s) => `
              <button type="button" class="filter-chip filter-chip--sub ${sub === s ? 'is-active' : ''}" data-sub="${s}">
                ${copy.subcategoryLabels[s] ?? s}
              </button>
            `
          )
          .join('')}
      `;
    } else {
      subRow.hidden = true;
      subRow.innerHTML = '';
    }

    count.textContent = `${matches.length} ${copy.results}`;
    grid.innerHTML = matches.map((product) => renderProductCard(app, product)).join('');

    const next = new URL(window.location.href);
    if (category !== 'all') {
      next.searchParams.set('category', category);
    } else {
      next.searchParams.delete('category');
    }
    if (category === 'artisan' && sub !== 'all') {
      next.searchParams.set('sub', sub);
    } else {
      next.searchParams.delete('sub');
    }
    if (search.trim()) {
      next.searchParams.set('search', search.trim());
    } else {
      next.searchParams.delete('search');
    }
    next.searchParams.delete('lang');
    window.history.replaceState({}, '', `${next.pathname}${next.search}`);
  };

  categoryRow.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (!button) {
      return;
    }
    category = button.dataset.category;
    sub = 'all';
    render();
  });

  subRow.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sub]');
    if (!button) {
      return;
    }
    sub = button.dataset.sub;
    render();
  });

  searchInput.addEventListener('input', () => {
    search = searchInput.value;
    render();
  });

  render();

  const countdownEl = document.getElementById('urgency-countdown');
  if (countdownEl) {
    const tick = () => {
      countdownEl.textContent = formatCountdown(cutoff);
    };
    tick();
    setInterval(tick, 30000);
  }
}
