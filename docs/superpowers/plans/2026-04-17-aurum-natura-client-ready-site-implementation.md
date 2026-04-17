# Aurum Natura Client-Ready Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the current static premium prototype into a client-facing commercial website that sells Aurum Natura subscriptions first, supports one-time purchase second, and reads as a finished premium finca brand for end customers.

**Architecture:** Keep the site static and lean. Rebuild the four public pages around finished commercial copy, curated AI-generated imagery, cleaner section hierarchy, and a tighter product/subscription story. Preserve the existing static HTML/CSS/JS structure where useful, but simplify or replace demo-like interactions that distract from selling.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, JSON product data, Node for lightweight verification scripts, OpenAI image generation workflow for temporary AI assets.

---

## File Structure

### Existing files to keep and refactor

- `site/index.html` - rewrite as the main commercial homepage with subscription-first hierarchy
- `site/productos.html` - rewrite as a polished offer/comparison page with premium box tiers
- `site/sobre-nosotros.html` - rewrite as a trust and origin page centered on Nombela and finca reality
- `site/contacto.html` - rewrite as a premium support/contact page with practical buying reassurance
- `site/css/style.css` - keep core theme tokens only if still useful; remove low-value legacy rules during refactor
- `site/css/components.css` - keep reusable components that support the final commercial design; prune demo-oriented leftovers
- `site/js/common.js` - keep shared navigation, scroll, and CTA helpers; update copy-sensitive behaviors
- `site/js/cart.js` - keep drawer/cart functionality only if it supports the final selling flow cleanly
- `site/js/gallery.js` - keep gallery/lightbox behavior only where it supports premium product and finca storytelling
- `site/js/accordion.js` - keep FAQ accordion for contact/support sections
- `site/data/productos.json` - replace with final product/pricing/content for the three subscription-oriented box tiers

### New files to create

- `site/assets/img/ia/` - AI-generated commercial imagery for hero, finca, produce, boxes, and household scenes
- `site/tests/content-and-wiring.js` - lightweight verification for key product data and JS wiring
- `output/imagegen/aurum-natura/` - generated AI image outputs before selecting final assets

## Task 1: Establish the Final Commercial Offer Data

**Files:**
- Modify: `site/data/productos.json`
- Create: `site/tests/content-and-wiring.js`
- Test: `site/tests/content-and-wiring.js`

- [ ] **Step 1: Write the failing verification script for product structure and selling hierarchy**

Create `site/tests/content-and-wiring.js`:

```javascript
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, '..', 'data', 'productos.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

assert.equal(Array.isArray(data.productos), true);
assert.equal(data.productos.length, 3);
assert.equal(data.productos[0].subscriptionPrimary, true);
assert.equal(data.productos.every((item) => typeof item.precio === 'number'), true);
assert.equal(data.productos.every((item) => item.copy && item.copy.headline && item.copy.summary), true);
assert.equal(data.productos.every((item) => Array.isArray(item.contenidoHabitual)), true);
assert.equal(typeof data.whatsapp.numero, 'string');

console.log('content and wiring ok');
```

- [ ] **Step 2: Run the script to verify it fails against the current JSON**

Run:

```powershell
node site\tests\content-and-wiring.js
```

Expected: FAIL because the current `productos.json` does not yet contain the final commercial fields.

- [ ] **Step 3: Replace the current product data with the final three-box commercial model**

Update `site/data/productos.json` to contain exactly three commercial offers. Use this structure:

