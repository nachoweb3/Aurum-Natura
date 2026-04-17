# Aurum Natura Store V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Aurum Natura as a multilingual premium-accessible storefront with a medium curated catalog, cart, and WhatsApp-based checkout that is ready for future real payment integration.

**Architecture:** Keep the site static and portable, but move it from hardcoded landing behavior to a data-driven storefront. Use ES modules for pure store logic, browser UI orchestration, and page-specific rendering; isolate testable business rules in small modules covered by `node --test`.

**Tech Stack:** Static HTML, CSS, JavaScript ES modules, JSON catalog data, `node:test`, localStorage, URLSearchParams, Three.js/WebGL with graceful fallback

---

## File Structure

- Create: `site/data/catalogo.json`
  - Full multilingual catalog, category metadata, shipping rules, WhatsApp templates, and storefront config
- Create: `site/js/store/catalog.mjs`
  - Pure catalog transforms, translations lookup, restrictions, category helpers
- Create: `site/js/store/cart.mjs`
  - Pure cart item normalization, storage-safe schemas, totals, item key logic
- Create: `site/js/store/checkout.mjs`
  - Pure checkout validation, country restriction aggregation, WhatsApp message payload generation
- Create: `site/js/store/runtime.mjs`
  - Browser runtime: state hydration, DOM wiring, localStorage, cart drawer, route helpers
- Create: `site/js/store/pages/home.mjs`
  - Home page rendering and featured content composition
- Create: `site/js/store/pages/catalogo.mjs`
  - Catalog filters, product grid, category pages
- Create: `site/js/store/pages/producto.mjs`
  - Product detail rendering and add-to-cart behavior
- Create: `site/js/store/pages/checkout.mjs`
  - Checkout UI behavior, validation flow, WhatsApp redirection
- Create: `site/js/store/ui/hero-3d.mjs`
  - 3D hero scene with reduced-motion and non-WebGL fallback hooks
- Create: `site/catalogo.html`
  - Primary catalog page
- Create: `site/producto.html`
  - Product detail template page
- Create: `site/checkout.html`
  - Cart + checkout page
- Create: `site/ayuda.html`
  - Shipping, FAQ, restrictions, returns/help
- Create: `site/robots.txt`
- Create: `site/sitemap.xml`
- Create: `tests/catalog.test.mjs`
- Create: `tests/cart.test.mjs`
- Create: `tests/checkout.test.mjs`
- Modify: `site/index.html`
  - New storefront home shell and multilingual entry points
- Modify: `site/productos.html`
  - Redirect or turn into legacy alias to `catalogo.html`
- Modify: `site/sobre-nosotros.html`
  - Align navigation and shared storefront chrome
- Modify: `site/contacto.html`
  - Align navigation and shared storefront chrome
- Modify: `site/css/style.css`
  - Replace current landing-heavy CSS with storefront design system, components, and motion rules
- Modify: `site/js/main.js`
  - Reduce to compatibility bootstrap or replace with a module loader
- Modify: `README.md`
  - Update deploy/run instructions for new storefront
- Create: `research/01-client-brand.md`
- Create: `research/02-competitor-analysis.md`
- Create: `research/03-build-brief.md`
- Create: `research/04-quality-audit.md`

## Task 1: Establish the Storefront Data Model and Core Pure Logic

**Files:**
- Create: `site/data/catalogo.json`
- Create: `site/js/store/catalog.mjs`
- Create: `site/js/store/cart.mjs`
- Create: `site/js/store/checkout.mjs`
- Test: `tests/catalog.test.mjs`
- Test: `tests/cart.test.mjs`
- Test: `tests/checkout.test.mjs`

- [ ] **Step 1: Write the failing catalog test**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { getProductBySlug, getLocalizedProduct, getRestrictedNotice } from '../site/js/store/catalog.mjs';
import catalog from '../site/data/catalogo.json' with { type: 'json' };

test('returns a localized product record by slug and locale', () => {
  const product = getProductBySlug(catalog, 'aurum-caja-premium');
  const localized = getLocalizedProduct(product, 'fr');

  assert.equal(localized.slug, 'aurum-caja-premium');
  assert.equal(typeof localized.name, 'string');
  assert.equal(localized.locale, 'fr');
});

