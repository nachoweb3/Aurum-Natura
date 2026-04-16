# Design Spec: Estilos Premium para Aurum Natura

**Fecha:** 2026-04-16
**Proyecto:** Aurum Natura - Tienda de Alimentos Premium
**Enfoque:** CSS Component-Based con Variables

## Resumen

Sistema de estilos CSS premium para componentes finales de la tienda Aurum Natura: galerías (productos, finca, testimonios), cart page minimalista (WhatsApp), bandas editoriales (informativas, destacadas, storytelling) y cards de soporte (FAQ, contacto, envíos).

## Arquitectura CSS Base

### Enfoque: Component-Based CSS con Variables

Organización en 3 niveles:

**Nivel 1 - Variables Temáticas** (en `:root`):
```css
--color-dorado: #d4af37;
--color-dorado-claro: #f4cf57;
--color-negro: #0a0a0a;
--color-negro-suave: #1a1a1a;

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
```

**Nivel 2 - Componentes Base** (reutilizables):
- `.gallery-grid` - Grid responsivo para todas las galerías
- `.editorial-band` - Bandas horizontales con overlays
- `.support-card` - Cards con efectos hover premium

**Nivel 3 - Componentes Específicos**:
- Galerías: `.gallery-product`, `.gallery-farm`, `.gallery-testimonials`
- Cart: `.cart-minimal`, `.cart-item`, `.cart-summary`
- Editorial: `.editorial-info`, `.editorial-story`, `.editorial-featured`
- Soporte: `.support-faq`, `.support-contact`, `.support-shipping`

**Estructura de archivos:**
```
css/
├── style.css (existente - mantiene base)
└── components.css (nuevo - componentes premium)
```

## Galerías Premium

### Galería de Productos (lightbox + zoom)

**Layout:**
- Grid responsivo: 3 col desktop, 2 tablet, 1 móvil
- Imagen principal grande con zoom al hover (scale 1.15)
- Thumbnails abajo con indicator de imagen activa
- Lightbox overlay con navegación (flechas + teclado)
- Animación suave con `cubic-bezier(0.175, 0.885, 0.32, 1.275)`

**Interactividad:**
- Click en imagen → abre lightbox
- Flechas izquierda/derecha → navegación entre imágenes
- Teclado ← → → navegación
- ESC → cierra lightbox
- Click fuera de imagen → cierra lightbox

**Animaciones:**
- Entrada: fadeInUp con stagger (0.1s delay entre imágenes)
- Hover: scale 1.15 + shadow dorado (0.4s ease)
- Lightbox: fade-in 0.3s + slide-up 0.4s

### Galería de Finca (masonry + parallax)

**Layout:**
- Masonry grid con imágenes de diferentes alturas
- Efecto parallax sutil en scroll
- Hover: overlay con texto descriptivo
- Load lazy con placeholder dorado
- Filtros por categoría (Huerto, Gallinas, Procesos)

**Interactividad:**
- Filtros: animación fade-out/fade-in de imágenes
- Parallax: scroll afecta posición de imágenes
- Hover: overlay descriptivo aparece desde abajo

### Galería de Testimonios (cards con fotos)

**Layout:**
- Grid 3 columnas desktop, 2 tablet, 1 móvil
- Card circular para avatar con border dorado
- Nombre + rol + texto en cursiva premium
- Hover: elevation + glow dorado
- Estrellas de valoración con color dorado

**Características:**
- Avatar: 80x80px con border dorado 2px
- Nombre: Inter 600, 16px, blanco
- Rol: Inter 400, 14px, gris-texto
- Testimonio: Inter italic, 18px, blanco, line-height 1.8

### Características Comunes de Galerías

**Responsive:**
- Desktop (>1200px): 3 columnas
- Tablet (768px-1200px): 2 columnas
- Móvil (<768px): 1 columna

**Performance:**
- Loading skeletons antes de cargar imágenes
- Lazy loading para imágenes fuera de viewport
- Preload de primeras 3 imágenes

**Accesibilidad:**
- ARIA labels en botones de navegación
- Focus states claros
- Keyboard navigation completa
- Alt text en todas las imágenes

## Cart Page Minimalista

### Diseño del Carrito

**Modal lateral deslizante (drawer):**
- Fondo oscuro semi-transparente (backdrop-filter blur)
- Contenedor con borde dorado sutil
- Ancho: 400px desktop, 100% móvil
- Altura: 100vh
- Animación slide-in 0.3s ease-out desde derecha
- Scroll independiente dentro del drawer

**Items del Carrito:**
- Miniatura producto (80x80px) + nombre + precio
- Botón + / - para cantidad (estilo minimalista)
- Botón eliminar (icono X con hover dorado)
- Subtotal calculado dinámicamente
- Animación remove: fadeOut + slideLeft 0.3s

