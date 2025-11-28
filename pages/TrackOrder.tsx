import React, { useState } from 'react';
import { X, Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface TrackOrderProps {
  onClose: () => void;
  t: any;
}

const TrackOrder: React.FC<TrackOrderProps> = ({ onClose, t }) => {
  const [orderId, setOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Load orders from localStorage
    setTimeout(() => {
      if (orderId.trim()) {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
          const orders = JSON.parse(savedOrders);
          const foundOrder = orders.find((o: any) => o.orderId === orderId.trim());
          
          if (foundOrder) {
            setTrackingResult(foundOrder);
          } else {
            setTrackingResult(null);
          }
        } else {
          setTrackingResult(null);
        }
      } else {
        setTrackingResult(null);
      }
      setIsSearching(false);
    }, 500);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (!completed) return <Clock size={20} className="text-gray-400" />;
    
    switch (status) {
      case 'Order Placed':
      case 'Order Confirmed':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'Packed':
        return <Package size={20} className="text-green-500" />;
      case 'Shipped':
      case 'In Transit':
        return <Truck size={20} className="text-green-500" />;
      case 'Out for Delivery':
      case 'Delivered':
        return <CheckCircle size={20} className="text-green-500" />;
      default:
        return <Clock size={20} className="text-gray-400" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-in fade-in zoom-in duration-300 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-agri-green to-green-600 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Truck className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t?.trackOrder || 'Track Order'}</h2>
                <p className="text-green-100 text-sm">{t?.trackOrderSub || 'Enter your order ID to track'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Search Form */}
            <form onSubmit={handleTrack} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t?.orderId || 'Order ID'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder={t?.enterOrderId || 'Enter your order ID (e.g., ORD12345)'}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-agri-green focus:outline-none transition-colors"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full bg-gradient-to-r from-agri-green to-green-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSearching ? (t?.searching || 'Searching...') : (t?.trackNow || 'Track Now')}
              </button>
            </form>

            {/* Tracking Results */}
            {trackingResult && (
              <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                {/* Order Summary */}
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">{t?.orderId || 'Order ID'}</p>
                      <p className="font-bold text-gray-900">#{trackingResult.orderId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">{t?.orderDate || 'Order Date'}</p>
                      <p className="font-bold text-gray-900">{trackingResult.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">{t?.currentLocation || 'Current Location'}</p>
                      <p className="font-bold text-gray-900">{trackingResult.currentLocation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">{t?.estimatedDelivery || 'Est. Delivery'}</p>
                      <p className="font-bold text-green-600">{trackingResult.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">{t?.orderTimeline || 'Order Timeline'}</h3>
                  <div className="space-y-4">
                    {trackingResult.timeline.map((item: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`p-2 rounded-full ${item.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {getStatusIcon(item.status, item.completed)}
                          </div>
                          {index < trackingResult.timeline.length - 1 && (
                            <div className={`w-0.5 h-12 ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className={`font-semibold ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                            {item.status}
                          </p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-900">
                    <strong>{t?.needHelp || 'Need Help?'}</strong> {t?.contactSupport || 'Contact our support team at'} <a href="tel:+919676606857" className="font-bold text-blue-600 hover:underline">+91 96766 06857</a>
                  </p>
                </div>
              </div>
            )}

            {/* No Results */}
            {orderId && !trackingResult && !isSearching && (
              <div className="text-center py-8 animate-in fade-in duration-300">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-600">{t?.noOrderFound || 'No order found with this ID'}</p>
                <p className="text-sm text-gray-500 mt-2">{t?.checkOrderId || 'Please check your order ID and try again'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
