import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const catalog = JSON.parse(
  await readFile(new URL('../site/data/catalogo.json', import.meta.url), 'utf8')
);

const homeSource = await readFile(
  new URL('../site/js/store/pages/home.mjs', import.meta.url),
  'utf8'
);

const runtimeSource = await readFile(
  new URL('../site/js/store/runtime.mjs', import.meta.url),
  'utf8'
);
const cartSource = await readFile(
  new URL('../site/js/store/pages/carrito.mjs', import.meta.url),
  'utf8'
);
const productSource = await readFile(
  new URL('../site/js/store/pages/producto.mjs', import.meta.url),
  'utf8'
);
const checkoutPageSource = await readFile(
  new URL('../site/js/store/pages/checkout.mjs', import.meta.url),
  'utf8'
);
const infoSource = await readFile(
  new URL('../site/js/store/pages/info.mjs', import.meta.url),
  'utf8'
);

const indexHtml = await readFile(new URL('../site/index.html', import.meta.url), 'utf8');
const cartHtml = await readFile(new URL('../site/carrito.html', import.meta.url), 'utf8');
const robotsSource = await readFile(new URL('../site/robots.txt', import.meta.url), 'utf8');
const sitemapSource = await readFile(new URL('../site/sitemap.xml', import.meta.url), 'utf8');

test('catalog is grounded in the real finca origin and Spanish-first selling context', () => {
  assert.deepEqual(catalog.store.supportedLocales, ['es']);
  assert.equal(catalog.store.origin.addressLine, 'Calle Viana 54');
  assert.equal(catalog.store.origin.town, 'Nombela');
  assert.equal(catalog.store.origin.province, 'Toledo');
  assert.equal(catalog.store.origin.region, 'Castilla-La Mancha');
});

test('catalog prioritizes the three premium subscription boxes with target pricing', () => {
  const subscriptionBoxes = catalog.products.filter((product) => product.category === 'subscriptions');
  const productMap = Object.fromEntries(catalog.products.map((product) => [product.slug, product]));

  assert.equal(subscriptionBoxes.length, 3);
  assert.equal(productMap['caja-esencial'].price, 49);
  assert.equal(productMap['caja-familiar'].price, 79);
  assert.equal(productMap['caja-reserva'].price, 119);
  assert.equal(productMap['caja-familiar'].featured, true);
});

test('customer-facing copy removes prototype language and mentions the finca location', () => {
  assert.match(homeSource, /Nombela/i);
  assert.match(homeSource, /suscrip/i);
  assert.match(indexHtml, /Nombela/i);

  assert.doesNotMatch(homeSource, /landing page|assets definitivos|future online payments/i);
  assert.doesNotMatch(runtimeSource, /editorial store|pago online futuro|future online payments/i);
});

test('customer-facing storefront avoids anglicisms and placeholder contact details', () => {
  assert.doesNotMatch(runtimeSource, /checkout:\s*['"]Checkout['"]/i);
  assert.doesNotMatch(runtimeSource, /view:\s*['"][^'"]*checkout/i);
  assert.doesNotMatch(cartSource, /\bal checkout\b|['"]Ir al checkout['"]/i);
  assert.doesNotMatch(productSource, /['"]Ir al checkout['"]/i);
  assert.doesNotMatch(checkoutPageSource, /eyebrow:\s*['"]Checkout['"]/i);
  assert.doesNotMatch(cartHtml, /acceso al checkout/i);
  assert.doesNotMatch(infoSource, /mailto:hola@aurumnatura\.es/i);
});

test('seo files do not ship with fake example domains', () => {
  assert.doesNotMatch(robotsSource, /\.example/i);
  assert.doesNotMatch(sitemapSource, /\.example/i);
});
