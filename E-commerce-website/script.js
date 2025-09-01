let cart = [];
let cartContainer = document.getElementById("cart-container");
let cartItems = document.getElementById("cart-items");
let cartCount = document.getElementById("cart-count");
let cartTotal = document.getElementById("cart-total");
 
// Add to Cart
function addToCart(product, price) {
  cart.push({ product, price });
  updateCart();
}
 
// Update Cart
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    let li = document.createElement("li");
    li.innerHTML = `${item.product} - ₹${item.price} <button onclick="removeFromCart(${index})">❌</button>`;
    cartItems.appendChild(li);
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}
 
// Remove Item
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
 
// Toggle Cart
function toggleCart() {
  cartContainer.classList.toggle("active");
}

function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]]; // Swap

    }

    return array;

}
 
// Shuffle Products

let products = [];

let shuffledProducts = shuffleArray(products);

shuffledProducts.forEach(product => {

    console.log(product.name);

});

 
// Close cart on clicking outside
document.addEventListener('click', function(event) {
  const isClickInsideCart = cartContainer.contains(event.target);
  const isClickOnCartButton = event.target.closest('.cart');
 
  if (!isClickInsideCart && !isClickOnCartButton) {
    cartContainer.classList.remove('active');
  }
});
 
// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thanks for shopping with SinghMart 🛒");
    cart = [];
    updateCart();
    toggleCart();
  }
}
 
// Search Filter
function searchProducts() {
  let input = document.getElementById("searchBar").value.toLowerCase();
  let products = document.querySelectorAll(".product");
  products.forEach(p => {
    let name = p.querySelector("h3").innerText.toLowerCase();
    p.style.display = name.includes(input) ? "block" : "none";
  });
}
 
// Category Filter
function filterCategory(category) {
  let products = document.querySelectorAll(".product");
  products.forEach(p => {
    if (category === "all" || p.getAttribute("data-category") === category) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}
 
// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
}
 
//contact
function submitForm(e){
  e.preventDefault();
  alert(`Thanks, ${document.getElementById("name").value}! We received your message.`);
  document.getElementById("contactForm").reset();
}
 
 