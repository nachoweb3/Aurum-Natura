import { getFeaturedProducts } from '../catalog.mjs';
import { getMediaAsset, renderCategoryCard, renderProductCard } from '../runtime.mjs';

const HOME_COPY = {
  es: {
    kicker: 'Suscripcion de finca en Nombela, Toledo',
    title: 'Huevos camperos, huerta y fruta de temporada para hogares que quieren comer mejor cada semana.',
    intro:
      'Aurum Natura nace en Calle Viana 54, Nombela, y convierte el producto de temporada en una suscripcion premium, tranquila y facil de sostener en casa.',
    primary: 'Ver suscripciones',
    secondary: 'Hablar por WhatsApp',
    trust: [
      'Huevos camperos de gallinas de raza',
      'Producto de temporada y seleccion limitada',
      'Suscripcion semanal o quincenal'
    ],
    valueKicker: 'Que recibes',
    valueTitle: 'Una forma mas clara y mas cuidada de llenar la despensa semanal.',
    valueCards: [
      {
        title: 'Seleccion real de temporada',
        body: 'Verdura, hortaliza y fruta elegidas segun el mejor momento del campo, sin obligarte a decidir cada compra desde cero.'
      },
      {
        title: 'Huevos camperos con diferencia',
        body: 'Huevos de gallinas de raza para hogares que notan la diferencia en la yema, en la textura y en la confianza.'
      },
      {
        title: 'Ritmo pensado para el hogar',
        body: 'La suscripcion convierte la calidad en habito: menos supermercado, mejor cocina y una semana mas ordenada.'
      }
    ],
    familyKicker: 'Por que funciona en casa',
    familyTitle: 'La calidad premium aqui no es pose: es comodidad, sabor y criterio de compra.',
    familyPoints: [
      'Ahorra decisiones durante la semana sin caer en una compra impersonal.',
      'Mejora la base de desayunos, comidas y cenas con producto que rota de forma natural.',
      'Permite entrar por una caja y completar el pedido con huevos, huerta o fruta puntual.'
    ],
    offerKicker: 'Suscripcion primero',
    offerTitle: 'Tres cajas para entrar con el nivel que mejor encaja con tu casa.',
    offerBody:
      'La suscripcion es la opcion prioritaria porque asegura ritmo, continuidad y una mejor seleccion semanal. La compra puntual sigue disponible como primer paso.',
    originKicker: 'Origen y confianza',
    originTitle: 'Una finca real, una direccion real y un criterio de seleccion que se nota en el producto.',
    originBody:
      'Trabajamos desde Calle Viana 54, en Nombela, Toledo, con una escala mas corta y una relacion mucho mas directa con lo que llega a tu mesa.',
    processKicker: 'Como funciona',
    processTitle: 'Un sistema simple para que la suscripcion encaje en tu semana.',
    process: [
      'Eliges la caja que mejor se ajusta a tu hogar.',
      'Te confirmamos disponibilidad y modalidad de entrega por WhatsApp.',
      'Recibes una seleccion de temporada preparada para cocinar mejor durante la semana.'
    ],
    socialKicker: 'Tranquilidad para comprar',
    socialTitle: 'Mas confianza, menos ruido y una atencion directa cuando toca decidir.',
    socialCards: [
      {
        quote:
          'La propuesta esta pensada para hogares que valoran origen, calidad y una relacion mas humana con su compra semanal.'
      },
      {
        quote:
          'No prometemos industrialmente. Seleccionamos con criterio y confirmamos por WhatsApp para mantener el nivel del producto.'
      }
    ],
    finalKicker: 'Empieza esta semana',
    finalTitle: 'Reserva tu primera caja o entra en la modalidad de suscripcion.',
    finalBody:
      'Si buscas una forma mas cuidada de recibir huevos camperos, huerta y fruta de temporada, Aurum Natura ya esta lista para atenderte como una marca real.',
    finalCta: 'Confirmar pedido'
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

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${copy.valueKicker}</p>
        <h2>${copy.valueTitle}</h2>
      </div>
      <div class="detail-card-grid">
        ${copy.valueCards
          .map(
            (card) => `
              <article class="glass-card">
                <strong>${card.title}</strong>
                <p>${card.body}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>

    <section class="editorial-band editorial-band--split">
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
        <div class="glass-card">
          <strong>${copy.offerKicker}</strong>
          <p>${copy.offerBody}</p>
        </div>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${copy.offerKicker}</p>
        <h2>${copy.offerTitle}</h2>
        <p>${copy.offerBody}</p>
      </div>
      <div class="product-grid">
        ${featured.map((product) => renderProductCard(app, product)).join('')}
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Seleccion complementaria</p>
        <h2>Huevos, huerta y fruta para completar la cesta segun tu semana.</h2>
      </div>
      <div class="category-grid">
        ${app.categories.map((category) => renderCategoryCard(app, category)).join('')}
      </div>
    </section>

    <section class="editorial-band editorial-band--split">
      <div class="editorial-band__copy">
        <p class="eyebrow">${copy.originKicker}</p>
        <h2>${copy.originTitle}</h2>
        <p>${copy.originBody}</p>
        <div class="timeline-list">
          <div class="timeline-list__item">Calle Viana 54 · Nombela · Toledo · Castilla-La Mancha</div>
          <div class="timeline-list__item">Produccion limitada y seleccion semanal.</div>
          <div class="timeline-list__item">Atencion directa para suscripciones, primeras cajas y disponibilidad.</div>
        </div>
      </div>
      <div class="editorial-band__stack">
        <div class="glass-card media-preview-card">
          <img src="${getMediaAsset('farmOrigin')}" alt="Finca de origen en Nombela" loading="lazy" />
        </div>
        <div class="glass-card media-preview-card">
          <img src="${getMediaAsset('vegetableHarvest')}" alt="Recoleccion de huerta" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${copy.processKicker}</p>
        <h2>${copy.processTitle}</h2>
      </div>
      <div class="detail-card-grid">
        ${copy.process
          .map(
            (step, index) => `
              <article class="glass-card">
                <strong>0${index + 1}</strong>
                <p>${step}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">${copy.socialKicker}</p>
        <h2>${copy.socialTitle}</h2>
      </div>
      <div class="detail-card-grid">
        ${copy.socialCards
          .map(
            (item) => `
              <article class="glass-card">
                <p>${item.quote}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>

    <section class="section-block section-block--cta">
      <div class="cta-panel">
        <p class="eyebrow">${copy.finalKicker}</p>
        <h2>${copy.finalTitle}</h2>
        <p>${copy.finalBody}</p>
        <a href="${app.createUrl('checkout.html')}" class="button button--primary">${copy.finalCta}</a>
      </div>
    </section>
  `;

}
