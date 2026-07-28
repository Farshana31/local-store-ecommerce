const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all frontend files (HTML, CSS, JS) from the root folder
app.use(express.static(path.join(__dirname)));

// Specific routes or API fallback if any (e.g., handling orders/products json if needed)
// If you have specific API endpoints like app.get('/products'), they will work normally.

// Fallback to serve index.html for any frontend route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(Server is running smoothly on port ${PORT});
});