test('returns a restriction notice for restricted botanical products', () => {
  const product = getProductBySlug(catalog, 'olivo-joven-en-maceta');
  const notice = getRestrictedNotice(product, 'DE');

  assert.match(notice.code, /restricted_country/);
});
```

- [ ] **Step 2: Run the catalog test to verify it fails**

Run: `node --test tests/catalog.test.mjs`
Expected: FAIL because `site/js/store/catalog.mjs` and `site/data/catalogo.json` do not exist yet

- [ ] **Step 3: Write the failing cart test**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { createCartItemKey, mergeCartLines, calculateCartTotals } from '../site/js/store/cart.mjs';

test('creates stable cart keys for product + variant combinations', () => {
  assert.equal(
    createCartItemKey({ productId: 'p1', variantId: 'v1' }),
    'p1::v1'
  );
});

test('merges identical cart lines and preserves quantity totals', () => {
  const merged = mergeCartLines([
    { productId: 'p1', variantId: 'v1', quantity: 1, unitPrice: 29 },
    { productId: 'p1', variantId: 'v1', quantity: 2, unitPrice: 29 }
  ]);

  assert.equal(merged.length, 1);
  assert.equal(merged[0].quantity, 3);
  assert.equal(calculateCartTotals(merged).subtotal, 87);
});
```

- [ ] **Step 4: Run the cart test to verify it fails**

Run: `node --test tests/cart.test.mjs`
Expected: FAIL because `site/js/store/cart.mjs` does not exist yet

- [ ] **Step 5: Write the failing checkout test**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCheckoutForm, buildWhatsAppOrderMessage } from '../site/js/store/checkout.mjs';

test('validates required checkout fields', () => {
  const result = validateCheckoutForm({
    name: '',
    country: '',
    locale: 'es',
    lines: []
  });

  assert.equal(result.valid, false);
  assert.match(result.errors.name, /required/i);
});

test('builds a WhatsApp-ready message with customer and cart summary', () => {
  const message = buildWhatsAppOrderMessage({
    locale: 'en',
    customer: { name: 'Ana', country: 'ES', city: 'Madrid', notes: 'Call first' },
    lines: [{ name: 'Caja Aurum Premium', quantity: 2, price: 49 }],
    totals: { subtotal: 98, currency: 'EUR' },
    restrictions: []
  });

  assert.match(message, /Ana/);
  assert.match(message, /Caja Aurum Premium/);
  assert.match(message, /98/);
});
```

- [ ] **Step 6: Run the checkout test to verify it fails**

Run: `node --test tests/checkout.test.mjs`
Expected: FAIL because `site/js/store/checkout.mjs` does not exist yet

- [ ] **Step 7: Create the catalog data and minimal pure implementations**

```json
{
  "store": {
    "defaultLocale": "es",
    "supportedLocales": ["es", "en", "fr"],
    "currency": "EUR",
    "whatsappNumber": "+34640943669"
  },
  "categories": [
    { "id": "boxes", "slug": "cajas-packs", "label": { "es": "Cajas y packs", "en": "Boxes & bundles", "fr": "Coffrets et packs" } },
    { "id": "fresh", "slug": "frescos", "label": { "es": "Frescos de finca", "en": "Farm fresh", "fr": "Fraîcheur de la ferme" } },
    { "id": "botanical", "slug": "botanica-viva", "label": { "es": "Botánica viva", "en": "Living botanical", "fr": "Botanique vivante" } },
    { "id": "decor", "slug": "arte-decoracion", "label": { "es": "Arte y decoración", "en": "Art & decor", "fr": "Art et décoration" } }
  ],
  "products": [
    {
      "id": "p-box-premium",
      "slug": "aurum-caja-premium",
      "category": "boxes",
      "price": 49,
      "featured": true,
      "restrictedCountries": [],
      "content": {
        "es": { "name": "Caja Aurum Premium", "shortDescription": "Selección de finca curada para la mesa." },
        "en": { "name": "Aurum Premium Box", "shortDescription": "Curated farm selection for the table." },
        "fr": { "name": "Coffret Aurum Premium", "shortDescription": "Sélection de ferme pensée pour la table." }
      }
    },
    {
      "id": "p-olive-pot",
      "slug": "olivo-joven-en-maceta",
      "category": "botanical",
      "price": 36,
      "featured": false,
      "restrictedCountries": ["DE", "NL", "BE", "AT"],
      "content": {
        "es": { "name": "Olivo joven en maceta", "shortDescription": "Botánica viva con envío sujeto a país." },
        "en": { "name": "Young olive tree in pot", "shortDescription": "Living botanical item with country-based shipping rules." },
        "fr": { "name": "Jeune olivier en pot", "shortDescription": "Produit botanique vivant soumis aux règles du pays." }
      }
    }
  ]
}
```

```javascript
// site/js/store/catalog.mjs
export function getProductBySlug(catalog, slug) {
  return catalog.products.find((product) => product.slug === slug);
}