**Estilos de Items:**
- Border-bottom: 1px solid rgba(212, 175, 55, 0.1)
- Padding: 16px
- Background: transparent
- Hover: background rgba(212, 175, 55, 0.05)

### Resumen del Carrito

**Layout:**
- Líneas separadas: Subtotal, Envío, Total
- Envío: "Calculado al checkout" (texto pequeño gris)
- Total destacado en dorado grande (48px)
- Margen superior: 32px
- Border-top: 1px solid rgba(212, 175, 55, 0.2)

**Cálculos:**
- Subtotal: suma de (precio × cantidad)
- Envío: 0€ si subtotal ≥ 50€, 5€ si < 50€
- Total: subtotal + envío

### Botón WhatsApp Premium

**Diseño:**
- Gradiente dorado con icono WhatsApp
- Padding: 20px 40px
- Border-radius: 12px
- Font-size: 16px, font-weight: 700
- Text-transform: uppercase, letter-spacing 1px

**Interactividad:**
- Hover: translateY(-2px) + shadow dorado (0.3s ease)
- Ripple effect al click
- Abre WhatsApp con mensaje pre-formateado

**Formato del mensaje:**
```
Hola, quiero comprar:
✅ Caja Aurum Premium (x1) - 49€
✅ Caja Aurum Élite (x2) - 158€

Total: 207€ + envío

¿Está disponible esta semana?
```

### Empty State

