import { renderProductCard } from '../runtime.mjs';

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
  const initialSearch = query.searchParams.get('search') ?? '';
  const subscriptionBoxes = app.getProducts().filter((product) => product.category === 'subscriptions');

  app.shell.pageRoot.innerHTML = `
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

    <section class="filters-bar">
      <div class="chip-row" id="catalog-category-row"></div>
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
  const searchInput = document.getElementById('catalog-search');
  const grid = document.getElementById('catalog-grid');
  const count = document.getElementById('catalog-results-count');

  let category = initialCategory;
  let search = initialSearch;

  const render = () => {
    const matches = app.search(search, category);

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
    count.textContent = `${matches.length} ${copy.results}`;
    grid.innerHTML = matches.map((product) => renderProductCard(app, product)).join('');

    const next = new URL(window.location.href);
    if (category !== 'all') {
      next.searchParams.set('category', category);
    } else {
      next.searchParams.delete('category');
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
    render();
  });

  searchInput.addEventListener('input', () => {
    search = searchInput.value;
    render();
  });

  render();
}
