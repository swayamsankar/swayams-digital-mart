// Fetch product data from localStorage
document.addEventListener('DOMContentLoaded', function() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (product) {
    // Update all product details with null checks
    document.getElementById("product-name").textContent = product.name || "Product Name Not Available";
    document.getElementById("product-description").textContent = product.description || "No description available for this product.";
    document.getElementById("product-price").textContent = product.price ? `₹${product.price}` : "Price Not Available";
    document.getElementById("product-rating").textContent = product.rating || "★★★★☆ (4.0/5)";

    // Update main image with fallback
    const mainImage = document.getElementById("main-image");
    if (product.images && product.images.length > 0) {
      mainImage.src = product.images[0];
    } else {
      mainImage.src = "images/no-image.jpg";
      mainImage.alt = "Image Not Available";
    }

    // Update thumbnails with null check
    const thumbnailsContainer = document.getElementById("thumbnail-images");
    if (product.images && product.images.length > 0) {
      product.images.forEach((imgSrc, index) => {
        const thumb = document.createElement("img");
        thumb.src = imgSrc;
        thumb.alt = `Image ${index + 1}`;
        thumb.classList.add('thumbnail');
        thumb.addEventListener("click", () => {
          mainImage.src = imgSrc;
        });
        thumbnailsContainer.appendChild(thumb);
      });
    }

    // Update view count
    if (product.name) {
      let views = parseInt(localStorage.getItem(`views_${product.name}`)) || 0;
      views++;
      localStorage.setItem(`views_${product.name}`, views);
      document.getElementById('view-count').textContent = views;
    }
  } else {
    document.querySelector(".product-details-container").innerHTML =
      "<p style='padding: 20px;'>No product selected or product data is incomplete.</p>";
  }
});

// Add to cart function with validation
function addToCart() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) {
    alert("No product selected to add to cart!");
    return;
  }
  
  // Validate required fields
  if (!product.name || !product.price) {
    alert("Product data is incomplete. Cannot add to cart.");
    return;
  }
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Check if product already exists in cart
  const existingProduct = cart.find(p => p.name === product.name);
  if (existingProduct) {
    alert("Product is already in your cart!");
    return;
  }
  
  // Add product to cart with all details
  const productToAdd = {
    name: product.name,
    description: product.description,
    price: product.price,
    rating: product.rating,
    images: product.images
  };
  cart.push(productToAdd);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
  window.location.href = 'cart.html';
}

// Add to wishlist function with validation
function addToWishlist() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) {
    alert("No product selected to add to wishlist!");
    return;
  }
  
  // Validate required fields
  if (!product.name || !product.price) {
    alert("Product data is incomplete. Cannot add to wishlist.");
    return;
  }
  
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
  // Check if product already exists in wishlist
  const existingProduct = wishlist.find(p => p.name === product.name);
  if (existingProduct) {
    alert("Product is already in your wishlist!");
    return;
  }
  
  // Add product to wishlist with all details
  const productToAdd = {
    name: product.name,
    description: product.description,
    price: product.price,
    rating: product.rating,
    images: product.images
  };
  wishlist.push(productToAdd);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Added to wishlist!");
  window.location.href = 'wishlist.html';
}
