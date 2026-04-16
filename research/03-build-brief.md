# 🜂 AURUM NATURA — Brief de Construcción Web

## Dirección de Diseño

### Paleta de Colores Final

```css
:root {
  /* Colores principales */
  --color-negro: #0a0a0a;
  --color-negro-suave: #1a1a1a;
  --color-dorado: #d4af37;
  --color-dorado-claro: #f4cf57;
  --color-dorado-oscuro: #a0852a;

  /* Colores funcionales */
  --color-blanco: #ffffff;
  --color-gris-texto: #a0a0a0;
  --color-gris-claro: #f5f5f5;
  --color-verde-tierra: #4a5d2a;
  --color-rojo-accion: #c45d3e;
}
```

### Tipografía

**Confirmado:**
- **Headings:** Playfair Display (Google Fonts)
- **Body:** Inter (Google Fonts)

**Imports:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Estilo Visual

- **Fondo:** Negro profundo (#0a0a0a) en 90% de la web
- **Acentos:** Dorado (#d4af37) en botones, bordes, highlights
- **Fotografía:** Profesional, alta calidad, iluminación cálida
- **Animaciones:** Suaves, cinemáticas, estilo Apple/Stripe
- **3D Effects:** Partículas doradas, tilt en cards, parallax

---

## Arquitectura del Sitio

### Página Principal (/)

```
┌─────────────────────────────────────────────┐
│ HEADER (fijo, scroll suave)               │
├─────────────────────────────────────────────┤
│ HERO (100vh, partículas 3D)              │
├─────────────────────────────────────────────┤
│ BLOQUE IMPACTO (emocional)               │
├─────────────────────────────────────────────┤
│ FILOSOFÍA (storytelling de origen)        │
├─────────────────────────────────────┤
│ PRODUCTOS (3 cards con efecto 3D tilt)    │
├─────────────────────────────────────┤
│ CÓMO FUNCIONA (proceso visual)           │
├─────────────────────────────────────┤
│ ESCASEZ (urgencia, producción limitada)    │
├─────────────────────────────────────┤
│ TESTIMONIO (con foto y nombre)           │
├─────────────────────────────────────┤
│ POSICIONAMIENTO (diferenciador)         │
├─────────────────────────────────────┤
│ CTA FINAL (con botón WhatsApp)            │
├─────────────────────────────────────┤
│ FOOTER (minimalista, copyright)            │
└─────────────────────────────────────┘
```

### Página de Productos (/productos)

```
┌─────────────────────────────────────────────┐
│ HEADER (mismo diseño)                    │
├─────────────────────────────────────┤
│ HERO PRODS (título + intro)              │
├─────────────────────────────────────┤
│ FILTROS (básicos: categoría, precio)    │
├─────────────────────────────────────┤
│ GRID PRODUCTOS (todas las cajas)         │
│  [Caja Básica] [Caja Premium] [Caja Élite] │
├─────────────────────────────────────┤
│ INFO PRODUCCIÓN (escasez, tiempos)      │
├─────────────────────────────────────┤
│ CTA SECUNDARIO (WhatsApp)               │
├─────────────────────────────────────┤
│ FOOTER                                   │
└─────────────────────────────────────┘
```

### Página Sobre Nosotros (/sobre-nosotros)

```
┌─────────────────────────────────────────────┐
│ HEADER                                    │
├─────────────────────────────────────┤
│ HERO HISTORIA (título emocional)           │
├─────────────────────────────────────┤
│ NUESTRA HISTORIA (timeline de origen)       │
├─────────────────────────────────────┤
│ FILMO DE FINCA (video/image placeholder)     │
├─────────────────────────────────────┤
│ VALORES (3 iconos con texto)              │
├─────────────────────────────────────┤
│ PROCESO (4 pasos visuales)                 │
├─────────────────────────────────────┤
│ EQUIPO (fotos + nombres)                  │
├─────────────────────────────────────┤
│ FOOTER                                   │
└─────────────────────────────────────┘
```

### Página Contacto (/contacto)

```
┌─────────────────────────────────────────────┐
│ HEADER                                    │
├─────────────────────────────────────┤
│ HERO CONTACTO (título)                     │
├─────────────────────────────────────┤
│ FORMULARIO (nombre, email, mensaje)         │
├─────────────────────────────────────┤
│ INFO DIRECTA (WhatsApp, email, ubicación)    │
├─────────────────────────────────────┤
│ MAPA (placeholder Google Maps)              │
├─────────────────────────────────────┤
│ FOOTER                                   │
└─────────────────────────────────────┘
```

---

## Estrategia de Contenido

### Homepage Headlines (3 Opciones)

**Opción 1 (Emocional):**
> "Aurum Natura — El oro de la tierra"
> "Producción limitada. Directo de origen. Solo para quienes entienden el valor real de lo que comen."

**Opción 2 (Impacto):**
> "No es comida de supermercado."
> "Es lo que comerías si tuvieras tu propia finca."

**Opción 3 (Exclusividad):**
> "Esto no es para todos."
> "Solo para quienes eligen comer del origen real."

**Recomendación:** Opción 1 para homepage principal.

### Value Proposition Structure

**Fórmula usada por top 10%:**
1. **Hook emocional** → 2-3 palabras de impacto
2. **Problema** → "La comida industrial perdió su alma"
3. **Solución** → "Recuperamos el origen"
4. **Prueba** → "Primera caja, notarás la diferencia"
5. **Urgencia** → "Solo 15 cajas disponibles esta semana"

### Sección por Sección — Copy Direction

**HERO:**
- Título grande (H1): "Aurum Natura — El oro de la tierra"
- Subtítulo (H2): "Producción limitada. Directo de origen. Solo para quienes entienden el valor real de lo que comen."
- CTA: "Acceder a la Caja Aurum" (botón dorado)
- Fondo: Imagen/video de finca o partículas 3D

**BLOQUE IMPACTO:**
- Headline: "No todo el mundo debería comer así."
- Body: 2-3 párrafos sobre el cambio de perspectiva al comer de origen
- Key phrase: "Cuando entiendes lo que estás poniendo en tu cuerpo, ya no puedes volver atrás."

**FILOSOFÍA:**
- Headline: "Aurum Natura nace de una idea simple: Volver a lo real."
- Key points: Sin químicos, sin prisas, sin producción infinita
- Cierre: "Solo lo que la tierra da, cuando está lista. Y por eso, no es para todos."

**PRODUCTOS:**
- 3 cards con pricing claro
- Cada card con: nombre, contenido, precio, CTA
- Destacar "Edición Fundadores" como especial

**CÓMO FUNCIONA:**
- 3 pasos visuales: Acceder → Preparación → Envío
- Enfatizar: Sin almacenes, sin intermediarios, sin procesos artificiales

**ESCARCIDAD:**
- Headline: "La producción es limitada."
- Explicar honestamente: "No porque queramos vender más caro. Sino porque no se puede producir más sin perder lo esencial."
- Urgencia: "Cuando se acaban las cajas, se cierran los pedidos."

**TESTIMONIO:**
- Un testimonio poderoso con foto real
- Nombre completo (credibilidad)
- Texto emocional: "No es solo la calidad. Es la sensación de estar comiendo algo real otra vez."

**POSICIONAMIENTO:**
- Headline: "No competimos con supermercados."
- Sub: "Competimos con una sola cosa: lo real"

**CTA FINAL:**
- Headline: "Esto no es para todos."
- Sub: "Solo para quienes entienden el valor del origen."
- CTA: "Acceder a la Caja Aurum" (WhatsApp)

---

## Estrategia SEO

### Keywords Primarias (por página)

**Homepage:**
- Primary: "alimentos de finca premium"
- Secondary: "comida orgánica España", "caja productos ecológicos"
- LSI: "producción limitada alimentos", "directo de origen", "comida real"

**Productos:**
- Primary: "caja productos ecológicos España"
- Secondary: "huevo campero calidad", "verdura orgánica premium"
- LSI: "edición fundadores", "suscripción alimentos frescos"

**Sobre Nosotros:**
- Primary: "historia de finca España"
- Secondary: "producción orgánica sostenible", "granjas certificadas"
- LSI: "origen real alimentos", "procesos tradicionales", "comida artesanal"

**Contacto:**
- Primary: "pedidos alimentos orgánicos"
- Secondary: "whatsapp delivery comida", "directo de finca"

### Meta Tags por Página

**Homepage:**
```html
<title>Aurum Natura | El Oro de la Tierra — Alimentos de Finca Premium</title>
<meta name="description" content="Producción limitada. Directo de origen. Caja Aurum con huevos camperos, verdura de temporada y hierbas aromáticas. Solo para quienes entienden el valor real de lo que comen.">
<link rel="canonical" href="https://aumnatura.es/">
```

**Productos:**
```html
<title>Cajas Aurum | Alimentos Premium de Finca</title>
<meta name="description" content="Caja Aurum Básica (29€), Premium (49€) y Élite (79€). Huevos camperos, verdura ecológica, hierbas aromáticas. Producción limitada, envío semanal.">
<link rel="canonical" href="https://aumnatura.es/productos">
```

### Schema Markup

**Organization Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aurum Natura",
  "description": "Alimentos de finca premium. Producción limitada, directo de origen.",
  "url": "https://aumnatura.es",
  "logo": "https://aumnatura.es/img/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+34XXXXXXXXXX",
    "contactType": "customer service"
  }
}
```

**Product Schema (por cada caja):**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Caja Aurum — Edición Fundadores",
  "image": "https://aumnatura.es/img/productos/caja-fundadores.jpg",
  "description": "24 huevos camperos, verdura de temporada, hierbas aromáticas. Producción limitada.",
  "brand": {
    "@type": "Brand",
    "name": "Aurum Natura"
  },
  "offers": {
    "@type": "Offer",
    "price": "49.00",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

---

## Sistema de Productos

### Estructura de JSON (site/data/productos.json)

```json
{
  "productos": [
    {
      "id": "caja-basica",
      "nombre": "Caja Aurum — Básica",
      "precio": 29,
      "tagline": "Para empezar a comer real",
      "contenido": [
        "Huevos camperos",
        "Verdura de temporada",
        "Hierbas naturales"
      ],
      "imagen": "img/productos/caja-basica.jpg",
      "disponible": true,
      "stock": 10,
      "featured": false
    },
    {
      "id": "caja-premium",
      "nombre": "Caja Aurum — Premium",
      "precio": 49,
      "tagline": "Edición Fundadores",
      "contenido": [
        "24 huevos camperos",
        "Verdura seleccionada",
        "Hierbas aromáticas",
        "Selección especial de la finca",
        "Nota firmada"
      ],
      "imagen": "img/productos/caja-premium.jpg",
      "disponible": true,
      "stock": 5,
      "featured": true
    },
    {
      "id": "caja-elite",
      "nombre": "Caja Aurum — Élite",
      "precio": 79,
      "tagline": "Para los que entienden",
      "contenido": [
        "Todo lo de Premium",
        "Productos exclusivos (ediciones limitadas)",
        "Selección superior",
        "Detalles especiales"
      ],
      "imagen": "img/productos/caja-elite.jpg",
      "disponible": true,
      "stock": 2,
      "featured": false
    }
  ],
  "escasez": {
    "mensaje": "Solo [STOCK] cajas disponibles esta semana",
    "actualizado": "16/04/2026"
  }
}
```

### Cómo Añadir Producto Nuevo

1. Abrir `site/data/productos.json`
2. Copiar estructura de producto existente
3. Cambiar: id, nombre, precio, contenido, imagen, stock
4. Guardar archivo
5. Colocar imagen en `site/assets/img/productos/`
6. JavaScript generará card automáticamente

---

## Estrategia de Conversión

### Objetivos

**Primario:** WhatsApp leads (pedidos directos)
**Secundario:** Email leads (interés, lista de espera)

### Lead Capture

**Formulario WhatsApp:**
- Botón directo: `https://wa.me/34XXXXXXXXXX?text=Quiero%20acceder%20a%20la%20Caja%20Aurum`
- Formulario: nombre + email + mensaje
- Submit: abre WhatsApp con mensaje pre-escrito

