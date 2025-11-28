# DigitalOcean Spaces Image Upload - Setup Guide

## Overview
Your admin panel now supports cloud image storage using DigitalOcean Spaces (S3-compatible storage).

## Configuration

### 1. Environment Variables
The credentials are already configured in `server/.env`:

```env
DO_SPACES_ENDPOINT=https://sfo3.digitaloceanspaces.com
DO_SPACES_KEY=DO00F3D6LNCQKU9UBP8B
DO_SPACES_SECRET=kkqwxX45VbW2y51OY57OBepwNrwNSUzc0oXRWBGvjlw
DO_SPACES_BUCKET=stpagro
DO_SPACES_REGION=sfo3
```

### 2. DigitalOcean Spaces Setup
Make sure your Spaces bucket is configured:
- **Bucket Name**: `stpagro`
- **Region**: SFO3 (San Francisco)
- **Access**: Public read access for product images
- **CORS**: Enable CORS for your frontend domain

## How It Works

### Image Upload Flow
1. Admin selects image file in Admin Panel
2. File is uploaded to backend API (`/api/upload/image`)
3. Backend uploads to DigitalOcean Spaces
4. Returns public URL
5. URL is saved in product data

### API Endpoints

#### Upload Single Image
```
POST /api/upload/image
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

Body: { image: <file> }

Response: {
  success: true,
  url: "https://stpagro.sfo3.digitaloceanspaces.com/products/123456.jpg",
  key: "products/123456.jpg"
}
```

#### Upload Multiple Images
```
POST /api/upload/multiple
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

Body: { images: [<file1>, <file2>, ...] }
```

#### Delete Image
```
DELETE /api/upload/image
Authorization: Bearer <admin-token>
Content-Type: application/json

Body: { imageUrl: "<full-spaces-url>" }
```

## Using the Admin Panel

### 1. Login as Admin
- Email: `admin@stpagro.com`
- Password: `admin123`

### 2. Upload Product Images
1. Click "Admin" shield icon in navbar
2. Add or edit a product
3. Click "Upload" button in image section
4. Select image file (JPEG, PNG, GIF, WebP)
5. Image uploads to cloud automatically
6. Save product

### 3. Image Specifications
- **Max Size**: 5MB
- **Formats**: JPEG, JPG, PNG, GIF, WebP
- **Storage**: DigitalOcean Spaces (CDN-enabled)

## File Structure

```
server/
├── config/
│   └── spaces.js          # S3/Spaces configuration
├── routes/
│   └── upload.js          # Upload API routes
├── .env                   # Environment variables
└── server.js              # Main server (includes upload routes)

frontend/
└── pages/
    └── Admin.tsx          # Admin panel with upload UI
```

## Features

✅ Cloud storage on DigitalOcean Spaces
✅ CDN-delivered images for fast loading
✅ Admin-only upload access
✅ File type validation
✅ File size limits (5MB)
✅ Auto-generated unique filenames
✅ Public read access for images
✅ Image deletion support
✅ Fallback to base64 if upload fails

## Troubleshooting

### Images not uploading?
1. Check if backend server is running on port 5000
2. Verify DigitalOcean Spaces credentials in `.env`
3. Ensure bucket exists and has public read access
4. Check CORS settings on Spaces bucket

### Images not displaying?
1. Verify image URL is publicly accessible
2. Check CORS configuration
3. Ensure bucket has correct permissions

### Upload fails?
- System automatically falls back to base64 encoding
- Images still work, but stored locally in browser
- Fix backend connection to use cloud storage

## Security Notes

⚠️ **IMPORTANT**: 
- Admin authentication required for all uploads
- Only authenticated admins can upload/delete images
- JWT token validation on all upload endpoints
- File type validation prevents malicious uploads
- File size limits prevent abuse

## Next Steps

1. **Start backend server**:
   ```bash
   cd server
   npm start
   ```

2. **Test upload**:
   - Login as admin
   - Try uploading a product image
   - Verify URL points to DigitalOcean Spaces

3. **Configure CORS** (if needed):
   - Go to DigitalOcean Spaces settings
   - Add CORS rules for your frontend domain

## Production Checklist

- [ ] Rotate access keys before going live
- [ ] Set up proper CORS rules
- [ ] Enable CDN on Spaces bucket
- [ ] Add image optimization/compression
- [ ] Set up backup strategy
- [ ] Monitor storage usage
- [ ] Implement image moderation (if needed)

## Support

For issues or questions:
- Check server logs: `server/logs/`
- Verify environment variables
- Test API endpoints with Postman
- Check DigitalOcean Spaces dashboard
