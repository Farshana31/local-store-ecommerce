const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API to get products
app.get('/api/products', (req, res) => {
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading data" });
        }
        res.json(JSON.parse(data));
    });
});

// API for Checkout processing & permanent saving
app.post('/api/checkout', (req, res) => {
    const newOrder = {
        orderId: "ORD" + Date.now(),
        date: new Date().toLocaleString(),
        itemsCount: req.body.items.length,
        totalAmount: req.body.total,
        items: req.body.items
    };

    // orders.json 
    fs.readFile('orders.json', 'utf8', (err, data) => {
        let orders = [];
        if (!err && data) {
            orders = JSON.parse(data);
        }
        orders.push(newOrder);

        fs.writeFile('orders.json', JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                console.log("❌ Error saving order to file");
                return res.status(500).json({ error: "Failed to save order" });
            }
            
            console.log(`\n=========== NEW ORDER PLACED ===========`);
            console.log(`Order ID: ${newOrder.orderId}`);
            console.log(`Total Items: ${newOrder.itemsCount}`);
            console.log(`Total Amount Received: ₹${newOrder.totalAmount}`);
            console.log(`========================================\n`);

            res.json({ success: true, message: "🛍️ Order Successfully Received & Saved by Backend!" });
        });
    });
});


app.listen(PORT, () => console.log(`🚀 Live Server running at http://localhost:${PORT}`));
// Serve frontend static files
const path = require('path');
app.use(express.static(path.join(__dirname)));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
