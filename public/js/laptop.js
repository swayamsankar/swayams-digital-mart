// Function to add items to cart
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: productName, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} added to cart`);
}

// Function to add items to wishlist
function addToWishlist(productName) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push({ name: productName });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${productName} added to wishlist`);
}