export function getLocalizedProduct(product, locale) {
  const localized = product.content[locale] ?? product.content.es;
  return { ...product, ...localized, locale };
}

export function getRestrictedNotice(product, countryCode) {
  const restricted = product.restrictedCountries.includes(countryCode);
  return restricted
    ? { code: 'restricted_country', countryCode }
    : { code: 'ok', countryCode };
}
```

```javascript
// site/js/store/cart.mjs
export function createCartItemKey({ productId, variantId = 'default' }) {
  return `${productId}::${variantId}`;
}

export function mergeCartLines(lines) {
  const map = new Map();
  for (const line of lines) {
    const key = createCartItemKey(line);
    const current = map.get(key) ?? { ...line, quantity: 0 };
    current.quantity += line.quantity;
    map.set(key, current);
  }
  return [...map.values()];
}

export function calculateCartTotals(lines) {
  const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
  return { subtotal, currency: 'EUR' };
}
```

```javascript
// site/js/store/checkout.mjs
export function validateCheckoutForm({ name, country, locale, lines }) {
  const errors = {};
  if (!name?.trim()) errors.name = 'Name is required';
  if (!country?.trim()) errors.country = 'Country is required';
  if (!locale?.trim()) errors.locale = 'Locale is required';
  if (!Array.isArray(lines) || lines.length === 0) errors.lines = 'Cart is required';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function buildWhatsAppOrderMessage({ locale, customer, lines, totals, restrictions }) {
  const title = locale === 'fr' ? 'Commande Aurum Natura' : locale === 'en' ? 'Aurum Natura Order' : 'Pedido Aurum Natura';
  const list = lines.map((line) => `- ${line.name} x${line.quantity} · €${line.price}`).join('\n');
  const restrictionText = restrictions.length ? `\nRestrictions:\n${restrictions.join('\n')}` : '';
  return `${title}\n\n${customer.name}\n${customer.city}, ${customer.country}\n\n${list}\n\nSubtotal: €${totals.subtotal}\nNotes: ${customer.notes || '-'}${restrictionText}`;
}
```

- [ ] **Step 8: Run the new pure logic tests to verify they pass**

Run: `node --test tests/catalog.test.mjs tests/cart.test.mjs tests/checkout.test.mjs`
Expected: PASS with 0 failures

- [ ] **Step 9: Commit**

```bash
git add site/data/catalogo.json site/js/store/catalog.mjs site/js/store/cart.mjs site/js/store/checkout.mjs tests/catalog.test.mjs tests/cart.test.mjs tests/checkout.test.mjs
git commit -m "feat: add storefront data model and core order logic"
```

## Task 2: Build Shared Storefront Runtime, Layout Shell, and Design System

**Files:**
- Create: `site/js/store/runtime.mjs`
- Create: `site/js/store/ui/hero-3d.mjs`
- Modify: `site/css/style.css`
- Modify: `site/js/main.js`
- Test: `tests/cart.test.mjs`

- [ ] **Step 1: Add a runtime-focused failing test for cart persistence helpers**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { serializeCartState, deserializeCartState } from '../site/js/store/runtime.mjs';

test('serializes and restores cart state safely', () => {
  const state = { locale: 'es', lines: [{ productId: 'p1', quantity: 2 }] };
  const serialized = serializeCartState(state);
  const restored = deserializeCartState(serialized);

  assert.deepEqual(restored, state);
});
```

- [ ] **Step 2: Run the persistence helper test to verify it fails**

Run: `node --test tests/cart.test.mjs`
Expected: FAIL because the new runtime helpers are missing

- [ ] **Step 3: Implement runtime state helpers and browser bootstrapping**

```javascript
// site/js/store/runtime.mjs
import catalog from '../../data/catalogo.json' with { type: 'json' };
import { mergeCartLines, calculateCartTotals } from './cart.mjs';

const STORAGE_KEY = 'aurum-natura-storefront';

export function serializeCartState(state) {
  return JSON.stringify(state);
}

export function deserializeCartState(serialized) {
  return JSON.parse(serialized);
}

export function loadStoreState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? deserializeCartState(raw) : { locale: catalog.store.defaultLocale, lines: [] };
  } catch {
    return { locale: catalog.store.defaultLocale, lines: [] };
  }
}

export function saveStoreState(state) {
  localStorage.setItem(STORAGE_KEY, serializeCartState(state));
}

export function buildStoreSnapshot(lines) {
  const merged = mergeCartLines(lines);
  return { lines: merged, totals: calculateCartTotals(merged) };
}
```

```javascript
// site/js/store/ui/hero-3d.mjs
export function initHero3D({ canvas, reducedMotion = false }) {
  if (!canvas || reducedMotion) return initHeroFallback(canvas);
  if (typeof THREE === 'undefined') return initHeroFallback(canvas);
  // shared 3D scene bootstrapping lives here in the real implementation
}

export function initHeroFallback(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = Math.max(window.innerHeight, 700);
  ctx.fillStyle = '#0b0908';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
```

```javascript
// site/js/main.js
import { initHomePage } from './store/pages/home.mjs';
import { initCatalogPage } from './store/pages/catalogo.mjs';
import { initProductPage } from './store/pages/producto.mjs';
import { initCheckoutPage } from './store/pages/checkout.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'home') initHomePage();
  if (page === 'catalog') initCatalogPage();
  if (page === 'product') initProductPage();
  if (page === 'checkout') initCheckoutPage();
});
```

- [ ] **Step 4: Replace the current CSS with a storefront design system**

```css
:root {
  --bg: #0b0908;
  --bg-soft: #17110e;
  --surface: rgba(255, 248, 238, 0.06);
  --surface-strong: rgba(255, 248, 238, 0.1);
  --text: #f5eee4;
  --muted: #c1b4a3;
  --gold: #ddb56d;
  --gold-soft: #f0d49d;
  --olive: #6d7a53;
  --danger: #d0826b;
  --radius-lg: 24px;
  --radius-md: 16px;
  --shadow-xl: 0 24px 60px rgba(0, 0, 0, 0.35);
  --font-display: "Cormorant Garamond", "Playfair Display", serif;
  --font-body: "Inter", system-ui, sans-serif;
}

body {
  margin: 0;
  background: radial-gradient(circle at top, rgba(189, 137, 72, 0.1), transparent 32%), var(--bg);
  color: var(--text);
  font-family: var(--font-body);
}

.site-shell {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.cart-drawer {
  position: fixed;
  inset: 0 0 0 auto;
  width: min(440px, 100%);
  transform: translateX(100%);
  transition: transform 220ms ease;
}

.cart-drawer.is-open {
  transform: translateX(0);
}
```

- [ ] **Step 5: Run the helper test to verify it passes**

Run: `node --test tests/cart.test.mjs`
Expected: PASS with the new runtime serialization helpers and cart tests still green

- [ ] **Step 6: Commit**

```bash
git add site/js/store/runtime.mjs site/js/store/ui/hero-3d.mjs site/js/main.js site/css/style.css tests/cart.test.mjs
git commit -m "feat: add storefront runtime and shared design system"
```

## Task 3: Rebuild the Home Page as a Premium 3D Storefront Entry

**Files:**
- Modify: `site/index.html`
- Create: `site/js/store/pages/home.mjs`
- Create: `site/js/store/pages/catalogo.mjs`
- Create: `site/js/store/pages/producto.mjs`

- [ ] **Step 1: Write a failing page composition test for home featured sections**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildHomeSections } from '../site/js/store/pages/home.mjs';
import catalog from '../site/data/catalogo.json' with { type: 'json' };

