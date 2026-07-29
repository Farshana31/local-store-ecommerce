const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files (HTML, CSS, JS) from root folder
app.use(express.static(__dirname));

// Fallback to serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//API Route to send product details to frontend
app.get('/products', (req,res) => {
    res.sendFile(path.join(__dirname,'products.json'));
});

const fs = require('fs');

// Checkout API to place order
app.post('/checkout', (req, res) => {
    const newOrder = req.body;
    
    fs.readFile(path.join(__dirname, 'orders.json'), 'utf8', (err, data) => {
        let orders = [];
        if (!err && data) {
            orders = JSON.parse(data);
        }
        orders.push(newOrder);
        
        fs.writeFile(path.join(__dirname, 'orders.json'), JSON.stringify(orders, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: "Order failed!" });
            }
            res.status(200).json({ message: "Order placed successfully!" });
        });
    });
});

// Start the server cleanly
app.listen(PORT, () => {
    console.log("Server is running smoothly on port " + PORT);
});
