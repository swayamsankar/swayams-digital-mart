// document.addEventListener("DOMContentLoaded", () => {
//     let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     const wishlistItemsList = document.getElementById("wishlist-items");

//     // Helper function to get product details with image error handling
//     function getProductDetails(productName) {
//         const productImages = {
//             // Earbuds
//             "Earbuds Model 1": "images/earbud1.webp",
//             "Earbuds Model 2": "images/earbud2.jpg",
//             "Earbuds Model 3": "images/earbud3.jpg",
//             "Earbuds Model 4": "images/earbud4.jpeg",
//             // Laptops
//             "Laptop Model 1": "images/laptop1.jpg",
//             "Laptop Model 2": "images/laptop2.jpg",
//             "Laptop Model 3": "images/laptop3.jpg",
//             "Laptop Model 4": "images/laptop4.jpg",
//             // Phones
//             "Phone Model 1": "images/phone1.jpg",
//             "Phone Model 2": "images/phone2.jpg",
//             "Phone Model 3": "images/phone3.jpg",
//             "Phone Model 4": "images/phone4.jpg",
//             // Headphones
//             "Headphone Model 1": "images/headphone1.jpg",
//             "Headphone Model 2": "images/headphone2.jpg",
//             "Headphone Model 3": "images/headphone3.jpg",
//             "Headphone Model 4": "images/headphone4.jpg",
//             // Smartwatches
//             "Smartwatch Model 1": "images/smartwatch1.jpg",
//             "Smartwatch Model 2": "images/smartwatch2.jpg",
//             "Smartwatch Model 3": "images/smartwatch3.jpg",
//             "Smartwatch Model 4": "images/smartwatch4.jpg"
//         };
        
//         const product = {
//             image: productImages[productName] || "/images/default.jpg", // Ensure absolute path
//             price: 0 // Price will be set separately
//         };

//         // Verify image exists
//         const img = new Image();
//         img.src = product.image;
//         img.onerror = () => {
//             product.image = "/images/default.jpg"; // Fallback to absolute path
//         };

//         return product;
//     }

//     function updateWishlistDisplay() {
//         wishlistItemsList.innerHTML = "";

//         wishlist.forEach((productName, index) => {
//             try {
//                 const product = getProductDetails(productName);
//                 const listItem = document.createElement("li");
                
//                 // Create image element with error handling
//                 const img = new Image();
//                 img.src = product.image;
//                 img.alt = productName;
//                 img.width = 50;
//                 img.height = 50;
//                 img.onerror = () => {
//                     img.src = "/images/default.jpg"; // Ensure absolute path
//                 };

//                 listItem.innerHTML = `
//                     ${img.outerHTML}
//                     ${productName} - ₹${product.price}
//                     <button onclick="addToCartFromWishlist('${productName}', ${product.price})">🛒 Add to Cart</button>
//                     <button onclick="removeFromWishlist(${index})">❌ Remove</button>
//                 `;
//                 wishlistItemsList.appendChild(listItem);
//             } catch (error) {
//                 console.error("Error displaying wishlist item:", error);
//             }
//         });
//     }

//     window.addToCartFromWishlist = (productName, price) => {
//         // Add to cart with the provided price
//         const productData = {
//             name: productName,
//             price: price,
//             quantity: 1
//         };
        
//         let cart = JSON.parse(localStorage.getItem("cart")) || [];
//         const existingProductIndex = cart.findIndex(item => item.name === productName);
        
//         if (existingProductIndex > -1) {
//             cart[existingProductIndex].quantity++;
//         } else {
//             cart.push(productData);
//         }
        
//         localStorage.setItem("cart", JSON.stringify(cart));
        
//         // Redirect to cart page
//         window.location.href = "cart.html";
//     };

//     window.removeFromWishlist = (index) => {
//         if (index >= 0 && index < wishlist.length) {
//             wishlist.splice(index, 1);
//             localStorage.setItem("wishlist", JSON.stringify(wishlist));
//             updateWishlistDisplay();
//         }
//     };

