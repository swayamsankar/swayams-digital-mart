-- Database Creation
CREATE DATABASE IF NOT EXISTS swayams_digital_mart;
USE swayams_digital_mart;

-- Table Definitions
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    average_rating DECIMAL(3,2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE (user_id, product_id)
);

-- Data Insertions
INSERT INTO users (name, email, password) VALUES
('swayam sankar', 'swayamsankar@example.com', 'swayam12'),
('Anshuman', 'anshuman12@example.com', 'anshuman23'),
('Aditya', 'aditya@example.com', 'aditya34');

INSERT INTO products (name, price, average_rating) VALUES
('Headphones', 1299.00, 4.50),
('Earbuds', 799.99, 4.20),
('Smartwatch', 3000.00, 4.00),
('Laptop', 60000.00, 4.30),
('Phone', 40000.00, 4.10);

