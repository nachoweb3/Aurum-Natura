import { getProductsByCategory } from '../catalog.mjs';
import { getProductMediaGallery, renderProductCard, renderProductVisual } from '../runtime.mjs';

const PRODUCT_COPY = {
  es: {
    notFound: 'No hemos encontrado ese producto.',
    related: 'Tambien puede interesarte',
    buy: 'Anadir a la cesta',
    directCheckout: 'Confirmar pedido',
    galleryKicker: 'Vista del producto',
    galleryTitle: 'Una presentacion clara para entender mejor lo que vas a recibir.',
    detailTitle: 'Por que merece su precio',
    detailBody:
      'Cada ficha explica origen, seleccion y uso domestico para que el valor se entienda desde la compra y no solo al abrir la caja.',
    shippingTitle: 'Entrega y atencion',
    shippingBody:
      'Confirmamos disponibilidad y modalidad de entrega por WhatsApp. Asi mantenemos un trato directo y evitamos promesas poco precisas.',
    cards: {
      contains: 'Que suele incluir',
      containsBody: 'El contenido cambia con la temporada, pero siempre mantiene una lectura clara de calidad, equilibrio y utilidad en cocina.',
      home: 'Como encaja en casa',
      homeBody: 'Esta seleccion esta pensada para resolver mejor la semana y elevar la sensacion de compra bien hecha.',
      service: 'Atencion directa',
      serviceBody: 'Si tienes dudas sobre suscripcion, primera caja o entrega, la resolucion es humana y rapida.'
    }
  }
};

const CATEGORY_NARRATIVE = {
  subscriptions: {
    title: 'La puerta principal a Aurum Natura',
    body:
      'Las cajas concentran el proyecto completo: huevos camperos de gallinas de raza, huerta seleccionada, fruta de temporada y un ritmo pensado para el hogar.'
  },
  eggs: {
    title: 'Huevos con personalidad propia',
    body:
      'No se compran solo por necesidad. Se compran porque cambian la base de la cocina diaria y mejoran la sensacion de producto bien elegido.'
  },
  vegetables: {
    title: 'Huerta que rota con sentido',
    body:
      'La temporada no es un obstaculo. Es la razon por la que cada semana puede tener mas interes, mas sabor y mejor lectura de origen.'
  },
  fruit: {
    title: 'Fruta de temporada para una compra mas cuidada',
    body:
      'Seleccionada para hogares que valoran sabor, textura y una compra mas consciente que la del lineal habitual.'
  }
};

export async function renderProductPage(app) {
  const copy = PRODUCT_COPY[app.state.locale] ?? PRODUCT_COPY.es;
  const slug = new URL(window.location.href).searchParams.get('slug');
  const product = app.getProductBySlug(slug);

  if (!product) {
    app.shell.pageRoot.innerHTML = `
      <section class="page-hero page-hero--compact">
        <h1>${copy.notFound}</h1>
        <a href="${app.createUrl('productos.html')}" class="button button--secondary">${app.copy.common.backToCatalog}</a>
      </section>
    `;
    return;
  }

  const category = app.getCategoryById(product.category);
  const related = getProductsByCategory(app.catalog, product.category, app.state.locale)
    .filter((candidate) => candidate.id !== product.id)
    .slice(0, 3);
  const gallery = getProductMediaGallery(product);
  const narrative = CATEGORY_NARRATIVE[product.category] ?? CATEGORY_NARRATIVE.subscriptions;
  const compareMarkup = product.compareAt
    ? `<span class="product-page__compare">${app.formatMoney(product.compareAt)}</span>`
    : '';

  app.shell.pageRoot.innerHTML = `
    <section class="product-page">
      <div class="product-page__media">
        ${renderProductVisual(product, 'hero')}
      </div>
      <div class="product-page__content">
        <p class="eyebrow">${category?.label ?? ''}</p>
        <h1>${product.name}</h1>
        <div class="product-page__pricing">
          <p class="product-page__price">${app.formatMoney(product.price)}</p>
          ${compareMarkup}
        </div>
        <p class="product-page__lede">${product.shortDescription}</p>
        <p>${product.description}</p>
        <div class="product-page__actions">
          <button type="button" class="button button--primary" data-action="add-to-cart" data-product-id="${product.id}">
            ${copy.buy}
          </button>
          <a href="${app.createUrl('checkout.html')}" class="button button--ghost">${copy.directCheckout}</a>
        </div>
        <div class="glass-card">
          <strong>${narrative.title}</strong>
          <p>${narrative.body}</p>
        </div>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${copy.galleryKicker}</p>
        <h2>${copy.galleryTitle}</h2>
      </div>
      <div class="product-gallery-grid">
        ${gallery
          .map(
            (image, index) => `
              <figure class="product-gallery-card ${index === 0 ? 'is-large' : ''}">
                <img src="${image}" alt="${product.name} ${index + 1}" loading="lazy" />
              </figure>
            `
          )
          .join('')}
      </div>
    </section>

    <section class="editorial-band editorial-band--split">
      <div class="editorial-band__copy">
        <p class="eyebrow">${copy.detailTitle}</p>
        <h2>${product.name}</h2>
        <p>${copy.detailBody}</p>
      </div>
      <div class="editorial-band__stack">
        <div class="glass-card">
          <strong>${copy.shippingTitle}</strong>
          <p>${copy.shippingBody}</p>
        </div>
        <div class="glass-card">
          <strong>${copy.cards.contains}</strong>
          <p>${copy.cards.containsBody}</p>
        </div>
      </div>
    </section>

    <section class="detail-card-grid">
      <article class="glass-card">
        <strong>${copy.cards.contains}</strong>
        <p>${copy.cards.containsBody}</p>
      </article>
      <article class="glass-card">
        <strong>${copy.cards.home}</strong>
        <p>${copy.cards.homeBody}</p>
      </article>
      <article class="glass-card">
        <strong>${copy.cards.service}</strong>
        <p>${copy.cards.serviceBody}</p>
      </article>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${copy.related}</p>
      </div>
      <div class="product-grid">
        ${related.map((item) => renderProductCard(app, item)).join('')}
      </div>
    </section>
  `;
}