**Social Proof Placement:**
- Testimonio con foto debajo de productos
- Número de clientes satisfechos: "Más de 50 familias ya disfrutan de Aurum Natura"
- Validación: "Primera caja, notarás la diferencia" (garantía)

### Trust Signals

**Elementos de Confianza:**
- ✅ Producción limitada (verdad, no marketing)
- ✅ Origen transparente (fotos de finca)
- ✅ Proceso natural (sin químicos)
- ✅ Nota firmada (conexión personal)
- ✅ Garantía de satisfacción

---

## Especificaciones Técnicas

### Stack Confirmado

- **HTML5 semántico** — SEO optimizado, accesible
- **CSS3 avanzado** — Variables, flexbox, grid, transforms
- **JavaScript mínimo** — Navegación móvil, load productos, scroll trigger
- **Three.js** — Partículas doradas en hero
- **Google Fonts** — Playfair Display + Inter
- **Sin frameworks** — HTML/CSS/JS puro para performance

### Performance Targets

- **Lighthouse:** 90+ en todos los métricos
- **Carga inicial:** < 1.5s (3G)
- **Tiempo interactivo:** < 2.5s
- **Shift de layout:** 0 (CLS score perfecto)
- **Imágenes:** Lazy load, formato WebP

### Responsive Breakpoints

