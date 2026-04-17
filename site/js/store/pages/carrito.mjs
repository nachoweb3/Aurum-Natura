const CART_PAGE_COPY = {
  es: {
    eyebrow: 'Tu seleccion',
    title: 'Revisa la cesta antes de confirmar tu suscripcion o primera caja.',
    body:
      'Aqui puedes ajustar cantidades, comprobar el subtotal y pasar a la confirmacion final para cerrar el pedido por WhatsApp.',
    empty: 'Todavia no has anadido productos a la cesta.',
    subtotal: 'Subtotal',
    checkout: 'Confirmar pedido',
    continue: 'Seguir comprando',
    notesTitle: 'Atencion directa antes del cierre',
    notesBody:
      'Confirmamos contigo disponibilidad, modalidad de suscripcion y detalles de entrega para que la compra mantenga el nivel de la marca.'
  }
};

export async function renderCartPage(app) {
  const copy = CART_PAGE_COPY[app.state.locale] ?? CART_PAGE_COPY.es;
  const lines = app.getCartLines();
  const totals = app.getCartTotals();

  if (!lines.length) {
    app.shell.pageRoot.innerHTML = `
      <section class="page-hero page-hero--compact">
        <p class="eyebrow">${copy.eyebrow}</p>
        <h1>${copy.empty}</h1>
        <a href="${app.createUrl('productos.html')}" class="button button--primary">${copy.continue}</a>
      </section>
    `;
    return;
  }

  app.shell.pageRoot.innerHTML = `
    <section class="page-hero page-hero--compact">
      <p class="eyebrow">${copy.eyebrow}</p>
      <h1>${copy.title}</h1>
      <p>${copy.body}</p>
    </section>

    <section class="cart-page">
      <div class="cart-page__lines">
        ${lines
          .map(
            (line) => `
              <article class="cart-page__line">
                <div class="cart-line__media">${line.imageMarkup}</div>
                <div class="cart-page__body">
                  <a href="${app.createUrl('producto.html', { slug: line.slug })}" class="cart-line__name">${line.name}</a>
                  <p>${app.formatMoney(line.unitPrice)}</p>
                  <div class="cart-line__actions">
                    <button type="button" data-action="decrease-line" data-line-key="${line.productId}::${line.variantId ?? 'default'}">−</button>
                    <span>${line.quantity}</span>
                    <button type="button" data-action="increase-line" data-line-key="${line.productId}::${line.variantId ?? 'default'}">+</button>
                    <button type="button" class="link-button" data-action="remove-line" data-line-key="${line.productId}::${line.variantId ?? 'default'}">${app.copy.cart.remove}</button>
                  </div>
                </div>
                <strong>${app.formatMoney(line.unitPrice * line.quantity)}</strong>
              </article>
            `
          )
          .join('')}
      </div>

      <aside class="cart-page__summary">
        <div class="glass-card">
          <strong>${copy.subtotal}</strong>
          <h2>${app.formatMoney(totals.subtotal)}</h2>
          <p>${app.copy.cart.note}</p>
          <div class="cart-panel__actions">
            <a href="${app.createUrl('productos.html')}" class="button button--ghost">${copy.continue}</a>
            <a href="${app.createUrl('checkout.html')}" class="button button--primary">${copy.checkout}</a>
          </div>
        </div>
        <div class="glass-card">
          <strong>${copy.notesTitle}</strong>
          <p>${copy.notesBody}</p>
        </div>
      </aside>
    </section>
  `;
}
