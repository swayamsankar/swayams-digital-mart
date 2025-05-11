document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    if (!localStorage.getItem('isAuthenticated')) {
        alert('Please login or signup to add products to your cart.');
        localStorage.removeItem('cart'); // Clear cart if not logged in
        window.location.href = 'user-details.html'; // Redirect to login/signup page
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElem = document.getElementById("total-price");

    // Function to get product category based on name
    function getProductCategory(productName) {
        const productCategories = {
            // Earbuds
            "Boat Airdopes 131": "earbuds",
            "pTron Bassbuds Duo Pro TWS": "earbuds",
            "Harmonics Twins S19": "earbuds",
            "Beats Solo Buds": "earbuds",
            "Wholesale T68PRO Earbuds": "earbuds",
            "Sony WF-C500": "earbuds",
            "Mivi DuoPods A25": "earbuds",
            "Jabra Elite 3": "earbuds",
            "Realme Buds Q2": "earbuds",
            "Samsung Galaxy Buds2": "earbuds",
            "OnePlus Buds Z2": "earbuds",
            "Apple AirPods Pro": "earbuds",
            "Boat Airdopes 441": "earbuds",
            "Oppo Enco Air2 Pro": "earbuds",
            "Nothing Ear (1)": "earbuds",
            
            // Laptops
            "HP Victus 39.6 cm (15.6) Gaming Laptop 15": "laptop",
            "Apple Macbook Pro MF840H": "laptop",
            "Lenovo Lenovo Legion 9": "laptop",
            "MSI Titan 18 HX A14VlG-081CA": "laptop",
            "Dell Inspiron 15 3520": "laptop",
            "Asus ROG Zephyrus G14": "laptop",
            "Acer Predator Helios 300": "laptop",
            "Razer Blade 15": "laptop",
            "HP Pavilion 15-eg2000TU": "laptop",
            "Lenovo ThinkPad X1 Carbon Gen 10": "laptop",
            
            // Headphones
            "Beats Studio Pro": "Headphone",
            "Beats Studi03": "Headphone",
            "JBL Tune 520BT": "Headphone",
            "Noise TWO Wireless": "Headphone",
            "Sony WH-CH720N": "Headphone",
            "Bose QuietComfort 45": "Headphone",
            "Sennheiser HD 450BT": "Headphone",
            "JBL Live 460NC": "Headphone",
            "Skullcandy Crusher Evo": "Headphone",
            "Apple AirPods Max": "Headphone",
            
            // Phones
            "vivo X200 5G V2405A": "phone",
            "OnePlus Nord CE4 lite 5G": "phone",
            "iQOO 12 16GB+512GB Legend": "phone",
            "APPLE iPhone 14 Pro Max ( 128 GB Storage )": "phone",
            "Samsung Galaxy M34 5G": "phone",
            "Realme Narzo 60 Pro 5G": "phone",
            "Xiaomi 13 Lite": "phone",
            "Motorola Edge 40 Neo": "phone",
            "Google Pixel 7a": "phone",
            "OnePlus Nord 3 5G": "phone",
            
            // Smartwatches
            "Leaf Watch X121": "smartwatch",
            "Relögio MORMAII Smartwatch": "smartwatch",
            "boAt Xtend Plus": "smartwatch",
            "Apple Watch Series 9": "smartwatch",
            "Samsung Galaxy Watch6": "smartwatch",
            "Noise ColorFit Pro 4": "smartwatch",
            "Garmin Venu 3": "smartwatch",
            "Fire-Boltt Ninja Pro": "smartwatch",
            "Fitbit Sense 2": "smartwatch",
            
            // Top Deals
            "DELL 615-5530": "index",
            "Motorola Edge 50 pro": "index",
            "boAt Wave Armour 2": "index"
        };
        return productCategories[productName] || "index";
    }

    function updateCartDisplay() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const listItem = document.createElement("li");
            // Use the first image from the product's images array if available
            const imagePath = item.images?.[0] || getProductImage(item.name);
            listItem.innerHTML = `
                <img src="${imagePath}" alt="${item.name}" width="50" onerror="this.src='images/default.jpg'">
                <span class="product-name" onclick="window.location.href='${getProductCategory(item.name)}.html'">${item.name}</span> - ₹${item.price}
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity || 1}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button onclick="removeFromCart(${index})">❌ Remove</button>
            `;
            cartItemsList.appendChild(listItem);
            total += parseFloat(item.price) * (item.quantity || 1);
        });

        totalPriceElem.innerText = total.toFixed(2);
    }

    // Helper function to get correct product image
    function getProductImage(productName) {
        const productImages = {
            // Earbuds
            "Boat Airdopes 131": "images/earbud1.webp",
            "pTron Bassbuds Duo Pro TWS": "images/earbud2.jpg",
            "Harmonics Twins S19": "images/earbud3.jpg",
            "Beats Solo Buds": "images/earbud4.jpeg",
            "Wholesale T68PRO Earbuds": "images/earbud5.jpg",
            "Sony WF-C500": "images/earbud6.jpg",
            "Mivi DuoPods A25": "images/earbud7.jpg",
            "Jabra Elite 3": "images/earbud8.jpg",
            "Realme Buds Q2": "images/earbud9.jpg",
            "Samsung Galaxy Buds2": "images/earbud10.jpg",
            "OnePlus Buds Z2": "images/earbud11.jpg",
            "Apple AirPods Pro": "images/earbud12.webp",
            "Boat Airdopes 441": "images/earbud13.webp",
            "Oppo Enco Air2 Pro": "images/earbud14.png",
            "Nothing Ear (1)": "images/earbud15.webp",
            
            // Laptops
            "HP Victus 39.6 cm (15.6) Gaming Laptop 15": "images/laptop1.webp",
            "Apple Macbook Pro MF840H": "images/laptop2.jpg",
            "Lenovo Lenovo Legion 9": "images/laptop3.jpg",
            "MSI Titan 18 HX A14VlG-081CA": "images/laptop4.jpg",
            "Dell Inspiron 15 3520": "images/laptop5.webp",
            "Asus ROG Zephyrus G14": "images/laptop6.jpg",
            "Acer Predator Helios 300": "images/laptop7.jpg",
            "Razer Blade 15": "images/laptop8.jpg",
            "HP Pavilion 15-eg2000TU": "images/laptop9.jpg",
            "Lenovo ThinkPad X1 Carbon Gen 10": "images/laptop10.webp",
            
            // Headphones
            "Beats Studio Pro": "images/Headphone1.jpg",
            "Beats Studi03": "images/Headphone2.jpg",
            "JBL Tune 520BT": "images/Headphone3.jpg",
            "Noise TWO Wireless": "images/Headphone4.jpg",
            "Sony WH-CH720N": "images/Headphone5.jpg",
            "Bose QuietComfort 45": "images/Headphone6.jpg",
            "Sennheiser HD 450BT": "images/Headphone7.jpg",
            "JBL Live 460NC": "images/Headphone8.jpg",
            "Skullcandy Crusher Evo": "images/Headphone9.jpg",
            "Apple AirPods Max": "images/Headphone10.webp",
            // Phones
            "vivo X200 5G V2405A": "images/phone4.jpg",
            "OnePlus Nord CE4 lite 5G": "images/phone3.jpg",
            "iQOO 12 16GB+512GB Legend": "images/phone2.jpg",
            "APPLE iPhone 14 Pro Max ( 128 GB Storage )": "images/phone1.jpg",
            "Samsung Galaxy M34 5G": "images/phone5.webp",
            "Realme Narzo 60 Pro 5G": "images/phone6.webp",
            "Xiaomi 13 Lite": "images/phone7.png",
            "Motorola Edge 40 Neo": "images/phone8.png",
            "Google Pixel 7a": "images/phone9.webp",
            "OnePlus Nord 3 5G": "images/phone10.png",
            
            // Smartwatches
            "Leaf Watch X121": "images/smartwatch1.jpg",
            "Relögio MORMAII Smartwatch": "images/smartwatch3.jpg",
            "boAt Xtend Plus": "images/smartwatch4.jpg",
            "Apple Watch Series 9": "images/smartwatch2.jpg",
            "Samsung Galaxy Watch6": "images/smartwatch5.webp",
            "Noise ColorFit Pro 4": "images/smartwatch6.jpg",
            "Garmin Venu 3": "images/smartwatch7.jpg",
            "Fire-Boltt Ninja Pro": "images/smartwatch8.jpg",
            "Fitbit Sense 2": "images/smartwatch9.jpg",
            // Top Deals
            "DELL 615-5530": "images/Topdeal1.webp",
            "Motorola Edge 50 pro": "images/Topdeal2.jpg",
            "boAt Wave Armour 2": "images/Topdeal3.jpg"
        };
        return productImages[productName] || "images/default.jpg";
    }

    window.updateQuantity = (index, change) => {
        if (!cart[index].quantity) {
            cart[index].quantity = 1;
        }
        const newQuantity = cart[index].quantity + change;
        if (newQuantity < 1) {
            cart[index].quantity = 1;
        } else if (newQuantity > 5) {
            alert("Maximum quantity per product is 5");
            cart[index].quantity = 5;
        } else {
            cart[index].quantity = newQuantity;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    };

    window.checkout = () => {
        if (!localStorage.getItem('isAuthenticated')) {
            alert('Please login or signup to proceed to checkout.');
            window.location.href = 'user-details.html';
            return;
        }
        
        // Update cart items to include quantity in price calculation
        const updatedCart = cart.map(item => {
            return {
                ...item,
                price: item.price * (item.quantity || 1)
            };
        });
        
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.location.href = 'payment.html';
    };

    updateCartDisplay();
});
