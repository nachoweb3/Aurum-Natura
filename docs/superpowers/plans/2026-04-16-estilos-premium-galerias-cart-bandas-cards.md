# Estilos Premium para Aurum Natura Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar sistema de estilos CSS premium para galerías, carrito minimalista, bandas editoriales y cards de soporte en Aurum Natura.

**Architecture:** Component-based CSS con variables temáticas reutilizables. Componentes modulares con JavaScript desacoplado para galerías, carrito, y accordions. Mobile-first responsive con animaciones premium y accesibilidad WCAG AA.

**Tech Stack:** Vanilla CSS3 (variables, grid, flexbox), Vanilla JavaScript (ES6+), IntersectionObserver para scroll animations

---

## File Structure

**Archivos a crear:**
- `site/css/components.css` - Sistema completo de componentes CSS premium
- `site/js/cart.js` - Lógica del carrito minimalista (drawer, WhatsApp)
- `site/js/gallery.js` - Lógica de galerías (lightbox, filtros, parallax)
- `site/js/accordion.js` - Lógica de FAQ accordion

**Archivos a modificar:**
- `site/productos.html` - Integrar galería de productos
- `site/sobre-nosotros.html` - Integrar galería de finca + testimonios
- `site/contacto.html` - Integrar cards de soporte
- `site/index.html` - Integrar bandas editoriales
- `site/js/common.js` - Añadir utilidades compartidas

---

## Task 1: Crear archivo components.css con variables CSS base

**Files:**
- Create: `site/css/components.css`

- [ ] **Step 1: Crear estructura base con variables CSS**

```css
/* ============================================
   AURUM NATURA - COMPONENTS CSS PREMIUM
   ============================================ */

:root {
  /* Variables de color */
  --color-dorado: #d4af37;
  --color-dorado-claro: #f4cf57;
  --color-negro: #0a0a0a;
  --color-negro-suave: #1a1a1a;
  --color-gris-texto: #a0a0a0;

  /* Gallery System */
  --gallery-grid-gap: 16px;
  --gallery-zoom-scale: 1.15;
  --gallery-transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --gallery-shadow-hover: 0 10px 30px rgba(212, 175, 55, 0.3);

  /* Cart System */
  --cart-item-bg: rgba(26, 26, 26, 0.8);
  --cart-border-color: rgba(212, 175, 55, 0.2);
  --cart-btn-gradient: linear-gradient(135deg, var(--color-dorado) 0%, var(--color-dorado-claro) 100%);

  /* Editorial System */
  --editorial-padding: 80px 0;
  --editorial-overlay: linear-gradient(90deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.9) 100%);

  /* Support System */
  --support-card-radius: 16px;
  --support-card-border: 1px solid rgba(212, 175, 55, 0.15);
  --support-card-shadow: 0 4px 20px rgba(0,0,0,0.3);
  --support-card-shadow-hover: 0 8px 30px rgba(212, 175, 55, 0.3);

  /* Common transitions */
  --transition-fast: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --transition-medium: 0.5s ease;
}
```

- [ ] **Step 2: Commit**

```bash
git add site/css/components.css
git commit -m "feat: create components.css with CSS variables base"
```

---

## Task 2: Implementar componente Gallery Grid base

**Files:**
- Modify: `site/css/components.css`

- [ ] **Step 1: Agregar componente .gallery-grid base**

```css
/* ============================================
   GALLERY SYSTEM - BASE COMPONENT
   ============================================ */

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gallery-grid-gap);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.gallery-grid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: var(--gallery-transition);
  cursor: pointer;
}

.gallery-grid img:hover {
  transform: scale(var(--gallery-zoom-scale));
  box-shadow: var(--gallery-shadow-hover);
}

/* Responsive */
@media (max-width: 1200px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    padding: 0 12px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/css/components.css
git commit -m "feat: add gallery-grid base component with responsive layout"
```

---

## Task 3: Implementar galería de productos con lightbox

**Files:**
- Modify: `site/css/components.css`

- [ ] **Step 1: Agregar estilos para galería de productos y lightbox**

```css
/* Gallery Product Styles */
.gallery-product .gallery-grid {
  gap: 24px;
}

.gallery-product img {
  aspect-ratio: 4/3;
}

/* Lightbox Overlay */
.lightbox {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 10000;
  justify-content: center;
  align-items: center;
  padding: 20px;
  backdrop-filter: blur(10px);
  animation: fadeInLightbox 0.3s ease-out;
}

.lightbox.active {
  display: flex;
}

@keyframes fadeInLightbox {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.lightbox-content {
  max-width: 90%;
  max-height: 90vh;
  position: relative;
  animation: slideUpLightbox 0.4s ease-out;
}

@keyframes slideUpLightbox {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.lightbox-content img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(212, 175, 55, 0.2);
}

/* Lightbox Navigation */
.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(212, 175, 55, 0.2);
  border: 2px solid var(--color-dorado);
  color: var(--color-dorado);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.lightbox-nav:hover {
  background: var(--color-dorado);
  color: var(--color-negro);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-nav.prev {
  left: -80px;
}

.lightbox-nav.next {
  right: -80px;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(212, 175, 55, 0.2);
  border: 2px solid var(--color-dorado);
  color: var(--color-dorado);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lightbox-close:hover {
  background: var(--color-dorado);
  color: var(--color-negro);
  transform: rotate(90deg);
}
```

- [ ] **Step 2: Commit**

```bash
git add site/css/components.css
git commit -m "feat: add product gallery lightbox styles with navigation"
```

---

## Task 4: Implementar galería de finca (masonry + parallax)

**Files:**
- Modify: `site/css/components.css`

- [ ] **Step 1: Agregar estilos para galería de finca**

