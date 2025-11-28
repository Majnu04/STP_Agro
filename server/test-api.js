const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';

console.log('🧪 Testing Backend API Endpoints...\n');

// Test 1: Health Check
async function testHealthCheck() {
  console.log('1. Testing Health Check...');
  try {
    const response = await axios.get('http://localhost:5000/api/health');
    console.log('   ✅ Health check passed');
    console.log('   Response:', response.data.message);
  } catch (error) {
    console.error('   ❌ Health check failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('   Server is not running! Start with: node server.js');
      process.exit(1);
    }
  }
  console.log('');
}

// Test 2: Register User
async function testRegister() {
  console.log('2. Testing User Registration...');
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      name: 'Test User',
      email: 'testuser' + Date.now() + '@example.com',
      phone: '9876543210',
      password: 'test123'
    });
    console.log('   ✅ Registration successful');
    authToken = response.data.token;
    console.log('   Token received:', authToken ? '✅' : '❌');
  } catch (error) {
    console.error('   ❌ Registration failed:', error.response?.data?.message || error.message);
  }
  console.log('');
}

// Test 3: Get Profile
async function testProfile() {
  console.log('3. Testing Get Profile (GET /api/auth/me)...');
  if (!authToken) {
    console.log('   ⚠️  No auth token, skipping...');
    console.log('');
    return;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('   ✅ Profile retrieved successfully');
    console.log('   User:', response.data.user.name);
    console.log('   Email:', response.data.user.email);
  } catch (error) {
    console.error('   ❌ Profile failed:', error.response?.data?.message || error.message);
  }
  console.log('');
}

// Test 4: Get Cart
async function testCart() {
  console.log('4. Testing Get Cart (GET /api/cart)...');
  if (!authToken) {
    console.log('   ⚠️  No auth token, skipping...');
    console.log('');
    return;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('   ✅ Cart retrieved successfully');
    console.log('   Items in cart:', response.data.cart.totalItems);
    console.log('   Total price:', response.data.cart.totalPrice);
  } catch (error) {
    console.error('   ❌ Cart failed:', error.response?.data?.message || error.message);
  }
  console.log('');
}

// Test 5: Get Products
async function testProducts() {
  console.log('5. Testing Get Products...');
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    console.log('   ✅ Products retrieved successfully');
    console.log('   Total products:', response.data.total || response.data.count);
  } catch (error) {
    console.error('   ❌ Products failed:', error.response?.data?.message || error.message);
  }
  console.log('');
}

// Run all tests
async function runTests() {
  await testHealthCheck();
  await testRegister();
  await testProfile();
  await testCart();
  await testProducts();
  
  console.log('✅ All tests completed!\n');
  
  if (authToken) {
    console.log('Your auth token for manual testing:');
    console.log(authToken);
  }
  
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test suite error:', err);
  process.exit(1);
});
