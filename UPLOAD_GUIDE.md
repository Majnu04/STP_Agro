# How to Enable DigitalOcean Spaces Image Upload

## Quick Start Guide

### 1. Start the Backend Server

Open a new terminal and run:

```bash
cd C:\Users\shankar\Downloads\Agri_STP-main\Agri_STP-main\server
npm start
```

Or use nodemon for auto-restart:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 2. Verify Server is Running

You should see:
```
✓ MongoDB connected successfully
✓ Server running on port 5000
```

### 3. Login as Admin

1. Go to your frontend (http://localhost:3000 or http://localhost:5173)
2. Click Login
3. Enter credentials:
   - Email: `admin@stpagro.com`
   - Password: `admin123`
4. A token will be generated and stored automatically

### 4. Upload Images to DigitalOcean Spaces

1. Click the Admin shield icon in navbar
2. Add or Edit a product
3. Click "Upload" button
4. Select an image file
5. **Image uploads to DigitalOcean Spaces automatically!**
6. The URL will be: `https://stpagro.sfo3.digitaloceanspaces.com/products/xxxxx.jpg`

## How It Works

### Current Flow:
1. Admin selects image file
2. Frontend sends to: `POST http://localhost:5000/api/upload/image`
3. Backend uploads to DigitalOcean Spaces using AWS SDK
4. Returns public CDN URL
5. URL saved in product data

### Configuration Already Done:
✅ DigitalOcean credentials in `.env`
✅ AWS SDK configured in `config/spaces.js`
✅ Upload routes in `routes/upload.js`
✅ Frontend upload handler in `Admin.tsx`
✅ Token generation in `Login.tsx`

## Troubleshooting

### Images Not Uploading?

**Check if backend is running:**
```bash
# Open browser and visit:
http://localhost:5000/api/health
```

Should return: `{ "success": true, "message": "STP Agro API is running" }`

**Check logs:**
The console will show upload errors if any occur.

**Common Issues:**

1. **Backend not running** → Start server with `npm start`
2. **Port 5000 busy** → Change PORT in `.env` file
3. **MongoDB not running** → Install/start MongoDB or use MongoDB Atlas
4. **CORS error** → Already configured to allow localhost

### Fallback Behavior

If backend upload fails, the system automatically falls back to:
- Base64 encoding
- Images stored locally in browser
- Still works, but not on cloud

## Testing Upload

1. Start backend server
2. Login as admin
3. Open browser DevTools (F12) → Network tab
4. Upload an image
5. Look for POST request to `/api/upload/image`
6. Check response - should contain DigitalOcean Spaces URL

## Production Notes

For production deployment:
- Host backend on server (Heroku, AWS, DigitalOcean App Platform, etc.)
- Update FRONTEND_URL in backend `.env`
- Update API URL in Admin.tsx (line 96)
- Implement proper JWT authentication
- Enable CORS for your domain
- Set up SSL certificates

## Quick Commands

```bash
# Terminal 1: Start Backend
cd C:\Users\shankar\Downloads\Agri_STP-main\Agri_STP-main\server
npm start

# Terminal 2: Start Frontend
cd C:\Users\shankar\Downloads\Agri_STP-main\Agri_STP-main
npm run dev
```

Now your images will upload to DigitalOcean Spaces! 🚀
