import { getFeaturedProducts } from '../catalog.mjs';
import { getMediaAsset, renderCategoryCard, renderProductCard } from '../runtime.mjs';

const HOME_COPY = {
  es: {
    kicker: 'Finca de origen · Nombela, Toledo',
    title: 'Lo que crece bien no necesita explicarse. Solo llegar a tu mesa.',
    intro:
      'Aurum Natura es una suscripcion de finca que selecciona huevos camperos de gallinas de raza, huerta y fruta de temporada para hogares que han dejado de conformarse.',
    primary: 'Descubrir las cajas',
    secondary: 'Reservar por WhatsApp',
    trust: [
      'Gallinas de raza · yema firme',
      'Seleccion limitada · temporada real',
      'Entrega semanal o quincenal'
    ],
    manifesto:
      'No vendemos producto. Vendemos un criterio de compra que cambia la semana entera: desde el desayuno hasta la cena del domingo.',
    valueKicker: 'La experiencia',
    valueTitle: 'Cada caja es una lectura del campo de esta semana.',
    valueCards: [
      {
        icon: '01',
        title: 'Seleccion de origen',
        body: 'Verdura, hortaliza y fruta elegidas por su punto exacto de madurez y sabor, no por su vida util en estanteria.'
      },
      {
        icon: '02',
        title: 'Huevos que se notan',
        body: 'De gallinas de raza con recogida de ritmo corto. La diferencia esta en la yema, en la textura, en la confianza.'
      },
      {
        icon: '03',
        title: 'Ritmo de hogar, no de supermercado',
        body: 'La suscripcion convierte la calidad en habito. Menos decisiones, mejor cocina, una semana mas resuelta.'
      }
    ],
    familyKicker: 'Pensada para tu casa',
    familyTitle: 'Premium aqui no es precio. Es saber exactamente de donde viene lo que cocinas.',
    familyPoints: [
      'Reduce las decisiones de compra sin renunciar a la calidad que quieres.',
      'Eleva la base de cada comida con producto que rota con el calendario natural.',
      'Empieza con una caja. Amplía cuando quieras. Sin permanencia ni compromiso forzado.'
    ],
    offerKicker: 'Coleccion semanal',
    offerTitle: 'Tres niveles. Un mismo criterio. Tu eliges la escala.',
    offerBody:
      'La suscripcion tiene prioridad porque garantiza ritmo, frescura y la mejor seleccion de la semana. La compra puntual sigue disponible para quien quiera probar primero.',
    originKicker: 'Trazabilidad total',
    originTitle: 'Una finca real. Una direccion real. Un producto con nombre y apellidos.',
    originBody:
      'Calle Viana 54, Nombela, Toledo. No hay almacen intermedio, no hay central de compras. Solo campo, seleccion y una entrega directa a tu cocina.',
    processKicker: 'Tres pasos',
    processTitle: 'Asi de facil es empezar a comer de otra manera.',
    process: [
      'Elige la caja que encaja con tu hogar y tu ritmo de cocina.',
      'Confirmamos disponibilidad y entrega por WhatsApp — trato humano, sin bots.',
      'Recibes la seleccion de la semana, lista para abrir y cocinar.'
    ],
    socialKicker: 'Filosofia de marca',
    socialTitle: 'No prometemos de mas. Seleccionamos con criterio y cumplimos con silencio.',
    socialCards: [
      {
        quote:
          '"Lo que llega a tu mesa ha pasado un filtro que no se automatiza: el ojo del que sabe lo que esta bien y lo que no."'
      },
      {
        quote:
          '"Preferimos atender menos hogares con mas atencion que abrir la puerta a todo el mundo y perder el nivel."'
      }
    ],
    finalKicker: 'Tu primera caja',
    finalTitle: 'Reserva ahora y descubre por que no hay vuelta atras.',
    finalBody:
      'Cada semana que pasa sin probar Aurum Natura es una semana mas conformandote con el lineal del supermercado. Entra y comprueba la diferencia.',
    finalCta: 'Reservar mi caja'
  }
};

