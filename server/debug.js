const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Debugging Backend Configuration...\n');

// Check environment variables
console.log('1. Environment Variables:');
console.log('   PORT:', process.env.PORT || '5000 (default)');
console.log('   MONGODB_URI:', process.env.MONGODB_URI || '❌ NOT SET');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ SET' : '❌ NOT SET');
console.log('   FRONTEND_URL:', process.env.FRONTEND_URL || 'http://localhost:3000 (default)');
console.log('');

// Test MongoDB connection
console.log('2. Testing MongoDB Connection...');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agri_stp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('   ✅ MongoDB Connected Successfully');
  console.log('   Host:', mongoose.connection.host);
  console.log('   Database:', mongoose.connection.name);
  console.log('');
  
  // Check collections
  console.log('3. Checking Database Collections...');
  mongoose.connection.db.listCollections().toArray()
    .then(collections => {
      if (collections.length === 0) {
        console.log('   ⚠️  No collections found. Run "node seedData.js" to add sample data.');
      } else {
        console.log('   Found collections:');
        collections.forEach(col => {
          console.log('   -', col.name);
        });
      }
      console.log('');
      
      // Count documents
      console.log('4. Document Counts:');
      return Promise.all([
        mongoose.connection.db.collection('users').countDocuments(),
        mongoose.connection.db.collection('products').countDocuments(),
        mongoose.connection.db.collection('carts').countDocuments(),
        mongoose.connection.db.collection('orders').countDocuments(),
      ]);
    })
    .then(([users, products, carts, orders]) => {
      console.log('   Users:', users);
      console.log('   Products:', products);
      console.log('   Carts:', carts);
      console.log('   Orders:', orders);
      console.log('');
      
      if (products === 0) {
        console.log('⚠️  No products found! Run: node seedData.js');
      }
      
      console.log('✅ Diagnostic complete!\n');
      process.exit(0);
    })
    .catch(err => {
      console.error('   ❌ Error checking collections:', err.message);
      process.exit(1);
    });
})
.catch((err) => {
  console.error('   ❌ MongoDB Connection Failed:', err.message);
  console.log('');
  console.log('Solutions:');
  console.log('1. Install MongoDB: https://www.mongodb.com/try/download/community');
  console.log('2. Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas');
  console.log('3. Update MONGODB_URI in .env file');
  console.log('');
  process.exit(1);
});
