import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistProps {
  onClose: () => void;
  items: Product[];
  onRemove: (productId: number) => void;
  onAddToCart: (product: Product) => void;
  t: any;
}

const Wishlist: React.FC<WishlistProps> = ({ onClose, items, onRemove, onAddToCart, t }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:justify-end bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full md:w-[450px] h-[90vh] md:h-full md:max-h-[90vh] rounded-t-3xl md:rounded-l-3xl md:rounded-r-none shadow-2xl flex flex-col animate-in slide-in-from-bottom md:slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="text-red-500 fill-current" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t?.wishlist || 'Wishlist'}</h2>
              <p className="text-xs text-gray-500">{items.length} {t?.items || 'items'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart size={48} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t?.emptyWishlist || 'Your wishlist is empty'}</h3>
              <p className="text-gray-500 text-sm mb-6">{t?.startAdding || 'Start adding products you love!'}</p>
              <button
                onClick={onClose}
                className="bg-agri-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-agri-darkGreen transition-colors"
              >
                {t?.continueShopping || 'Continue Shopping'}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(item);
                      onRemove(item.id);
                    }}
                    disabled={!item.inStock}
                    className="p-2 bg-agri-green text-white rounded-lg hover:bg-agri-darkGreen transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                    title={t?.addToCart || 'Add to Cart'}
                  >
                    <ShoppingCart size={18} />
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                    title={t?.remove || 'Remove'}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100">
            <button
              onClick={() => {
                items.forEach(item => {
                  if (item.inStock) {
                    onAddToCart(item);
                  }
                });
                onClose();
              }}
              className="w-full bg-gradient-to-r from-agri-green to-green-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
            >
              {t?.addAllToCart || 'Add All to Cart'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
