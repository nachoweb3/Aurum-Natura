import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildWhatsAppOrderMessage,
  summarizeCheckoutRestrictions,
  validateCheckoutForm
} from '../site/js/store/checkout.mjs';

test('validates required checkout fields', () => {
  const result = validateCheckoutForm({
    customer: {
      name: '',
      email: '',
      country: '',
      city: '',
      locale: 'es'
    },
    lines: []
  });

  assert.equal(result.valid, false);
  assert.match(result.errors.name, /obligatorio/i);
  assert.match(result.errors.country, /obligatorio/i);
  assert.match(result.errors.lines, /carrito/i);
});

test('builds a WhatsApp-ready message with customer and cart summary', () => {
  const message = buildWhatsAppOrderMessage({
    locale: 'es',
    orderCode: 'AN-1042',
    customer: {
      name: 'Ana',
      email: 'ana@example.com',
      phone: '+34 600 11 22 33',
      country: 'ES',
      city: 'Madrid',
      address: 'Calle Mayor 1',
      notes: 'Call first'
    },
    lines: [{ name: 'Aurum Premium Box', quantity: 2, price: 49 }],
    totals: { subtotal: 98, currency: 'EUR' },
    restrictions: []
  });

  assert.match(message, /Ana/);
  assert.match(message, /Aurum Premium Box/);
  assert.match(message, /98/);
  assert.match(message, /AN-1042/);
  assert.match(message, /\+34 600 11 22 33/);
  assert.match(message, /Calle Mayor 1/);
});

test('summarizes country restrictions for checkout warnings', () => {
  const summary = summarizeCheckoutRestrictions(
    [
      { productName: 'Olivo joven en maceta', country: 'DE', code: 'restricted_country' },
      { productName: 'Esqueje de olivo picual', country: 'DE', code: 'restricted_country' }
    ],
    'es'
  );

  assert.match(summary, /alemania/i);
  assert.match(summary, /2 productos/i);
});
