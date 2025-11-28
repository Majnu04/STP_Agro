# STP Agro Backend - Quick Test Guide

## Test if Backend is Working

### 1. Start the Server
```bash
cd server
node server.js
```

You should see:
```
✅ MongoDB Connected: localhost
📦 Database: agri_stp
🚀 Server running in development mode on port 5000
```

### 2. Test Health Check
Open browser or use curl:
```bash
http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "STP Agro API is running",
  "timestamp": "2025-11-27T..."
}
```

### 3. Test Registration (Create User)
Use Postman, Thunder Client, or curl:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "9876543210",
  "password": "test123"
}
```

Expected response:
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "role": "user"
  }
}
```

**IMPORTANT**: Copy the `token` from response!

### 4. Test Profile (GET /api/auth/me)
```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

Expected response:
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "role": "user"
  }
}
```

### 5. Test Cart (GET /api/cart)
```bash
GET http://localhost:5000/api/cart
Authorization: Bearer YOUR_TOKEN_HERE
```

Expected response:
```json
{
  "success": true,
  "cart": {
    "_id": "...",
    "user": "...",
    "items": [],
    "totalItems": 0,
    "totalPrice": 0
  }
}
```

### 6. Test Products
```bash
GET http://localhost:5000/api/products
```

If no products, seed the database:
```bash
node seedData.js
```

## Common Issues & Solutions

### Issue 1: MongoDB Connection Error
**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions**:
- Install MongoDB locally: https://www.mongodb.com/try/download/community
- OR use MongoDB Atlas (cloud):
  1. Create account at https://mongodb.com/cloud/atlas
  2. Create free cluster
  3. Get connection string
  4. Update `.env`: `MONGODB_URI=mongodb+srv://...`

### Issue 2: JWT Error / Profile Not Working
**Error**: `Not authorized` or `User not found`

**Solution**: 
- Make sure you're including the token in Authorization header
- Format: `Bearer YOUR_TOKEN`
- The token must be from a successful login/register

### Issue 3: Cart Returns Empty
**Solution**: This is normal for new users. Add items using POST /api/cart

### Issue 4: Port 5000 Already in Use
**Solution**: 
- Change PORT in `.env` to 5001 or another port
- Or stop the process using port 5000

## Using Postman for Testing

1. Import `postman_collection.json` from server folder
2. Set environment variable `baseUrl` = `http://localhost:5000/api`
3. Register a user and copy the token
4. Set environment variable `token` = the token you copied
5. Now test all protected endpoints

## Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension
2. Create new request
3. For protected routes, add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN`

## Windows Quick Start

Double-click `start.bat` in the server folder to start the server automatically.

## Testing Sequence

1. ✅ Health Check: `GET /api/health`
2. ✅ Register: `POST /api/auth/register`
3. ✅ Login: `POST /api/auth/login`
4. ✅ Profile: `GET /api/auth/me` (with token)
5. ✅ Cart: `GET /api/cart` (with token)
6. ✅ Products: `GET /api/products`
7. ✅ Add to Cart: `POST /api/cart` (with token)

## Troubleshooting Cart Issues

If cart is not working:

1. Check if user is authenticated (token valid)
2. Check MongoDB is connected
3. Check Cart model exists in database
4. Check console for error messages

Common cart errors:
- `Cart not found` - Normal, will auto-create on first access
- `Product not found` - Need to seed products first
- `Insufficient stock` - Product stock is 0 or less than quantity

## Need Help?

Check server logs for detailed error messages. Most issues are related to:
1. MongoDB not running
2. Missing or invalid JWT token
3. Database not seeded with products
