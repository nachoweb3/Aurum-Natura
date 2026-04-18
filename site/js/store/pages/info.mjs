import { getMediaAsset } from '../runtime.mjs';

const INFO_COPY = {
  es: {
    about: {
      eyebrow: 'Sobre Aurum Natura',
      heroTitle: 'Hay una diferencia entre consumir y elegir de donde viene lo que forma tu vida.',
      heroBody:
        'Aurum Natura nace en una finca en Nombela, lejos del ruido, de la produccion masiva y de los ritmos artificiales. Aqui, cada dia empieza con tierra en las manos, animales que dependen de nosotros y ciclos que no se pueden forzar.',
      manifestoLines: [
        'No somos una empresa industrial.',
        'No seguimos procesos acelerados.',
        'No anadimos nada que no pertenezca a la propia naturaleza.'
      ],
      farmTitle: 'Cultivamos respetando el ritmo real de la tierra.',
      farmBody:
        'Criamos nuestros animales con espacio, alimento natural y tiempo. Sin aditivos, sin quimicos, sin artificios. Porque creemos en algo muy simple, pero cada vez mas escaso: lo real no necesita ser mejorado.',
      usTitle: 'Nuestra forma de vivir',
      usBody:
        'Detras de Aurum Natura estamos Nacho y Nahomi. Elegimos alejarnos del modelo convencional. No queriamos depender de sistemas que sacrifican calidad por velocidad, ni consumir productos que no entendemos de donde vienen. Decidimos construir algo distinto.',
      usBody2:
        'Nuestra finca no es solo un lugar de produccion. Es un espacio vivo donde convivimos con lo que crece, con lo que nace y con lo que requiere cuidado constante. Aqui no hay automatizacion que sustituya el criterio humano ni decisiones tomadas desde una oficina.',
      usQuote: 'Cada huevo, cada planta, cada pieza que sale de aqui ha pasado por nuestras manos. Y eso cambia todo.',
      moreTitle: 'Mas que productos',
      moreBody:
        'Con el tiempo entendimos que no solo estabamos produciendo alimentos o creando piezas. Estabamos creando una forma de vida.',
      morePoints: [
        'Una forma de volver a lo esencial.',
        'De valorar el origen.',
        'De elegir calidad en lugar de cantidad.',
        'De rodearse de objetos y alimentos que tienen historia.'
      ],
      moreClosing: 'Por eso Aurum Natura no es solo una tienda. Es una seleccion de todo aquello que nosotros mismos consumiriamos, usariamos y pondriamos en nuestro propio hogar.',
      limitedTitle: 'Produccion limitada, valor real',
      limitedLines: [
        'No producimos en masa. No queremos hacerlo.',
        'Cada temporada es distinta. Cada cosecha es diferente. Cada pieza artesanal es unica o parte de una serie muy limitada.',
        'Esto significa que lo que encuentras aqui no siempre estara disponible manana.',
        'Y eso es precisamente lo que le da valor.'
      ],
      forWhomTitle: 'Para quien sabe reconocerlo',
      forWhomBody: 'Aurum Natura no es para todo el mundo.',
      forWhomPoints: [
        'Es para quien entiende la diferencia entre lo natural y lo vendido como natural.',
        'Para quien valora el proceso, no solo el resultado.',
        'Para quien prefiere menos cantidad, pero mas verdad.',
        'Para quien quiere rodearse de cosas con sentido.'
      ],
      forWhomClosing: 'Nosotros simplemente decidimos compartir lo que ya formaba parte de nuestra vida. Si estas aqui, probablemente tu tambien lo entiendes.',
      signoff: 'Aurum Natura',
      signoffSub: 'El oro de la tierra.'
    },
    help: {
      eyebrow: 'Entrega y consultas',
      title: 'Una compra mas cuidada necesita una atencion igual de clara.',
      body:
        'Aurum Natura confirma cada pedido con trato directo para mantener el nivel del producto y evitar promesas imprecisas sobre disponibilidad o zona de entrega.',
      faqs: [
        {
          q: 'Como funciona la suscripcion?',
          a: 'Puedes empezar con una caja semanal o quincenal. Te ayudamos por WhatsApp a elegir modalidad, volumen y primera entrega.'
        },
        {
          q: 'Puedo hacer una compra puntual?',
          a: 'Si. La compra puntual sigue disponible para probar la marca o completar una semana concreta.'
        },
        {
          q: 'Se reparte en cualquier zona?',
          a: 'Atendemos solicitudes segun disponibilidad y area de reparto. Por eso confirmamos cada pedido de forma directa antes del cierre.'
        }
      ]
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Atencion directa para suscripciones, primeras cajas y consultas de entrega.',
      body:
        'La forma mas rapida de empezar con Aurum Natura es escribirnos por WhatsApp o llamarnos directamente. Asi podemos confirmar caja, frecuencia y zona de entrega sin pasos innecesarios.',
      cards: [
        {
          title: 'WhatsApp',
          body: 'Canal principal para iniciar suscripcion, reservar una primera caja o consultar disponibilidad semanal.'
        },
        {
          title: 'Telefono directo',
          body: 'Si prefieres hablarlo en voz, te atendemos en el mismo numero para resolver la compra con rapidez.'
        },
        {
          title: 'Ubicacion',
          body: 'Calle Viana 54, Nombela, Toledo, Castilla-La Mancha.'
        }
      ],
      faqs: [
        {
          q: 'Que necesito para empezar?',
          a: 'Solo decirnos que caja te interesa, si la quieres semanal o quincenal y en que zona te encuentras.'
        },
        {
          q: 'Puedo regalar una caja?',
          a: 'Si. La Caja Reserva y la Caja Familiar funcionan muy bien como regalo cuando buscas producto premium con mas sentido.'
        },
        {
          q: 'Cuanto tardais en responder?',
          a: 'Respondemos lo antes posible dentro del horario de trabajo, con un trato directo y sin respuestas automatizadas.'
        }
      ]
    }
  }
};

