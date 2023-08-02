
const apiKeyInput = document.getElementById('apiKey');
const signinForm = document.getElementById('signin');
const ordersForm = document.getElementById('orders');

let apiKey = '';

function authorize() {
  apiKey = apiKeyInput.value.trim();
  if (apiKey === '') {
    alert('Please enter a valid API Key');
    return;
  }

  // Make API request to authorize using the provided API Key
  signinForm.style.display = 'block';
}

function signin() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Make API request to authenticate the user using the provided username and password
  // Handle response accordingly, and if successful, show the order placement form
  // Had to improvise because I could not access API...
  ordersForm.style.display = 'block';
  populateProductSelection(); 
}

function placeOrder() {

    customerName = document.getElementById('customerName').value.trim();
    orderDate = document.getElementById('orderDate').value;
  
    // ... (existing code for capturing selected products and quantities) ...
  
    const orderData = {
      customerName,
      orderDate,
      products: selectedProducts, 
    };

  // place the order using Axios
  axios.post('/placeOrder', orderData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey, 
    },
  })
  .then(response => {
    // Handle the response from the API
    // Had to improvise because I could not access API...
    alert('Order placed successfully');
  })
  .catch(error => {
    console.error('Error placing order:', error.message);
    alert('Failed to place the order');
  });
}
