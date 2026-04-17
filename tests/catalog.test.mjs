import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  getFeaturedProducts,
  getCategoryBySlug,
  getLocalizedCategory,
  getLocalizedProduct,
  getProductBySlug,
  getRestrictedNotice
} from '../site/js/store/catalog.mjs';

const catalog = JSON.parse(
  await readFile(new URL('../site/data/catalogo.json', import.meta.url), 'utf8')
);

test('returns a localized product record by slug and locale', () => {
  const product = getProductBySlug(catalog, 'caja-familiar');
  const localized = getLocalizedProduct(product, 'es');

  assert.equal(localized.slug, 'caja-familiar');
  assert.equal(localized.locale, 'es');
  assert.equal(localized.name, 'Caja Familiar');
  assert.match(localized.shortDescription, /semanal|famil/i);
});

test('returns a localized category by slug', () => {
  const category = getCategoryBySlug(catalog, 'suscripciones');
  const localized = getLocalizedCategory(category, 'es');

  assert.equal(localized.slug, 'suscripciones');
  assert.equal(localized.label, 'Suscripciones');
});

test('does not create a restriction notice for the main weekly food offer', () => {
  const product = getProductBySlug(catalog, 'caja-esencial');
  const notice = getRestrictedNotice(product, 'ES', 'es');

  assert.equal(notice, null);
});

test('returns the three featured subscription boxes for the commercial comparison flow', () => {
  const featured = getFeaturedProducts(catalog, 'es', 6);

  assert.equal(featured.length, 3);
  assert.deepEqual(
    featured.map((product) => product.slug),
    ['caja-esencial', 'caja-familiar', 'caja-reserva']
  );
});