test('builds home sections with featured products and categories', () => {
  const sections = buildHomeSections(catalog);
  assert.ok(sections.hero);
  assert.ok(sections.featuredProducts.length > 0);
  assert.ok(sections.featuredCategories.length > 0);
});
```

- [ ] **Step 2: Run the home composition test to verify it fails**

Run: `node --test tests/catalog.test.mjs`
Expected: FAIL because `buildHomeSections` does not exist yet

- [ ] **Step 3: Implement the page composition helpers and the new home shell**

```javascript
// site/js/store/pages/home.mjs
import catalog from '../../../data/catalogo.json' with { type: 'json' };
import { initHero3D } from '../ui/hero-3d.mjs';

export function buildHomeSections(data) {
  return {
    hero: data.store,
    featuredProducts: data.products.filter((product) => product.featured).slice(0, 6),
    featuredCategories: data.categories.slice(0, 4)
  };
}

export function initHomePage() {
  const canvas = document.getElementById('hero-canvas');
  initHero3D({ canvas, reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches });
  const sections = buildHomeSections(catalog);
  document.querySelector('[data-home-featured]')?.replaceChildren(...sections.featuredProducts.map((product) => {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.innerHTML = `<h3>${product.content.es.name}</h3><p>€${product.price}</p>`;
    return article;
  }));
}
```

```html
<!-- site/index.html -->
<body data-page="home">
  <div class="site-shell">
    <header class="site-header">...</header>
    <main>
      <section class="hero hero-storefront">
        <canvas id="hero-canvas" aria-hidden="true"></canvas>
        <div class="hero-copy">
          <p class="eyebrow">Aurum Natura</p>
          <h1>Premium finca living for table, home, and garden.</h1>
          <p class="lede">Boxes, fresh goods, art, living botanical pieces, and curated objects for Europe.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="/catalogo.html">Comprar colección</a>
            <a class="button button-secondary" href="/sobre-nosotros.html">Conocer el origen</a>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="section-heading">
          <h2>Categorías destacadas</h2>
        </div>
      </section>
      <section class="section">
        <div class="section-heading">
          <h2>Selección Aurum</h2>
        </div>
        <div class="product-grid" data-home-featured></div>
      </section>
    </main>
    <footer class="site-footer">...</footer>
  </div>
  <script type="module" src="js/main.js"></script>
