const productos = [
  {
    id: 1,
    nombre: 'Samsung A05s',
    categoria: 'Celulares',
    descripcion: 'Pantalla amplia, batería duradera y un rendimiento ideal para uso diario.',
    precio: 370000,
    imagen: 'img/productos/samsung a05s.jpg'
  },
  {
    id: 2,
    nombre: 'Samsung A30',
    categoria: 'Celulares',
    descripcion: 'Diseño elegante, cámara doble y excelente autonomía para tu día a día.',
    precio: 420000,
    imagen: 'img/productos/samsung a30.jpg'
  },
  {
    id: 3,
    nombre: 'Oppo A20',
    categoria: 'Celulares',
    descripcion: 'Muy buen equilibrio entre calidad, batería y rendimiento para tareas diarias.',
    precio: 390000,
    imagen: 'img/productos/Oppo a20.jpg'
  },
  {
    id: 4,
    nombre: 'Honor X8A',
    categoria: 'Celulares',
    descripcion: 'Cámara potente, pantalla nítida y un diseño moderno para compartir todo.',
    precio: 510000,
    imagen: 'img/productos/honor x8a.jpg'
  },
  {
    id: 5,
    nombre: 'iPhone 13',
    categoria: 'Celulares',
    descripcion: 'Potencia premium, cámara avanzada y experiencia iOS con gran calidad visual.',
    precio: 1200000,
    imagen: 'img/productos/Iphone 13.jpg'
  },
  {
    id: 6,
    nombre: 'Xbox Series S ',
    categoria: 'Consolas',
    descripcion: 'Pantalla amplia, batería duradera y un rendimiento ideal para uso diario.',
    precio: 2700000,
    imagen: 'img/productos/xbox series s.jpg'
  },
];

const renderProducts = (filter = 'todos') => {
  const container = document.getElementById('catalogProducts');
  const featuredContainer = document.getElementById('featuredProducts');
  const accessoryContainer = document.getElementById('accessoryProducts');

  const filtered = filter === 'todos' ? productos : productos.filter(producto => producto.categoria === filter);

  const createCard = (producto) => `
    <article class="product-card">
      <a href="producto.html?id=${producto.id}" class="product-image" aria-label="Ver detalles de ${producto.nombre}">
        <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='img/banner/store-banner.svg'" />
      </a>
      <div class="product-body">
        <span class="product-tag">${producto.categoria}</span>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <div class="product-price-row">
          <span class="price">$${producto.precio}</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-primary" data-add="${producto.id}">Agregar al carrito</button>
          <a class="btn btn-secondary" href="producto.html?id=${producto.id}">Ver detalles</a>
        </div>
      </div>
    </article>
  `;

  if (container) container.innerHTML = filtered.map(createCard).join('');
  if (featuredContainer) featuredContainer.innerHTML = productos.slice(0, 4).map(createCard).join('');

  if (accessoryContainer) {
    const accesorios = productos.filter(producto => ['Audífonos', 'Cargadores', 'Cables', 'Fundas', 'Accesorios tecnológicos'].includes(producto.categoria));
    accessoryContainer.innerHTML = accesorios.map(createCard).join('');
  }

  document.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.add)));
  });
};

const addToCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem('urbanCelCart') || '[]');
  const existing = cart.find(item => item.id === productId);

  if (existing) existing.quantity += 1;
  else cart.push({ id: productId, quantity: 1 });

  localStorage.setItem('urbanCelCart', JSON.stringify(cart));
  updateCartCounter();
  alert('Producto agregado al carrito');
};

const updateCartCounter = () => {
  const cart = JSON.parse(localStorage.getItem('urbanCelCart') || '[]');
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cartCount').forEach(counter => counter.textContent = total);
};

const renderProductDetail = () => {
  const detailContainer = document.getElementById('productDetail');
  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get('id'));
  const product = productos.find(item => item.id === productId);

  if (!product) {
    detailContainer.innerHTML = `
      <div class="empty-state">
        <h3>Producto no encontrado</h3>
        <p>El artículo solicitado no existe o fue eliminado.</p>
        <a href="productos.html" class="btn btn-primary">Volver al catálogo</a>
      </div>
    `;
    return;
  }

  detailContainer.innerHTML = `
    <div class="product-detail-card">
      <div class="product-detail-image">
        <img src="${product.imagen}" alt="${product.nombre}" onerror="this.src='img/banner/store-banner.svg'" />
      </div>
      <div class="product-detail-info">
        <span class="product-tag">${product.categoria}</span>
        <h1>${product.nombre}</h1>
        <p class="product-price-detail">$${product.precio}</p>
        <p>${product.descripcion}</p>
        <div class="product-actions detail-actions">
          <button class="btn btn-primary" data-add="${product.id}">Agregar al carrito</button>
          <a href="productos.html" class="btn btn-secondary">Seguir comprando</a>
        </div>
      </div>
    </div>
  `;

  const addButton = detailContainer.querySelector('[data-add]');
  if (addButton) {
    addButton.addEventListener('click', () => addToCart(product.id));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounter();
  renderProductDetail();

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderProducts(button.dataset.filter);
    });
  });

  renderProducts();
});
