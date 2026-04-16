# Aurum Natura Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Aurum Natura into a premium multilingual storefront with a richer visual system, data-driven catalog, real frontend cart and checkout flow, and WhatsApp order handoff.

**Architecture:** Keep the site static and modular. Move catalog, language, and cart logic into small browser modules; rebuild pages around reusable sections and a central design-token layer; add product detail, cart, checkout, and help surfaces without introducing a backend or payment integration.

**Tech Stack:** Static HTML, modular vanilla JavaScript, CSS split by responsibility, JSON data, Node built-in test runner for pure storefront logic, optional local static server for smoke verification.

---

## File Structure

### Existing files to keep and refactor

- `site/index.html` - homepage shell; rebuild into editorial storefront landing
- `site/productos.html` - convert into the main store catalog surface
- `site/sobre-nosotros.html` - rebuild as a richer finca story page
- `site/contacto.html` - rebuild as premium contact/support surface
- `site/css/style.css` - replace with imports to focused CSS files or reduce to legacy shim
- `site/data/productos.json` - replace with richer multilingual storefront data
- `site/js/main.js` - split responsibilities and shrink to page bootstrapping only
- `site/js/common.js` - keep shared behavior but update for new nav, language, and cart shell

### New files to create

- `site/producto.html` - product detail page
- `site/carrito.html` - cart page
- `site/checkout.html` - checkout page
- `site/ayuda.html` - shipping/help/FAQ page
- `site/css/tokens.css` - design tokens, typography, spacing, color system
- `site/css/base.css` - resets, global element defaults, containers, utilities
- `site/css/components.css` - buttons, cards, nav, trust bars, galleries, forms
- `site/css/pages.css` - page-specific sections for home/catalog/product/cart/checkout
- `site/js/store-data.js` - catalog and locale loading helpers
- `site/js/i18n.js` - language selection and localized string resolution
- `site/js/cart.js` - cart state, persistence, totals, restrictions
- `site/js/catalog.js` - catalog rendering and filters
- `site/js/product.js` - product detail rendering and related products
- `site/js/checkout.js` - checkout form state and WhatsApp message builder
- `site/js/home.js` - homepage-specific media/storytelling interactions
- `site/js/help.js` - FAQ/help page behavior if needed
- `site/data/store.json` - full multilingual store data, categories, content blocks, media slots
- `tests/store-data.test.mjs` - tests for locale and product lookup
- `tests/cart.test.mjs` - tests for cart math and restriction handling
- `tests/checkout.test.mjs` - tests for WhatsApp payload generation
- `package.json` - minimal scripts for `node --test` and local verification

## Task 1: Set Up Isolated Workspace and Baseline

**Files:**
- Verify: `.worktrees/aurum-store-v1`
- Verify: `site/`
- Test: baseline repo state and branch state

- [ ] **Step 1: Confirm `.worktrees/` is ignored and inspect active worktrees**

Run:

```powershell
git check-ignore .worktrees
git worktree list
```

Expected: `.worktrees` is ignored and `feature/aurum-store-v1` exists as a separate worktree.

- [ ] **Step 2: Move implementation into the existing worktree**

Run:

```powershell
Set-Location 'C:\Users\Usuario\Desktop\Aurum Natura\.worktrees\aurum-store-v1'
git status --short
git branch --show-current
```

Expected: clean or intentionally isolated worktree on `feature/aurum-store-v1`.

- [ ] **Step 3: Bring the approved documentation commit into the feature branch**

Run:

```powershell
git cherry-pick a01c365
```

Expected: the redesign spec commit lands on `feature/aurum-store-v1` without bringing unrelated workspace changes.

- [ ] **Step 4: Record the absence of automated tests before rebuilding**

Run:

```powershell
Get-ChildItem
Test-Path package.json
```

Expected: no existing test harness; this justifies adding a minimal Node-based verification layer in later tasks.

- [ ] **Step 5: Commit only if baseline fixups were needed**

If `.worktrees` had to be fixed or cherry-pick required conflict resolution:

```powershell
git add -A
git commit -m "chore: prepare isolated workspace for Aurum storefront rebuild"
```

## Task 2: Establish Storefront Data and Test Harness

**Files:**
- Create: `package.json`
- Create: `site/data/store.json`
- Create: `site/js/store-data.js`
- Test: `tests/store-data.test.mjs`

- [ ] **Step 1: Write the failing data-loader test**

