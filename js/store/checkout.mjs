import { getCountryLabel } from './catalog.mjs';

const VALIDATION_COPY = {
  es: {
    required: 'Campo obligatorio.',
    email: 'Introduce un correo valido.',
    lines: 'Tu carrito esta vacio.'
  },
  en: {
    required: 'This field is required.',
    email: 'Please enter a valid email.',
    lines: 'Your cart is empty.'
  },
  fr: {
    required: 'Champ obligatoire.',
    email: 'Veuillez saisir un e-mail valide.',
    lines: 'Votre panier est vide.'
  }
};

const MESSAGE_COPY = {
  es: {
    title: 'Nuevo pedido Aurum Natura',
    customer: 'Cliente',
    destination: 'Destino',
    phone: 'Telefono',
    address: 'Direccion',
    order: 'Pedido',
    notes: 'Notas',
    warnings: 'Avisos',
    subtotal: 'Subtotal estimado'
  },
  en: {
    title: 'New Aurum Natura order',
    customer: 'Customer',
    destination: 'Destination',
    phone: 'Phone',
    address: 'Address',
    order: 'Order',
    notes: 'Notes',
    warnings: 'Warnings',
    subtotal: 'Estimated subtotal'
  },
  fr: {
    title: 'Nouvelle commande Aurum Natura',
    customer: 'Client',
    destination: 'Destination',
    phone: 'Telephone',
    address: 'Adresse',
    order: 'Commande',
    notes: 'Notes',
    warnings: 'Alertes',
    subtotal: 'Sous-total estime'
  }
};

export function validateCheckoutForm({ customer, lines }) {
  const locale = customer?.locale ?? 'es';
  const copy = VALIDATION_COPY[locale] ?? VALIDATION_COPY.es;
  const errors = {};

  if (!customer?.name?.trim()) {
    errors.name = copy.required;
  }

  if (!customer?.email?.trim()) {
    errors.email = copy.required;
  } else if (!/^\S+@\S+\.\S+$/.test(customer.email.trim())) {
    errors.email = copy.email;
  }

  if (!customer?.country?.trim()) {
    errors.country = copy.required;
  }

  if (!customer?.city?.trim()) {
    errors.city = copy.required;
  }

  if (!Array.isArray(lines) || lines.length === 0) {
    errors.lines = copy.lines;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function summarizeCheckoutRestrictions(restrictions, locale = 'es') {
  if (!restrictions.length) {
    return '';
  }

  const countryCode = restrictions[0].country;
  const countryLabel = getCountryLabel(countryCode, locale);

  if (locale === 'en') {
    return `${restrictions.length} products have shipping restrictions for ${countryLabel}.`;
  }

  if (locale === 'fr') {
    return `${restrictions.length} produits ont des restrictions d'expedition pour ${countryLabel}.`;
  }

  return `${restrictions.length} productos tienen restricciones de envio para ${countryLabel}.`;
}

export function buildWhatsAppOrderMessage({
  locale = 'es',
  orderCode,
  customer,
  lines,
  totals,
  restrictions
}) {
  const copy = MESSAGE_COPY[locale] ?? MESSAGE_COPY.es;
  const destination = `${getCountryLabel(customer.country, locale)} · ${customer.city}`;
  const lineText = lines
    .map((line) => `- ${line.name} × ${line.quantity} · ${line.price}${totals.currency}`)
    .join('\n');
  const warningText = restrictions.length ? summarizeCheckoutRestrictions(restrictions, locale) : '';

  return [
    `${copy.title} · ${orderCode}`,
    '',
    `${copy.customer}: ${customer.name}`,
    `${copy.destination}: ${destination}`,
    customer.email ? `Email: ${customer.email}` : '',
    customer.phone ? `${copy.phone}: ${customer.phone}` : '',
    customer.address ? `${copy.address}: ${customer.address}` : '',
    '',
    `${copy.order}:`,
    lineText,
    '',
    `${copy.subtotal}: ${totals.subtotal}${totals.currency}`,
    customer.notes ? `${copy.notes}: ${customer.notes}` : '',
    warningText ? `${copy.warnings}: ${warningText}` : ''
  ]
    .filter(Boolean)
    .join('\n');
}
