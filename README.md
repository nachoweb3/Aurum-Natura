# 🜂 Aurum Natura — README de Deploy

## 🚀 Guía Rápida de Despliegue

### 📋 Requisitos Previos

Antes de desplegar, asegúrate de tener:

- [x] Logo en `site/assets/img/logo.png` (400x400px mínimo, PNG transparente)
- [x] Imágenes de productos en `site/assets/img/productos/`:
  - `caja-basica.jpg` (1200x800px mínimo)
  - `caja-premium.jpg` (1200x800px mínimo)
  - `caja-elite.jpg` (1200x800px mínimo)
- [x] Imágenes de extras en `site/assets/img/extras/` (opcionales):
  - `hierbas-aromaticas.jpg` (800x600px)
  - `huevos-camperos.jpg` (800x600px)
  - `verdura-temporada.jpg` (800x600px)
- [x] Opcional: Video de finca para hero background (MP4, 1920x1080px)
- [x] Actualizar número de WhatsApp en `site/data/productos.json`
- [x] Actualizar número de WhatsApp en todas las páginas HTML

---

## 🔧 Configuración de WhatsApp

### Paso 1: Actualizar productos.json

Abre `site/data/productos.json` y busca esta sección:

```json
"whatsapp": {
  "numero": "+34XXXXXXXXXX",
  "mensaje": "Hola, quiero acceder a la Caja Aurum..."
}
```

**Cambia `+34XXXXXXXXXX` por tu número real de WhatsApp.**

### Paso 2: Actualizar HTMLs

Busca y reemplaza en todos los archivos HTML:
- `site/index.html`
- `site/productos.html`
- `site/contacto.html`

Reemplaza: `+34XXXXXXXXXX`
Por: `+34[TU_NUMERO_REAL]`

**Total a reemplazar: ~4 ocurrencias**

---

## 🌐 Opciones de Deploy

### Opción A: Vercel (RECOMENDADO)

**Ventajas:**
- Deploy automático desde GitHub
- HTTPS gratis
- Custom domain fácil
- Performance optimizada
- CI/CD automático

**Pasos:**

1. **Crear repositorio en GitHub**
   ```bash
   cd "C:\Users\Usuario\Desktop\Aurum Natura"
   git init
   git add .
   git commit -m "Inicial: Aurum Natura web completa"
   # Crear repo en GitHub y conectar
   git remote add origin https://github.com/[TU-USUARIO]/aurum-natura.git
   git push -u origin main
   ```

2. **Conectar a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Log in con GitHub
   - Importa el repo `aurum-natura`
   - Click "Deploy"
   - ¡Listo! 🎉

3. **Configurar dominio (opcional)**
   - En Vercel dashboard → Settings → Domains
   - Añade tu dominio: `aumnatura.es`
   - Sigue las instrucciones DNS de tu proveedor

**Tiempo estimado:** 5-10 minutos

---

### Opción B: Netlify

**Ventajas:**
- Drag & drop simple
- HTTPS gratis
- Custom domain fácil
- Forms funcionales out-of-the-box

**Pasos:**

1. **Preparar carpeta**
   ```bash
   # Crear carpeta limpia para deploy
   mkdir deploy-aumnatura
   cp -r site/* deploy-aumnatura/
   ```

