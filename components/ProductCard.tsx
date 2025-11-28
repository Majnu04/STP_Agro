import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onProductClick?: () => void;
  t: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductClick, t }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div 
      className="bg-white border border-cream-200 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group flex flex-col h-full relative group cursor-pointer"
      onClick={onProductClick}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
         {product.discount > 0 && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
            {product.discount}% OFF
          </span>
        )}
      </div>
      
      <button 
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300 shadow-sm ${
          isWishlisted 
            ? 'bg-red-50 text-red-500 opacity-100' 
            : 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0'
        }`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
      </button>

      {/* Image Area */}
      <div className="relative h-56 overflow-hidden bg-cream-50 p-6 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
        />
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <button className="bg-white text-warm-text px-5 py-2.5 rounded-full font-bold text-xs shadow-xl flex items-center hover:text-agri-green transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105">
             <Eye size={16} className="mr-2" /> {t.quickView}
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-[10px] font-bold text-agri-green uppercase tracking-widest mb-2 bg-agri-light w-fit px-2 py-0.5 rounded">{product.category}</p>
        <h3 className="font-bold text-warm-text text-base mb-2 line-clamp-2 min-h-[40px] leading-snug group-hover:text-agri-green transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex bg-green-100 px-1.5 py-0.5 rounded text-green-800 text-xs font-bold items-center mr-2">
            {product.rating} <Star size={10} className="fill-current ml-1" />
          </div>
          <span className="text-xs text-warm-muted font-medium">({product.reviews} reviews)</span>
        </div>

        <div className="mt-auto pt-4 border-t border-cream-200">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-warm-text">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-warm-muted line-through font-medium">{t.mrp}: ₹{product.originalPrice}</span>
              )}
            </div>
            
            <button 
              className={`p-2.5 rounded-xl transition-all duration-300 ${product.inStock ? 'bg-warm-text text-white hover:bg-agri-green shadow-md hover:shadow-lg hover:-translate-y-0.5' : 'bg-cream-100 text-warm-muted cursor-not-allowed'}`}
              disabled={!product.inStock}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.inStock) onAddToCart();
              }}
              title={product.inStock ? t.addToCart : t.outOfStock}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
          {!product.inStock && <p className="text-[10px] text-red-500 mt-2 font-bold text-center bg-red-50 py-1 rounded">{t.outOfStock}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;