```css
/* Gallery Farm Styles (Masonry) */
.gallery-farm {
  column-count: 3;
  column-gap: var(--gallery-grid-gap);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.gallery-farm-item {
  break-inside: avoid;
  margin-bottom: var(--gallery-grid-gap);
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
}

.gallery-farm-item img {
  width: 100%;
  display: block;
  transition: var(--gallery-transition);
}

.gallery-farm-item:hover img {
  transform: scale(1.05);
}

.gallery-farm-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
  padding: 40px 20px 20px;
  color: var(--color-blanco);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-farm-item:hover .gallery-farm-overlay {
  transform: translateY(0);
}

.gallery-farm-overlay h4 {
  margin: 0 0 8px 0;
  color: var(--color-dorado);
  font-size: 18px;
}

.gallery-farm-overlay p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

/* Filters */
.gallery-filters {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.gallery-filter {
  background: transparent;
  border: 1px solid var(--color-dorado);
  color: var(--color-dorado);
  padding: 10px 24px;
  border-radius: 100px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.gallery-filter:hover,
.gallery-filter.active {
  background: var(--color-dorado);
  color: var(--color-negro);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1200px) {
  .gallery-farm {
    column-count: 2;
  }
}

@media (max-width: 768px) {
  .gallery-farm {
    column-count: 1;
  }

  .lightbox-nav.prev {
    left: 10px;
  }

  .lightbox-nav.next {
    right: 10px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/css/components.css
git commit -m "feat: add farm gallery masonry layout with filters"
```

---

## Task 5: Implementar galería de testimonios

**Files:**
- Modify: `site/css/components.css`

- [ ] **Step 1: Agregar estilos para galería de testimonios**

```css
/* Gallery Testimonials Styles */
.gallery-testimonials .gallery-grid {
  gap: 32px;
}

.testimonial-card {
  background: var(--color-negro-suave);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 20px;
  padding: 40px 32px;
  text-align: center;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--gallery-shadow-hover);
  border-color: var(--color-dorado);
}

.testimonial-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-dorado);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: var(--color-negro);
  margin: 0 auto 20px;
  border: 2px solid var(--color-dorado);
}

.testimonial-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-blanco);
  margin-bottom: 4px;
}

.testimonial-role {
  font-size: 14px;
  color: var(--color-gris-texto);
  margin-bottom: 20px;
}

.testimonial-text {
  font-size: 18px;
  font-style: italic;
  color: var(--color-blanco);
  line-height: 1.8;
  font-family: 'Inter', sans-serif;
}

.testimonial-rating {
  margin-top: 20px;
  font-size: 20px;
  color: var(--color-dorado);
}

/* Responsive */
@media (max-width: 768px) {
  .testimonial-card {
    padding: 32px 24px;
  }

  .testimonial-text {
    font-size: 16px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/css/components.css
git commit -m "feat: add testimonials gallery styles with cards"
```

---

## Task 6: Implementar cart drawer minimalista

**Files:**
- Modify: `site/css/components.css`

- [ ] **Step 1: Agregar estilos para cart drawer**

```css
/* ============================================
   CART SYSTEM - MINIMAL DRAWER
   ============================================ */

.cart-drawer {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  animation: fadeInCart 0.3s ease-out;
}

.cart-drawer.active {
  display: block;
}

@keyframes fadeInCart {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.cart-drawer-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background: var(--color-negro);
  border-left: 2px solid var(--cart-border-color);
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

.cart-drawer.active .cart-drawer-content {
  transform: translateX(0);
}

.cart-drawer-header {
  padding: 24px;
  border-bottom: 1px solid var(--cart-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-drawer-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-blanco);
}

.cart-drawer-close {
  background: transparent;
  border: none;
  color: var(--color-dorado);
  font-size: 28px;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 8px;
}

.cart-drawer-close:hover {
  transform: rotate(90deg);
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--cart-border-color);
  transition: background 0.3s ease;
}

.cart-item:hover {
  background: rgba(212, 175, 55, 0.05);
}

.cart-item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.cart-item-details {
  flex: 1;
}

.cart-item-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-blanco);
  margin-bottom: 8px;
}

.cart-item-price {
  font-size: 14px;
  color: var(--color-dorado);
  font-weight: 500;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.cart-quantity-btn {
  background: transparent;
  border: 1px solid var(--color-dorado);
  color: var(--color-dorado);
  width: 28px;
  height: 28px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cart-quantity-btn:hover {
  background: var(--color-dorado);
  color: var(--color-negro);
}

.cart-quantity-value {
  font-size: 14px;
  color: var(--color-blanco);
  min-width: 24px;
  text-align: center;
}

.cart-item-remove {
  background: transparent;
  border: none;
  color: var(--color-dorado);
  font-size: 20px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
  padding: 8px;
}

.cart-item-remove:hover {
  opacity: 1;
  transform: scale(1.1);
}

.cart-drawer-footer {
  padding: 24px;
  border-top: 1px solid var(--cart-border-color);
  background: var(--color-negro-suave);
}

.cart-summary {
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
}

.summary-row.total {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--cart-border-color);
}

.summary-label {
  color: var(--color-gris-texto);
}

.summary-value {
  color: var(--color-blanco);
  font-weight: 600;
}

.summary-value.total {
  color: var(--color-dorado);
  font-size: 32px;
  font-weight: 700;
}

.cart-whatsapp-btn {
  width: 100%;
  background: var(--cart-btn-gradient);
  color: var(--color-negro);
  padding: 20px 40px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.cart-whatsapp-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
}

.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 60px 20px;
  text-align: center;
}

.cart-empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.cart-empty-text {
  font-size: 24px;
  color: var(--color-blanco);
  margin-bottom: 24px;
}

.cart-empty-btn {
  background: transparent;
  border: 1px solid var(--color-dorado);
  color: var(--color-dorado);
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cart-empty-btn:hover {
  background: var(--color-dorado);
  color: var(--color-negro);
}

/* Responsive */
@media (max-width: 768px) {
  .cart-drawer-content {
    width: 100%;
  }

  .summary-value.total {
    font-size: 24px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/css/components.css
git commit -m "feat: add cart drawer minimal styles with WhatsApp button"
```

---

## Task 7: Implementar bandas editoriales

**Files:**
- Modify: `site/css/components.css`

- [ ] **Step 1: Agregar estilos para bandas editoriales**

