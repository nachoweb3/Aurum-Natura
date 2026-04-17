const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function createClassList() {
  const classes = new Set();
  return {
    add(name) {
      classes.add(name);
    },
    remove(name) {
      classes.delete(name);
    },
    contains(name) {
      return classes.has(name);
    }
  };
}

function createElement(overrides = {}) {
  return {
    style: {},
    classList: createClassList(),
    innerHTML: '',
    textContent: '',
    addEventListener() {},
    removeEventListener() {},
    appendChild() {},
    querySelectorAll() {
      return [];
    },
    scrollIntoView() {},
    ...overrides
  };
}

function createImage(src) {
  return createElement({ src });
}

function createContainer(imageSources) {
  const images = imageSources.map(createImage);
  return createElement({
    querySelectorAll(selector) {
      return selector === 'img' ? images : [];
    }
  });
}

function createContext() {
  const state = {
    lightboxInsertions: 0,
    drawerInsertions: 0
  };

  const elementsById = new Map();
  const containers = {
    '#gallery-a': createContainer(['a.png', 'b.png']),
    '#gallery-b': createContainer(['c.png'])
  };

  const body = createElement({
    insertAdjacentHTML(position, html) {
      if (html.includes('id="gallery-lightbox"')) {
        state.lightboxInsertions += 1;
        elementsById.set('gallery-lightbox', createElement({ id: 'gallery-lightbox' }));
        elementsById.set('lightbox-image', createElement({ id: 'lightbox-image' }));
      }

      if (html.includes('id="cart-drawer"')) {
        state.drawerInsertions += 1;
        elementsById.set('cart-drawer', createElement({ id: 'cart-drawer' }));
        elementsById.set('cart-items', createElement({ id: 'cart-items' }));
        elementsById.set('cart-subtotal', createElement({ id: 'cart-subtotal' }));
        elementsById.set('cart-shipping', createElement({ id: 'cart-shipping' }));
        elementsById.set('cart-total', createElement({ id: 'cart-total' }));
      }
    }
  });

  const document = {
    body,
    head: createElement(),
    createElement() {
      return createElement();
    },
    getElementById(id) {
      return elementsById.get(id) || null;
    },
    querySelector(selector) {
      return containers[selector] || null;
    },
    querySelectorAll(selector) {
      if (
        selector === '.gallery-filter' ||
        selector === '.gallery-farm-item' ||
        selector === '.testimonial-card' ||
        selector === '.scroll-animate'
      ) {
        return [];
      }

      return [];
    },
    addEventListener() {},
    removeEventListener() {}
  };

  const window = {
    document,
    addEventListener() {},
    removeEventListener() {},
    open() {},
    innerHeight: 900,
    pageYOffset: 0
  };
  window.window = window;

  const context = {
    window,
    document,
    console,
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
      removeItem() {}
    },
    IntersectionObserver: class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
    setTimeout(callback) {
      callback();
      return 1;
    },
    clearTimeout() {},
    setInterval() {
      return 1;
    },
    clearInterval() {},
    encodeURIComponent,
    decodeURIComponent
  };

  return { context, state };
}

function loadScript(relativePath, context) {
  const absolutePath = path.join(__dirname, '..', relativePath);
  const source = fs.readFileSync(absolutePath, 'utf8');
  vm.runInNewContext(source, context, { filename: absolutePath });
}

function testGalleryWiring() {
  const { context, state } = createContext();

  loadScript(path.join('js', 'gallery.js'), context);

  assert.equal(typeof context.window.initGallery, 'function');

  const galleryA = context.window.initGallery('product', '#gallery-a');
  const galleryB = context.window.initGallery('farm', '#gallery-b');

  assert.ok(galleryA);
  assert.ok(galleryB);
  assert.equal(context.window.gallery, galleryA);
  assert.equal(context.window.galleryInstances.product, galleryA);
  assert.equal(context.window.galleryInstances.farm, galleryB);
  assert.equal(state.lightboxInsertions, 1);
}

function testCartWiring() {
  const { context, state } = createContext();

  loadScript(path.join('js', 'cart.js'), context);

  assert.ok(context.window.cart);
  assert.equal(state.drawerInsertions, 1);
}

testGalleryWiring();
testCartWiring();
console.log('ui wiring ok');
