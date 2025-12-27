const express = require('express');
const router = express.Router();
const {
  upload,
  deleteImage,
  isSpacesConfigured,
  missingSpacesEnv
} = require('../config/spaces');
const { protect, admin } = require('../middleware/auth');

// Disable upload routes when DigitalOcean Spaces is not configured
router.use((req, res, next) => {
  if (!isSpacesConfigured) {
    return res.status(503).json({
      success: false,
      message: 'Image upload is disabled: DigitalOcean Spaces environment variables are missing.',
      missingEnv: missingSpacesEnv
    });
  }
  next();
});

// @route   POST /api/upload/image
// @desc    Upload product image to DigitalOcean Spaces
// @access  Private/Admin (temporarily disabled auth for testing)
router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No file uploaded' 
      });
    }

    console.log('File uploaded successfully:', req.file.location);

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      url: req.file.location,
      key: req.file.key
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error uploading image',
      error: error.message 
    });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple product images
// @access  Private/Admin
router.post('/multiple', protect, admin, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadedFiles = req.files.map(file => ({
      url: file.location,
      key: file.key
    }));

    res.json({
      success: true,
      message: `${uploadedFiles.length} images uploaded successfully`,
      files: uploadedFiles
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error uploading images',
      error: error.message 
    });
  }
});

// @route   DELETE /api/upload/image
// @desc    Delete image from DigitalOcean Spaces
// @access  Private/Admin
router.delete('/image', protect, admin, async (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const deleted = await deleteImage(imageUrl);

    if (deleted) {
      res.json({
        success: true,
        message: 'Image deleted successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to delete image'
      });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error deleting image',
      error: error.message 
    });
  }
});

module.exports = router;
