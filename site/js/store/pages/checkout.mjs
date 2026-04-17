import {
  buildWhatsAppOrderMessage,
  summarizeCheckoutRestrictions,
  validateCheckoutForm
} from '../checkout.mjs';
import { createOrderCode, getCountryOptions } from '../runtime.mjs';

const CHECKOUT_COPY = {
  es: {
    eyebrow: 'Confirmacion del pedido',
    title: 'Ultimo paso antes de confirmar tu pedido por WhatsApp.',
    body:
      'Rellena tus datos y te enviaremos al canal directo de Aurum Natura para cerrar suscripcion, disponibilidad y entrega.',
    empty: 'Todavia no has anadido productos.',
    name: 'Nombre completo',
    email: 'Correo electronico',
    phone: 'Telefono',
    city: 'Ciudad',
    country: 'Pais',
    address: 'Direccion',
    notes: 'Notas del pedido',
    submit: 'Confirmar por WhatsApp',
    review: 'Consultar disponibilidad por WhatsApp',
    warnings: 'Revision de entrega'
  }
};

export async function renderCheckoutPage(app) {
  const copy = CHECKOUT_COPY[app.state.locale] ?? CHECKOUT_COPY.es;
  const lines = app.getCartLines();
  const totals = app.getCartTotals();

  if (!lines.length) {
    app.shell.pageRoot.innerHTML = `
      <section class="page-hero page-hero--compact">
        <p class="eyebrow">${copy.eyebrow}</p>
        <h1>${copy.empty}</h1>
        <a href="${app.createUrl('productos.html')}" class="button button--primary">${app.copy.nav.catalog}</a>
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
    <section class="checkout-layout">
      <div class="checkout-summary">
        <div class="glass-card">
          <h2>${app.copy.cart.title}</h2>
          <div class="checkout-lines">
            ${lines
              .map(
                (line) => `
                  <article class="checkout-line">
                    <div class="checkout-line__text">
                      <strong>${line.name}</strong>
                      <p>${line.quantity} × ${app.formatMoney(line.unitPrice)}</p>
                    </div>
                    <span>${app.formatMoney(line.quantity * line.unitPrice)}</span>
                  </article>
                `
              )
              .join('')}
          </div>
          <div class="checkout-total">
            <span>${app.copy.cart.subtotal}</span>
            <strong>${app.formatMoney(totals.subtotal)}</strong>
          </div>
          <p class="checkout-note">${app.copy.common.prepared}</p>
        </div>
      </div>
      <form id="checkout-form" class="checkout-form" novalidate>
        <div class="field-grid">
          <label class="field">
            <span>${copy.name}</span>
            <input name="name" type="text" />
            <small data-error-for="name"></small>
          </label>
          <label class="field">
            <span>${copy.email}</span>
            <input name="email" type="email" />
            <small data-error-for="email"></small>
          </label>
          <label class="field">
            <span>${copy.phone}</span>
            <input name="phone" type="tel" />
          </label>
          <label class="field">
            <span>${copy.city}</span>
            <input name="city" type="text" />
            <small data-error-for="city"></small>
          </label>
          <label class="field field--full">
            <span>${copy.country}</span>
            <select name="country">
              <option value=""></option>
              ${getCountryOptions(app.state.locale)
                .map((option) => `<option value="${option.code}">${option.label}</option>`)
                .join('')}
            </select>
            <small data-error-for="country"></small>
          </label>
          <label class="field field--full">
            <span>${copy.address}</span>
            <input name="address" type="text" />
          </label>
          <label class="field field--full">
            <span>${copy.notes}</span>
            <textarea name="notes" rows="4"></textarea>
          </label>
        </div>
        <div id="checkout-warning-box"></div>
        <button type="submit" class="button button--primary button--full" id="checkout-submit">
          ${copy.submit}
        </button>
      </form>
    </section>
  `;

  const form = document.getElementById('checkout-form');
  const warningBox = document.getElementById('checkout-warning-box');
  const submit = document.getElementById('checkout-submit');

  const renderWarnings = () => {
    const country = form.elements.country.value;
    const restrictions = country ? app.collectRestrictions(country) : [];

    if (!restrictions.length) {
      warningBox.innerHTML = '';
      submit.textContent = copy.submit;
      return restrictions;
    }

    warningBox.innerHTML = `
      <div class="notice notice--warn">
        <strong>${copy.warnings}</strong>
        <p>${summarizeCheckoutRestrictions(restrictions, app.state.locale)}</p>
      </div>
    `;
    submit.textContent = copy.review;
    return restrictions;
  };

  form.elements.country.addEventListener('change', renderWarnings);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const customer = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      city: form.elements.city.value.trim(),
      country: form.elements.country.value.trim(),
      address: form.elements.address.value.trim(),
      notes: form.elements.notes.value.trim(),
      locale: app.state.locale
    };

    const validation = validateCheckoutForm({ customer, lines: app.getCartLines() });

    form.querySelectorAll('[data-error-for]').forEach((target) => {
      target.textContent = validation.errors[target.dataset.errorFor] ?? '';
    });

    if (!validation.valid) {
      return;
    }

    const restrictions = renderWarnings();
    const orderCode = createOrderCode(app.catalog.store.orderPrefix);
    const whatsappUrl = app.buildWhatsAppUrl({ orderCode, customer, restrictions });

    window.open(whatsappUrl, '_blank', 'noopener');
  });
}
