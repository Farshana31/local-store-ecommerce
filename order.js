// orders.js - Backend tool to view placed orders

const fs = require('fs');
const path = require('path');

const ORDERS_FILE = path.join(__dirname, 'orders.json');

/**
 * Function to read all orders from orders.json
 */
function getAllOrders() {
    try {
        if (!fs.existsSync(ORDERS_FILE)) {
            console.log("ℹ️ No orders found yet! (orders.json file does not exist)");
            return [];
        }
        const data = fs.readFileSync(ORDERS_FILE, 'utf8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error("❌ Error reading the orders file:", error.message);
        return [];
    }
}

/**
 * Function to display all placed orders beautifully in the terminal
 */
function displayOrdersSummary() {
    const orders = getAllOrders();
    
    if (orders.length === 0) {
        console.log("\n========================================");
        console.log("🛒 NO ORDERS FOUND IN THE BACKEND");
        console.log("========================================\n");
        return;
    }

    console.log(`\n========================================`);
    console.log(`🛍️ TOTAL ORDERS PLACED: ${orders.length}`);
    console.log(`========================================`);

    orders.forEach((order, index) => {
        console.log(`\n📦 Order Number: #${index + 1}`);
        console.log(`🆔 Order ID   : ${order.orderId}`);
        console.log(`📅 Date & Time : ${order.date}`);
        console.log(`📦 Total Items : ${order.itemsCount}`);
        console.log(`💰 Total Amount: ₹${order.totalAmount}`);
        console.log(`----------------------------------------`);
        console.log("Purchased Items Details:");
        order.items.forEach(item => {
            console.log(`  - ${item.name} (Quantity: ${item.quantity || 1})`);
        });
        console.log(`========================================`);
    });
}

if (require.main === module) {
    displayOrdersSummary();
}

module.exports = {
    getAllOrders,
    displayOrdersSummary
};