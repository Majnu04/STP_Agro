import React from 'react';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  t: any;
}

const Cart: React.FC<CartProps> = ({ onClose, items, onUpdateQuantity, onRemove, t }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 50;
  const total = subtotal + shipping;

  const handleCheckoutViaWhatsApp = () => {
    if (items.length === 0) return;
    const destination = '919676606857'; // Business WhatsApp number
    const lines = [
      'New order inquiry from STP Agro:',
      '',
      ...items.map((item, idx) => `${idx + 1}. ${item.name} (x${item.quantity}) — ₹${item.price} each`),
      '',
      `Subtotal: ₹${subtotal}`,
      `Shipping: ${shipping === 0 ? 'FREE' : `₹${shipping}`}`,
      `Total: ₹${total}`
    ];

    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${destination}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:justify-end bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full md:w-[500px] h-[90vh] md:h-full md:max-h-[90vh] rounded-t-3xl md:rounded-l-3xl md:rounded-r-none shadow-2xl flex flex-col animate-in slide-in-from-bottom md:slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-agri-green rounded-full flex items-center justify-center">
              <ShoppingCart className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t?.cart || 'Shopping Cart'}</h2>
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
                <ShoppingCart size={48} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t?.emptyCart || 'Your cart is empty'}</h3>
              <p className="text-gray-500 text-sm mb-6">{t?.startShopping || 'Add products to get started!'}</p>
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
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-agri-green text-white hover:bg-agri-darkGreen transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="self-start p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 space-y-4">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t?.subtotal || 'Subtotal'}</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t?.shipping || 'Shipping'}</span>
                <span className="font-semibold">{shipping === 0 ? t?.free || 'FREE' : `₹${shipping}`}</span>
              </div>
              {subtotal < 999 && (
                <p className="text-xs text-agri-green">
                  {t?.addMore || 'Add'} ₹{999 - subtotal} {t?.forFreeShipping || 'more for free shipping!'}
                </p>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
                <span>{t?.total || 'Total'}</span>
                <span className="text-agri-green">₹{total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={handleCheckoutViaWhatsApp}
              className="w-full bg-gradient-to-r from-agri-green to-green-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              {t?.proceedToCheckout || 'Proceed to Checkout'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
