import { renderCatalogPage } from './store/pages/catalogo.mjs';
import { renderCartPage } from './store/pages/carrito.mjs';
import { renderCheckoutPage } from './store/pages/checkout.mjs';
import { renderHomePage } from './store/pages/home.mjs';
import { renderInfoPage } from './store/pages/info.mjs';
import { renderProductPage } from './store/pages/producto.mjs';
import { bootStorefront } from './store/runtime.mjs';

const page = document.body.dataset.page;

const pages = {
  home: renderHomePage,
  catalog: renderCatalogPage,
  cart: renderCartPage,
  product: renderProductPage,
  checkout: renderCheckoutPage,
  about: renderInfoPage,
  help: renderInfoPage,
  contact: renderInfoPage
};

if (pages[page]) {
  bootStorefront(page, pages[page]).catch((error) => {
    console.error('Aurum Natura bootstrap failed', error);
    const root = document.getElementById('page-root');

    if (root) {
      root.innerHTML = `
        <section class="page-hero page-hero--compact">
          <h1>No hemos podido cargar la web correctamente.</h1>
          <p>Abre la consola del navegador para revisar el error de ejecucion.</p>
        </section>
      `;
    }
  });
}