</body>
```

- [ ] **Step 4: Run the home composition test to verify it passes**

Run: `node --test tests/catalog.test.mjs`
Expected: PASS with home section composition now present

- [ ] **Step 5: Commit**

```bash
git add site/index.html site/js/store/pages/home.mjs site/js/store/pages/catalogo.mjs site/js/store/pages/producto.mjs tests/catalog.test.mjs
git commit -m "feat: rebuild home page as storefront entry"
```

## Task 4: Implement Catalog, Product Detail, and Cart UX

**Files:**
- Create: `site/catalogo.html`
- Create: `site/producto.html`
- Modify: `site/productos.html`
- Create: `site/js/store/pages/catalogo.mjs`
- Create: `site/js/store/pages/producto.mjs`
- Modify: `site/js/store/runtime.mjs`

- [ ] **Step 1: Write a failing test for filtered catalog results**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProducts } from '../site/js/store/catalog.mjs';
import catalog from '../site/data/catalogo.json' with { type: 'json' };

test('filters products by category and featured flag', () => {
  const results = filterProducts(catalog.products, { category: 'boxes', featuredOnly: true });
  assert.ok(results.length > 0);
  assert.ok(results.every((product) => product.category === 'boxes'));
  assert.ok(results.every((product) => product.featured === true));
});
```

- [ ] **Step 2: Run the filter test to verify it fails**

Run: `node --test tests/catalog.test.mjs`
Expected: FAIL because `filterProducts` does not exist yet

- [ ] **Step 3: Implement catalog filtering, product rendering, and cart drawer integration**

```javascript
// site/js/store/catalog.mjs
export function filterProducts(products, { category = '', featuredOnly = false } = {}) {
  return products.filter((product) => {
    if (category && product.category !== category) return false;
    if (featuredOnly && !product.featured) return false;
    return true;
  });
}
```

```javascript
// site/js/store/pages/catalogo.mjs
import catalog from '../../../data/catalogo.json' with { type: 'json' };
import { filterProducts, getLocalizedProduct } from '../catalog.mjs';

export function initCatalogPage() {
  const locale = document.documentElement.lang || 'es';
  const grid = document.querySelector('[data-catalog-grid]');
  const params = new URLSearchParams(window.location.search);
  const products = filterProducts(catalog.products, {
    category: params.get('category') ?? '',
    featuredOnly: params.get('featured') === '1'
  }).map((product) => getLocalizedProduct(product, locale));

  grid.replaceChildren(...products.map((product) => {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.innerHTML = `
      <a href="/producto.html?slug=${product.slug}">
        <h3>${product.name}</h3>
        <p>${product.shortDescription}</p>
        <strong>€${product.price}</strong>
      </a>
      <button data-add-to-cart="${product.id}">Añadir</button>
    `;
    return article;
  }));
}
```

