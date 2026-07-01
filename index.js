require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require("http");
const bcrypt = require('bcrypt');
const app = express();
const server = http.createServer(app);


// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


// Middleware to parse form data and JSON 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
const database = require('./db');

database.connect((error) => {
    if (error) {
        console.error("Database connection error:", error);
        return;
    }
    console.log("Database connection interface is ready...");
});

// Redirect root to login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Serve homepage (sign up page)
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

// Sign-up handler
app.post('/handleform', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const SQL_COMMAND = "INSERT INTO customer(username, email, password) VALUES (?, ?, ?)";
        database.query(SQL_COMMAND, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.send("Registration unsuccessful");
            }
            res.redirect("/homepage.html");
        });
    } catch (err) {
        console.error(err);
        res.send("Registration unsuccessful");
    }
});

// Login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

// Login handler
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const SQL_COMMAND = "SELECT * FROM customer WHERE username = ?";
    database.query(SQL_COMMAND, [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.send("Login error");
        }

        if (results.length > 0) {
            const user = results[0];
            // Compare hashed password
            const isMatch = await bcrypt.compare(password, user.password);

            // Fallback for plain-text passwords during transition phase
            if (isMatch || password === user.password) {
                res.redirect("/homepage.html");
            } else {
                res.send("Invalid username or password");
            }
        } else {
            res.send("Invalid username or password");
        }
    });
});

// Homepage (after login)
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

// Order page
app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'order.html'));
});

// Place order handler
app.post('/orders', (req, res) => {
    try {
        const { phone, address, price } = req.body;
        const SQL_COMMAND = "INSERT INTO placed(phone, address) VALUES (?, ?)";
        database.query(SQL_COMMAND, [phone, address], (err, result) => {
            if (err) {
                console.error(err);
                return res.send("Order placement unsuccessful");
            }
            res.redirect(`/payment.html?amount=${price}`);
        });
    } catch (err) {
        console.error(err);
        res.send("Order placement unsuccessful");
    }
});

// Payment page
app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});

// Payment submit handler
app.post('/submit', (req, res) => {
    try {
        const { full_name, email, payment_method, card_number, expiry_date, cvv, upi_id, bank, cod } = req.body;
        const SQL_COMMAND = "INSERT INTO payment(full_name, email, payment_method, card_number, expiry_date, cvv, upi_id, bank, cod) VALUES (?,?,?,?,?,?,?,?,?)";

        database.query(SQL_COMMAND, [full_name, email, payment_method, card_number, expiry_date, cvv, upi_id, bank, cod], (err, result) => {
            if (err) {
                console.error(err);
                return res.send("Payment unsuccessful");
            }
            res.redirect("/last.html");
        });
    } catch (err) {
        console.error(err);
        res.send("Payment unsuccessful");
    }
});

const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