```json
{
  "whatsapp": {
    "numero": "+34640943669",
    "mensaje": "Hola, quiero empezar con Aurum Natura. Me gustaría conocer disponibilidad, modalidad de suscripción y próxima entrega."
  },
  "productos": [
    {
      "id": "caja-esencial",
      "nombre": "Caja Esencial",
      "tagline": "La forma elegante de empezar a comer mejor en casa",
      "precio": 49,
      "subscriptionPrimary": true,
      "featured": false,
      "audiencia": "Parejas o hogares pequeños que quieren una selección semanal premium",
      "copy": {
        "headline": "Una selección de temporada para introducir Aurum Natura en tu semana",
        "summary": "Huevos camperos de gallinas de raza, fruta, verdura y hortaliza seleccionada para una rutina de cocina más cuidada y con origen real."
      },
      "contenidoHabitual": [
        "Huevos camperos de gallinas de raza",
        "Verdura de temporada",
        "Hortaliza fresca seleccionada",
        "Fruta de temporada"
      ],
      "beneficios": [
        "Ideal para empezar sin exceso",
        "Selección cambiante según temporada",
        "Pensada para una o dos personas"
      ],
      "imagen": "assets/img/ia/caja-esencial-hero.webp"
    },
    {
      "id": "caja-familiar",
      "nombre": "Caja Familiar",
      "tagline": "La suscripción principal para hogares que quieren una mesa mejor cada semana",
      "precio": 79,
      "subscriptionPrimary": true,
      "featured": true,
      "audiencia": "Familias y parejas que quieren convertir la calidad en un hábito semanal",
      "copy": {
        "headline": "Nuestra fórmula más equilibrada para hogares que priorizan calidad, ritmo y comodidad",
        "summary": "La caja que mejor representa Aurum Natura: producto de temporada, huevos camperos de gallinas de raza y una selección más amplia para cocinar durante la semana con tranquilidad."
      },
      "contenidoHabitual": [
        "Huevos camperos premium",
        "Verdura variada de temporada",
        "Hortaliza para cocina diaria",
        "Fruta seleccionada",
        "Hierbas aromáticas según disponibilidad"
      ],
      "beneficios": [
        "Opción recomendada para suscripción",
        "Más variedad para comidas de toda la semana",
        "Equilibrio entre valor, volumen y calidad"
      ],
      "imagen": "assets/img/ia/caja-familiar-hero.webp"
    },
    {
      "id": "caja-reserva",
      "nombre": "Caja Reserva",
      "tagline": "La expresión más completa de la finca para hogares que buscan lo mejor",
      "precio": 119,
      "subscriptionPrimary": true,
      "featured": false,
      "audiencia": "Clientes que quieren una experiencia más abundante, más cuidada y más exclusiva",
      "copy": {
        "headline": "Una selección de mayor presencia para quienes quieren vivir la finca con más amplitud",
        "summary": "Más producto, más riqueza de temporada y una presentación especialmente cuidada para hogares que valoran la calidad por encima del volumen industrial."
      },
      "contenidoHabitual": [
        "Huevos camperos de gallinas de raza",
        "Mayor variedad de verdura y hortaliza",
        "Fruta premium de temporada",
        "Hierbas y complementos según cosecha"
      ],
      "beneficios": [
        "La caja más completa de Aurum Natura",
        "Pensada para quienes cocinan más y mejor",
        "Ideal para regalar o elevar la experiencia semanal"
      ],
      "imagen": "assets/img/ia/caja-reserva-hero.webp"
    }
  ]
}
```

- [ ] **Step 4: Run the verification script again**

Run:

```powershell
node site\tests\content-and-wiring.js
```

Expected: PASS with `content and wiring ok`.

## Task 2: Generate and Select Coherent AI Imagery

**Files:**
- Create: `output/imagegen/aurum-natura/`
- Create: `site/assets/img/ia/`
- Reference: `docs/superpowers/specs/2026-04-17-aurum-natura-client-ready-site-design.md`

- [ ] **Step 1: Verify the image generation environment is available**

Run:

```powershell
Get-ChildItem Env:OPENAI_API_KEY
```

Expected: the environment variable exists. If it does not, stop and ask the user to set it locally before proceeding with image generation.

- [ ] **Step 2: Generate the homepage hero image**

Run the image generation workflow with a prompt equivalent to:

```text
Use case: photorealistic-natural
Asset type: homepage hero image
Primary request: premium finca food subscription hero for a Spanish brand called Aurum Natura
Scene/background: warm golden-hour finca in Castilla-La Mancha with curated produce and elegant box presence
Subject: premium seasonal produce, heritage-breed free-range eggs, refined subscription box, believable finca setting
Style/medium: editorial lifestyle photography
Composition/framing: wide cinematic composition with generous negative space for headline text
Lighting/mood: warm, calm, trustworthy, premium
Constraints: no visible logos, no watermarks, no text in image, no artificial plastic packaging look
Avoid: stock-photo vibe, supermarket look, overly rustic clutter, exaggerated luxury props
```

Save the chosen final hero asset as:

```text
site/assets/img/ia/home-hero.webp
```

- [ ] **Step 3: Generate the three product box images**

Generate three coordinated images and save them as:

