import { getMediaAsset } from '../runtime.mjs';

const INFO_COPY = {
  es: {
    about: {
      eyebrow: 'Origen y manera de trabajar',
      title: 'Aurum Natura nace en Nombela y trabaja con una escala mas corta, mas visible y mas honesta.',
      body:
        'No somos una cesta generica. Somos una seleccion de finca y temporada pensada para hogares que quieren saber mejor de donde viene lo que comen y por que merece su precio.',
      storyTitle: 'Una finca real con criterio de seleccion real.',
      storyBody:
        'Desde Calle Viana 54, en Nombela, seleccionamos huevos camperos de gallinas de raza, verdura, hortaliza y fruta de temporada con una idea simple: ofrecer un producto mejor, mas cuidado y mas coherente con el ritmo del hogar.',
      timeline: [
        'Origen claro: Nombela, Toledo, Castilla-La Mancha.',
        'Produccion limitada: menos volumen, mas atencion a la calidad de cada semana.',
        'Suscripcion con trato directo: confirmamos disponibilidad y modalidad de entrega por WhatsApp.'
      ],
      qualityCards: [
        {
          title: 'Huevos con diferencia',
          body: 'Las gallinas de raza y el ritmo de recogida cambian el resultado en cocina y refuerzan la sensacion de producto bien elegido.'
        },
        {
          title: 'Temporada de verdad',
          body: 'No forzamos un contenido fijo cuando el campo pide otra cosa. La variacion bien explicada forma parte del valor.'
        },
        {
          title: 'Escala manejable',
          body: 'Preferimos atender menos hogares con mas criterio antes que prometer una abundancia industrial sin alma.'
        }
      ]
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
  return `
    <section class="page-hero page-hero--compact">
      <p class="eyebrow">${copy.about.eyebrow}</p>
      <h1>${copy.about.title}</h1>
      <p>${copy.about.body}</p>
    </section>

    <section class="editorial-band editorial-band--split">
      <div class="editorial-band__copy">
        <p class="eyebrow">Desde Nombela</p>
        <h2>${copy.about.storyTitle}</h2>
        <p>${copy.about.storyBody}</p>
        <div class="timeline-list">
          ${copy.about.timeline.map((item) => `<div class="timeline-list__item">${item}</div>`).join('')}
        </div>
      </div>
      <div class="editorial-band__stack">
        <figure class="stack-media-card is-highlight">
          <img src="${getMediaAsset('farmOrigin')}" alt="Finca de Aurum Natura" loading="lazy" />
        </figure>
        <figure class="stack-media-card">
          <img src="${getMediaAsset('eggsHero')}" alt="Huevos camperos" loading="lazy" />
        </figure>
        <figure class="stack-media-card">
          <img src="${getMediaAsset('vegetableHarvest')}" alt="Huerta de temporada" loading="lazy" />
        </figure>
      </div>
    </section>

    <section class="detail-card-grid">
      ${copy.about.qualityCards
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