export async function renderHomePage(app) {
  const copy = HOME_COPY[app.state.locale] ?? HOME_COPY.es;
  const featured = getFeaturedProducts(app.catalog, app.state.locale, 3);

  app.shell.pageRoot.innerHTML = `
    <section class="video-hero">
      <div class="video-hero__media">
        <video autoplay muted loop playsinline poster="${getMediaAsset('homeHero')}">
          <source src="assets/img/extras/VIDEOHEADER.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="video-hero__overlay"></div>
      <div class="video-hero__vignette"></div>
      <div class="video-hero__content">
        <img src="assets/img/logo.png" alt="Aurum Natura" class="brand-logo" />
        <p class="hero-tagline">${copy.kicker}</p>
        <h1>${copy.title}</h1>
        <p class="hero-copy__lede">${copy.intro}</p>
        <div class="hero-copy__actions">
          <a href="${app.createUrl('productos.html')}" class="button button--primary">${copy.primary}</a>
          <a href="https://wa.me/${app.catalog.store.whatsappNumber}" class="button button--ghost">${copy.secondary}</a>
        </div>
        <div class="trust-bar" style="justify-content:center;margin-top:18px;">
          ${copy.trust.map((item) => `<span>${item}</span>`).join('')}
        </div>
      </div>
      <div class="video-hero__scroll-cue">Descubre</div>
    </section>

    <section class="manifesto-band">
      <div class="manifesto-band__inner">
        <p class="manifesto-text">${copy.manifesto}</p>
      </div>
    </section>

    <section class="section-block section-block--spacious">
      <div class="section-heading section-heading--center">
        <p class="eyebrow">${copy.valueKicker}</p>
        <h2>${copy.valueTitle}</h2>
      </div>
      <div class="detail-card-grid detail-card-grid--numbered">
        ${copy.valueCards
          .map(
            (card) => `
              <article class="glass-card glass-card--editorial">
                <span class="card-number">${card.icon}</span>
                <strong>${card.title}</strong>
                <p>${card.body}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>

    <section class="editorial-band editorial-band--split editorial-band--spacious">
      <div class="editorial-band__copy">
        <p class="eyebrow">${copy.familyKicker}</p>
        <h2>${copy.familyTitle}</h2>
        <div class="timeline-list">
          ${copy.familyPoints.map((item) => `<div class="timeline-list__item">${item}</div>`).join('')}
        </div>
      </div>
      <div class="editorial-band__stack">
        <div class="glass-card media-preview-card">
          <img src="${getMediaAsset('familyTable')}" alt="Mesa familiar con producto de temporada" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="section-block section-block--spacious">
      <div class="section-heading section-heading--center">
        <p class="eyebrow">${copy.offerKicker}</p>
        <h2>${copy.offerTitle}</h2>
        <p>${copy.offerBody}</p>
      </div>
      <div class="product-grid">
        ${featured.map((product) => renderProductCard(app, product)).join('')}
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading section-heading--center">
        <p class="eyebrow">Seleccion complementaria</p>
        <h2>Completa tu cesta con lo mejor de la semana.</h2>
      </div>
      <div class="category-grid">
        ${app.categories.map((category) => renderCategoryCard(app, category)).join('')}
      </div>
    </section>

    <section class="editorial-band editorial-band--split editorial-band--spacious editorial-band--reverse">
      <div class="editorial-band__stack">
        <div class="glass-card media-preview-card">
          <img src="${getMediaAsset('farmOrigin')}" alt="Finca de origen en Nombela" loading="lazy" />
        </div>
        <div class="glass-card media-preview-card">
          <img src="${getMediaAsset('vegetableHarvest')}" alt="Recoleccion de huerta" loading="lazy" />
        </div>
      </div>
      <div class="editorial-band__copy">
        <p class="eyebrow">${copy.originKicker}</p>
        <h2>${copy.originTitle}</h2>
        <p>${copy.originBody}</p>
        <div class="timeline-list">
          <div class="timeline-list__item">Calle Viana 54 · Nombela · Toledo</div>
          <div class="timeline-list__item">Produccion limitada · seleccion semanal</div>
          <div class="timeline-list__item">Trato directo · sin intermediarios</div>
        </div>
      </div>
    </section>

    <section class="section-block section-block--spacious">
      <div class="section-heading section-heading--center">
        <p class="eyebrow">${copy.processKicker}</p>
        <h2>${copy.processTitle}</h2>
      </div>
      <div class="detail-card-grid detail-card-grid--numbered">
        ${copy.process
          .map(
            (step, index) => `
              <article class="glass-card glass-card--editorial">
                <span class="card-number">0${index + 1}</span>
                <p>${step}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>

    <section class="quote-band">
      <div class="quote-band__inner">
        <p class="eyebrow">${copy.socialKicker}</p>
        <h2>${copy.socialTitle}</h2>
        <div class="quote-grid">
          ${copy.socialCards
            .map(
              (item) => `
                <blockquote class="editorial-quote-card">
                  <p>${item.quote}</p>
                </blockquote>
              `
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="section-block section-block--cta section-block--spacious">
      <div class="cta-panel cta-panel--final">
        <img src="assets/img/logo.png" alt="Aurum Natura" class="cta-panel__logo" />
        <p class="eyebrow">${copy.finalKicker}</p>
        <h2>${copy.finalTitle}</h2>
        <p>${copy.finalBody}</p>
        <div class="cta-panel__actions">
          <a href="${app.createUrl('checkout.html')}" class="button button--primary">${copy.finalCta}</a>
          <a href="https://wa.me/${app.catalog.store.whatsappNumber}" class="button button--ghost">Hablar por WhatsApp</a>
        </div>
      </div>
    </section>
  `;

}