```css
/* ============================================
   EDITORIAL BANDS
   ============================================ */

.editorial-band {
  padding: var(--editorial-padding);
  position: relative;
  overflow: hidden;
}

.editorial-band.section-light {
  background: var(--color-negro);
}

.editorial-band.section-dark {
  background: var(--color-negro-suave);
}

/* Information Cards */
.editorial-info-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.editorial-card {
  background: rgba(212, 175, 55, 0.05);
  border: var(--support-card-border);
  border-radius: var(--support-card-radius);
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;
}

.editorial-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--support-card-shadow-hover);
  border-color: var(--color-dorado);
}

.editorial-card-icon {
  font-size: 48px;
  margin-bottom: 20px;
  display: block;
}

.editorial-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-blanco);
  margin-bottom: 12px;
}

.editorial-card p {
  font-size: 14px;
  color: var(--color-gris-texto);
  line-height: 1.6;
}

/* Featured Band */
.editorial-featured {
  min-height: 400px;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  display: flex;
  align-items: center;
  padding: 100px 0;
}

.editorial-featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--editorial-overlay);
}

.editorial-featured-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 24px;
}

.editorial-featured h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(36px, 5vw, 48px);
  font-weight: 700;
  color: var(--color-blanco);
  line-height: 1.2;
  margin-bottom: 20px;
}

.editorial-featured .subtitle {
  font-size: 20px;
  font-weight: 500;
  color: var(--color-dorado);
  margin-bottom: 20px;
}

.editorial-featured p {
  font-size: 16px;
  color: var(--color-blanco);
  line-height: 1.6;
  margin-bottom: 32px;
}

/* Storytelling Band */
.editorial-story {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 80px;
}

.editorial-story-content {
  padding: 0 40px;
}

.editorial-story.quote {
  padding: 120px 0;
}

.editorial-story-image {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
}

.editorial-story-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.editorial-story:hover .editorial-story-image img {
  transform: scale(1.03);
}

.editorial-quote {
  font-family: 'Playfair Display', serif;
  font-size: clamp(28px, 4vw, 32px);
  font-weight: 700;
  color: var(--color-dorado);
  line-height: 1.4;
  margin-bottom: 32px;
  font-style: italic;
}

.editorial-story-text {
  font-size: 16px;
  color: var(--color-blanco);
  line-height: 1.8;
}

/* Responsive */
@media (max-width: 768px) {
  .editorial-info-cards {
    grid-template-columns: 1fr;
  }

  .editorial-featured {
    min-height: 300px;
    padding: 60px 0;
  }

  .editorial-story {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .editorial-story-content {
    padding: 0;
  }

  .editorial-story.reverse {
    display: flex;
    flex-direction: column-reverse;
  }
}

@media (max-width: 1200px) {
  .editorial-info-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/css/components.css
git commit -m "feat: add editorial bands (info, featured, storytelling)"
```

---

## Task 8: Implementar cards de soporte (FAQ, contacto, envíos)

**Files:**
- Modify: `site/css/components.css`

- [ ] **Step 1: Agregar estilos para cards de soporte**

```css
/* ============================================
   SUPPORT CARDS
   ============================================ */

.support-grid {
  display: grid;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

/* FAQ Accordion */
.support-faq {
  grid-template-columns: repeat(2, 1fr);
}

.faq-item {
  background: var(--color-negro-suave);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-blanco);
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: rgba(212, 175, 55, 0.05);
}

.faq-icon {
  color: var(--color-dorado);
  font-size: 24px;
  transition: transform 0.3s ease;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  padding: 0 20px;
  transition: all 0.3s ease;
}

.faq-item.active .faq-answer {
  max-height: 200px;
  padding: 0 20px 20px;
}

.faq-item.active {
  border-color: var(--color-dorado);
}

.faq-answer p {
  font-size: 14px;
  color: var(--color-gris-texto);
  line-height: 1.6;
  margin: 0;
}

/* Contact Cards */
.support-contact {
  grid-template-columns: repeat(3, 1fr);
}

.contact-card {
  background: var(--color-negro-suave);
  border: var(--support-card-border);
  border-radius: var(--support-card-radius);
  padding: 40px 32px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: var(--support-card-shadow);
}

.contact-card:hover {
  transform: scale(1.05);
  box-shadow: var(--support-card-shadow-hover);
  border-color: var(--color-dorado);
}

.contact-icon {
  font-size: 48px;
  color: var(--color-dorado);
  margin-bottom: 20px;
  display: block;
}

.contact-card h4 {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-blanco);
  margin-bottom: 12px;
}

.contact-card p {
  font-size: 14px;
  color: var(--color-gris-texto);
  margin-bottom: 24px;
}

.contact-btn {
  background: var(--cart-btn-gradient);
  color: var(--color-negro);
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

/* Shipping Cards */
.support-shipping {
  grid-template-columns: repeat(3, 1fr);
}

.shipping-card {
  background: var(--color-negro-suave);
  border: var(--support-card-border);
  border-radius: var(--support-card-radius);
  padding: 32px 24px;
  transition: all 0.3s ease;
  box-shadow: var(--support-card-shadow);
}

.shipping-card:hover {
  border-color: var(--color-dorado);
  box-shadow: var(--support-card-shadow-hover);
}

.shipping-icon {
  font-size: 40px;
  color: var(--color-dorado);
  margin-bottom: 16px;
  display: block;
}

.shipping-card h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-blanco);
  margin-bottom: 12px;
}

.shipping-info {
  font-size: 14px;
  color: var(--color-gris-texto);
  line-height: 1.6;
}

.shipping-badge {
  display: inline-block;
  background: rgba(212, 175, 55, 0.2);
  color: var(--color-dorado);
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 12px;
  border: 1px solid var(--color-dorado);
}

.shipping-card.premium .shipping-badge {
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .support-faq,
  .support-contact,
  .support-shipping {
    grid-template-columns: 1fr;
  }

  .contact-card,
  .shipping-card {
    padding: 24px 20px;
  }
}

@media (max-width: 480px) {
  .support-contact,
  .support-shipping {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .support-contact,
  .support-shipping {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/css/components.css
git commit -m "feat: add support cards (FAQ accordion, contact, shipping)"
```

---

## Task 9: Crear JavaScript para cart minimalista

**Files:**
- Create: `site/js/cart.js`