2. **Drag & Drop**
   - Ve a [netlify.com](https://netlify.com)
   - Log in / Sign up
   - Arrastra carpeta `deploy-aumnatura/` al área de deploy
   - ¡Listo! 🎉

3. **Configurar dominio (opcional)**
   - En Netlify dashboard → Site settings → Change site name
   - Añade custom domain: `aumnatura.es`
   - Sigue instrucciones DNS

**Tiempo estimado:** 2-5 minutos

---

### Opción C: GitHub Pages (GRATIS)

**Ventajas:**
- 100% gratis
- GitHub integration nativa
- HTTPS automático

**Pasos:**

1. **Hacer repo público**
   ```bash
   # En GitHub repo settings
   - Settings → Features → GitHub Pages
   - Source: main branch
   - Save
   ```

2. **Esperar deploy**
   - GitHub hace deploy automático en 1-2 minutos
   - URL: `https://[TU-USUARIO].github.io/aurum-natura`

**Tiempo estimado:** 5 minutos

---

## ✅ Verificación Post-Deploy

Después del deploy, verifica:

### 1. Funcionalidad
- [ ] Homepage carga correctamente
- [ ] Menú de navegación funciona
- [ ] Páginas internas cargan (productos, sobre-nosotros, contacto)
- [ ] WhatsApp button abre app correcta
- [ ] Formulario contacto redirige a WhatsApp
- [ ] Product cards se renderizan desde JSON
- [ ] Animaciones de scroll funcionan

### 2. Responsive
- [ ] Móvil (< 640px): layout correcto, menú móvil funciona
- [ ] Tablet (640px - 1024px): grid products correcto
- [ ] Desktop (>= 1024px): todas las animaciones activas

### 3. SEO
- [ ] Meta tags presentes en todas las páginas
- [ ] Schema markup valida (ver en Google Rich Results Test)
- [ ] Imágenes tienen alt text
- [ ] Headings hierarchy correcta (H1 único por página)

### 4. Performance
- [ ] Lighthouse score 90+ (test en Chrome DevTools)
- [ ] Tiempo de carga < 3s (3G)
- [ ] No hay errores en console

---

## 🐛 Solución de Problemas Comunes

### Problema: Productos no cargan

**Causa:** JSON no se encuentra
**Solución:**
```bash
# Verificar que data/productos.json existe
ls site/data/

# Verificar que la ruta en fetch es correcta
# En HTML: fetch('data/productos.json')
```

### Problema: Animaciones 3D no funcionan

**Causa:** Three.js no carga correctamente
**Solución:** El código tiene fallback automático a Canvas 2D. Si quieres Three.js:
- Verifica console para errores
- Asegúrate de estar online (Three.js carga desde CDN)
- Fallback se activa automáticamente si Three.js falla

### Problema: WhatsApp número incorrecto

**Causa:** No se actualizaron todos los archivos
**Solución:**
```bash
# Buscar en todos los archivos HTML
cd site
grep -r "34XXXXXXXXXX" *.html

# Reemplazar en tu editor o usando find/replace
```

### Problema: Imágenes no cargan

**Causa:** Rutas incorrectas o archivos no existen
**Solución:**
```bash
# Verificar estructura de archivos
ls site/assets/img/
ls site/assets/img/productos/

# Rutas en HTML deben ser:
img/productos/caja-premium.jpg
# NO:
assets/img/productos/caja-premium.jpg
```

---

## 📊 Monitorización

### Google Analytics (Opcional)

1. Crea cuenta en [analytics.google.com](https://analytics.google.com)
2. Crea nuevo Property (Web)
3. Copia tracking ID (ej: `G-XXXXXXXXXX`)
4. Añade en todas las páginas antes de `</body>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Console Errors

Monitorea errores en producción:
```javascript
// En browser console (F12)
// Busca:
- Error cargando productos
- Error Three.js
- Error animaciones
```

---

## 🎨 Personalización Visual

### Cambiar Colores

Edita `site/css/style.css`:

```css
:root {
  /* Cambia estos valores */
  --color-dorado: #d4af37;
  --color-dorado-claro: #f4cf57;
  --color-negro: #0a0a0a;
}
```

### Cambiar Tipografía

Edita en HTMLs (cambio global):

```html
<!-- Reemplaza Playfair Display por otra fuente -->
<link href="https://fonts.googleapis.com/css2?family=Tu+Fuente:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Luego actualiza en CSS:
```css
:root {
  --font-heading: 'Tu Fuente', serif;
}
```

### Añadir Nuevo Producto

1. Genera imagen de nuevo producto (usa `prompts-imagenes.html`)
2. Guarda imagen en `site/assets/img/productos/nuevo-producto.jpg`
3. Edita `site/data/productos.json`:
```json
{
  "id": "caja-especial",
  "nombre": "Caja Aurum — Especial",
  "precio": 99,
  "tagline": "Edición Limitada",
  "contenido": ["Contenido 1", "Contenido 2", "..."],
  "imagen": "img/productos/nuevo-producto.jpg",
  "disponible": true,
  "stock": 3,
  "featured": false
}
```

4. Guarda JSON — el producto aparece automáticamente en la web

---

## 🔒 Seguridad

### HTTPS

Todos los métodos (Vercel, Netlify, GitHub Pages) proveen HTTPS gratis automáticamente.
- No necesitas configuración SSL manual
- Certificados se renuevan automáticamente

### Datos de Contacto

El formulario de contacto NO guarda datos — redirige a WhatsApp.
- Tus datos de contacto están solo en `site/data/productos.json`
- No hay backend expuesto
- Sin base de datos vulnerable

### Form Validation

Los formularios tienen validación HTML5:
- `required` en campos obligatorios
- `type="email"` para validación de email
- Mensaje pre-escrito en WhatsApp para evitar inputs vacíos

---

## 📞 Soporte

Si encuentras problemas:

1. **Revisa Console del browser** (F12 → Console)
2. **Verifica estructura de archivos** con `ls site/`
3. **Testea localmente** (doble-click en `index.html` para abrir en browser)
4. **Consultar README** de este archivo

---

## 🎉 ¡Listo para Lanzar!

Una vez completado el checklist:

- [x] Logo colocado
- [x] Imágenes de productos colocadas
- [x] WhatsApp actualizado en todos los archivos
- [x] Deploy hecho (Vercel/Netlify/GitHub Pages)
- [x] Verificación post-deploy completada
- [x] Monitorización configurada

**Tu web Aurum Natura está EN VIVO!** 🚀

---

**Última actualización:** 16/04/2026
**Versión:** 1.0.0
**Método:** Research-driven + diseño premium 3D
