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
          q: '¿Qué llevan realmente vuestros productos?',
          a: 'Solo agua, aire, tierra y sol. Nada más. Trabajamos con permacultura: sin pesticidas, sin fertilizantes sintéticos, sin herbicidas, sin hormonas, sin conservantes. La tierra se nutre con compost propio y estiércol de nuestras gallinas, las plantas crecen a su ritmo natural, y la fruta y verdura madura en planta hasta el día de la cosecha. Lo que te llega es lo que la finca genera con los cuatro elementos.'
        },
        {
          q: '¿Qué es la permacultura y por qué la usáis?',
          a: 'La permacultura es un sistema agrícola que imita los ciclos de la naturaleza. En lugar de forzar monocultivos con químicos, diseñamos la finca para que cada elemento alimente al siguiente: las gallinas fertilizan el huerto, los cultivos protegen la tierra, el compost cierra el ciclo. Es más lento y da menos volumen, pero produce alimentos con sabor y densidad nutricional real.'
        },
        {
          q: '¿Cómo funciona la suscripción?',
          a: 'Puedes empezar con una caja semanal o quincenal. Te ayudamos por WhatsApp a elegir modalidad, volumen y primera entrega. Cancelas o pausas cuando quieras, sin permanencia.'
        },
        {
          q: '¿Cuándo se cosecha y se envía mi pedido?',
          a: 'Cosechamos el lunes por la mañana lo que va en tu caja de esa semana. Preparamos y salen los envíos entre lunes y martes. Cierre de pedidos: domingo a las 22:00. Lo que pides el domingo, se corta al día siguiente — no hay cámaras frigoríficas de semanas.'
        },
        {
          q: '¿Cuánto tarda en llegar el envío?',
          a: 'Península: 24–48h desde la salida (martes o miércoles). Baleares: 48–72h. Zonas rurales aisladas pueden requerir 24h más. Al ser producto fresco y cosechado al momento, coordinamos la entrega para que no coincida con festivos locales o fines de semana.'
        },
        {
          q: '¿Cuánto cuesta el envío?',
          a: 'Envío gratis en pedidos desde 35€. Por debajo: 4,90€ en península, 8,90€ en Baleares. Jabones, cerámica y hierbas secas pueden enviarse por separado (envío estándar, sin cadena de frío).'
        },
        {
          q: '¿Se reparte en cualquier zona?',
          a: 'Enviamos a toda la península y Baleares. Canarias, Ceuta y Melilla bajo consulta (la fruta/verdura fresca no viaja bien a esas zonas). Atendemos cada pedido de forma directa antes del cierre para confirmar disponibilidad.'
        },
        {
          q: '¿Y si algo llega en mal estado?',
          a: 'Escríbenos por WhatsApp con una foto en las 24h siguientes. Reemplazamos la pieza en la siguiente caja o te devolvemos el importe, sin preguntas. Somos una familia pequeña, no un call center — resolvemos rápido.'
        },
        {
          q: '¿Puedo hacer una compra puntual?',
          a: 'Sí. La compra puntual sigue disponible para probar la marca o completar una semana concreta, sin compromiso de suscripción.'
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
          q: '¿Qué necesito para empezar?',
          a: 'Solo decirnos qué caja te interesa, si la quieres semanal o quincenal y en qué zona te encuentras. Nosotros confirmamos disponibilidad y te damos la fecha de la primera entrega.'
        },
        {
          q: '¿Vuestros productos son ecológicos?',
          a: 'Vamos más allá que ecológico: trabajamos con permacultura. Agua, aire, tierra y sol, nada más. Sin químicos de ningún tipo, sin fertilizantes industriales, sin pesticidas. El certificado ecológico regula lo que NO puedes usar — nosotros directamente no usamos nada que no venga de la propia finca.'
        },
        {
          q: '¿Puedo regalar una caja?',
          a: 'Sí. La Caja Reserva y la Caja Familiar funcionan muy bien como regalo cuando buscas producto premium con más sentido. Nos dices el día de entrega y dedicatoria, y la preparamos con una nota a mano.'
        },
        {
          q: '¿Cuánto tardáis en responder?',
          a: 'Respondemos lo antes posible dentro del horario de trabajo (9:00–20:00, L–S), con trato directo y sin respuestas automatizadas. Por WhatsApp solemos contestar en menos de 2 horas.'
        },
        {
          q: '¿Puedo visitar la finca?',
          a: 'Sí, concertando cita. Nombela está a 1h15 de Madrid y abrimos puertas a clientes que quieran conocer el proyecto, ver las gallinas y los cultivos, y probar el producto en origen.'
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
        <figure class="stack-media-card is-highlight stack-media-card--video">
          <video autoplay muted loop playsinline>
            <source src="assets/huerto.MOV" type="video/quicktime" />
            <source src="assets/huerto.MOV" type="video/mp4" />
          </video>
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

    <section class="editorial-band editorial-band--split editorial-band--spacious">
      <div class="editorial-band__copy">
        <p class="eyebrow">Raza Plymouth Rock</p>
        <h2>Nuestras gallinas no son cualquier gallina.</h2>
        <p>Criamos Plymouth Rock, una raza reconocida por la calidad de su huevo: yema firme, color intenso, sabor que se nota. No las forzamos con luz artificial ni con piensos acelerados. Comen natural, viven con espacio y ponen cuando estan listas.</p>
        <p class="about-closing-line">Eso se traduce en un huevo que no necesita etiqueta para distinguirse del resto.</p>
      </div>
      <div class="editorial-band__stack">
        <figure class="stack-media-card is-highlight">
          <img src="assets/huevos-finca.jpg" alt="Huevos camperos recien recogidos junto a fresas de la finca" loading="lazy" />
        </figure>
        <div class="about-photo-grid">
          <figure class="stack-media-card">
            <img src="assets/pollito-plymouth.jpg" alt="Pollito Plymouth Rock recien nacido" loading="lazy" />
          </figure>
          <figure class="stack-media-card">
            <img src="assets/gallo.jpg" alt="Gallo Plymouth Rock de Aurum Natura" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>

    <section class="editorial-band editorial-band--split editorial-band--spacious editorial-band--reverse">
      <div class="editorial-band__stack">
        <figure class="stack-media-card is-highlight">
          <img src="assets/nahomi-plantando.jpg" alt="Nahomi plantando en la finca con compost natural" loading="lazy" />
        </figure>
        <figure class="stack-media-card">
          <img src="assets/pollito-huerto.jpg" alt="Pollito entre las acelgas del huerto" loading="lazy" />
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

    <section class="elements-band">
      <div class="elements-band__intro">
        <p class="eyebrow">Nuestro método</p>
        <h2>Agua, aire, tierra y sol. Nada más.</h2>
        <p>Permacultura real en la finca de Nombela. Sin pesticidas, sin fertilizantes sintéticos, sin hormonas, sin conservantes. Los cuatro elementos y el tiempo que cada planta necesita. Eso es todo lo que hay en tu caja.</p>
      </div>
      <div class="elements-band__grid">
        <article class="element-card">
          <span class="element-card__symbol">◈</span>
          <strong>Agua</strong>
          <p>Riego por goteo con agua de pozo. Sin cloro, sin aditivos. La misma que bebe la finca.</p>
        </article>
        <article class="element-card">
          <span class="element-card__symbol">◇</span>
          <strong>Aire</strong>
          <p>Campo abierto en Nombela, a 600m de altitud. Sin invernaderos forzados, sin atmósferas controladas.</p>
        </article>
        <article class="element-card">
          <span class="element-card__symbol">◉</span>
          <strong>Tierra</strong>
          <p>Compost propio y estiércol de gallinas de raza. La tierra se nutre de lo que genera la propia finca.</p>
        </article>
        <article class="element-card">
          <span class="element-card__symbol">✺</span>
          <strong>Sol</strong>
          <p>Maduración en planta, nunca en cámara. La fruta se corta el día que sale hacia tu casa.</p>
        </article>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Tiempos de envío</p>
        <h2>Del campo a tu casa en 48–72h</h2>
      </div>
      <div class="shipping-timeline">
        <div class="shipping-step">
          <span class="shipping-step__dot">1</span>
          <strong>Domingo 22:00</strong>
          <p>Cierre de pedidos de la semana.</p>
        </div>
        <div class="shipping-step">
          <span class="shipping-step__dot">2</span>
          <strong>Lunes AM</strong>
          <p>Cosecha y preparación de tu caja.</p>
        </div>
        <div class="shipping-step">
          <span class="shipping-step__dot">3</span>
          <strong>Lunes/Martes</strong>
          <p>Salida del envío refrigerado.</p>
        </div>
        <div class="shipping-step">
          <span class="shipping-step__dot">4</span>
          <strong>Martes–Jueves</strong>
          <p>Entrega en península (24–48h) · Baleares 48–72h.</p>
        </div>
      </div>
      <p class="shipping-note">Envío gratis desde 35€ · 4,90€ península · 8,90€ Baleares · Canarias bajo consulta</p>
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
