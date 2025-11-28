# STP Agro Fertilizers & Chemicals - Backend API

Complete backend API for the STP Agro e-commerce platform built with Node.js, Express, and MongoDB.

## Features

- ✅ User Authentication (Register, Login, JWT)
- ✅ Product Management (CRUD operations)
- ✅ Shopping Cart functionality
- ✅ Wishlist management
- ✅ Order Management with status tracking
- ✅ Admin dashboard capabilities
- ✅ Advanced product filtering and search
- ✅ Security features (Helmet, Rate Limiting)
- ✅ Input validation
- ✅ Error handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, bcryptjs, CORS, Rate Limiting
- **Validation**: express-validator

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agri_stp
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## Database Setup

### Local MongoDB
Install MongoDB locally and start the service.

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

### Seed Sample Data:
```bash
npm run seed
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (Protected)
- `PUT /profile` - Update profile (Protected)
- `PUT /password` - Change password (Protected)

### Products (`/api/products`)
- `GET /` - Get all products (with filters)
- `GET /search?q=term` - Search products
- `GET /category/:category` - Get by category
- `GET /:id` - Get single product
- `POST /` - Create product (Admin)
- `PUT /:id` - Update product (Admin)
- `DELETE /:id` - Delete product (Admin)

### Cart (`/api/cart`)
- `GET /` - Get user cart (Protected)
- `POST /` - Add to cart (Protected)
- `PUT /:productId` - Update quantity (Protected)
- `DELETE /:productId` - Remove item (Protected)
- `DELETE /` - Clear cart (Protected)

### Wishlist (`/api/wishlist`)
- `GET /` - Get wishlist (Protected)
- `POST /:productId` - Add to wishlist (Protected)
- `DELETE /:productId` - Remove from wishlist (Protected)
- `DELETE /` - Clear wishlist (Protected)

### Orders (`/api/orders`)
- `POST /` - Create order (Protected)
- `GET /myorders` - Get user orders (Protected)
- `GET /:id` - Get order details (Protected)
- `PUT /:id/cancel` - Cancel order (Protected)
- `GET /` - Get all orders (Admin)
- `PUT /:id/status` - Update status (Admin)

### Categories (`/api/categories`)
- `GET /` - Get all categories

### Users (`/api/users`) - Admin Only
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user

## API Query Parameters

### Products Filtering
```
GET /api/products?category=Fertilizers&minPrice=100&maxPrice=500&inStock=true&sortBy=price&order=asc&page=1&limit=12
```

Parameters:
- `category` - Filter by category
- `search` - Search in name/description
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `inStock` - Only in-stock items (true/false)
- `isOrganic` - Only organic products (true/false)
- `isFeatured` - Only featured products (true/false)
- `sortBy` - Sort field (price, rating, createdAt)
- `order` - Sort order (asc/desc)
- `page` - Page number
- `limit` - Items per page

## Authentication

API uses JWT tokens for authentication. Include token in headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Success Responses

All successful responses include:
```json
{
  "success": true,
  "data": {}
}
```

## Admin Credentials

Default admin account (after seeding):
```
Email: admin@stpagro.com
Password: Admin@123
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- Helmet for HTTP headers security
- CORS enabled
- Input validation
- MongoDB injection prevention

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/agri_stp |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | Token expiration | 7d |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |
| NODE_ENV | Environment | development |

## Development

### Project Structure
```
server/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── server.js        # Entry point
├── seedData.js      # Database seeding
└── package.json     # Dependencies
```

### Adding New Features

1. Create model in `models/`
2. Create controller in `controllers/`
3. Create routes in `routes/`
4. Register routes in `server.js`

## Testing

Use Postman or any API testing tool:
1. Import endpoints
2. Set environment variables
3. Test authentication flow
4. Test CRUD operations

## Deployment

### Heroku
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Vercel / Railway / Render
Follow platform-specific Node.js deployment guides.

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string
- Check network access (Atlas)

### JWT Error
- Verify JWT_SECRET is set
- Check token format
- Ensure token hasn't expired

### Port Already in Use
Change PORT in `.env` file

## Support

For issues and questions:
- Email: support@stpagro.com
- Phone: +91 98765 43210

## License

ISC License - Elite Tech Solutions