**Diseño:**
- Icono de cesta vacía (emoji grande, 64px)
- Texto: "Tu cesta está vacía" (24px, blanco)
- Botón: "Ver Productos" (link suave scroll a #productos)
- Padding: 60px 20px
- Text-align: center

## Bandas Editoriales

### Bandas Informativas

**Layout:**
- Full-width con container centralizado (max-width 1200px)
- Background: negro o negro-suave alternado
- Padding: 80px 0
- Título centrado con tipografía Playfair Display
- Contenido en grid de 3-4 cards informativas

**Cards Informativas:**
- Iconos grandes (48px)
- Título: Inter 600, 20px, blanco
- Descripción: Inter 400, 14px, gris-texto
- Padding: 32px
- Border-radius: 16px
- Border: 1px solid rgba(212, 175, 55, 0.15)
- Hover: elevation + border dorado (0.3s ease)

**Animaciones:**
- Entrada escalonada (stagger) con delay 0.1s
- Hover: translateY(-5px) + shadow dorado

**Ejemplo: "Información de Producción"**
- 📅 Corte de Pedidos
- 🚚 Entrega Semanal
- 🔄 Contenido Variable
- 📦 Empaque Premium

### Bandas Destacadas

**Layout:**
- Full-width con imagen de fondo + overlay editorial
- Min-height: 400px desktop, 300px móvil
- Imagen parallax sutil en scroll
- Overlay: `linear-gradient(90deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.9) 100%)`
- Texto alineado izquierda o derecha alternado

**Tipografía:**
- Título: Playfair Display 700, 48px+, blanco, line-height 1.2
- Subtítulo: Inter 500, 20px, dorado
- Texto: Inter 400, 16px, blanco, line-height 1.6

**Interactividad:**
- Hover: imagen scale 1.05 (0.5s ease)
- Scroll animation: texto fade-in desde lateral
- CTA: botón con hover translateY(-2px)

**Ejemplo: "No todo el mundo debería comer así."**

### Bandas Storytelling

**Layout:**
- Alternado texto-imagen-imagen-texto
- Imagen grande (50% width) + texto editorial (50%)
- Padding vertical: 120px
- Border dorado sutil entre secciones
- Parallax en imágenes de fondo

**Tipografía:**
- Cita destacada: Playfair Display 700, 32px+, dorado, line-height 1.4
- Texto editorial: Inter 400, 16px, blanco, line-height 1.8
- Subtítulo: Inter 600, 18px, blanco

**Animaciones:**
- Parallax: scroll afecta imágenes (0.1 factor)
- Texto: fade-in desde lateral (0.5s ease)
- Hover: imagen scale 1.03

**Ejemplo: "Impacto"**
> "Porque cuando entiendes lo que estás poniendo en tu cuerpo, ya no puedes volver atrás."

### Características Comunes

**Padding generoso:**
- Desktop: 120px 0
- Tablet: 80px 0
- Móvil: 60px 0

**Transiciones:**
- Todas: 0.5s ease
- Cubic-bezier: (0.175, 0.885, 0.32, 1.275)

**Scroll animations:**
- IntersectionObserver con threshold 0.2
- FadeIn desde lateral o desde abajo
- Stagger delays: 0.1s, 0.2s, 0.3s

**Responsivas:**
- Desktop (>768px): 50/50 o full-width según tipo
- Móvil (<768px): full-width, texto arriba, imagen abajo

**Tipografía jerarquizada:**
- H1/H2: Playfair Display (serif premium)
- H3/H4: Inter 600 (sans-serif semibold)
- Body: Inter 400 (sans-serif regular)

## Cards de Soporte

### Cards de FAQ (accordion)

**Layout:**
- Grid 2 columnas desktop, 1 móvil
- Card con pregunta en bold + icono +/-
- Expande solo uno a la vez (accordion behavior)

**Estilos:**
- Pregunta: Inter 600, 16px, blanco
- Respuesta: Inter 400, 14px, gris-texto, line-height 1.6
- Icono: dorado, 24px, animación rotate 180° al expandir
- Border-bottom: 1px solid rgba(212, 175, 55, 0.1)
- Background: negro-suave
- Padding: 20px

**Interactividad:**
- Click: expande respuesta con animación height
- Solo un FAQ expandido a la vez
- Animación: smooth 0.3s ease
- Hover: elevation + border dorado

**Estado expandido:**
- Respuesta visible con padding-top
- Icono rotado 180°
- Border dorado

### Cards de Contacto

**Layout:**
- Grid 3 columnas desktop, 2 tablet, 1 móvil
- Icono grande centralizado
- Título + subtítulo
- Botón CTA: "Contactar" con icono

**Estilos:**
- Icono: 48px, dorado
- Título: Inter 600, 18px, blanco
- Subtítulo: Inter 400, 14px, gris-texto
- Botón: gradiente dorado, padding 12px 24px
- Border-radius: 16px
- Border: 1px solid rgba(212, 175, 55, 0.15)
- Padding: 40px 32px

**Interactividad:**
- Hover: scale 1.05 + glow dorado (0.3s ease)
- Click: abre WhatsApp, mailto, o tel:

**Ejemplos:**
- WhatsApp: +34 640 943 669
- Email: hola@aurumnatura.es
- Teléfono: +34 640 943 669

### Cards de Envíos

**Layout:**
- Grid 2-3 columnas desktop, 1 móvil
- Icono + título + descripción estructurada

**Estilos:**
- Icono: 40px, dorado
- Título: Inter 600, 16px, blanco
- Información: Inter 400, 14px, gris-texto
- Badge: "Entrega Garantizada" (premium)
- Border-radius: 16px
- Border: 1px solid rgba(212, 175, 55, 0.15)
- Padding: 32px 24px

**Información:**
- ⏱️ Tiempo: 24-48h España peninsular
- 🚚 Zonas: Madrid, Barcelona, Valencia...
- 💰 Coste: Gratis +50€, 5€ inferior

**Interactividad:**
- Hover: border dorado + shadow (0.3s ease)
- Badge premium: glow dorado

### Características Comunes

**Dimensiones:**
- Border-radius: 16px
- Padding: 32px 24px
- Gap: 16px

**Bordes y shadows:**
- Border: 1px solid rgba(212, 175, 55, 0.15)
- Background: gradiente sutil negro → negro-suave
- Box-shadow: 0 4px 20px rgba(0,0,0,0.3)
- Box-shadow hover: 0 8px 30px rgba(212, 175, 55, 0.3)

**Transiciones:**
- Duración: 0.3s
- Easing: cubic-bezier(0.175, 0.885, 0.32, 1.275)
- Propiedades: transform, box-shadow, border-color

**Responsive:**
- Desktop (>768px): 2-3 columnas
- Tablet (480px-768px): 2 columnas
- Móvil (<480px): 1 columna

## Testing y Validación

### Responsividad
- Test en breakpoints: 1200px, 768px, 480px
- Verificar layout en móvil, tablet, desktop
- Probar orientación landscape/portrait

### Accesibilidad
- Verificar ARIA labels
- Test keyboard navigation
- Validar contrast ratios (WCAG AA)
- Test screen readers

### Performance
- Verificar lazy loading de imágenes
- Test animaciones en dispositivos lentos
- Validar rendimiento con Lighthouse

### Browser Compatibility
- Chrome, Firefox, Safari, Edge
- iOS Safari, Chrome Android
- Fallbacks para browsers antiguos

## Implementación

**Próximos pasos:**
1. Crear archivo `css/components.css`
2. Implementar variables CSS base
3. Desarrollar componentes uno por uno (galerías → cart → bandas → soporte)
4. Integrar con páginas existentes
5. Test cross-browser y responsivo
6. Optimizar performance

**Archivos a modificar:**
- `css/components.css` (nuevo)
- `site/productos.html` (integrar galería productos)
- `site/sobre-nosotros.html` (integrar galería finca + testimonios)
- `site/contacto.html` (integrar cards soporte)
- `site/js/cart.js` (nuevo, lógica carrito minimalista)

**Archivos a crear:**
- `css/components.css`
- `site/js/cart.js`
