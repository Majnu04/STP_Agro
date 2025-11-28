import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Heart, Star, Check, Truck, Shield, RotateCcw } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  discount: number;
  inStock: boolean;
  description?: string;
  features?: string[];
}

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isInWishlist: boolean;
  t: any;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  t
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [product.image, product.image, product.image]; // In real app, product would have multiple images

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full animate-in fade-in zoom-in duration-300 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t?.productDetails || 'Product Details'}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 lg:p-8 max-h-[calc(100vh-100px)] overflow-y-auto">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-4 md:p-8"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </div>
              )}
              <button
                onClick={() => onToggleWishlist(product.id.toString())}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                  isInWishlist
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-red-50'
                }`}
              >
                <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-agri-green shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-2 bg-gray-50" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <div className="inline-block px-3 py-1 bg-green-50 text-agri-green text-sm font-semibold rounded-full uppercase">
              {product.category}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} {t?.reviews || 'reviews'})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                  <span className="text-green-600 font-semibold">Save ₹{product.originalPrice - product.price}</span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className={`flex items-center gap-2 text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              <Check size={18} />
              {product.inStock ? (t?.inStock || 'In Stock') : (t?.outOfStock || 'Out of Stock')}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{t?.description || 'Description'}</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'High-quality agricultural product designed to enhance your farming productivity. Made with premium materials and tested for optimal results.'}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{t?.features || 'Key Features'}</h3>
              <ul className="space-y-2">
                {(product.features || [
                  'Premium Quality Product',
                  'Trusted by Farmers',
                  'Easy to Use',
                  'Long Lasting Performance'
                ]).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600">
                    <Check size={16} className="text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900">{t?.quantity || 'Quantity'}:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-6 py-2 font-semibold border-x-2 border-gray-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-gradient-to-r from-agri-green to-green-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                {t?.addToCart || 'Add to Cart'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <Truck className="text-agri-green" size={20} />
                </div>
                <span className="text-xs font-medium text-gray-600">{t?.freeShipping || 'Free Shipping'}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Shield className="text-blue-600" size={20} />
                </div>
                <span className="text-xs font-medium text-gray-600">{t?.securePayment || 'Secure Payment'}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                  <RotateCcw className="text-orange-600" size={20} />
                </div>
                <span className="text-xs font-medium text-gray-600">{t?.easyReturns || 'Easy Returns'}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
