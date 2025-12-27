const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const requiredEnv = [
  'DO_SPACES_ENDPOINT',
  'DO_SPACES_KEY',
  'DO_SPACES_SECRET',
  'DO_SPACES_REGION',
  'DO_SPACES_BUCKET'
];

const missingSpacesEnv = requiredEnv.filter((key) => !process.env[key]);
const isSpacesConfigured = missingSpacesEnv.length === 0;

if (!isSpacesConfigured) {
  console.warn(
    'DigitalOcean Spaces is not configured. Image upload routes will respond with 503. Missing:',
    missingSpacesEnv.join(', ')
  );
}

// Configure DigitalOcean Spaces only when env vars are present
const spacesEndpoint = isSpacesConfigured ? new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT) : null;
const s3 = isSpacesConfigured
  ? new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.DO_SPACES_KEY,
      secretAccessKey: process.env.DO_SPACES_SECRET,
      region: process.env.DO_SPACES_REGION,
      s3ForcePathStyle: false,
      signatureVersion: 'v4'
    })
  : null;

// Configure multer for S3 upload
const upload = multer({
  storage: isSpacesConfigured
    ? multerS3({
        s3,
        bucket: process.env.DO_SPACES_BUCKET,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, `products/${uniqueSuffix}${ext}`);
        }
      })
    : multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Delete image from Spaces
const deleteImage = async (imageUrl) => {
  try {
    if (!isSpacesConfigured) {
      console.warn('Delete skipped: DigitalOcean Spaces is not configured.');
      return false;
    }

    const key = imageUrl.split('.com/')[1];
    await s3.deleteObject({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: key
    }).promise();
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

module.exports = {
  upload,
  s3,
  deleteImage,
  isSpacesConfigured,
  missingSpacesEnv
};
