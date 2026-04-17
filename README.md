# Aurum Natura

Storefront estatico para `Aurum Natura`, reconstruido como tienda online editorial con:

- catalogo medio de `cajas`, `frescos`, `botanica viva` y `arte/decoracion`
- carrito persistente en `localStorage`
- checkout completo que genera pedido estructurado a `WhatsApp`
- soporte multidioma `es`, `en`, `fr`
- arquitectura preparada para conectar pago online mas adelante

## Estructura

- `site/`
  Frontend estatico listo para publicar.
- `site/data/catalogo.json`
  Catalogo completo, categorias y configuracion de tienda.
- `site/js/store/`
  Logica modular de catalogo, carrito, checkout, runtime y paginas.
- `tests/`
  Tests de logica pura con `node --test`.
- `scripts/serve.js`
  Servidor local sin dependencias.

## Ejecutar en local

```bash
node scripts/serve.js
```

Luego abre:

```text
http://127.0.0.1:4173
```

## Verificar logica

```bash
node --test tests/catalog.test.mjs tests/cart.test.mjs tests/checkout.test.mjs
```

## Flujo comercial actual

1. El usuario navega por catalogo, fichas y carrito.
2. El checkout recoge datos reales y evalua restricciones por pais.
3. El boton final genera un pedido limpio hacia WhatsApp.
4. La capa de pedido queda lista para sustituir ese ultimo paso por pago online real.