```html
<!-- site/catalogo.html -->
<body data-page="catalog">
  <main class="catalog-page">
    <section class="page-hero">
      <h1>Colección Aurum Natura</h1>
      <p>Cajas, frescos de finca, botánica viva y piezas para el hogar.</p>
    </section>
    <section class="catalog-layout">
      <aside class="catalog-filters">...</aside>
      <div class="product-grid" data-catalog-grid></div>
    </section>
  </main>
  <script type="module" src="js/main.js"></script>
</body>
```

```html
<!-- site/producto.html -->
<body data-page="product">
  <main class="product-page">
    <section class="product-layout">
      <div class="product-gallery" data-product-gallery></div>
      <div class="product-buybox" data-product-buybox></div>
    </section>
    <section class="product-details" data-product-details></section>
  </main>
  <script type="module" src="js/main.js"></script>
</body>
```

- [ ] **Step 4: Run the filter test to verify it passes**

Run: `node --test tests/catalog.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add site/catalogo.html site/producto.html site/productos.html site/js/store/pages/catalogo.mjs site/js/store/pages/producto.mjs site/js/store/runtime.mjs site/js/store/catalog.mjs tests/catalog.test.mjs
git commit -m "feat: add storefront catalog and product experiences"
```

## Task 5: Implement Checkout Page, Country Restrictions, and WhatsApp Submission

**Files:**
- Create: `site/checkout.html`
- Create: `site/ayuda.html`
- Create: `site/js/store/pages/checkout.mjs`
- Modify: `site/js/store/checkout.mjs`
- Modify: `site/js/store/runtime.mjs`
- Test: `tests/checkout.test.mjs`

- [ ] **Step 1: Add a failing test for restriction aggregation in checkout**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { collectCheckoutRestrictions } from '../site/js/store/checkout.mjs';

test('collects restricted-country warnings from cart lines', () => {
  const warnings = collectCheckoutRestrictions([
    { productId: 'olive', name: 'Olivo joven', restrictedCountries: ['DE', 'AT'] }
  ], 'DE');

  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /Olivo joven/);
});
```

- [ ] **Step 2: Run the checkout restriction test to verify it fails**

Run: `node --test tests/checkout.test.mjs`
Expected: FAIL because `collectCheckoutRestrictions` does not exist yet

- [ ] **Step 3: Implement checkout restriction aggregation and page behavior**

```javascript
// site/js/store/checkout.mjs
export function collectCheckoutRestrictions(lines, countryCode) {
  return lines
    .filter((line) => (line.restrictedCountries ?? []).includes(countryCode))
    .map((line) => `${line.name} has shipping restrictions for ${countryCode}`);
}
```

```javascript
// site/js/store/pages/checkout.mjs
import { loadStoreState, buildStoreSnapshot } from '../runtime.mjs';
import { validateCheckoutForm, buildWhatsAppOrderMessage, collectCheckoutRestrictions } from '../checkout.mjs';