function formatDisplayPhone(number) {
  if (!number) {
    return '';
  }

  const trimmed = number.replace(/\s+/g, '');
  const withPrefix = trimmed.startsWith('+') ? trimmed : `+${trimmed}`;
  const digits = withPrefix.replace(/^\+/, '');

  if (digits.length === 11 && digits.startsWith('34')) {
    return `+34 ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
  }

  return withPrefix;
}

function renderAboutPage(copy) {
  const a = copy.about;
  return `
    <section class="page-hero page-hero--about">
      <p class="eyebrow">${a.eyebrow}</p>
      <h1>${a.heroTitle}</h1>
      <p class="about-hero__body">${a.heroBody}</p>
    </section>

    <section class="manifesto-band manifesto-band--about">
      <div class="manifesto-band__inner">
        ${a.manifestoLines.map((line) => `<p class="manifesto-line">${line}</p>`).join('')}
      </div>
    </section>

    <section class="editorial-band editorial-band--split editorial-band--spacious">
      <div class="editorial-band__copy">
        <h2>${a.farmTitle}</h2>
        <p>${a.farmBody}</p>
      </div>
      <div class="editorial-band__stack">
        <figure class="stack-media-card is-highlight">
          <img src="${getMediaAsset('farmOrigin')}" alt="Finca de Aurum Natura en Nombela" loading="lazy" />
        </figure>
      </div>
    </section>

    <section class="about-founders">
      <div class="about-founders__photo">
        <img src="assets/miauymua.JPG" alt="Nacho y Nahomi en la finca de Aurum Natura" />
      </div>
      <div class="about-founders__copy">
        <p class="eyebrow">Quienes somos</p>
        <h2>${a.usTitle}</h2>
        <p>${a.usBody}</p>
        <p>${a.usBody2}</p>
      </div>
    </section>

    <section class="quote-band">
      <div class="quote-band__inner">
        <blockquote class="about-pullquote">
          <p>${a.usQuote}</p>
        </blockquote>
      </div>
    </section>

    <section class="editorial-band editorial-band--split editorial-band--spacious editorial-band--reverse">
      <div class="editorial-band__stack">
        <figure class="stack-media-card is-highlight">
          <img src="${getMediaAsset('vegetableHarvest')}" alt="Recoleccion de huerta" loading="lazy" />
        </figure>
        <figure class="stack-media-card">
          <img src="${getMediaAsset('eggsHero')}" alt="Huevos camperos" loading="lazy" />
        </figure>
      </div>
      <div class="editorial-band__copy">
        <h2>${a.moreTitle}</h2>
        <p>${a.moreBody}</p>
        <div class="timeline-list">
          ${a.morePoints.map((item) => `<div class="timeline-list__item">${item}</div>`).join('')}
        </div>
        <p class="about-closing-line">${a.moreClosing}</p>
      </div>
    </section>

    <section class="about-chapter">
      <div class="about-chapter__inner">
        <h2>${a.limitedTitle}</h2>
        ${a.limitedLines.map((line) => `<p class="about-emphasis-line">${line}</p>`).join('')}
      </div>
    </section>

    <section class="editorial-band editorial-band--split editorial-band--spacious">
      <div class="editorial-band__copy">
        <h2>${a.forWhomTitle}</h2>
        <p class="about-emphasis-line">${a.forWhomBody}</p>
        <div class="timeline-list">
          ${a.forWhomPoints.map((item) => `<div class="timeline-list__item">${item}</div>`).join('')}
        </div>
        <p class="about-closing-line">${a.forWhomClosing}</p>
      </div>
      <div class="editorial-band__stack">
        <figure class="stack-media-card is-highlight">
          <img src="${getMediaAsset('familyTable')}" alt="Mesa con producto de temporada" loading="lazy" />
        </figure>
        <figure class="stack-media-card">
          <img src="${getMediaAsset('seasonKitchen')}" alt="Cocina de temporada" loading="lazy" />
        </figure>
      </div>
    </section>

    <section class="about-signoff">
      <img src="assets/img/logo.png" alt="Aurum Natura" class="about-signoff__logo" />
      <h2>${a.signoff}</h2>
      <p class="about-signoff__sub">${a.signoffSub}</p>
    </section>
  `;
}

function renderHelpPage(copy) {
  return `
    <section class="page-hero page-hero--compact">
      <p class="eyebrow">${copy.help.eyebrow}</p>
      <h1>${copy.help.title}</h1>
      <p>${copy.help.body}</p>
    </section>

    <section class="detail-card-grid">
      <article class="glass-card">
        <strong>Suscripcion semanal o quincenal</strong>
        <p>Te ayudamos a elegir la modalidad mas natural para tu casa y para tu ritmo de cocina.</p>
      </article>
      <article class="glass-card">
        <strong>Primera caja sin friccion</strong>
        <p>Puedes entrar por una compra puntual y pasar a suscripcion cuando quieras.</p>
      </article>
      <article class="glass-card">
        <strong>Entrega confirmada caso por caso</strong>
        <p>Preferimos concretar bien la disponibilidad y la zona antes que prometer de mas.</p>
      </article>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Preguntas frecuentes</p>
      </div>
      <div class="faq-list">
        ${copy.help.faqs
          .map(
            (item) => `
              <article class="glass-card faq-card">
                <strong>${item.q}</strong>
                <p>${item.a}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderContactPage(app, copy) {
  const directPhone = formatDisplayPhone(app.catalog.store.whatsappNumber);

  return `
    <section class="page-hero page-hero--compact">
      <p class="eyebrow">${copy.contact.eyebrow}</p>
      <h1>${copy.contact.title}</h1>
      <p>${copy.contact.body}</p>
    </section>

    <section class="detail-card-grid">
      ${copy.contact.cards
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

    <section class="editorial-band editorial-band--split">
      <div class="editorial-band__copy">
        <p class="eyebrow">Canal principal</p>
        <h2>Habla con nosotros y te orientamos en la primera caja o en la modalidad de suscripcion.</h2>
        <p>WhatsApp es la via mas rapida para resolver dudas, confirmar disponibilidad y empezar el pedido con criterio. Si lo prefieres, tambien puedes llamarnos y cerrarlo con nosotros directamente.</p>
        <div class="hero-copy__actions">
          <a href="https://wa.me/${app.catalog.store.whatsappNumber}" class="button button--primary">Abrir WhatsApp</a>
          <a href="tel:${directPhone.replace(/\s+/g, '')}" class="button button--ghost">Llamar ahora</a>
        </div>
      </div>
      <div class="editorial-band__stack">
        <div class="glass-card media-preview-card">
          <img src="${getMediaAsset('familyTable')}" alt="Mesa de temporada" loading="lazy" />
        </div>
        <div class="glass-card">
          <strong>Contacto y origen</strong>
          <p>${directPhone}<br />Calle Viana 54<br />Nombela, Toledo<br />Castilla-La Mancha</p>
        </div>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Preguntas frecuentes</p>
      </div>
      <div class="faq-list">
        ${copy.contact.faqs
          .map(
            (item) => `
              <article class="glass-card faq-card">
                <strong>${item.q}</strong>
                <p>${item.a}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>
  `;
}

export async function renderInfoPage(app) {
  const copy = INFO_COPY[app.state.locale] ?? INFO_COPY.es;

  if (app.pageId === 'about') {
    app.shell.pageRoot.innerHTML = renderAboutPage(copy);
    return;
  }

  if (app.pageId === 'help') {
    app.shell.pageRoot.innerHTML = renderHelpPage(copy);
    return;
  }

  app.shell.pageRoot.innerHTML = renderContactPage(app, copy);
}
