document.addEventListener("DOMContentLoaded", function () {
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'user-details.html';
        return;
    }

    // Get all orders and filter by current user
    let allOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    let userOrders = allOrders.filter(order => order.userId === currentUser.id);
    let orderContainer = document.getElementById("order-history");

    if (userOrders.length === 0) {
        orderContainer.innerHTML = "<p class='empty-message'>No orders placed yet.</p>";
        return;
    }

    // Display user's orders
    userOrders.forEach((order, index) => {
        let orderElement = document.createElement("div");
        orderElement.classList.add("order-item");
        
        orderElement.innerHTML = `
            <h3>Order #${index + 1}</h3>
            <p><strong>User:</strong> ${order.userName || currentUser.name}</p>
            <p><strong>Email:</strong> ${order.userEmail || currentUser.email}</p>
            <p><strong>Items:</strong> ${order.items.join(", ")}</p>
            <p><strong>Total Price:</strong> ₹${order.totalPrice}</p>
            <p><strong>Order Date:</strong> ${order.date}</p>
            <p><strong>Status:</strong> ${order.status || 'Completed'}</p>
        `;

        orderContainer.appendChild(orderElement);
    });
});