//     updateWishlistDisplay();
// });
document.addEventListener("DOMContentLoaded", function() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistItemsList = document.getElementById("wishlist-items");

    // Updated product prices and names based on actual product pages
    const productPrices = {
        // Earbuds
        "Boat Airdopes 131": 1999,
        "pTron Bassbuds Duo Pro TWS": 2499,
        "Harmonics Twins S19" : 2999,
        "Beats Solo Buds": 3499,
        "Wholesale T68PRO Earbuds": 1799,
        "Sony WF-C500": 3999,
        "Mivi DuoPods A25": 1299,
        "Jabra Elite 3": 4999,
        "Realme Buds Q2": 999,
        "Samsung Galaxy Buds2": 5999,
        "OnePlus Buds Z2": 4499,
        "Apple AirPods Pro": 7999,
        "Boat Airdopes 441": 1499,
        "Oppo Enco Air2 Pro": 2999,
        "Nothing Ear (1)": 2999,
        
        // Laptops
        "HP Victus 39.6 cm (15.6) Gaming Laptop 15": 49999,
        "Apple Macbook Pro MF840H": 69999,
        "Lenovo Lenovo Legion 9": 89999,
        "MSI Titan 18 HX A14VlG-081CA": 109999,
        "Dell Inspiron 15 3520": 54999,
        "Asus ROG Zephyrus G14": 79999,
        "Acer Predator Helios 300": 94999,
        "Razer Blade 15": 1199999,
        "HP Pavilion 15-eg2000TU": 64999,
        "Lenovo ThinkPad X1 Carbon Gen 10": 89999,
        
        // Headphones
        "Beats Studio Pro": 2999,
        "Beats Studi03": 3499,
        "JBL Tune 520BT": 4999,
        "Noise TWO Wireless": 5999,
        "Sony WH-CH720N": 3999,
        "Bose QuietComfort 45": 4999,
        "Sennheiser HD 450BT": 6999,
        "JBL Live 460NC": 2499,
        "Skullcandy Crusher Evo": 5499,
        "Apple AirPods Max": 7999,
        
        // Phones
        "APPLE iPhone 14 Pro Max ( 128 GB Storage )": 14999,
        "iQOO 12 16GB+512GB Legend": 18999,
        "OnePlus Nord CE4 lite 5G": 22999,
        "vivo X200 5G V2405A": 27999,
        "Samsung Galaxy M34 5G": 15999,
        "Realme Narzo 60 Pro 5G": 20999,
        "Xiaomi 13 Lite": 24999,
        "Motorola Edge 40 Neo": 17999,
        "Google Pixel 7a": 29999,
        "OnePlus Nord 3 5G": 21999,
        
        // Smartwatches
        "Leaf Watch X121": 5999,
        "Apple Watch Series 9": 7499,
        "Relögio MORMAII Smartwatch": 8999,
        "boAt Xtend Plus": 10499,
        "Samsung Galaxy Watch6": 12999,
        "Noise ColorFit Pro 4": 8999,
        "Garmin Venu 3": 15999,
        "Fire-Boltt Ninja Pro": 6999,
        "Fitbit Sense 2": 18999
    };

    // Updated image mapping function
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
            "Fitbit Sense 2": "images/smartwatch9.jpg"
        };
        
        return productImages[productName] || "/images/default.jpg";
    }

    function updateWishlistDisplay() {
        wishlistItemsList.innerHTML = "";
        
        if (wishlist.length > 0) {
            for (const [index, product] of wishlist.entries()) {
                try {
                    const listItem = document.createElement("li");
                    const productName = product.name;
                    const productPrice = productPrices[productName] || 0;
                    
                    const imageUrl = getProductImage(productName);
                    const img = new Image();
                    img.src = imageUrl;
                    img.alt = productName;
                    img.style.width = "100px";
                    img.style.height = "auto";
                    img.onerror = () => {
                        img.src = "/images/default.jpg";
                    };

                    listItem.innerHTML = `
                        ${img.outerHTML}
                        <div class="product-info">
                            <h3>${productName}</h3>
                            <p>₹${productPrice.toLocaleString()}</p>
                            <button onclick="addToCartFromWishlist('${productName}', ${productPrice})">🛒 Add to Cart</button>
                            <button onclick="removeFromWishlist(${index})">❌ Remove</button>
                        </div>
                    `;
                    wishlistItemsList.appendChild(listItem);
                } catch (error) {
                    console.error("Error displaying wishlist item:", error);
                }
            }
        } else {
            wishlistItemsList.innerHTML = "<p>Your wishlist is empty. Start adding products!</p>";
        }
    }

    window.addToCartFromWishlist = (productName, price) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex(item => item.name === productName);
        
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push({
                name: productName,
                price: price,
                quantity: 1,
                image: getProductImage(productName)
            });
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "cart.html";
    };

    window.removeFromWishlist = (index) => {
        if (index >= 0 && index < wishlist.length) {
            wishlist.splice(index, 1);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            updateWishlistDisplay();
        }
    };

    updateWishlistDisplay();
});
