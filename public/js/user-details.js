let isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
let users = JSON.parse(localStorage.getItem("users")) || [];

function generateResetCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendResetCode(email) {
    const user = users.find(u => u.email === email);
    if (!user) {
        alert("No account found with this email address.");
        return;
    }
    
    const resetCode = generateResetCode();
    user.resetCode = resetCode;
    localStorage.setItem("users", JSON.stringify(users));
    
    // In a real application, this would send an email
    alert(`Reset code sent to ${email}. Your code is: ${resetCode}`);
}

function resetPassword(email, code, newPassword) {
    const user = users.find(u => u.email === email);
    if (!user) {
        alert("Invalid email address.");
        return;
    }
    
    if (user.resetCode !== code) {
        alert("Invalid reset code.");
        return;
    }
    
    user.password = newPassword;
    delete user.resetCode;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password reset successfully! Please login with your new password.");
}

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    
    if (username && password) {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = storedUsers.find(u => (u.username === username || u.email === username) && u.password === password);
        
        if (user) {
            isAuthenticated = true;
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("currentUser", JSON.stringify(user));
            alert("Login successful! You can now add products to your cart.");
            window.location.href = 'index.html';
        } else {
            alert("Invalid username or password.");
        }
    } else {
        alert("Please enter username and password.");
    }
}

function signup() {
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const phone = document.getElementById("signup-phone").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;

    if (!username || !email || !phone || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.some(u => u.username === username || u.email === email);
    if (userExists) {
        alert("Username or email already exists.");
        return;
    }

    const newUser = {
        username,
        email,
        phone,
        password
    };

    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    alert("Account created successfully! Please login.");
    toggleAuth();
}

function addToCart(product) {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    if (!authStatus) {
        alert("Please login first to add products to your cart.");
        window.location.href = 'user-details.html';
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    alert(`${product} added to cart!`);
}
