// MiniShop - simple e-commerce application logic

const PRODUCTS = [
  { id: 'p1', name: 'Wireless Mouse', price: 25.00 },
  { id: 'p2', name: 'Mechanical Keyboard', price: 85.00 },
  { id: 'p3', name: 'USB-C Hub', price: 39.00 },
  { id: 'p4', name: 'Laptop Stand', price: 45.00 },
  { id: 'p5', name: 'Webcam HD', price: 59.00 },
  { id: 'p6', name: 'Monitor Arm', price: 79.00 }
];

let cart = []; // { p: product, qty: number }

function init() {
  renderProducts(PRODUCTS);
  setupListeners();
}

// D-01 Fix: Case-insensitive search
function renderProducts(list) {
  const q = document.getElementById('search-input')?.value || '';
  const filtered = list.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-testid="product">
      <h3>${p.name}</h3>
      <p class="price">${p.price.toFixed(2)} €</p>
      <button onclick="addToCart('${p.id}')">Add ${p.name} to cart</button>
    </div>
  `).join('');
  
  const countEl = document.getElementById('result-count');
  if (countEl) {
    countEl.textContent = `${filtered.length} products`;
  }
}

function addToCart(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  
  const existing = cart.find(x => x.p.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ p, qty: 1 });
  }
  
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  const totalQty = cart.reduce((s, r) => s + r.qty, 0);
  badge.textContent = totalQty.toString();
}

// D-02 Fix: Multiply price by quantity
function renderCart() {
  const cartView = document.getElementById('cart-view');
  if (!cartView) return;
  
  if (cart.length === 0) {
    cartView.innerHTML = '<p data-testid="cart-empty">Your cart is empty</p>';
    return;
  }
  
  const total = cart.reduce((s, r) => s + r.p.price * r.qty, 0);
  
  const rowsHtml = cart.map(r => `
    <tr data-testid="cart-row">
      <td>${r.p.name}</td>
      <td data-testid="qty">${r.qty}</td>
      <td>${r.p.price.toFixed(2)} €</td>
      <td data-testid="line-total">${(r.p.price * r.qty).toFixed(2)} €</td>
      <td><button onclick="removeFromCart('${r.p.id}')">Remove ${r.p.name}</button></td>
    </tr>
  `).join('');
  
  cartView.innerHTML = `
    <table>
      <thead>
        <tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th><th>Action</th></tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    </table>
    <p>Total: <strong data-testid="cart-total">${total.toFixed(2)} €</strong></p>
  `;
}

function removeFromCart(productId) {
  cart = cart.filter(x => x.p.id !== productId);
  updateCartBadge();
  renderCart();
}

// D-03 Fix: Email regex validation
function validate(name, email, address) {
  const errors = {};
  if (!name.trim()) errors.name = 'Name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address';
  if (!address.trim()) errors.address = 'Address is required';
  return errors;
}

function placeOrder(name, email, address) {
  const errors = validate(name, email, address);
  
  document.getElementById('name-error').textContent = errors.name || '';
  document.getElementById('email-error').textContent = errors.email || '';
  document.getElementById('address-error').textContent = errors.address || '';
  
  if (Object.keys(errors).length > 0) return false;
  
  cart = [];
  updateCartBadge();
  
  const conf = document.getElementById('order-confirmation');
  if (conf) {
    conf.textContent = `Thank you, ${name}! Order #1 confirmed.`;
    conf.style.display = 'block';
  }
  
  return true;
}

function setupListeners() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderProducts(PRODUCTS));
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', init);
}