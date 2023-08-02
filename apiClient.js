const express = require('express');
const axios = require('axios');

const app = express();

const apiKey = '5E5B8267';
const baseURL = 'https://fcinterviewapi01.azurewebsites.net/'; 

// Middleware to authorize requests using the API key
app.use((req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === apiKey) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.post('/signin', async (req, res) => {
  // Implement user sign-in logic here, validate the user credentials, and issue a token or session
  // Once the user is authenticated, you can store the user information in the session or generate a token to be used in future requests.
  // Had to improvise because I could not access API...
  const token = 'YOUR_GENERATED_TOKEN';
  res.json({ token });
});

app.post('/placeOrder', async (req, res) => {
  try {
    const orderData = req.body; 

    const response = await axios.post(`${baseURL}/orders`, orderData, {
      headers: { 'Content-Type': 'application/json' },
    });

    // Handle the response from the API and store the order details, if needed
    // Had to improvise because I could not access API...

    res.json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ success: false, message: 'Failed to place the order' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
