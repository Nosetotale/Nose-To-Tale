const products = [
  {
    id: 1,
    name_et: "Kana maius",
    name_en: "Chicken treat",
    price: 3.5
  },
  {
    id: 2,
    name_et: "Lamba maius",
    name_en: "Lamb treat",
    price: 4
  },
  {
    id: 3,
    name_et: "Veise kõrvad",
    name_en: "Beef ears",
    price: 2.5
  }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let language = 'et';

function renderProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${language === 'et' ? product.name_et : product.name_en}</h3>
      <p>${product.price.toFixed(2)} €</p>
      <button class="add-to-cart" onclick="addToCart(${product.id})">${language === 'et' ? "Lisa korvi" : "Add to cart"}</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").textContent = cart.length;
  const cartList = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const totalEnEl = document.getElementById("total-en");

  cartList.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${language === 'et' ? item.name_et : item.name_en} - ${item.price.toFixed(2)} €`;
    cartList.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = total.toFixed(2);
  totalEnEl.textContent = total.toFixed(2);
}

function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
}

document.getElementById("cart-link").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("cart").classList.toggle("hidden");
});

document.getElementById("lang-toggle").addEventListener("click", () => {
  language = language === 'et' ? 'en' : 'et';
  toggleLanguage();
  renderProducts();
  updateCart();
});

function toggleLanguage() {
  document.querySelectorAll('.et').forEach(el => el.classList.toggle('hidden', language !== 'et'));
  document.querySelectorAll('.en').forEach(el => el.classList.toggle('hidden', language !== 'en'));
  document.getElementById("lang-toggle").textContent = language === 'et' ? "English" : "Eesti keel";
}

// Initial render
renderProducts();
updateCart();
toggleLanguage();
