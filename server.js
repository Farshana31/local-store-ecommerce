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

// Start the server cleanly
app.listen(PORT, () => {
    console.log("Server is running smoothly on port " + PORT);
});