```text
site/assets/img/ia/caja-esencial-hero.webp
site/assets/img/ia/caja-familiar-hero.webp
site/assets/img/ia/caja-reserva-hero.webp
```

Each prompt should keep the same art direction but vary abundance and perceived tier:

- Esencial: compact, elegant, minimal
- Familiar: generous, balanced, practical premium
- Reserva: fuller, more elevated, more curated

- [ ] **Step 4: Generate the supporting finca and household imagery**

Generate and select at least these assets:

```text
site/assets/img/ia/finca-origen.webp
site/assets/img/ia/huevos-camperos.webp
site/assets/img/ia/temporada-cocina.webp
site/assets/img/ia/familia-mesa.webp
site/assets/img/ia/recoleccion-finca.webp
```

The images must look like one brand world. Reject any output that breaks consistency.

- [ ] **Step 5: Verify all final image files exist**

Run:

```powershell
Get-ChildItem site\assets\img\ia | Select-Object Name
```

Expected: all selected AI assets are present and named consistently.

## Task 3: Rebuild the Shared Visual Foundation

**Files:**
- Modify: `site/css/style.css`
- Modify: `site/css/components.css`
- Modify: `site/js/common.js`

- [ ] **Step 1: Write the failing visual/wiring check**

Extend `site/tests/content-and-wiring.js` with:

```javascript
const commonJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'common.js'), 'utf8');
assert.equal(commonJs.includes("'+34640943669'"), true);
assert.equal(commonJs.includes('function whatsappContact'), true);

const styleCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');
assert.equal(styleCss.includes('--color-dorado'), true);
assert.equal(styleCss.includes('.hero-title'), true);
```

- [ ] **Step 2: Run the check and confirm the current foundation is not enough**

Run:

```powershell
node site\tests\content-and-wiring.js
```

Expected: FAIL once the new assertions describe the final foundation before the rewrite is completed.

- [ ] **Step 3: Rewrite the global visual language in `site/css/style.css`**

Ensure the file defines a cleaner commercial system, including:

```css
:root {
  --color-bg: #0d0d0c;
  --color-panel: #171715;
  --color-cream: #f6f1e8;
  --color-text: #ded6c7;
  --color-muted: #a79f92;
  --color-gold: #c9a55a;
  --color-gold-soft: #e0c98f;
  --color-border: rgba(201, 165, 90, 0.18);
  --radius-lg: 24px;
  --radius-md: 16px;
  --container: 1180px;
  --shadow-soft: 0 18px 50px rgba(0, 0, 0, 0.25);
}

body {
  background: var(--color-bg);
  color: var(--color-text);
}

.container {
  width: min(var(--container), calc(100vw - 32px));
  margin: 0 auto;
}

.hero-title {
  font-family: "Playfair Display", serif;
  font-size: clamp(3rem, 6vw, 5.75rem);
  line-height: 0.96;
}
```

This rewrite should remove the feeling of a style demo and replace it with a finished brand system.

- [ ] **Step 4: Rewrite reusable components in `site/css/components.css`**

Ensure the file supports:

- premium CTA hierarchy
- comparison cards
- trust strips
- subscription emphasis badges
- editorial image blocks
- restrained FAQ/support cards
- finished contact blocks

Anchor the component layer with real selling elements such as:

```css
.cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  padding: 0 28px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--color-gold), var(--color-gold-soft));
  color: #11100d;
  font-weight: 700;
  text-decoration: none;
}

.offer-card--featured {
  border-color: rgba(201, 165, 90, 0.45);
  box-shadow: 0 20px 60px rgba(201, 165, 90, 0.15);
}
```

- [ ] **Step 5: Simplify and align `site/js/common.js` with the selling flow**

Keep only behaviors that support a real sales site:

- mobile navigation
- header behavior
- smooth scroll
- WhatsApp CTA helper
- scroll-in animation

Make sure the shared WhatsApp message favors subscription:

```javascript
function whatsappContact(productoId = '') {
  const baseMessage = productoId
    ? `Hola, me interesa ${productoId} y quiero conocer disponibilidad, modalidad de suscripción y próxima entrega.`
    : 'Hola, quiero conocer Aurum Natura y empezar con una suscripción. ¿Podríais indicarme la mejor opción y la próxima disponibilidad?';

  const url = `https://wa.me/${CONFIG.whatsapp.replace('+', '')}?text=${encodeURIComponent(baseMessage)}`;
  window.open(url, '_blank');
}
```

- [ ] **Step 6: Run the verification script**

Run:

```powershell
node site\tests\content-and-wiring.js
```

Expected: PASS again after the shared foundation is updated.

## Task 4: Rebuild `index.html` as the Sales Homepage

**Files:**
- Modify: `site/index.html`
- Reference: `site/assets/img/ia/home-hero.webp`
- Reference: `site/assets/img/ia/familia-mesa.webp`
- Reference: `site/assets/img/ia/finca-origen.webp`

- [ ] **Step 1: Replace the current homepage hero with a true customer-facing commercial hero**

The hero section should follow this structure:

```html
<section class="hero hero-home">
  <div class="hero-media">
    <img src="assets/img/ia/home-hero.webp" alt="Selección premium Aurum Natura en finca de origen">
  </div>
  <div class="hero-overlay"></div>
  <div class="container hero-layout">
    <div class="hero-copy">
      <span class="eyebrow">Desde Calle Viana 54 · Nombela · Toledo</span>
      <h1 class="hero-title">Suscripción premium de finca para hogares que quieren comer mejor cada semana</h1>
      <p class="hero-subtitle">Huevos camperos de gallinas de raza, fruta, verdura y hortaliza de temporada seleccionadas con origen real y producción limitada.</p>
      <div class="hero-actions">
        <a class="cta-primary" href="/productos.html">Ver suscripciones</a>
        <a class="cta-secondary" href="/sobre-nosotros.html">Conocer la finca</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add a trust/value strip directly after the hero**

Include practical commercial reassurance:

```html
<section class="trust-strip">
  <div class="container trust-strip-grid">
    <div>Producción limitada y de temporada</div>
    <div>Suscripción semanal y quincenal</div>
    <div>Origen real en Nombela, Toledo</div>
    <div>Atención directa por WhatsApp</div>
  </div>
</section>
```

- [ ] **Step 3: Replace the old editorial/demo sections with finished sales sections**

The homepage body must include:

- value proposition for households
- subscription-first offer overview
- featured boxes
- origin/trust block
- simple “cómo funciona”
- social proof/reassurance
- final CTA

Do not leave previous component-showcase sections if they no longer serve the selling flow.

- [ ] **Step 4: Wire the page CTA hierarchy**

Ensure homepage CTA labels are customer-facing:

- `Quiero suscribirme`
- `Ver cajas`
- `Probar una primera caja`

Do not use demo-like CTA phrasing.

- [ ] **Step 5: Verify the homepage content is present**

Run:

```powershell
rg -n "Suscripción premium de finca|Quiero suscribirme|Producción limitada y de temporada|Nombela" site\index.html
```

Expected: all key commercial phrases are present exactly once or where intended.

## Task 5: Rebuild `productos.html` as the Subscription-First Offer Page

**Files:**
- Modify: `site/productos.html`
- Modify: `site/js/cart.js` if the page flow still benefits from cart actions
- Reference: `site/data/productos.json`

- [ ] **Step 1: Replace the current page headline and intent**

The top of `productos.html` should position the page as the place to choose a subscription:

```html
<section class="hero hero-inner">
  <div class="container hero-inner-copy">
    <span class="eyebrow">Suscripciones Aurum Natura</span>
    <h1 class="hero-title">Elige la caja que mejor encaja con tu casa y con tu ritmo</h1>
    <p class="hero-subtitle">La mejor forma de empezar es suscribirte. Si prefieres probar primero, también puedes pedir una caja puntual.</p>
  </div>
</section>
```

- [ ] **Step 2: Render the three offers with proper comparison hierarchy**

The offer cards must show:

- audience fit
- subscription-first framing
- habitual contents
- premium price
- featured recommendation on `Caja Familiar`

Use markup in this direction:

```html
<article class="offer-card offer-card--featured">
  <span class="offer-badge">Más elegida para suscripción</span>
  <h3>Caja Familiar</h3>
  <p class="offer-audience">Para hogares que quieren mantener una mesa mejor cada semana</p>
  <div class="offer-price">79 €</div>
  <ul class="offer-list">...</ul>
  <a class="cta-primary" href="#suscribirme">Quiero suscribirme</a>
  <button class="cta-secondary" type="button" onclick="whatsappContact('Caja Familiar')">Comprar una sola vez</button>
</article>
```

- [ ] **Step 3: Add a subscription explanation block**