```css
/* Móvil: < 640px */
@media (max-width: 639px) { }

/* Tablet: 640px - 1024px */
@media (min-width: 640px) and (max-width: 1023px) { }

/* Desktop: >= 1024px */
@media (min-width: 1024px) { }
```

### Accesibilidad

- **Contraste ratios:** WCAG AA (4.5:1 mínimo)
- **Keyboard nav:** Todos los elementos interactivos accesibles
- **Focus indicators:** Visibles en todos los estados
- **Alt text:** En todas las imágenes
- **Semantic HTML:** Proper heading hierarchy

---

## Checklist de Build

### Pre-Deployment

- [ ] Logo colocado en `site/assets/img/logo.png`
- [ ] Imágenes de productos en `site/assets/img/productos/`
- [ ] Imágenes de extras en `site/assets/img/extras/`
- [ ] Meta tags únicos por página
- [ ] Schema markup implementado
- [ ] Alt text en todas las imágenes
- [ ] Contraste de color validado
- [ ] Performance test (Lighthouse)
- [ ] Mobile test (Chrome DevTools)
- [ ] Cross-browser test (Chrome, Safari, Firefox)
- [ ] WhatsApp link verificado
- [ ] Favicon set
- [ ] OG images set

### Deployment

**Vercel (Recomendado):**
1. Push a GitHub repo
2. Conectar GitHub a Vercel
3. Deploy automático desde rama main

