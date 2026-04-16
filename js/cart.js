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
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;

    drawer.addEventListener('click', (e) => {
      if (e.target.id === 'cart-drawer') {
        this.close();
      }
    });

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

    if (!itemsContainer || !subtotalEl || !shippingEl || !totalEl) return;

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
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;

    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;

    drawer.classList.remove('active');
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
