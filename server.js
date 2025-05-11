require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Swayam#2004',
    database: 'swayams_digital_mart',
    port: 3306,
    connectTimeout: 10000
});

db.connect((err) => {
    if (err) return console.error('Database connection failed:', err);
    console.log('Connected to MySQL database');
});

// Setup nodemailer transport (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // Your App Password
  }
});

// ---------- Routes ----------

// Fetch all products
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Buy product
app.post('/buy', (req, res) => {
    const { id } = req.body;
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const message = `You bought ${results[0].name} for $${results[0].price}`;
            const mail = {
                to: req.body.email,
                from: 'swayamsankar259@gmail.com',
                subject: 'Purchase Confirmation',
                text: message,
                html: `<strong>${message}</strong>`,
            };
            transporter.sendMail(mail);
            res.json({ message });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
});

// Add product to cart
app.post('/api/cart', (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    const checkQuery = 'SELECT * FROM cart WHERE user_id = ? AND product_id = ?';
    db.query(checkQuery, [userId, productId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (results.length > 0) {
            const updateQuery = 'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?';
            db.query(updateQuery, [quantity, userId, productId], (err) => {
                if (err) return res.status(500).json({ message: 'Failed to update cart' });
                res.status(200).json({ message: 'Cart updated', productId });
            });
        } else {
            const insertQuery = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
            db.query(insertQuery, [userId, productId, quantity], (err) => {
                if (err) return res.status(500).json({ message: 'Failed to add to cart' });
                res.status(200).json({ message: 'Added to Cart', productId });
            });
        }
    });
});

// Get cart
app.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT p.id, p.name, p.price, p.image, c.quantity
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching cart' });
    res.status(200).json(results);
  });
});

// Wishlist - Add
app.post('/api/wishlist', (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    const checkQuery = 'SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?';
    db.query(checkQuery, [userId, productId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error checking wishlist' });

        if (results.length > 0) {
            return res.status(200).json({ message: 'Product already in wishlist', productId });
        }

        const insertQuery = 'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)';
        db.query(insertQuery, [userId, productId], (err) => {
            if (err) return res.status(500).json({ message: 'Failed to add to wishlist' });
            res.status(200).json({ message: 'Added to Wishlist', productId });
        });
    });
});

// Wishlist - Get
app.get('/api/wishlist/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT p.id, p.name, p.price, p.image
    FROM wishlist w
    JOIN products p ON w.product_id = p.id
    WHERE w.user_id = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching wishlist items' });
    if (results.length === 0) return res.status(404).json({ message: 'No items found in wishlist' });
    res.json(results);
  });
});

// Upload image
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now+ path.extname(file.originalname));
    }
});
const upload = multer({ storage });
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ imagePath: `/uploads/${req.file.filename}` });
});

// Forgot password
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send('Database error');
        if (results.length === 0) return res.status(404).send('Email not found');

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000); // 1 hour

        db.query('INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)', [email, token, expires], (err) => {
            if (err) return res.status(500).send('Failed to save reset token');

            const resetLink = `http://localhost:3000/reset-password?token=${token}`;
            const mailOptions = {
                to: email,
                from: process.env.EMAIL_USER,
                subject: 'Password Reset Request',
                html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`
            };

            transporter.sendMail(mailOptions, (error) => {
                if (error) return res.status(500).send('Email failed');
                res.send('Reset link sent to your email.');
            });
        });
    });
});

// Reset password
app.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    db.query('SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()', [token], async (err, results) => {
        if (err) return res.status(500).send('Database error');
        if (results.length === 0) return res.status(400).send('Invalid or expired token');

        const email = results[0].email;
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query('Update users SET password = ? WHERE email = ?', [hashedPassword, email], (err) => {
            if (err) return res.status(500).send('Failed to update password');

            db.query('DELETE FROM password_resets WHERE email = ?', [email]);
            res.send('Password has been reset successfully.');
        });
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
