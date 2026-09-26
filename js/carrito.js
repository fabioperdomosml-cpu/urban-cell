document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('urbanCart') || '[]');
  const cartItemsContainer = document.getElementById('cartItems');
  const subtotalPrice = document.getElementById('subtotalPrice');
  const totalPrice = document.getElementById('totalPrice');

  const products = [
    { id: 1, name: 'iPhone 13', category: 'Celulares', price: 1200000, emoji: '📱' },
    { id: 2, name: 'Honor X8a', category: 'Celulares', price: 600000, emoji: '📱' },
    { id: 3, name: 'AirPods Pro', category: 'Audífonos', price: 420000, emoji: '🎧' },
    { id: 4, name: 'Cargador USB-C', category: 'Cargadores', price: 90000, emoji: '🔌' },
    { id: 5, name: 'Power Bank 20000mAh', category: 'Accesorios tecnológicos', price: 180000, emoji: '🔋' },
    { id: 6, name: 'Funda Protectora', category: 'Fundas', price: 75000, emoji: '🧤' },
    { id: 7, name: 'PlayStation 5 Digital', category: 'Consolas', price: 3250000, emoji: '🎮' },
    { id: 8, name: 'Smartwatch Urbano', category: 'Accesorios tecnológicos', price: 280000, emoji: '⌚' }
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);

  const updateCartSummary = () => {
    const itemList = cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.id);
        return product ? { ...product, quantity: item.quantity } : null;
      })
      .filter(Boolean);

    const subtotal = itemList.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!cartItemsContainer) return;

    if (!itemList.length) {
      cartItemsContainer.innerHTML = '<div class="empty-state">Tu carrito está vacío. <a href="productos.html" class="text-link">Explora productos</a></div>';
      subtotalPrice.textContent = formatCurrency(0);
      totalPrice.textContent = formatCurrency(0);
      return;
    }

    cartItemsContainer.innerHTML = itemList
      .map(
        (item) => `
          <div class="cart-item">
            <div class="cart-item-visual">${item.emoji}</div>
            <div>
              <h3>${item.name}</h3>
              <p>${item.category}</p>
              <div class="item-controls">
                <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
              </div>
            </div>
            <div class="item-price">${formatCurrency(item.price * item.quantity)}</div>
          </div>
        `
      )
      .join('');

    subtotalPrice.textContent = formatCurrency(subtotal);
    totalPrice.textContent = formatCurrency(subtotal);

    document.querySelectorAll('.qty-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const id = Number(button.dataset.id);
        const action = button.dataset.action;
        changeQuantity(id, action === 'increase' ? 1 : -1);
      });
    });
  };

  const changeQuantity = (id, delta) => {
    const next = cart
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
      .filter((item) => item.quantity > 0);

    localStorage.setItem('urbanCart', JSON.stringify(next));
    location.reload();
  };

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Pedido realizado con éxito. ¡Gracias por comprar en Urban Cel!');
      localStorage.removeItem('urbanCart');
      location.reload();
    });
  }

  updateCartSummary();
  document.querySelectorAll('#cartCount').forEach((el) => {
    el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  });
});
