
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS to allow requests from the frontend
app.use(cors());

// Parse JSON bodies for POST requests
app.use(bodyParser.json());

const apiKey = '5E5B8267';
// Had to improvise because I could not access API...
const databaseDAL = require('YOUR_DATABASE_DAL');

// Route for API Key authorization
app.post('/authorize', (req, res) => {
  const { authorization } = req.headers;
  if (authorization === apiKey) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
});

// Route for user sign-in
app.post('/signin', (req, res) => {
  // Add actual user authentication logic

  res.status(200).json({ success: true });
});

// Route for placing orders
app.post('/placeOrder', (req, res) => {
    const { customerName, orderDate, products } = req.body;
  
    // Validation on customer, date and products if necessary
  
    // Calculate the total order value (sum of products' prices)
    const totalOrderValue = products.reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0);
  
    // Apply discounts based on qualifying order values
    let discount = 0;
    if (totalOrderValue > 500) {
      discount = 0.1; // 10% discount for orders over R 500,00
    } else if (totalOrderValue > 200) {
      discount = 0.03; // 3% discount for orders over R 200,00
    }
  
    // Calculate the discounted order value
    const discountedOrderValue = totalOrderValue - (totalOrderValue * discount);
  
    // Save the order details to the database (using the provided DAL or database library)
    // Had to improvise because I could not access API...
    const orderData = {
      customerName,
      orderDate,
      products,
      totalOrderValue,
      discount,
      discountedOrderValue,
    };
  
    // Had to improvise because I could not access API...
    YOUR_DATABASE_DAL.placeOrder(orderData)
      .then(() => {
        res.status(200).json({ success: true, message: 'Order placed successfully' });
      })
      .catch((error) => {
        console.error('Error placing order:', error.message);
        res.status(500).json({ success: false, message: 'Failed to place the order' });
      });
  });
  
  // ... (other routes and middleware as needed) ...
  
  const port = 3000; // port number
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });