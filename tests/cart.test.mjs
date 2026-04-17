import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateCartTotals,
  createCartItemKey,
  mergeCartLines,
  normalizeCartLine
} from '../site/js/store/cart.mjs';

test('creates stable cart keys for product and variant combinations', () => {
  assert.equal(createCartItemKey({ productId: 'p1', variantId: 'v1' }), 'p1::v1');
  assert.equal(createCartItemKey({ productId: 'p2' }), 'p2::default');
});

test('merges identical cart lines and preserves quantity totals', () => {
  const merged = mergeCartLines([
    { productId: 'p1', variantId: 'v1', quantity: 1, unitPrice: 29 },
    { productId: 'p1', variantId: 'v1', quantity: 2, unitPrice: 29 },
    { productId: 'p2', variantId: 'v1', quantity: 1, unitPrice: 16 }
  ]);

  assert.equal(merged.length, 2);
  assert.equal(merged[0].quantity, 3);
  assert.equal(calculateCartTotals(merged).subtotal, 103);
});

test('normalizes malformed quantities to a minimum of one', () => {
  const line = normalizeCartLine({
    productId: 'p3',
    variantId: null,
    quantity: 0,
    unitPrice: 18
  });

  assert.equal(line.quantity, 1);
  assert.equal(line.variantId, 'default');
});
