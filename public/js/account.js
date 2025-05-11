document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("user");
    const address = localStorage.getItem("address") || "";
    const pin = localStorage.getItem("pin") || "";
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (!username) {
        window.location.href = "user-details.html"; // Redirect to login if not authenticated
    } else {
        document.getElementById("account-username").textContent = username;
        document.getElementById("account-address").value = address;
        document.getElementById("account-pin").value = pin;

        const orderHistory = document.getElementById("order-history");
        orders.forEach(order => {
            let li = document.createElement("li");
            li.textContent = order;
            orderHistory.appendChild(li);
        });
    }
});

function saveDetails() {
    const address = document.getElementById("account-address").value;
    const pin = document.getElementById("account-pin").value;

    localStorage.setItem("address", address);
    localStorage.setItem("pin", pin);
    alert("Details saved successfully!");
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("address");
    localStorage.removeItem("pin");
    localStorage.removeItem("orders");
    window.location.href = "user-details.html"; // Redirect to login
}