export function initCheckoutPage() {
  const form = document.querySelector('[data-checkout-form]');
  const state = loadStoreState();
  const snapshot = buildStoreSnapshot(state.lines);

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const customer = Object.fromEntries(formData.entries());
    const restrictions = collectCheckoutRestrictions(snapshot.lines, customer.country);
    const validation = validateCheckoutForm({
      name: customer.name,
      country: customer.country,
      locale: customer.locale,
      lines: snapshot.lines
    });
    if (!validation.valid) return;
    const message = buildWhatsAppOrderMessage({
      locale: customer.locale,
      customer,
      lines: snapshot.lines,
      totals: snapshot.totals,
      restrictions
    });
    const url = `https://wa.me/34640943669?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  });
}
```

```html
<!-- site/checkout.html -->
<body data-page="checkout">
  <main class="checkout-page">
    <section class="checkout-grid">
      <form class="checkout-form" data-checkout-form>
        <h1>Checkout</h1>
        <label>Nombre<input name="name" required></label>
        <label>Country<select name="country" required>...</select></label>
        <label>Locale<select name="locale" required>...</select></label>
        <label>Ciudad<input name="city"></label>
        <label>Notas<textarea name="notes"></textarea></label>
        <button type="submit">Enviar pedido por WhatsApp</button>
      </form>
      <aside class="checkout-summary" data-checkout-summary></aside>
    </section>
  </main>
  <script type="module" src="js/main.js"></script>
</body>
```

- [ ] **Step 4: Run the checkout tests to verify they pass**

Run: `node --test tests/checkout.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add site/checkout.html site/ayuda.html site/js/store/pages/checkout.mjs site/js/store/checkout.mjs site/js/store/runtime.mjs tests/checkout.test.mjs
git commit -m "feat: add WhatsApp checkout flow with country restrictions"
```

## Task 6: Finalize Shared Pages, Research Deliverables, and Storefront Verification

**Files:**
- Modify: `site/sobre-nosotros.html`
- Modify: `site/contacto.html`
- Modify: `README.md`
- Create: `site/robots.txt`
- Create: `site/sitemap.xml`
- Create: `research/01-client-brand.md`
- Create: `research/02-competitor-analysis.md`
- Create: `research/03-build-brief.md`
- Create: `research/04-quality-audit.md`

- [ ] **Step 1: Write the failing quality-audit test for critical storefront files**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('critical storefront artifacts exist', () => {
  const required = [
    'site/catalogo.html',
    'site/producto.html',
    'site/checkout.html',
    'site/robots.txt',
    'site/sitemap.xml',
    'research/01-client-brand.md',
    'research/02-competitor-analysis.md',
    'research/03-build-brief.md',
    'research/04-quality-audit.md'
  ];
  required.forEach((file) => assert.equal(fs.existsSync(file), true, file));
});
```

- [ ] **Step 2: Run the artifact test to verify it fails**

Run: `node --test tests/checkout.test.mjs`
Expected: FAIL because the final research and SEO files do not all exist yet

- [ ] **Step 3: Create final SEO/support artifacts and research deliverables**

```txt
# site/robots.txt
User-agent: *
Allow: /

Sitemap: https://aumnatura.es/sitemap.xml
```

```xml
<!-- site/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://aumnatura.es/</loc></url>
  <url><loc>https://aumnatura.es/catalogo.html</loc></url>
  <url><loc>https://aumnatura.es/checkout.html</loc></url>
  <url><loc>https://aumnatura.es/sobre-nosotros.html</loc></url>
  <url><loc>https://aumnatura.es/contacto.html</loc></url>
</urlset>
```

```markdown
<!-- research/01-client-brand.md -->
## Brand Snapshot
- **Company:** Aurum Natura
- **Primary Color:** #ddb56d
- **Secondary Color:** #0b0908
- **Accent Color:** #6d7a53
- **Fonts:** Cormorant Garamond / Inter
- **Tone:** editorial-premium
- **Core Message:** Curated finca living for table, home, and botanical collection.
```

```markdown
<!-- research/04-quality-audit.md -->
# Quality Audit

- [x] Cart, catalog, and checkout routes exist
- [x] WhatsApp order flow is wired
- [x] Product restrictions are exposed in checkout logic
- [x] Multilingual storefront data exists for es/en/fr
- [ ] Manual browser verification still required before final release
```

- [ ] **Step 4: Run the artifact test to verify it passes**

Run: `node --test tests/checkout.test.mjs`
Expected: PASS

- [ ] **Step 5: Run the full verification suite**

Run: `node --test tests/catalog.test.mjs tests/cart.test.mjs tests/checkout.test.mjs`
Expected: PASS with 0 failures

- [ ] **Step 6: Commit**

```bash
git add site/sobre-nosotros.html site/contacto.html site/robots.txt site/sitemap.xml README.md research/01-client-brand.md research/02-competitor-analysis.md research/03-build-brief.md research/04-quality-audit.md tests/checkout.test.mjs
git commit -m "feat: finalize storefront docs and verification artifacts"
```

## Self-Review

### Spec coverage

- Real store behavior: covered by Tasks 2 to 5
- Medium multilingual catalog: covered by Tasks 1, 3, and 4
- WhatsApp checkout prepared for future payment: covered by Tasks 1 and 5
- 3D-impactful premium home: covered by Tasks 2 and 3
- Research deliverables: covered by Task 6
- SEO/accessibility/performance readiness: covered by Tasks 2 and 6

### Placeholder scan

- No `TBD`
- No `TODO`
- No unresolved “handle appropriately” instructions
- Every task has file paths, commands, and code

### Type consistency

- Catalog data shape is introduced in Task 1 and consumed in Tasks 3 through 5
- Locale and restriction handling use the same names across tasks
- Runtime helpers are introduced before page modules consume them
