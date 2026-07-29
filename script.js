let products = [];
let cart = [];
let displayedProducts = [];

// Fetch data seamlessly from Backend
document.addEventListener("DOMContentLoaded", () => {
    fetch('/products')
        .then(res => res.json())
        .then(data => {
            products = data;
            displayedProducts = [...products];
            displayProducts(displayedProducts);
        })
        .catch(err => console.error("Error loading shop data:", err));
});

function displayProducts(list) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    if(list.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:#94a3b8;">
            <i class="fas fa-search" style="font-size:48px; margin-bottom:10px;"></i>
            <p>No products match your filters!</p>
        </div>`;
        return;
    }

    list.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <div class="img-container">
                    <img src="${p.image}" alt="${p.name}">
                    <span class="rating-badge"><i class="fas fa-star"></i> ${p.rating}</span>
                </div>
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p>${p.description}</p>
                    <div class="price-row">
                        <span class="price">₹${p.price}</span>
                        <button class="add-btn" onclick="addToCart(${p.id})"><i class="fas fa-plus"></i> Add</button>
                    </div>
                </div>
            </div>`;
    });
}

function filterProducts() {
    const category = document.getElementById("category-filter").value;
    displayedProducts = category === "all" ? [...products] : products.filter(p => p.category === category);
    sortProducts(); 
}

function sortProducts() {
    const sortBy = document.getElementById("price-sort").value;
    if (sortBy === "low") displayedProducts.sort((a, b) => a.price - b.price);
    else if (sortBy === "high") displayedProducts.sort((a, b) => b.price - a.price);
    displayProducts(displayedProducts);
}

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
}

function addToCart(id) {
    cart.push(products.find(p => p.id === id));
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById("cart-count").innerText = cart.length;
    const container = document.getElementById("cart-items-container");
    container.innerHTML = "";
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <h5 style="font-weight:600; color:#0f172a;">${item.name}</h5>
                    <small style="color:#64748b;">₹${item.price}</small>
                </div>
                <i class="fas fa-trash-alt remove-item" onclick="removeFromCart(${index})"></i>
            </div>`;
    });
    document.getElementById("cart-total").innerText = total;
}

function checkout() {
    if(cart.length === 0) return alert("Your shopping bag is empty!");

    fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, total: document.getElementById("cart-total").innerText })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        cart = [];
        updateCartUI();
        toggleCart();
    });
}
