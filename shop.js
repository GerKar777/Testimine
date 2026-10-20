 tasks-through-4-4
// MiniShop v2 – client-side web shop used as the system under test for UI tests.
// All state lives in memory (reload = fresh start). No backend.
//
// Changes in v2 (the developer's release notes):
//   - "Add to cart" buttons are now labelled "Buy" (accessible name "Buy <product>").
//   - "Cart" is now "Basket"; on narrow screens only the badge is shown (aria-label "Basket").
//   - Basket rows have a quantity input (min 1); changing it updates line total and total.
//   - Sort select on the products page: Name / Price: low to high / Price: high to low.
//   - Discount code in the basket: SAVE10 gives 10 % off the whole basket; unknown code → "Invalid code".
//   - v1 defects (search case, total × qty, email format) are fixed.
//
// NOTE: v2 contains THREE new intentional defects. Your UI tests should find them.

const PRODUCTS = [
  { id: 1, name: 'Laptop Stand', category: 'Accessories', price: 29.90 },
  { id: 2, name: 'USB-C Hub', category: 'Accessories', price: 39.00 },
  { id: 3, name: 'Mechanical Keyboard', category: 'Input', price: 89.00 },
  { id: 4, name: 'Wireless Mouse', category: 'Input', price: 24.50 },
  { id: 5, name: 'Monitor 27"', category: 'Displays', price: 249.00 },
  { id: 6, name: 'Webcam HD', category: 'Video', price: 54.90 },

// MiniShop v3 – UI layer only. All calculations and validation live in shop-logic.js.
// State lives in memory (reload = fresh start). No backend.

const PRODUCTS = [
  { id: 1, name: 'Laptop Stand',        category: 'Accessories', price: 29.90 },
  { id: 2, name: 'USB-C Hub',           category: 'Accessories', price: 39.00 },
  { id: 3, name: 'Mechanical Keyboard', category: 'Input',       price: 89.00 },
  { id: 4, name: 'Wireless Mouse',      category: 'Input',       price: 24.50 },
  { id: 5, name: 'Monitor 27"',         category: 'Displays',    price: 249.00 },
  { id: 6, name: 'Webcam HD',           category: 'Video',       price: 54.90 },
 main
];
const DISCOUNTS = { SAVE10: 0.10 };

const cart = new Map(); // productId -> qty
let discountRate = 0;
let orderNo = 1000;

const $ = (sel) => document.querySelector(sel);
const money = (n) => n.toFixed(2) + ' €';


function sortProducts(list, mode) {
  const copy = [...list];

  if (mode === 'price-asc') {
    copy.sort((a, b) => a.price - b.price);
  }

  if (mode === 'price-desc') {
    copy.sort((a, b) => b.price - a.price);
  }

  if (mode === 'name') {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  }

  return copy;
}


function renderProducts() {
 tasks-through-4-4
  const q = $('#search').value.toLowerCase();
  const visible = sortProducts(PRODUCTS.filter((p) => p.name.toLowerCase().includes(q)), $('#sort').value);
=======
  const visible = sortProducts(filterProducts(PRODUCTS, $('#search').value), $('#sort').value);
 main
  $('#product-grid').innerHTML = visible.map((p) => `
    <article class="card" data-testid="product" data-id="${p.id}">
      <h3>${p.name}</h3>
      <div class="cat">${p.category}</div>
      <div class="price" data-testid="price">${money(p.price)}</div>
      <button type="button" data-add="${p.id}" aria-label="Buy ${p.name}">Buy</button>
    </article>`).join('');
  $('#result-count').textContent = `${visible.length} products`;
}

function renderCart() {
  const rows = [...cart.entries()].map(([id, qty]) => ({ ...PRODUCTS.find((x) => x.id === id), qty }));
  $('#cart-count').textContent = rows.reduce((s, r) => s + r.qty, 0);
  if (rows.length === 0) {
    $('#cart-body').innerHTML = '<p class="empty" data-testid="cart-empty">Your basket is empty</p>';
    return;
  }
 tasks-through-4-4
  const subtotal = rows.reduce((s, r) => s + r.p.price * r.qty, 0);
  const discount = subtotal * discountRate;

  const total = subtotal - discount;

  const { subtotal, discount, total } = cartTotals(rows, discountRate);
 main
  $('#cart-body').innerHTML = `
    <table aria-label="Basket items">
      <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Line total</th><th></th></tr></thead>
      <tbody>${rows.map((r) => `
 tasks-through-4-4
        <tr data-testid="cart-row" data-id="${r.p.id}">
          <td>${r.p.name}</td><td>${money(r.p.price)}</td>
          <td><input type="number" value="${r.qty}" data-qty="${r.p.id}" aria-label="Quantity for ${r.p.name}"></td>
          <td data-testid="line-total">${money(r.p.price * r.qty)}</td>
          <td><button type="button" class="secondary" data-remove="${r.p.id}" aria-label="Remove ${r.p.name}">Remove</button></td>

        <tr data-testid="cart-row" data-id="${r.id}">
          <td>${r.name}</td><td>${money(r.price)}</td>
          <td><input type="number" value="${r.qty}" data-qty="${r.id}" aria-label="Quantity for ${r.name}"></td>
          <td data-testid="line-total">${money(lineTotal(r.price, r.qty))}</td>
          <td><button type="button" class="secondary" data-remove="${r.id}" aria-label="Remove ${r.name}">Remove</button></td>
 main
        </tr>`).join('')}
      </tbody>
      <tfoot>
        <tr><td colspan="3">Subtotal</td><td data-testid="cart-subtotal">${money(subtotal)}</td><td></td></tr>
        <tr><td colspan="3">Discount</td><td data-testid="cart-discount">−${money(discount)}</td><td></td></tr>
        <tr><td colspan="3">Total</td><td data-testid="cart-total">${money(total)}</td><td></td></tr>
      </tfoot>
    </table>`;
}

function showView(hash) {
  const cartView = hash === '#cart';
  $('#products').hidden = cartView;
  $('#cart').hidden = !cartView;
  if (cartView) { $('#nav-cart').setAttribute('aria-current', 'page'); $('#nav-products').removeAttribute('aria-current'); }
  else { $('#nav-products').setAttribute('aria-current', 'page'); $('#nav-cart').removeAttribute('aria-current'); }
 tasks-through-4-4
}

function validate(form) {
  const errors = {};
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const address = form.address.value.trim();
  if (name.length < 2) errors.name = 'Enter your full name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address';
  if (!address) errors.address = 'Enter a delivery address';
  return errors;


}

document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add]');
  if (add) { const id = Number(add.dataset.add); cart.set(id, (cart.get(id) || 0) + 1); renderCart(); }
  const rm = e.target.closest('[data-remove]');
  if (rm) { cart.delete(Number(rm.dataset.remove)); renderCart(); }
});

