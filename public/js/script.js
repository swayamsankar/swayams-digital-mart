// Simulate the cart and wishlist storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Image slider functionality
const slides = document.querySelectorAll(".slider-frame img");
const dotsContainer = document.getElementById("dots");
let currentSlide = 0;

// Create dots
if (slides.length > 0 && dotsContainer) {
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-dots span");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      dots[i]?.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
        dots[i]?.classList.add("active");
      }
    });
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
  }

  // Initialize first slide
  showSlide(currentSlide);
}

// Function to add products to the cart
function addToCart(product) {
  const productData = {
    name: product,
    price: getPrice(product),
    quantity: 1
  };

  const existingProductIndex = cart.findIndex(item => item.name === product);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity++;
  } else {
    cart.push(productData);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Function to get price for a product
function getPrice(productName) {
  const products = {
    "Earbuds": 29.99,
    "Headphones": 49.99,
    "Laptop": 799.99,
    "Smartwatch": 99.99,
    "Phone": 699.99,
    "DELL 615-5530": 12999,
    "Motorola Edge 50 pro": 2499,
    "boAt Wave Armour 2": 89999
  };
  
  return products[productName] || 0;
}

// Function to update the cart display
function updateCartUI() {
  const cartContainer = document.querySelector(".cart-container");
  if (cartContainer) {
    const cartList = cartContainer.querySelector("#cart-items");
    cartList.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      cartList.innerHTML += `
        <li>
          <img src="/images/${item.name}.jpg" alt="${item.name}">
          <span>${item.name} x ${item.quantity}</span>
          <span>₹${(item.price * item.quantity).toFixed(2)}</span>
          <button onclick="removeFromCart('${item.name}')">Remove</button>
        </li>
      `;
    });

    const discount = 0.1;
    const discountedTotal = total - (total * discount);
    cartContainer.querySelector("#total-price").innerHTML = `Total: ₹${total.toFixed(2)} (Discount: ₹${(total * discount).toFixed(2)}) <br> After Discount: ₹${discountedTotal.toFixed(2)}`;
    cartContainer.querySelector("#checkout-button").disabled = cart.length === 0;
  }
}

// Function to remove products from the cart
function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Function to handle the checkout and mock payment
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 0.1;
  const discountedTotal = total - (total * discount);

  alert(`Proceeding to payment...\nTotal: ₹${total.toFixed(2)}\nDiscount: ₹${(total * discount).toFixed(2)}\nAmount to Pay: ₹${discountedTotal.toFixed(2)}`);
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Function to search products
function searchProduct() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const productContainers = document.querySelectorAll(".product-detail");
  productContainers.forEach(container => {
    const productName = container.querySelector("h2").textContent.toLowerCase();
    container.style.display = productName.includes(searchTerm) ? "block" : "none";
  });
}

// Add to wishlist functionality
document.querySelectorAll('.wishlist-button').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute("data-product-id");
    addToWishlist(productId);
  });
});

// Function to add items to the wishlist
function addToWishlist(productId) {
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Product added to wishlist!");
  } else {
    alert("Product is already in your wishlist.");
  }
}

// Add event listeners for Grab Deal buttons
document.querySelectorAll('.deal-item button').forEach(button => {
  button.addEventListener('click', () => {
    if (!localStorage.getItem('isAuthenticated')) {
      alert('Please login or signup to grab this deal.');
      window.location.href = 'user-details.html';
      return;
    }
    
    const productName = button.closest('.deal-item').querySelector('h3').textContent;
    addToCart(productName);
    alert(`${productName} added to cart!`);
  });
});

// Notify Me button functionality
document.querySelector('.upcoming-launch button')?.addEventListener('click', () => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
    const confirmAction = confirm('Please login or signup to get notified. Do you want to proceed to login/signup?');
    if (confirmAction) {
      window.location.href = 'user-details.html';
    }
    return;
  }
  
  // Store notification preference in localStorage
  const productName = 'Upcoming Products';
  const email = document.getElementById('userEmail').value;

  if (!email) {
    alert('Please enter your email');
    return;
  }

  fetch('http://localhost:4000/api/notify-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, productName }),
  })
  .then((res) => res.json())
  .then((data) => {
    alert(data.message);
  })
  .catch((err) => {
    console.error('Error sending notification:', err);
    alert('Something went wrong. Please try again.');
  });
});
