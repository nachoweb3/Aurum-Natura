import { getFeaturedProducts, getProductsByCategory } from '../catalog.mjs';
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
        <h1 class="hero-title-plate">${copy.title}</h1>
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
        <div class="glass-card media-preview-card video-placeholder">
          <video autoplay muted loop playsinline>
            <source src="assets/cultivos1.mp4" type="video/mp4" />
          </video>
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
        <div class="glass-card media-preview-card map-embed">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3065.5!2d-4.5138!3d40.0567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4019a7b5e5b7e7%3A0x0!2sCalle%20Viana%2054%2C%20Nombela%2C%20Toledo!5e0!3m2!1ses!2ses!4v1713400000000" width="100%" height="100%" style="border:0;border-radius:var(--radius);min-height:280px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

    <section class="section-block section-block--spacious">
      <div class="section-heading section-heading--center">
        <p class="eyebrow">Lo que dicen nuestros clientes</p>
        <h2>Hogares que ya no vuelven al supermercado.</h2>
      </div>
      <div class="testimonial-grid">
        <article class="testimonial-card">
          <div class="testimonial-card__header">
            <img src="assets/resenas/resena1.webp" alt="Elena M. — Cliente Aurum Natura" class="testimonial-card__avatar" loading="lazy" />
            <div>
              <strong>Elena M.</strong>
              <span>Madrid · Suscriptora semanal</span>
            </div>
          </div>
          <p>"Desde que recibo la caja, he dejado de ir al supermercado para fruta y verdura. La diferencia en sabor es brutal, sobre todo los huevos. Mi familia ya no quiere otros."</p>
          <div class="testimonial-card__stars">★★★★★</div>
        </article>
        <article class="testimonial-card">
          <div class="testimonial-card__header">
            <img src="assets/resenas/resena2.avif" alt="Pablo G. — Cliente Aurum Natura" class="testimonial-card__avatar" loading="lazy" />
            <div>
              <strong>Pablo G.</strong>
              <span>Nombela · Finca Aurum Natura</span>
            </div>
          </div>
          <p>"Sin abonos quimicos, solo estiercol de gallina y compost. Cada planta crece con lo que da la tierra. Cuando pruebas la diferencia, ya no vuelves atras."</p>
          <div class="testimonial-card__stars">★★★★★</div>
        </article>
        <article class="testimonial-card">
          <div class="testimonial-card__header">
            <img src="assets/resenas/resena3.webp" alt="Rebeca L. — Cliente Aurum Natura" class="testimonial-card__avatar" loading="lazy" />
            <div>
              <strong>Rebeca L.</strong>
              <span>Talavera · Compra puntual</span>
            </div>
          </div>
          <p>"Pedi una caja para probar y a la semana siguiente ya estaba suscrita. El trato directo, saber que los pollitos se crian en la finca... no tiene precio."</p>
          <div class="testimonial-card__stars">★★★★★</div>
        </article>
      </div>
    </section>

    <section class="soap-landing">
      <div class="soap-landing__hero">
        <p class="eyebrow">Nueva coleccion artesanal</p>
        <h2>Jabones de finca. Hechos a mano. Sin quimica.</h2>
        <p class="soap-landing__lede">Tres piezas elaboradas en frio con aceite de oliva virgen extra, plantas de nuestra finca y el tiempo que necesita cada pastilla para curarse. Sin sulfatos, sin parabenos, sin conservantes sinteticos. Solo grasa noble, planta real y manos que saben lo que hacen.</p>
      </div>

      <div class="soap-landing__grid">
        ${getProductsByCategory(app.catalog, 'artisan', app.state.locale)
          .filter((p) => p.id.startsWith('p-soap'))
          .map((product) => renderProductCard(app, product))
          .join('')}
      </div>

      <div class="soap-landing__story">
        <div class="soap-landing__story-copy">
          <p class="eyebrow">Origen real</p>
          <h3>De la chimenea y el huerto a tu piel.</h3>
          <p>La lavanda crece silvestre junto al huerto. La menta la plantamos entre las acelgas. La ceniza viene de la encina que calienta la casa en invierno. No compramos ingredientes — los recogemos. Cada jabón sale de lo que la finca produce y de un proceso en frio que respeta la materia prima.</p>
          <div class="timeline-list">
            <div class="timeline-list__item">Curado minimo 40 dias para maxima dureza</div>
            <div class="timeline-list__item">100–120g por pastilla artesanal</div>
            <div class="timeline-list__item">Produccion limitada a lo que da la temporada</div>
          </div>
        </div>
        <div class="soap-landing__story-visual">
          <div class="glass-card media-preview-card">
            <img src="${getMediaAsset('mentaVisual')}" alt="Menta cultivada en la finca Aurum Natura" loading="lazy" />
          </div>
        </div>
      </div>

      <div class="soap-landing__cta">
        <p class="eyebrow">Pack Ritual Completo · 29€</p>
        <h3>Los tres jabones en caja de madera. El regalo que no se olvida.</h3>
        <div class="hero-copy__actions" style="justify-content:center;">
          <a href="${app.createUrl('productos.html')}?cat=artisan" class="button button--primary">Ver jabones artesanales</a>
          <a href="https://wa.me/${app.catalog.store.whatsappNumber}" class="button button--ghost">Reservar por WhatsApp</a>
        </div>
      </div>
    </section>

    <section class="section-block section-block--spacious">
      <div class="section-heading section-heading--center">
        <p class="eyebrow">Cerámica Aurum Natura</p>
        <h2>Cada pieza es única. Modelada a mano, imperfecta.</h2>
        <p>No buscamos la perfección industrial, sino la belleza de lo real.</p>
      </div>
      <div class="product-grid">
        ${getProductsByCategory(app.catalog, 'artisan', app.state.locale)
          .filter((p) => p.id.startsWith('p-ceramics'))
          .map((product) => renderProductCard(app, product))
          .join('')}
      </div>
    </section>

    <section class="section-block section-block--spacious">
      <div class="section-heading section-heading--center">
        <p class="eyebrow">Esquejes en Maceta de Cerámica</p>
        <h2>No vendemos decoración. Vendemos vida que crece contigo.</h2>
        <p>Esquejes enraizados en macetas modeladas a mano en la finca. Aromáticas y frutales seleccionados para que la casa respire lo mismo que respira el campo.</p>
      </div>
      <div class="product-grid">
        ${getProductsByCategory(app.catalog, 'artisan', app.state.locale)
          .filter((p) => p.id.startsWith('p-esquejes'))
          .map((product) => renderProductCard(app, product))
          .join('')}
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