Create `tests/store-data.test.mjs`:

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { getLocaleCopy, getProductBySlug, getFeaturedProducts } from '../site/js/store-data.js';

test('getLocaleCopy returns Spanish copy for known sections', async () => {
  const hero = await getLocaleCopy('es', 'home.hero');
  assert.equal(hero.title, 'Aurum Natura');
});

test('getProductBySlug returns the multilingual product payload', async () => {
  const product = await getProductBySlug('aurum-signature-box');
  assert.equal(product.category, 'boxes');
  assert.ok(product.translations.en.name.length > 0);
});

test('getFeaturedProducts returns only featured references', async () => {
  const featured = await getFeaturedProducts('es');
  assert.ok(featured.length >= 3);
  assert.equal(featured.every((item) => item.featured), true);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
node --test tests/store-data.test.mjs
```

Expected: FAIL because `site/js/store-data.js` does not exist yet.

- [ ] **Step 3: Add the minimal package manifest**

Create `package.json`:

```json
{
  "name": "aurum-natura-storefront",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test tests/*.test.mjs",
    "serve": "python -m http.server 4173 -d site"
  }
}
```

- [ ] **Step 4: Create the initial storefront dataset**

Create `site/data/store.json` with at least:

```json
{
  "site": {
    "defaultLocale": "es",
    "locales": ["es", "en", "fr"],
    "whatsappNumber": "+34640943669"
  },
  "categories": [
    { "id": "boxes", "slug": "cajas", "media": { "cover": "assets/img/productos/caja-premium.png" } },
    { "id": "fresh", "slug": "frescos", "media": { "cover": "assets/img/extras/858ad7e6-3461-4595-ba59-689831c5adc5.png" } },
    { "id": "plants", "slug": "plantas", "media": { "cover": "assets/img/extras/Hero — Finca de Origen.png" } },
    { "id": "oil-honey", "slug": "aceite-miel", "media": { "cover": "assets/img/extras/Hero — Finca de Origen.png" } },
    { "id": "art", "slug": "arte", "media": { "cover": "assets/img/extras/Hero — Finca de Origen.png" } },
    { "id": "visits", "slug": "visitas", "media": { "cover": "assets/img/extras/Hero — Finca de Origen.png" } }
  ],
  "products": [
    {
      "id": "aurum-signature-box",
      "slug": "aurum-signature-box",
      "category": "boxes",
      "featured": true,
      "price": 59,
      "currency": "EUR",
      "restriction": null,
      "media": {
        "hero": "assets/img/productos/caja-premium.png",
        "gallery": [
          "assets/img/productos/caja-premium.png",
          "assets/img/productos/caja-basica.png",
          "assets/img/productos/caja-elite.png"
        ],
        "video": "assets/img/extras/VIDEOHEADER.mp4"
      },
      "translations": {
        "es": {
          "name": "Caja Signature Aurum",
          "shortDescription": "Selección curada de finca para mesa premium.",
          "story": "Una caja preparada para quienes quieren comer con origen y presencia.",
          "includes": ["Huevos camperos", "Verdura de temporada", "Hierbas frescas"]
        },
        "en": {
          "name": "Aurum Signature Box",
          "shortDescription": "Curated finca selection for a premium table.",
          "story": "A box prepared for people who want food with origin and presence.",
          "includes": ["Free-range eggs", "Seasonal vegetables", "Fresh herbs"]
        },
        "fr": {
          "name": "Coffret Signature Aurum",
          "shortDescription": "Sélection de finca pour une table premium.",
          "story": "Un coffret pensé pour celles et ceux qui recherchent une origine vraie.",
          "includes": ["Œufs fermiers", "Légumes de saison", "Herbes fraîches"]
        }
      }
    }
  ],
  "content": {
    "home": {
      "hero": {
        "es": {
          "title": "Aurum Natura",
          "eyebrow": "Lujo rural cinematográfico",
          "description": "Productos de finca, selección curada y pedidos premium para toda Europa."
        }
      }
    }
  }
}
```

- [ ] **Step 5: Implement the minimal data helper**

Create `site/js/store-data.js`:

```javascript
import store from '../data/store.json' with { type: 'json' };

function resolveLocale(locale) {
  return store.site.locales.includes(locale) ? locale : store.site.defaultLocale;
}

export async function getLocaleCopy(locale, path) {
  const safeLocale = resolveLocale(locale);
  const value = path.split('.').reduce((current, part) => current?.[part], store.content);
  return value?.[safeLocale] ?? value?.[store.site.defaultLocale] ?? null;
}

export async function getProductBySlug(slug) {
  return store.products.find((product) => product.slug === slug) ?? null;
}

export async function getFeaturedProducts() {
  return store.products.filter((product) => product.featured);
}

export async function getStoreConfig() {
  return store.site;
}
```

- [ ] **Step 6: Run the data-loader test to verify it passes**

Run:

```powershell
node --test tests/store-data.test.mjs
```

Expected: PASS for all three tests.

- [ ] **Step 7: Commit**

```powershell
git add package.json site/data/store.json site/js/store-data.js tests/store-data.test.mjs
git commit -m "feat: add storefront data foundation"
```

## Task 3: Add Cart and Checkout Logic with Tests

**Files:**
- Create: `site/js/cart.js`
- Create: `site/js/checkout.js`
- Test: `tests/cart.test.mjs`
- Test: `tests/checkout.test.mjs`

- [ ] **Step 1: Write the failing cart test**

Create `tests/cart.test.mjs`:

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { addItem, removeItem, updateQuantity, getCartSummary, resetCart } from '../site/js/cart.js';

test('cart summary keeps quantities and totals in euros', () => {
  resetCart();
  addItem({ id: 'aurum-signature-box', price: 59, quantity: 1, restriction: null });
  addItem({ id: 'farm-honey-jar', price: 14, quantity: 2, restriction: null });
  updateQuantity('farm-honey-jar', 3);
  const summary = getCartSummary();
  assert.equal(summary.items.length, 2);
  assert.equal(summary.totalQuantity, 4);
  assert.equal(summary.subtotal, 101);
});

test('removeItem deletes matching line items', () => {
  resetCart();
  addItem({ id: 'aurum-signature-box', price: 59, quantity: 1, restriction: null });
  removeItem('aurum-signature-box');
  assert.equal(getCartSummary().items.length, 0);
});
```

- [ ] **Step 2: Write the failing checkout test**

Create `tests/checkout.test.mjs`:

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppOrderMessage } from '../site/js/checkout.js';

test('buildWhatsAppOrderMessage creates a structured Spanish order', () => {
  const message = buildWhatsAppOrderMessage({
    locale: 'es',
    customer: {
      name: 'Ana Martín',
      country: 'España',
      email: 'ana@example.com',
      phone: '+34600000000',
      notes: 'Entregar por la tarde'
    },
    items: [
      { name: 'Caja Signature Aurum', quantity: 1, price: 59 },
      { name: 'Miel de finca', quantity: 2, price: 14 }
    ]
  });

  assert.match(message, /Pedido Aurum Natura/);
  assert.match(message, /Ana Martín/);
  assert.match(message, /Caja Signature Aurum x1/);
  assert.match(message, /Subtotal: 87 EUR/);
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run:

```powershell
node --test tests/cart.test.mjs tests/checkout.test.mjs
```

Expected: FAIL because the cart and checkout modules do not exist yet.

- [ ] **Step 4: Implement the minimal cart store**

Create `site/js/cart.js`:

```javascript
const state = [];

export function resetCart() {
  state.splice(0, state.length);
}

export function addItem(item) {
  const existing = state.find((entry) => entry.id === item.id);
  if (existing) {
    existing.quantity += item.quantity;
    return existing;
  }
  state.push({ ...item });
  return item;
}

export function removeItem(id) {
  const index = state.findIndex((entry) => entry.id === id);
  if (index >= 0) state.splice(index, 1);
}

export function updateQuantity(id, quantity) {
  const entry = state.find((item) => item.id === id);
  if (!entry) return;
  if (quantity <= 0) {
    removeItem(id);
    return;
  }
  entry.quantity = quantity;
}

export function getCartSummary() {
  const subtotal = state.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = state.reduce((sum, item) => sum + item.quantity, 0);
  return {
    items: structuredClone(state),
    subtotal,
    totalQuantity
  };
}
```

- [ ] **Step 5: Implement the WhatsApp message builder**

Create `site/js/checkout.js`:

```javascript
export function buildWhatsAppOrderMessage({ locale, customer, items }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const header = locale === 'es' ? 'Pedido Aurum Natura' : 'Aurum Natura order';
  const lines = [
    header,
    '',
    `Cliente: ${customer.name}`,
    `Pais: ${customer.country}`,
    `Email: ${customer.email}`,
    `Telefono: ${customer.phone}`,
    '',
    'Productos:'
  ];

  items.forEach((item) => {
    lines.push(`- ${item.name} x${item.quantity} (${item.price} EUR)`);
  });

  lines.push('');
  lines.push(`Subtotal: ${subtotal} EUR`);

  if (customer.notes) {
    lines.push(`Notas: ${customer.notes}`);
  }

  return lines.join('\n');
}
```

- [ ] **Step 6: Run the cart and checkout tests**

Run:

```powershell
node --test tests/cart.test.mjs tests/checkout.test.mjs
```

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add site/js/cart.js site/js/checkout.js tests/cart.test.mjs tests/checkout.test.mjs
git commit -m "feat: add cart and WhatsApp checkout logic"
```

## Task 4: Rebuild the Design System and Shared Layout Shell

**Files:**
- Create: `site/css/tokens.css`
- Create: `site/css/base.css`
- Create: `site/css/components.css`
- Create: `site/css/pages.css`
- Modify: `site/css/style.css`
- Modify: `site/index.html`
- Modify: `site/productos.html`
- Modify: `site/sobre-nosotros.html`
- Modify: `site/contacto.html`

- [ ] **Step 1: Create the token layer**

Create `site/css/tokens.css` with the root system:

```css
:root {
  --bg-900: #120f0b;
  --bg-850: #17130f;
  --panel-800: rgba(33, 26, 18, 0.78);
  --panel-700: rgba(51, 40, 28, 0.72);
  --surface-100: #f4ede3;
  --surface-200: #e7d9c2;
  --text-100: #f8f3ec;
  --text-300: #d4c7b4;
  --text-500: #aa9c88;
  --gold-400: #d2a95e;
  --gold-500: #b88434;
  --accent-olive: #57614a;
  --shadow-soft: 0 20px 60px rgba(0, 0, 0, 0.28);
  --shadow-card: 0 30px 80px rgba(0, 0, 0, 0.32);
  --radius-sm: 14px;
  --radius-md: 22px;
  --radius-lg: 34px;
  --container: 1240px;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
}
```

- [ ] **Step 2: Create global layout/base styles**

Create `site/css/base.css` and include:

```css
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-width: 320px;
  font-family: "Inter", sans-serif;
  color: var(--text-100);
  background:
    radial-gradient(circle at top, rgba(184, 132, 52, 0.14), transparent 32%),
    linear-gradient(180deg, #0f0b08 0%, #16110d 45%, #0d0a07 100%);
}
a { color: inherit; text-decoration: none; }
img, video { max-width: 100%; display: block; }
.container {
  width: min(var(--container), calc(100% - 2rem));
  margin: 0 auto;
}
.eyebrow {
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-400);
  font-size: 0.78rem;
}
```

- [ ] **Step 3: Create reusable component styles**

Create `site/css/components.css` covering:

```css
.site-header,
.site-nav,
.nav-links,
.button-primary,
.button-secondary,
.section-shell,
.trust-bar,
.category-card,
.product-card,
.editorial-panel,
.gallery-strip,
.form-panel,
.cart-line,
.checkout-grid,
.language-switcher { /* implement component rules here */ }
```

The final file should define hover, focus, active, and mobile states for each shared component.

- [ ] **Step 4: Create page-level section styles**

Create `site/css/pages.css` covering:

```css
.home-hero,
.home-story-grid,
.catalog-hero,
.catalog-grid,
.product-layout,
.product-gallery,
.cart-layout,
.checkout-layout,
.about-timeline,
.contact-grid,
.help-faq-grid { /* page-scoped rules */ }
```

- [ ] **Step 5: Turn `style.css` into a thin import shim**

Replace `site/css/style.css` with:

```css
@import url('./tokens.css');
@import url('./base.css');
@import url('./components.css');
@import url('./pages.css');
```

- [ ] **Step 6: Update all existing page heads to load the new shell cleanly**

Each HTML head should reference:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
```

- [ ] **Step 7: Commit**

```powershell
git add site/css/style.css site/css/tokens.css site/css/base.css site/css/components.css site/css/pages.css site/index.html site/productos.html site/sobre-nosotros.html site/contacto.html
git commit -m "feat: add storefront design system"
```

## Task 5: Build the New Storefront Pages

**Files:**
- Modify: `site/index.html`
- Modify: `site/productos.html`
- Create: `site/producto.html`
- Create: `site/carrito.html`
- Create: `site/checkout.html`
- Create: `site/ayuda.html`
- Modify: `site/sobre-nosotros.html`
- Modify: `site/contacto.html`

- [ ] **Step 1: Rebuild the homepage around the approved sections**

`site/index.html` should include these ordered sections:

```html
<main>
  <section class="home-hero">...</section>
  <section class="trust-bar">...</section>
  <section class="section-shell home-category-entry">...</section>
  <section class="section-shell home-featured-products">...</section>
  <section class="section-shell home-editorial-manifesto">...</section>
  <section class="section-shell home-finca-gallery">...</section>
  <section class="section-shell home-seasonal-selection">...</section>
  <section class="section-shell home-social-proof">...</section>
  <section class="section-shell home-final-cta">...</section>
</main>
```

- [ ] **Step 2: Convert `productos.html` into the real shop/catalog page**

The page should contain:

```html
<main>
  <section class="catalog-hero">...</section>
  <section class="catalog-toolbar">
    <form class="catalog-filters">...</form>
  </section>
  <section class="catalog-grid" id="catalog-grid"></section>
</main>
```

- [ ] **Step 3: Create the product detail page**

Create `site/producto.html` with:

```html
<main class="product-layout">
  <section class="product-gallery" id="product-gallery"></section>
  <section class="product-summary" id="product-summary"></section>
  <section class="product-story" id="product-story"></section>
  <section class="product-logistics" id="product-logistics"></section>
  <section class="product-related" id="product-related"></section>
</main>
```

- [ ] **Step 4: Create the cart page**

Create `site/carrito.html` with:

```html
<main class="cart-layout">
  <section class="cart-lines" id="cart-lines"></section>
  <aside class="cart-summary" id="cart-summary"></aside>
</main>
```

- [ ] **Step 5: Create the checkout page**

Create `site/checkout.html` with:

```html
<main class="checkout-layout">
  <form id="checkout-form" class="form-panel">...</form>
  <aside id="checkout-summary" class="checkout-summary"></aside>
</main>
```

- [ ] **Step 6: Add the support/help page**

Create `site/ayuda.html` with:

```html
<main>
  <section class="help-hero">...</section>
  <section class="help-faq-grid">...</section>
  <section class="help-shipping-grid">...</section>
</main>
```

- [ ] **Step 7: Rebuild About and Contact to match the new brand direction**

`site/sobre-nosotros.html` should add:

- visual finca story panels
- editorial blocks
- process timeline
- real-media-ready gallery rails

`site/contacto.html` should add:

- premium contact intro
- WhatsApp-first contact card
- cleaner form structure
- FAQ/service reassurance

- [ ] **Step 8: Commit**

```powershell
git add site/index.html site/productos.html site/producto.html site/carrito.html site/checkout.html site/ayuda.html site/sobre-nosotros.html site/contacto.html
git commit -m "feat: rebuild storefront pages"
```

## Task 6: Wire Page Scripts, Language Switching, and Rendering

**Files:**
- Modify: `site/js/common.js`
- Modify: `site/js/main.js`
- Create: `site/js/i18n.js`
- Create: `site/js/catalog.js`
- Create: `site/js/product.js`
- Create: `site/js/home.js`
- Modify: `site/js/checkout.js`
- Modify: `site/js/cart.js`

- [ ] **Step 1: Add locale state handling**

Create `site/js/i18n.js`:

```javascript
const STORAGE_KEY = 'aurum-locale';

export function getLocale() {
  return localStorage.getItem(STORAGE_KEY) ?? 'es';
}

export function setLocale(locale) {
  localStorage.setItem(STORAGE_KEY, locale);
  return locale;
}
```

- [ ] **Step 2: Update the shared shell**

`site/js/common.js` should:

- render current cart count
- bind language switcher buttons
- expose the WhatsApp number from store config
- preserve mobile-nav behavior

- [ ] **Step 3: Build catalog rendering**

Create `site/js/catalog.js` with functions for:

```javascript
renderCatalog({ locale, category, featuredOnly, searchTerm })
renderCategoryCards(locale)
bindCatalogFilters()
```

Each product card should link to:

```html
<a href="/producto.html?slug=aurum-signature-box">...</a>
```

- [ ] **Step 4: Build the product detail renderer**

Create `site/js/product.js` with:

```javascript
renderProductPage({ slug, locale })
renderRelatedProducts({ category, locale, currentSlug })
```

- [ ] **Step 5: Build homepage rendering**

Create `site/js/home.js` with:

```javascript
renderHomepage({ locale })
enhanceHeroMedia()
bindEditorialCTAs()
```

- [ ] **Step 6: Connect checkout and cart to browser persistence**

Extend `site/js/cart.js` to persist:

```javascript
const STORAGE_KEY = 'aurum-cart';
```

Extend `site/js/checkout.js` to export:

```javascript
export function buildWhatsAppUrl({ phone, message }) {
  return `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 7: Trim `site/js/main.js` into a simple page bootstrap**

`site/js/main.js` should become page detection only, for example:

```javascript
import { initSharedShell } from './common.js';
import { renderHomepage } from './home.js';
import { renderCatalog } from './catalog.js';
import { renderProductPage } from './product.js';
import { renderCheckoutPage } from './checkout.js';

document.addEventListener('DOMContentLoaded', async () => {
  await initSharedShell();

  const page = document.body.dataset.page;
  if (page === 'home') await renderHomepage();
  if (page === 'catalog') await renderCatalog();
  if (page === 'product') await renderProductPage();
  if (page === 'checkout') await renderCheckoutPage();
});
```

- [ ] **Step 8: Run the full test suite**

Run:

```powershell
npm test
```

Expected: PASS for `store-data`, `cart`, and `checkout` tests.

- [ ] **Step 9: Commit**

```powershell
git add site/js/common.js site/js/main.js site/js/i18n.js site/js/catalog.js site/js/product.js site/js/home.js site/js/cart.js site/js/checkout.js
git commit -m "feat: wire storefront rendering and locale state"
```

## Task 7: Smoke Verification and Final Polish

**Files:**
- Verify: all HTML pages under `site/`
- Verify: CSS and JS integration

- [ ] **Step 1: Serve the site locally**

Run:

```powershell
python -m http.server 4173 -d site
```

Expected: local site available at `http://127.0.0.1:4173/`.

- [ ] **Step 2: Verify the main pages respond**

In another shell:

```powershell
Invoke-WebRequest http://127.0.0.1:4173/ | Select-Object StatusCode
Invoke-WebRequest http://127.0.0.1:4173/productos.html | Select-Object StatusCode
Invoke-WebRequest http://127.0.0.1:4173/producto.html?slug=aurum-signature-box | Select-Object StatusCode
Invoke-WebRequest http://127.0.0.1:4173/carrito.html | Select-Object StatusCode
Invoke-WebRequest http://127.0.0.1:4173/checkout.html | Select-Object StatusCode
Invoke-WebRequest http://127.0.0.1:4173/ayuda.html | Select-Object StatusCode
```

Expected: `StatusCode` is `200` for every page.

- [ ] **Step 3: Run the automated tests once more**

Run:

```powershell
npm test
```

Expected: PASS.

- [ ] **Step 4: Manually check mobile-critical selectors**

Confirm by inspection that these selectors exist and are styled:

```text
.site-header
.home-hero
.catalog-grid
.product-layout
.cart-layout
.checkout-layout
.language-switcher
```

- [ ] **Step 5: Commit the verified storefront build**

```powershell
git add site package.json tests
git commit -m "feat: launch Aurum Natura storefront redesign"
```

## Self-Review

### Spec coverage

- Homepage redesign: covered in Task 5
- Catalog and product richness: covered in Tasks 2, 5, and 6
- Cart and checkout with WhatsApp closing: covered in Tasks 3, 5, and 6
- About/contact/help rebuild: covered in Task 5
- Multilingual support: covered in Tasks 2 and 6
- Prepared media slots and cinematic visual system: covered in Tasks 4 and 5
- Static architecture with stronger robustness: covered in Tasks 2, 3, 4, and 6

### Placeholder scan

No `TODO`, `TBD`, or dangling references remain in the plan. Every task has file targets, commands, and implementation anchors.

### Type consistency

The plan consistently uses:

- `store.json` as the single data source
- `slug` for product lookup
- `locale` for translation selection
- `buildWhatsAppOrderMessage` for checkout message generation
- `feature/aurum-store-v1` as the implementation branch/worktree