Include a section that explains:

- weekly vs biweekly
- why subscription is recommended
- how first-time customers can still try one box

- [ ] **Step 4: Keep only product/gallery behavior that helps sell**

If the lightbox and cart help the page feel more premium and clearer, keep them. If they make the page feel like a component demo, simplify them. The final page must feel commercially clean.

- [ ] **Step 5: Verify the offer page content**

Run:

```powershell
rg -n "Caja Esencial|Caja Familiar|Caja Reserva|Comprar una sola vez|suscrib" site\productos.html
```

Expected: the three products and subscription-first language appear in the final markup.

## Task 6: Rebuild `sobre-nosotros.html` and `contacto.html` as Trust Pages

**Files:**
- Modify: `site/sobre-nosotros.html`
- Modify: `site/contacto.html`
- Modify: `site/js/accordion.js` only if FAQ motion needs refinement

- [ ] **Step 1: Rewrite `sobre-nosotros.html` around origin and credibility**

The page must include:

- origin in Nombela, Toledo
- finca story tied to product quality
- egg and seasonal produce differentiation
- grounded process explanation
- imagery that supports trust

Use customer-facing copy such as:

```html
<h1 class="hero-title">Origen real para una forma mejor de comer</h1>
<p class="hero-subtitle">Aurum Natura nace en Calle Viana 54, Nombela, donde trabajamos con huevos camperos de gallinas de raza y selección estacional de fruta, verdura y hortaliza.</p>
```

- [ ] **Step 2: Rewrite `contacto.html` as premium support, not generic form filler**

The page must clearly support:

- WhatsApp as main contact
- email as secondary channel
- safe delivery language
- practical FAQ
- conversion from doubt to first order

Use selling-safe language such as:

```html
<h1 class="hero-title">Estamos aquí para ayudarte a empezar con Aurum Natura</h1>
<p class="hero-subtitle">Si quieres resolver una duda, consultar disponibilidad o elegir la mejor suscripción para tu casa, te atendemos de forma directa.</p>
```

- [ ] **Step 3: Update FAQs so they sound finished**

Replace any generic or provisional FAQ wording with concise customer-facing answers about:

- contents changing with season
- subscription vs one-time purchase
- quality/origin
- availability by area
- first contact and ordering

- [ ] **Step 4: Verify both trust pages**

Run:

```powershell
rg -n "Calle Viana 54|Nombela|gallinas de raza|suscripción|disponibilidad" site\sobre-nosotros.html site\contacto.html
```

Expected: the trust-driving language is present in both pages where appropriate.

## Task 7: Final Commercial QA and Local Review

**Files:**
- Test: `site/tests/content-and-wiring.js`
- Verify: `site/index.html`
- Verify: `site/productos.html`
- Verify: `site/sobre-nosotros.html`
- Verify: `site/contacto.html`

- [ ] **Step 1: Run the lightweight verification script**

Run:

```powershell
node site\tests\content-and-wiring.js
```

Expected: PASS with `content and wiring ok`.

- [ ] **Step 2: Serve the final site locally**

Run:

```powershell
py -m http.server 4173 -d site
```

Expected: local server running at `http://127.0.0.1:4173/`.

- [ ] **Step 3: Verify the four public pages respond**

Run in a second terminal:

```powershell
(Invoke-WebRequest -Uri 'http://127.0.0.1:4173/' -UseBasicParsing).StatusCode
(Invoke-WebRequest -Uri 'http://127.0.0.1:4173/productos.html' -UseBasicParsing).StatusCode
(Invoke-WebRequest -Uri 'http://127.0.0.1:4173/sobre-nosotros.html' -UseBasicParsing).StatusCode
(Invoke-WebRequest -Uri 'http://127.0.0.1:4173/contacto.html' -UseBasicParsing).StatusCode
```

Expected: `200` for all four requests.

- [ ] **Step 4: Manual content review checklist**

Check visually:

- homepage sells subscription first
- product page feels premium and clear
- about page builds trust
- contact page feels real and complete
- AI imagery is cohesive
- no section reads as internal scaffolding
- no CTA sounds like a prototype

- [ ] **Step 5: Commit the implementation**

Run:

```powershell
git add site docs/superpowers/specs/2026-04-17-aurum-natura-client-ready-site-design.md
git commit -m "feat: rebuild Aurum Natura as a client-ready subscription site"
```