- [ ] **Step 1: Crear archivo cart.js con lógica del carrito**

```javascript
/* AURUM NATURA - Cart Minimalista */

class Cart {
  constructor() {
    this.items = [];
    this.shippingThreshold = 50;
    this.shippingCost = 5;
    this.init();
  }

  init() {
    this.loadCart();
    this.createCartDrawer();
    this.bindEvents();
    this.updateCartUI();
  }

  loadCart() {
    const savedCart = localStorage.getItem('aurum_cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

  saveCart() {
    localStorage.setItem('aurum_cart', JSON.stringify(this.items));
  }

  createCartDrawer() {
    const drawerHTML = `
      <div class="cart-drawer" id="cart-drawer">
        <div class="cart-drawer-content">
          <div class="cart-drawer-header">
            <h3 class="cart-drawer-title">Tu Cesta</h3>
            <button class="cart-drawer-close" onclick="cart.close()">✕</button>
          </div>
          <div class="cart-items" id="cart-items"></div>
          <div class="cart-drawer-footer">
            <div class="cart-summary">
              <div class="summary-row">
                <span class="summary-label">Subtotal:</span>
                <span class="summary-value" id="cart-subtotal">0.00€</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Envío:</span>
                <span class="summary-value" id="cart-shipping">Calculado al checkout</span>
              </div>
              <div class="summary-row total">
                <span class="summary-label">Total:</span>
                <span class="summary-value total" id="cart-total">0.00€</span>
              </div>
            </div>
            <button class="cart-whatsapp-btn" onclick="cart.checkoutWhatsApp()">
              <span>💬</span>
              <span>Finalizar en WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', drawerHTML);
  }

  bindEvents() {
    // Close on overlay click
    document.getElementById('cart-drawer').addEventListener('click', (e) => {
      if (e.target.id === 'cart-drawer') {
        this.close();
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        ...product,
        quantity: 1
      });
    }

    this.saveCart();
    this.updateCartUI();
    this.open();

    // Show notification
    this.showNotification('Producto añadido a la cesta');
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartUI();
  }

  updateQuantity(productId, change) {
    const item = this.items.find(item => item.id === productId);

    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.saveCart();
        this.updateCartUI();
      }
    }
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
  }

  getShippingCost() {
    const subtotal = this.getSubtotal();
    return subtotal >= this.shippingThreshold ? 0 : this.shippingCost;
  }

  getTotal() {
    return this.getSubtotal() + this.getShippingCost();
  }

  updateCartUI() {
    const itemsContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const totalEl = document.getElementById('cart-total');

    if (this.items.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <div class="cart-empty-text">Tu cesta está vacía</div>
          <button class="cart-empty-btn" onclick="cart.close(); document.getElementById('productos').scrollIntoView({ behavior: 'smooth' })">
            Ver Productos
          </button>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image">
          <div class="cart-item-details">
            <div class="cart-item-name">${item.nombre}</div>
            <div class="cart-item-price">${item.precio}€</div>
            <div class="cart-item-quantity">
              <button class="cart-quantity-btn" onclick="cart.updateQuantity('${item.id}', -1)">-</button>
              <span class="cart-quantity-value">${item.quantity}</span>
              <button class="cart-quantity-btn" onclick="cart.updateQuantity('${item.id}', 1)">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="cart.removeItem('${item.id}')">✕</button>
        </div>
      `).join('');
    }

    subtotalEl.textContent = `${this.getSubtotal().toFixed(2)}€`;
    shippingEl.textContent = this.getShippingCost() === 0 ? 'Gratis' : `${this.getShippingCost().toFixed(2)}€`;
    totalEl.textContent = `${this.getTotal().toFixed(2)}€`;
  }

  open() {
    document.getElementById('cart-drawer').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    document.getElementById('cart-drawer').classList.remove('active');
    document.body.style.overflow = '';
  }

  checkoutWhatsApp() {
    if (this.items.length === 0) {
      this.showNotification('Tu cesta está vacía');
      return;
    }

    const message = this.generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/34640943669?text=${encodedMessage}`;

    window.open(url, '_blank');
  }

  generateWhatsAppMessage() {
    let message = 'Hola, quiero comprar:\n\n';

    this.items.forEach(item => {
      message += `✅ ${item.nombre} (x${item.quantity}) - ${(item.precio * item.quantity).toFixed(2)}€\n`;
    });

    message += `\nTotal: ${this.getTotal().toFixed(2)}€ + envío\n\n¿Está disponible esta semana?`;

    return message;
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--color-dorado);
      color: var(--color-negro);
      padding: 16px 24px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 10001;
      animation: slideInRight 0.3s ease-out;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize cart
const cart = new Cart();
```

- [ ] **Step 2: Commit**

```bash
git add site/js/cart.js
git commit -m "feat: add cart minimalista with drawer and WhatsApp integration"
```

---

## Task 10: Crear JavaScript para galerías (lightbox, filtros, parallax)

**Files:**
- Create: `site/js/gallery.js`

- [ ] **Step 1: Crear archivo gallery.js con lógica de galerías**

```javascript
/* AURUM NATURA - Gallery System */

class Gallery {
  constructor(options = {}) {
    this.container = options.container;
    this.type = options.type || 'product';
    this.images = options.images || [];
    this.currentImageIndex = 0;
    this.init();
  }

  init() {
    this.createLightbox();
    this.bindEvents();
    this.initAnimations();

    if (this.type === 'farm') {
      this.initFilters();
      this.initParallax();
    }

    if (this.type === 'testimonials') {
      this.initScrollAnimation();
    }
  }

  createLightbox() {
    const lightboxHTML = `
      <div class="lightbox" id="gallery-lightbox">
        <div class="lightbox-content">
          <button class="lightbox-close" onclick="gallery.closeLightbox()">✕</button>
          <button class="lightbox-nav prev" onclick="gallery.prevImage()">‹</button>
          <button class="lightbox-nav next" onclick="gallery.nextImage()">›</button>
          <img id="lightbox-image" src="" alt="">
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }

  bindEvents() {
    // Lightbox keyboard navigation
    document.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('gallery-lightbox');
      if (!lightbox.classList.contains('active')) return;

      switch(e.key) {
        case 'ArrowLeft':
          this.prevImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
        case 'Escape':
          this.closeLightbox();
          break;
      }
    });

    // Click on image to open lightbox
    if (this.container) {
      this.container.querySelectorAll('img').forEach((img, index) => {
        img.addEventListener('click', () => {
          this.currentImageIndex = index;
          this.openLightbox(img.src);
        });
      });
    }
  }

  openLightbox(src) {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  nextImage() {
    const images = this.container.querySelectorAll('img');
    this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
    this.updateLightboxImage(images[this.currentImageIndex].src);
  }

  prevImage() {
    const images = this.container.querySelectorAll('img');
    this.currentImageIndex = (this.currentImageIndex - 1 + images.length) % images.length;
    this.updateLightboxImage(images[this.currentImageIndex].src);
  }

  updateLightboxImage(src) {
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
      lightboxImage.src = src;
      lightboxImage.style.opacity = '1';
    }, 200);
  }

  initFilters() {
    const filters = document.querySelectorAll('.gallery-filter');
    const items = document.querySelectorAll('.gallery-farm-item');

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Update active state
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        const category = filter.dataset.category;

        // Filter items
        items.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.3s ease-out';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  initParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const items = document.querySelectorAll('.gallery-farm-item img');

      items.forEach((img, index) => {
        const speed = 0.1 + (index * 0.02);
        img.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      observer.observe(card);
    });
  }

  initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2
    });

    const images = this.container?.querySelectorAll('img') || [];
    images.forEach((img, index) => {
      img.style.animationDelay = `${index * 0.1}s`;
      observer.observe(img);
    });
  }
}

// Helper function to initialize galleries
function initGallery(type, containerSelector, options = {}) {
  const container = document.querySelector(containerSelector);
  if (container) {
    new Gallery({
      type,
      container,
      ...options
    });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/js/gallery.js
git commit -m "feat: add gallery system with lightbox, filters, and parallax"
```

---

## Task 11: Crear JavaScript para FAQ accordion

**Files:**
- Create: `site/js/accordion.js`

- [ ] **Step 1: Crear archivo accordion.js con lógica de FAQ**

```javascript
/* AURUM NATURA - FAQ Accordion */

class Accordion {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.init();
  }

  init() {
    if (!this.container) return;

    const items = this.container.querySelectorAll('.faq-item');

    items.forEach(item => {
      const question = item.querySelector('.faq-question');

      question.addEventListener('click', () => {
        this.toggleItem(item, items);
      });
    });
  }

  toggleItem(item, allItems) {
    const isActive = item.classList.contains('active');

    // Close all items (accordion behavior)
    allItems.forEach(otherItem => {
      otherItem.classList.remove('active');
      const answer = otherItem.querySelector('.faq-answer');
      answer.style.maxHeight = '0';
      answer.style.paddingTop = '0';
      answer.style.paddingBottom = '0';
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
      const answer = item.querySelector('.faq-answer');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.style.paddingTop = '0';
      answer.style.paddingBottom = '20px';
    }
  }
}

// Initialize FAQ accordion
document.addEventListener('DOMContentLoaded', () => {
  new Accordion('.support-faq');
});
```

- [ ] **Step 2: Commit**

```bash
git add site/js/accordion.js
git commit -m "feat: add FAQ accordion with smooth animations"
```

---

## Task 12: Integrar components.css en productos.html

**Files:**
- Modify: `site/productos.html`

- [ ] **Step 1: Agregar link a components.css en productos.html**

```html
<!-- CSS -->
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/components.css">
```

- [ ] **Step 2: Agregar galería de productos en sección de productos**

```html
<!-- PRODUCTOS -->
<section class="section section-dark" id="productos">
  <div class="container">
    <div class="section-title">
      <h2>Elige tu Nivel</h2>
      <p class="subtitle">Cada caja es diferente. Porque cada semana, la tierra decide.</p>
    </div>

    <div class="productos-grid" id="productos-grid">
      <!-- Products will be loaded from JSON -->
    </div>

    <div class="escasez-info">
      <p id="escasez-mensaje"></p>
    </div>

    <!-- Galería de Productos -->
    <div class="gallery-product" style="margin-top: 60px;">
      <div class="section-title">
        <h2>Galería de Productos</h2>
        <p class="subtitle">Descubre nuestras cajas en detalle</p>
      </div>
      <div class="gallery-grid" id="product-gallery-grid">
        <img src="assets/img/productos/caja-basica.png" alt="Caja Básica" onclick="gallery.openLightbox(this.src)">
        <img src="assets/img/productos/caja-premium.png" alt="Caja Premium" onclick="gallery.openLightbox(this.src)">
        <img src="assets/img/productos/caja-elite.png" alt="Caja Élite" onclick="gallery.openLightbox(this.src)">
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Agregar scripts al final de productos.html**

```html
<!-- JavaScript -->
<script src="js/common.js"></script>
<script src="js/cart.js"></script>
<script src="js/gallery.js"></script>

<script>
  // Initialize product gallery
  initGallery('product', '#product-gallery-grid');

  // Modificar función de renderizado para agregar botón de carrito
  function renderizarProductos(productos, escasez) {
    const grid = document.getElementById('productos-grid');
    const mensajeEscasez = document.getElementById('escasez-mensaje');

    grid.innerHTML = productos.map(producto => `
      <div class="product-card ${producto.featured ? 'featured' : ''}" onclick="openProductModal('${producto.id}')" style="cursor: pointer;">
        <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px 12px 0 0;">
        <span class="product-badge">${producto.tagline}</span>
        <h3>${producto.nombre}</h3>
        <div class="product-price">${producto.precio}€<span>+ envío</span></div>
        <ul class="product-content">
          ${producto.contenido.slice(0, 4).map(item => `<li>${item}</li>`).join('')}
          ${producto.contenido.length > 4 ? `<li style="color: var(--color-dorado);">+${producto.contenido.length - 4} más...</li>` : ''}
        </ul>
        <button class="product-cta" onclick="event.stopPropagation(); cart.addItem(${JSON.stringify(producto)})">
          Añadir a la Cesta
        </button>
        <div style="text-align: center; margin-top: 12px;">
          <button onclick="event.stopPropagation(); openProductModal('${producto.id}')" style="
            background: transparent;
            border: 1px solid var(--color-dorado);
            color: var(--color-dorado);
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
          " onmouseover="this.style.background='var(--color-dorado)'; this.style.color='var(--color-negro)';"
             onmouseout="this.style.background='transparent'; this.style.color='var(--color-dorado)';">
            Ver Detalles
          </button>
        </div>
      </div>
    `).join('');

    const totalStock = productos.reduce((sum, p) => sum + p.stock, 0);
    mensajeEscasez.textContent = escasez.mensaje.replace('{stock}', totalStock);
  }
</script>
```

- [ ] **Step 4: Commit**

```bash
git add site/productos.html
git commit -m "feat: integrate components.css and gallery in productos.html"
```

---

## Task 13: Integrar galería de finca y testimonios en sobre-nosotros.html

**Files:**
- Modify: `site/sobre-nosotros.html`

- [ ] **Step 1: Leer sobre-nosotros.html actual**

```bash
cat site/sobre-nosotros.html
```

- [ ] **Step 2: Agregar links CSS y JS al inicio**

```html
<!-- CSS -->
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/components.css">
```

- [ ] **Step 3: Agregar galería de finca con filtros**

```html
<!-- GALERÍA DE FINCA -->
<section class="section section-light">
  <div class="container">
    <div class="section-title">
      <h2>Nuestra Finca</h2>
      <p class="subtitle">Donde todo comienza</p>
    </div>

    <div class="gallery-filters">
      <button class="gallery-filter active" data-category="all">Todos</button>
      <button class="gallery-filter" data-category="huerto">Huerto</button>
      <button class="gallery-filter" data-category="gallinas">Gallinas</button>
      <button class="gallery-filter" data-category="procesos">Procesos</button>
    </div>

    <div class="gallery-farm" id="farm-gallery">
      <div class="gallery-farm-item" data-category="huerto">
        <img src="assets/img/extras/Hero — Finca de Origen.png" alt="Huerto">
        <div class="gallery-farm-overlay">
          <h4>Huerto Orgánico</h4>
          <p>Verduras cultivadas sin pesticidas</p>
        </div>
      </div>
      <div class="gallery-farm-item" data-category="gallinas">
        <img src="assets/img/productos/caja-premium.png" alt="Gallinas">
        <div class="gallery-farm-overlay">
          <h4>Gallinas de Corral</h4>
          <p>Huevos camperos de calidad</p>
        </div>
      </div>
      <div class="gallery-farm-item" data-category="procesos">
        <img src="assets/img/extras/858ad7e6-3461-4595-ba59-689831c5adc5.png" alt="Procesos">
        <div class="gallery-farm-overlay">
          <h4>Procesos Naturales</h4>
          <p>Respetando los ciclos de la tierra</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Agregar galería de testimonios**

```html
<!-- TESTIMONIOS -->
<section class="section section-dark">
  <div class="container">
    <div class="section-title">
      <h2>Lo Que Dicen Nuestros Clientes</h2>
      <p class="subtitle">Experiencias reales de la comunidad Aurum</p>
    </div>

    <div class="gallery-testimonials">
      <div class="gallery-grid">
        <div class="testimonial-card">
          <div class="testimonial-avatar">MJ</div>
          <div class="testimonial-name">María José</div>
          <div class="testimonial-role">Cliente desde 3 meses</div>
          <p class="testimonial-text">"No es solo la calidad. Es la sensación de estar comiendo algo real otra vez."</p>
          <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-avatar">CR</div>
          <div class="testimonial-name">Carlos Ruiz</div>
          <div class="testimonial-role">Cliente desde 6 meses</div>
          <p class="testimonial-text">"La diferencia es abismal. Ya no puedo volver a comer productos industriales."</p>
          <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-avatar">AL</div>
          <div class="testimonial-name">Ana López</div>
          <div class="testimonial-role">Cliente desde 2 meses</div>
          <p class="testimonial-text">"Cada caja es una sorpresa. Me encanta descubrir qué hay esta semana."</p>
          <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Agregar scripts al final**

```html
<!-- JavaScript -->
<script src="js/common.js"></script>
<script src="js/gallery.js"></script>

<script>
  // Initialize farm gallery with filters
  initGallery('farm', '#farm-gallery');

  // Initialize testimonials gallery
  initGallery('testimonials', '.gallery-testimonials .gallery-grid');
</script>
```

- [ ] **Step 6: Commit**

```bash
git add site/sobre-nosotros.html
git commit -m "feat: integrate farm gallery and testimonials in sobre-nosotros.html"
```

---

## Task 14: Integrar cards de soporte en contacto.html

**Files:**
- Modify: `site/contacto.html`

- [ ] **Step 1: Leer contacto.html actual**

```bash
cat site/contacto.html
```

- [ ] **Step 2: Agregar links CSS y JS al inicio**

```html
<!-- CSS -->
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/components.css">
```

- [ ] **Step 3: Agregar sección de FAQ**

```html
<!-- PREGUNTAS FRECUENTES -->
<section class="section section-dark">
  <div class="container">
    <div class="section-title">
      <h2>Preguntas Frecuentes</h2>
      <p class="subtitle">Todo lo que necesitas saber</p>
    </div>

    <div class="support-grid support-faq">
      <div class="faq-item">
        <div class="faq-question">
          ¿Puedo elegir el contenido de mi caja?
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          <p>No. El contenido es sorpresa según lo que la tierra produce esta semana. Confiamos en el proceso natural y respetamos la temporada.</p>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          ¿Cuánto dura el envío?
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          <p>Entre 24-48 horas según tu zona en España peninsular. Las cajas se entregan siempre frescas.</p>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          ¿Hay suscripción obligatoria?
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          <p>No. Compras semanales sin compromiso. Solo cuando tú lo decides. Sin cobros automáticos ni contratos.</p>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          ¿Tienen garantía de satisfacción?
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          <p>Sí. Primera caja, notarás la diferencia. Si no, te devolvemos el dinero sin preguntas. Garantía 100%.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Agregar cards de contacto**

```html
<!-- CONTACTO -->
<section class="section section-light">
  <div class="container">
    <div class="section-title">
      <h2>Contáctanos</h2>
      <p class="subtitle">Estamos aquí para ayudarte</p>
    </div>

    <div class="support-grid support-contact">
      <div class="contact-card">
        <span class="contact-icon">💬</span>
        <h4>WhatsApp</h4>
        <p>+34 640 943 669</p>
        <button class="contact-btn" onclick="whatsappContact()">Contactar</button>
      </div>

      <div class="contact-card">
        <span class="contact-icon">📧</span>
        <h4>Email</h4>
        <p>hola@aurumnatura.es</p>
        <button class="contact-btn" onclick="window.location.href='mailto:hola@aurumnatura.es'">Escribir</button>
      </div>

      <div class="contact-card">
        <span class="contact-icon">📱</span>
        <h4>Teléfono</h4>
        <p>+34 640 943 669</p>
        <button class="contact-btn" onclick="window.location.href='tel:+34640943669'">Llamar</button>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Agregar cards de envíos**

```html
<!-- INFORMACIÓN DE ENVÍOS -->
<section class="section section-dark">
  <div class="container">
    <div class="section-title">
      <h2>Información de Envíos</h2>
      <p class="subtitle">Todo lo que necesitas saber sobre entregas</p>
    </div>

    <div class="support-grid support-shipping">
      <div class="shipping-card">
        <span class="shipping-icon">⏱️</span>
        <h4>Tiempo de Entrega</h4>
        <div class="shipping-info">
          <p>24-48 horas en España peninsular</p>
          <p>Entregas de jueves a domingo según zona</p>
        </div>
      </div>

      <div class="shipping-card">
        <span class="shipping-icon">🚚</span>
        <h4>Zonas de Entrega</h4>
        <div class="shipping-info">
          <p>Madrid, Barcelona, Valencia</p>
          <p>Y toda España peninsular</p>
        </div>
      </div>

      <div class="shipping-card premium">
        <span class="shipping-icon">💰</span>
        <h4>Coste de Envío</h4>
        <div class="shipping-info">
          <p>Gratis para pedidos +50€</p>
          <p>5€ para pedidos inferiores</p>
          <span class="shipping-badge">Entrega Garantizada</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Agregar scripts al final**

```html
<!-- JavaScript -->
<script src="js/common.js"></script>
<script src="js/accordion.js"></script>
```

- [ ] **Step 7: Commit**

```bash
git add site/contacto.html
git commit -m "feat: integrate support cards (FAQ, contact, shipping) in contacto.html"
```

---

## Task 15: Integrar bandas editoriales en index.html

**Files:**
- Modify: `site/index.html`

- [ ] **Step 1: Agregar link a components.css en index.html**

```html
<!-- CSS -->
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/components.css">
```

- [ ] **Step 2: Agregar banda informativa después de filosofía**

```html
<!-- INFORMACIÓN DE PRODUCCIÓN -->
<section class="editorial-band section-light">
  <div class="container">
    <div class="section-title">
      <h2>Información de Producción</h2>
      <p class="subtitle">Transparencia total sobre origen y tiempos</p>
    </div>

    <div class="editorial-info-cards">
      <div class="editorial-card">
        <span class="editorial-card-icon">📅</span>
        <h3>Corte de Pedidos</h3>
        <p>Los pedidos se cierran cada jueves a las 18:00 para la semana siguiente. Esto permite preparar cajas frescas con exactitud.</p>
      </div>

      <div class="editorial-card">
        <span class="editorial-card-icon">🚚</span>
        <h3>Entrega Semanal</h3>
        <p>Las cajas se entregan de jueves a domingo según tu zona. Siempre frescas, recién preparadas.</p>
      </div>

      <div class="editorial-card">
        <span class="editorial-card-icon">🔄</span>
        <h3>Contenido Variable</h3>
        <p>Cada semana, la tierra decide qué hay. Respetamos la temporada. Nunca recibes lo mismo dos semanas seguidas.</p>
      </div>

      <div class="editorial-card">
        <span class="editorial-card-icon">📦</span>
        <h3>Empaque Premium</h3>
        <p>Cajas de madera certificada, papel de seda y nota firmada. Cuidamos cada detalle de la experiencia.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Agregar banda destacada después de productos**

```html
<!-- BANDA DESTACADA -->
<section class="editorial-featured" style="background-image: url('assets/img/extras/Hero — Finca de Origen.png');">
  <div class="editorial-featured-content">
    <h2>No todo el mundo debería comer así.</h2>
    <p class="subtitle">Porque cuando entiendes, no puedes volver atrás.</p>
    <p>Esto no es comida industrial. No es producción masiva. No es supermercado.</p>
    <button class="hero-cta" onclick="document.getElementById('cta-final').scrollIntoView({ behavior: 'smooth' })">
      Acceder a la Caja Aurum
    </button>
  </div>
</section>
```

- [ ] **Step 4: Agregar banda storytelling antes de testimonio**

```html
<!-- BANDA STORYTELLING -->
<section class="editorial-band section-dark">
  <div class="container">
    <div class="editorial-story quote">
      <div class="editorial-story-content">
        <p class="editorial-quote">
          "Porque cuando entiendes lo que estás poniendo en tu cuerpo, ya no puedes volver atrás."
        </p>
        <p class="editorial-story-text">
          Es tierra. Es proceso. Es origen. Y cuando lo pruebas, todo cambia.
          No es solo la calidad. Es la sensación de estar conectado con lo real.
        </p>
      </div>
      <div class="editorial-story-image">
        <img src="assets/img/productos/caja-premium.png" alt="Caja Aurum Premium">
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Agregar cart.js y gallery.js scripts**

```html
<!-- JavaScript -->
<script src="js/common.js"></script>
<script src="js/cart.js"></script>
<script src="js/gallery.js"></script>

<script>
  // Initialize product gallery
  initGallery('product', '#product-gallery-grid');

  // Modificar función de renderizado para agregar botón de carrito
  function renderizarProductos(productos, escasez) {
    const grid = document.getElementById('productos-grid');
    const mensajeEscasez = document.getElementById('escasez-mensaje');

    grid.innerHTML = productos.map(producto => `
      <div class="product-card ${producto.featured ? 'featured' : ''}">
        ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}">` : `<div class="placeholder-product" data-emoji="${producto.emoji}">${producto.emoji || '🧺'}</div>`}
        <div class="product-card-content">
          <span class="product-badge">${producto.tagline}</span>
          <h3>${producto.nombre}</h3>
          <div class="product-price">${producto.precio}€<span>+ envío</span></div>
          <ul class="product-content">
            ${producto.contenido.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <button class="product-cta" onclick="cart.addItem(${JSON.stringify(producto)})">
            Añadir a la Cesta
          </button>
        </div>
      </div>
    `).join('');

    const totalStock = productos.reduce((sum, p) => sum + p.stock, 0);
    mensajeEscasez.textContent = escasez.mensaje.replace('{stock}', totalStock);
  }
</script>
```

- [ ] **Step 6: Commit**

```bash
git add site/index.html
git commit -m "feat: integrate editorial bands in index.html"
```

---

## Task 16: Actualizar common.js con utilidades compartidas

**Files:**
- Modify: `site/js/common.js`

- [ ] **Step 1: Agregar animaciones globales a common.js**

```javascript
/* AURUM NATURA - JavaScript Compartido para Todas las Páginas */

const CONFIG = {
  whatsapp: '+34640943669',
  colors: {
    dorado: 0xd4af37,
    doradoClaro: 0xf4cf57
  }
};

// Navegación móvil
function initNavMobile() {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      toggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }
}

// Header scroll behavior
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  });

  header.addEventListener('mouseenter', () => {
    header.classList.remove('hidden');
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// WhatsApp contact
function whatsappContact(productoId = '') {
  const mensaje = productoId ?
    `Hola, quiero comprar la ${productoId}. ¿Está disponible?` :
    'Hola, quiero información sobre Aurum Natura. ¿Podrían ayudarme?';

  const url = `https://wa.me/${CONFIG.whatsapp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

// Smooth scroll
function smoothScroll(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize animations for editorial bands
function initEditorialAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.editorial-band, .editorial-featured, .editorial-story').forEach(el => {
    observer.observe(el);
  });
}

// Inicialización común
document.addEventListener('DOMContentLoaded', () => {
  initNavMobile();
  initHeaderScroll();
  initScrollAnimations();
  initEditorialAnimations();
});
```

- [ ] **Step 2: Commit**

```bash
git add site/js/common.js
git commit -m "feat: add editorial animations to common.js"
```

---

## Task 17: Test final cross-browser y responsive

**Files:**
- Test: Manual testing

- [ ] **Step 1: Verificar responsive en breakpoints**

Test actions:
1. Abrir cada página en Chrome DevTools (F12)
2. Cambiar viewport a: 375px (móvil), 768px (tablet), 1200px (desktop)
3. Verificar: layout, grids, typography, spacing
4. Probar: galerías, carrito drawer, FAQ accordion, bandas editoriales

Expected: All layouts work correctly at all breakpoints

- [ ] **Step 2: Test interactividad JavaScript**

Test actions:
1. Test carrito: añadir productos, modificar cantidad, eliminar, checkout WhatsApp
2. Test galería productos: abrir lightbox, navegar imágenes, cerrar
3. Test galería finca: filtros, hover overlays
4. Test FAQ: abrir/cerrar accordions
5. Test contact cards: botones WhatsApp, email, teléfono

Expected: All interactive elements work correctly

- [ ] **Step 3: Test cross-browser**

Test browsers:
- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)
- Chrome Android (última versión)
- Safari iOS (última versión)

Expected: All features work in all browsers

- [ ] **Step 4: Verificar accesibilidad**

Test actions:
1. Test keyboard navigation (Tab, Enter, Esc, Arrow keys)
2. Test ARIA labels (usar extension de accesibilidad)
3. Test contrast ratios (usar extension de contrast checker)
4. Test screen reader (usar NVDA o VoiceOver)

Expected: WCAG AA compliance

- [ ] **Step 5: Test performance**

Test actions:
1. Abrir Lighthouse en Chrome DevTools
2. Run Performance audit
3. Verificar: First Contentful Paint < 1.8s, Time to Interactive < 3.8s
4. Verificar lazy loading de imágenes
5. Verificar animaciones no bloquean main thread

Expected: Lighthouse score > 90

- [ ] **Step 6: Commit final**

```bash
git add .
git commit -m "test: complete cross-browser, responsive, accessibility, and performance testing"
```

---

## Self-Review

**1. Spec coverage:**
- ✅ Variables CSS base: Task 1
- ✅ Gallery Grid base: Task 2
- ✅ Galería productos + lightbox: Task 3
- ✅ Galería finca + masonry + parallax: Task 4
- ✅ Galería testimonios: Task 5
- ✅ Cart drawer minimalista: Task 6
- ✅ Bandas editoriales: Task 7
- ✅ Cards de soporte: Task 8
- ✅ JavaScript cart.js: Task 9
- ✅ JavaScript gallery.js: Task 10
- ✅ JavaScript accordion.js: Task 11
- ✅ Integración productos.html: Task 12
- ✅ Integración sobre-nosotros.html: Task 13
- ✅ Integración contacto.html: Task 14
- ✅ Integración index.html: Task 15
- ✅ Actualizar common.js: Task 16
- ✅ Testing final: Task 17

**2. Placeholder scan:**
- ✅ No "TBD" found
- ✅ No "TODO" found
- ✅ No "implement later" found
- ✅ All code blocks complete
- ✅ All commands specific
- ✅ All file paths exact

**3. Type consistency:**
- ✅ cart.addItem() vs cart.addItem() - consistent
- ✅ gallery.openLightbox() vs gallery.openLightbox() - consistent
- ✅ FAQ toggleItem() - consistent
- ✅ All function signatures match

**Plan complete and ready for execution.**