document.addEventListener('change', (e) => {
  const q = e.target.closest('[data-qty]');

  if (q) {
    const qty = Math.max(1, Math.floor(Number(q.value)) || 1);
    cart.set(Number(q.dataset.qty), qty);
    renderCart();
  }

  if (q) { cart.set(Number(q.dataset.qty), normalizeQuantity(q.value)); renderCart(); }

});

$('#apply-discount').addEventListener('click', () => {
  const code = $('#discount').value.trim().toUpperCase();
  const msg = $('#discount-message');
 
  if (DISCOUNTS[code]) { discountRate = DISCOUNTS[code]; msg.className = 'ok'; msg.textContent = `Code ${code} applied`; }
  else { discountRate = 0; msg.className = 'error'; msg.textContent = 'Invalid code'; }

  discountRate = discountRateFor(code);
  if (discountRate > 0) { msg.className = 'ok'; msg.textContent = `Code ${code} applied`; }
  else { msg.className = 'error'; msg.textContent = 'Invalid code'; }

  renderCart();
});

$('#search').addEventListener('input', renderProducts);
$('#sort').addEventListener('change', renderProducts);
window.addEventListener('hashchange', () => showView(location.hash));

$('#checkout').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const errors = validateCheckout({ name: form.name.value, email: form.email.value, address: form.address.value });
  for (const f of ['name', 'email', 'address']) $(`#${f}-error`).textContent = errors[f] || '';
  if (Object.keys(errors).length) return;
  if (cart.size === 0) { $('#order-result').innerHTML = '<div class="error" role="alert">Your basket is empty</div>'; return; }
  const name = form.name.value.trim();
  $('#order-result').innerHTML = '';
  setTimeout(() => {
    orderNo += 1;
    cart.clear(); discountRate = 0; renderCart(); form.reset();
    $('#order-result').innerHTML = `<div class="alert" role="status" data-testid="order-confirmation">Thank you, ${name}! Order #${orderNo} confirmed.</div>`;
tasks-through-4-4
  }, 300 + Math.random() * 900);   // the "server" takes 0.3–1.2 s – tests must wait for the result, not sleep

  }, 300 + Math.random() * 900);
 main
});

renderProducts();
renderCart();
showView(location.hash);