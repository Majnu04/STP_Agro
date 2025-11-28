# Quick Start Guide - Backend Setup

## Step 1: Install Dependencies
```bash
cd server
npm install
```

## Step 2: Database Setup

### Option A: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - Windows: MongoDB runs as a service automatically
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string
5. Update `.env` file with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agri_stp
   ```

## Step 3: Environment Variables
The `.env` file is already created. Update if needed:
- `MONGODB_URI` - Your database connection (if using Atlas)
- `JWT_SECRET` - Keep secure in production
- `FRONTEND_URL` - Update if frontend runs on different port

## Step 4: Seed Database (Optional)
Add sample products to database:
```bash
npm run seed
```

## Step 5: Start Server
```bash
npm run dev
```

Server will run on http://localhost:5000

## Step 6: Test API
Open browser and visit:
- http://localhost:5000 - Welcome message
- http://localhost:5000/api/health - Health check
- http://localhost:5000/api/products - Get products

## API Endpoints Summary

### Public Endpoints (No auth required)
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- GET /api/categories - Get categories

### Protected Endpoints (Auth required)
- GET /api/auth/me - Get current user
- GET /api/cart - Get user cart
- POST /api/cart - Add to cart
- POST /api/orders - Create order
- GET /api/orders/myorders - Get user orders

### Admin Endpoints
- POST /api/products - Create product
- PUT /api/products/:id - Update product
- DELETE /api/products/:id - Delete product
- GET /api/users - Get all users

## Testing with Postman/Thunder Client

### 1. Register User
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "9876543210",
  "password": "test123"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "test123"
}
```
Copy the `token` from response.

### 3. Get Products
```
GET http://localhost:5000/api/products
```

### 4. Add to Cart (Protected)
```
POST http://localhost:5000/api/cart
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
Body (JSON):
{
  "productId": "PRODUCT_ID_FROM_PRODUCTS",
  "quantity": 2
}
```

## Common Issues

### Issue: MongoDB Connection Error
**Solution**: 
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- For Atlas: Check network access and whitelist your IP

### Issue: Port 5000 already in use
**Solution**: 
- Change PORT in .env to 5001 or other port
- Or stop process using port 5000

### Issue: JWT Error
**Solution**: 
- Make sure JWT_SECRET is set in .env
- Check token format in Authorization header

## Next Steps

1. ✅ Backend API is running
2. Connect frontend to backend
3. Update frontend API calls to use `http://localhost:5000/api`
4. Test registration and login
5. Test product listing
6. Test cart and orders

## Production Deployment

For production, update:
- Use strong JWT_SECRET
- Use MongoDB Atlas
- Set NODE_ENV=production
- Enable HTTPS
- Update FRONTEND_URL to production domain
