document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let orderDetails = document.getElementById("order-details");
    let totalPriceElement = document.getElementById("total-price");
    let discountElement = document.getElementById("discount");
    let finalPriceElement = document.getElementById("final-price");

    let totalPrice = 0;

    // Create an object to track quantities and total prices per product
    let productQuantities = {};

    // Display cart items and calculate total price
    cart.forEach(item => {
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;
        
        if (productQuantities[item.name]) {
            productQuantities[item.name].quantity += quantity;
            productQuantities[item.name].totalPrice += itemTotal;
        } else {
            productQuantities[item.name] = {
                quantity: quantity,
                totalPrice: itemTotal
            };
        }
        totalPrice += itemTotal;
    });

    // Clear order details before displaying
    orderDetails.innerHTML = '';

    // Display items with quantities and total prices
    for (let product in productQuantities) {
        let itemElement = document.createElement("p");
        itemElement.textContent = `${product} (${productQuantities[product].quantity}) - ₹${productQuantities[product].totalPrice.toFixed(2)}`;
        orderDetails.appendChild(itemElement);
    }

    // Apply discount logic
    let discount = totalPrice > 5000 ? totalPrice * 0.1 : 0; // 10% discount for orders above ₹5000
    let finalPrice = totalPrice - discount;

    // Update price details
    totalPriceElement.textContent = totalPrice.toFixed(2);
    discountElement.textContent = discount.toFixed(2);
    finalPriceElement.textContent = finalPrice.toFixed(2);

    // Handle Order Confirmation
    document.getElementById("confirm-order").addEventListener("click", function () {
        // Simulate payment processing
        setTimeout(() => {
            // Create order object
            const order = {
                items: cart.map(item => `${item.name} (${item.quantity || 1})`),
                totalPrice: finalPrice,
                date: new Date().toLocaleString()
            };

            // Save order to order history
            let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
            orderHistory.push(order);
            localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

            // Clear cart
            localStorage.removeItem("cart");

            // Show success popup
            document.getElementById("popup").style.display = "flex";
        }, 1000); // Simulate 1 second payment processing time
    });
});

function closePopup() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "orders.html"; // Redirect to orders page after confirmation
}
