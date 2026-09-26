const products = [
  {
    id: 1,
    name: 'iPhone 13',
    category: 'Celulares',
    price: 1200000,
    featured: true,
    emoji: '📱',
    description: 'Pantalla Super Retina, cámara dual y rendimiento premium para uso diario.'
  },
  {
    id: 2,
    name: 'Honor X8a',
    category: 'Celulares',
    price: 600000,
    featured: true,
    emoji: '📱',
    description: 'Gran batería, rendimiento equilibrado y diseño elegante para cada ocasión.'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    category: 'Audífonos',
    price: 420000,
    featured: true,
    emoji: '🎧',
    description: 'Audio inmersivo y cancelación de ruido para tus momentos favoritos.'
  },
  {
    id: 4,
    name: 'Cargador USB-C',
    category: 'Cargadores',
    price: 90000,
    featured: false,
    emoji: '🔌',
    description: 'Carga rápida y segura con diseño compacto para llevar a cualquier lugar.'
  },
  {
    id: 5,
    name: 'Power Bank 20000mAh',
    category: 'Accesorios tecnológicos',
    price: 180000,
    featured: false,
    emoji: '🔋',
    description: 'Mantén tu teléfono listo con energía extra en cualquier momento.'
  },
  {
    id: 6,
    name: 'Funda Protectora',
    category: 'Fundas',
    price: 75000,
    featured: false,
    emoji: '🧤',
    description: 'Protección resistente con estilo minimalista para tu dispositivo.'
  },
  {
    id: 7,
    name: 'PlayStation 5 Digital',
    category: 'Consolas',
    price: 3250000,
    featured: false,
    emoji: '🎮',
    description: 'Experiencia de juego de última generación en casa o en movimiento.'
  },
  {
    id: 8,
    name: 'Smartwatch Urbano',
    category: 'Accesorios tecnológicos',
    price: 280000,
    featured: false,
    emoji: '⌚',
    description: 'Monitorea salud, notificaciones y actividades con estilo moderno.'
  }
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

const setCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('urbanCart') || '[]');
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cartCount').forEach((el) => {
    el.textContent = count;
  });
};

const getProductById = (id) => products.find((product) => product.id === Number(id));

const renderFeaturedProducts = () => {
  const featuredContainer = document.getElementById('featuredProducts');
  if (!featuredContainer) return;

  const featured = products.filter((product) => product.featured).slice(0, 4);
  featuredContainer.innerHTML = featured
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-visual">${product.emoji}</div>
          <div class="product-body">
            <div class="product-meta">
              <span class="badge">${product.category}</span>
              <span class="price">${formatCurrency(product.price)}</span>
            </div>
            <h3>${product.name}</h3>
            <div class="product-actions">
              <a href="producto.html?id=${product.id}" class="btn btn-secondary">Ver</a>
              <button class="btn btn-primary add-to-cart" data-id="${product.id}">Agregar</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.id));
    });
  });
};

const renderCatalog = () => {
  const catalog = document.getElementById('catalogProducts');
  if (!catalog) return;

  const filterButtons = document.querySelectorAll('.filter-btn');
  const renderFiltered = (selected = 'todos') => {
    const filteredProducts = selected === 'todos' ? products : products.filter((product) => product.category === selected);

    catalog.innerHTML = filteredProducts.length
      ? filteredProducts
          .map(
            (product) => `
              <article class="product-card">
                <div class="product-visual">${product.emoji}</div>
                <div class="product-body">
                  <div class="product-meta">
                    <span class="badge">${product.category}</span>
                    <span class="price">${formatCurrency(product.price)}</span>
                  </div>
                  <h3>${product.name}</h3>
                  <div class="product-actions">
                    <a href="producto.html?id=${product.id}" class="btn btn-secondary">Ver</a>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Agregar</button>
                  </div>
                </div>
              </article>
            `
          )
          .join('')
      : '<div class="empty-state">No hay productos en esta categoría.</div>';

    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', () => {
        addToCart(Number(button.dataset.id));
      });
    });
  };

  renderFiltered();

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      renderFiltered(button.dataset.filter);
    });
  });
};

const addToCart = (id) => {
  const cart = JSON.parse(localStorage.getItem('urbanCart') || '[]');
  const index = cart.findIndex((item) => item.id === id);

  if (index >= 0) {
    cart[index].quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  localStorage.setItem('urbanCart', JSON.stringify(cart));
  setCartCount();
  alert('Producto agregado al carrito');
};

const renderProductDetail = () => {
  const detailContainer = document.getElementById('productDetail');
  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get('id'));

  if (!product) {
    detailContainer.innerHTML = '<div class="empty-state">No se encontró el producto.</div>';
    return;
  }

  detailContainer.innerHTML = `
    <div class="product-detail-layout">
      <div class="product-detail-visual">${product.emoji}</div>
      <div class="product-detail-copy">
        <span class="badge">${product.category}</span>
        <h1>${product.name}</h1>
        <span class="price">${formatCurrency(product.price)}</span>
        <p>${product.description}</p>
        <div class="product-detail-actions">
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">Agregar al carrito</button>
          <a href="productos.html" class="btn btn-secondary">Seguir comprando</a>
        </div>
      </div>
    </div>
  `;

  detailContainer.querySelector('.add-to-cart').addEventListener('click', () => {
    addToCart(product.id);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setCartCount();
  renderFeaturedProducts();
  renderCatalog();
  renderProductDetail();
});