**Netlify (Alternativa):**
1. Drag & drop carpeta `site/` a Netlify
2. Configurar dominio custom
3. Deploy en < 1 minuto

---

## Placeholder Instructions

### Imágenes del Usuario

**Logo:**
```
Ubicación: site/assets/img/logo.png
Formato: PNG transparente, 400x400px mínimo
Nombre: logo.png
```

**Productos:**
```
Ubicación: site/assets/img/productos/
Nombres: caja-basica.jpg, caja-premium.jpg, caja-elite.jpg
Formato: JPG, 1200x800px mínimo
```

**Extras (hierbas, huevos, etc.):**
```
Ubicación: site/assets/img/extras/
Nombres: hierbas-aromaticas.jpg, huevos-camperos.jpg, verdura-temporada.jpg
Formato: JPG, 800x600px mínimo
```

**Hero Background:**
```
Ubicación: site/assets/img/hero-bg.jpg
Formato: JPG, 1920x1080px mínimo
Opcional: video MP4 para partículas 3D
```

---

## Animaciones 3D Específicas

### Hero — Partículas Doradas

**Tech:** Three.js
**Efecto:** Campo de partículas flotando, interactúa con mouse
**Duración:** Infinito (background loop)
**Performance:** < 30fps, optimizado con buffer geometry

### Product Cards — Tilt 3D

**Tech:** CSS 3D transforms
**Efecto:** Card rota sutilmente en dirección del mouse
**Trigger:** Hover en desktop, touch en móvil
**Smooth:** Easing ease-out, 0.3s duration

### Parallax Scroll

**Tech:** CSS + JS scroll listener
**Capas:** 3 capas (fondo, medio, primer plano)
**Velocidad:** 0.3x, 0.6x, 1.0x
**Smooth:** requestAnimationFrame

### Scroll Trigger Elements

**Tech:** Intersection Observer
**Efecto:** Fade-in + translateY cuando elemento entra en viewport
**Threshold:** 0.2 (20% visible)
**Delay:** Staggered por elemento (0.1s increments)

---

## Aprobación de Build

### Checkpoint de Decisión

**¿Este brief define completamente la dirección de Aurum Natura?**

- [x] Paleta de colores definida
- [x] Tipografía confirmada
- [x] Arquitectura de sitio clara
- [x] Estrategia SEO definida
- [x] Sistema de productos estructurado
- [x] Animaciones 3D especificadas
- [x] Efectos visuales planificados

**¿Estás listo para construir?**

Responde: **"Sí, construye Aurum Natura"** para proceder con el desarrollo completo.

---

**Fecha del Brief:** 16/04/2026
**Basado en:** Análisis competitivo + best practices de top 10%
**Método:** Research-driven + diseño premium 3D
