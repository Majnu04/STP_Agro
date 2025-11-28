const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [200, 'Name cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Fertilizers', 'Seeds', 'Pesticides', 'Tools', 'Organic']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    default: function() { return this.price; }
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  image: {
    type: String,
    required: [true, 'Please provide a product image'],
    default: 'default-product.png'
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  unit: {
    type: String,
    default: 'kg',
    enum: ['kg', 'g', 'l', 'ml', 'packet', 'piece']
  },
  weight: {
    type: String,
    default: '1kg'
  },
  brand: {
    type: String,
    default: 'Generic'
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot exceed 5']
  },
  reviews: {
    type: Number,
    default: 0
  },
  crops: [{
    type: String
  }],
  concerns: [{
    type: String
  }],
  features: [{
    type: String
  }],
  usage: {
    type: String
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  manufacturer: {
    type: String
  },
  expiryDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Update inStock based on stock quantity
productSchema.pre('save', function(next) {
  this.inStock = this.stock > 0;
  next();
});

// Calculate discount percentage
productSchema.pre('save', function(next) {
  if (this.originalPrice > this.price) {
    this.discount = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
