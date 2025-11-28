import React from 'react';
import { X, Package, Truck, MapPin, Clock, DollarSign, AlertTriangle } from 'lucide-react';

interface ShippingPolicyProps {
  onClose: () => void;
  t: any;
}

const ShippingPolicy: React.FC<ShippingPolicyProps> = ({ onClose, t }) => {
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl my-8 overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 relative sticky top-0 z-10">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            title="Close"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Truck className="text-blue-600" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Shipping Policy</h2>
              <p className="text-blue-100 text-sm">Delivery information and guidelines</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Introduction */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
            <p className="text-gray-700 text-sm leading-relaxed">
              At STP Agro Fertilizers and Chemicals, we are committed to delivering your orders safely and efficiently. This Shipping Policy outlines our delivery procedures, timelines, and terms.
            </p>
          </div>

          {/* Shipping Coverage */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Shipping Coverage</h3>
            </div>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Delivery Areas</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li><strong>Local Delivery:</strong> Kanigiri and surrounding areas (5-10 km radius)</li>
                  <li><strong>Regional Delivery:</strong> Prakasam District and neighboring districts</li>
                  <li><strong>State-wide:</strong> All areas within Andhra Pradesh</li>
                  <li><strong>Pan-India:</strong> Major cities and towns across India (subject to availability)</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                <p className="text-yellow-800 text-xs">
                  <strong>Note:</strong> Some remote or inaccessible areas may not be serviceable. Please contact us to verify delivery availability for your location.
                </p>
              </div>
            </div>
          </section>

          {/* Delivery Time */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Delivery Timeline</h3>
            </div>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-green-600" />
                    Local Delivery (Kanigiri)
                  </h4>
                  <p className="text-gray-600"><strong>1-2 business days</strong></p>
                  <p className="text-xs text-gray-500 mt-1">Same-day delivery available for orders placed before 12 PM</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-blue-600" />
                    Regional (Prakasam District)
                  </h4>
                  <p className="text-gray-600"><strong>2-4 business days</strong></p>
                  <p className="text-xs text-gray-500 mt-1">Delivery to nearby towns and villages</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-purple-600" />
                    State-wide (Andhra Pradesh)
                  </h4>
                  <p className="text-gray-600"><strong>3-6 business days</strong></p>
                  <p className="text-xs text-gray-500 mt-1">Major cities and district headquarters</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-orange-600" />
                    Pan-India
                  </h4>
                  <p className="text-gray-600"><strong>5-10 business days</strong></p>
                  <p className="text-xs text-gray-500 mt-1">Metro cities and major towns nationwide</p>
                </div>
              </div>
              <p className="text-gray-600 text-xs mt-3">
                * Delivery times are estimates and may vary due to weather, festivals, or other unforeseen circumstances. Business days exclude Sundays and public holidays.
              </p>
            </div>
          </section>

          {/* Shipping Charges */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Shipping Charges</h3>
            </div>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">Order Value</th>
                      <th className="border border-gray-300 p-3 text-left">Local</th>
                      <th className="border border-gray-300 p-3 text-left">Regional</th>
                      <th className="border border-gray-300 p-3 text-left">State-wide</th>
                      <th className="border border-gray-300 p-3 text-left">Pan-India</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr>
                      <td className="border border-gray-300 p-3">Below ₹500</td>
                      <td className="border border-gray-300 p-3">₹50</td>
                      <td className="border border-gray-300 p-3">₹80</td>
                      <td className="border border-gray-300 p-3">₹120</td>
                      <td className="border border-gray-300 p-3">₹150</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">₹500 - ₹1,000</td>
                      <td className="border border-gray-300 p-3">₹30</td>
                      <td className="border border-gray-300 p-3">₹60</td>
                      <td className="border border-gray-300 p-3">₹100</td>
                      <td className="border border-gray-300 p-3">₹120</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">₹1,000 - ₹2,500</td>
                      <td className="border border-gray-300 p-3"><span className="text-green-600 font-semibold">FREE</span></td>
                      <td className="border border-gray-300 p-3">₹40</td>
                      <td className="border border-gray-300 p-3">₹80</td>
                      <td className="border border-gray-300 p-3">₹100</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 p-3 font-semibold">Above ₹2,500</td>
                      <td className="border border-gray-300 p-3"><span className="text-green-600 font-bold">FREE</span></td>
                      <td className="border border-gray-300 p-3"><span className="text-green-600 font-bold">FREE</span></td>
                      <td className="border border-gray-300 p-3"><span className="text-green-600 font-bold">FREE</span></td>
                      <td className="border border-gray-300 p-3">₹80</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg">
                <p className="text-green-800 text-sm">
                  <strong>💰 Free Shipping:</strong> Orders above ₹5,000 qualify for FREE shipping anywhere in India!
                </p>
              </div>
            </div>
          </section>

          {/* Order Processing */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Package className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Order Processing</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><strong>Order Verification:</strong> All orders are verified within 2-4 hours of placement</li>
                <li><strong>Payment Confirmation:</strong> Orders are processed only after successful payment</li>
                <li><strong>Packing Time:</strong> 1-2 business days for order packing and quality check</li>
                <li><strong>Tracking Information:</strong> You'll receive tracking details via SMS and email</li>
                <li><strong>Bulk Orders:</strong> Orders above 50 kg may require 2-3 additional days for processing</li>
              </ul>
            </div>
          </section>

          {/* Packaging */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Package className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Packaging Standards</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>We ensure all products are securely packaged to prevent damage during transit:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><strong>Liquid Products:</strong> Sealed in leak-proof containers with protective wrapping</li>
                <li><strong>Powder/Granular:</strong> Double-sealed bags with moisture protection</li>
                <li><strong>Seeds:</strong> Vacuum-packed or sealed pouches to maintain viability</li>
                <li><strong>Equipment:</strong> Bubble wrap and cardboard protection for fragile items</li>
                <li><strong>Chemicals:</strong> Hazard labels and safety instructions included</li>
              </ul>
            </div>
          </section>

          {/* Delivery Process */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Truck className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Delivery Process</h3>
            </div>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">What to Expect</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Delivery partner will contact you before delivery</li>
                  <li>Please keep your phone accessible during delivery window</li>
                  <li>Valid ID proof may be required for verification</li>
                  <li>Inspect the package before accepting delivery</li>
                  <li>Sign the delivery receipt after inspection</li>
                  <li>Report any damages or discrepancies immediately</li>
                </ol>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                <p className="text-blue-800 text-xs">
                  <strong>Tip:</strong> Ensure someone is available at the delivery address. If delivery fails due to absence, re-delivery charges may apply.
                </p>
              </div>
            </div>
          </section>

          {/* Special Conditions */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-orange-500" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Special Conditions</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><strong>Hazardous Materials:</strong> Certain chemicals require special handling and may take longer</li>
                <li><strong>Weather Delays:</strong> Monsoon season may cause delays in some regions</li>
                <li><strong>Festival Period:</strong> Delivery may take 2-3 extra days during peak seasons</li>
                <li><strong>Remote Areas:</strong> Additional 3-5 days for hard-to-reach locations</li>
                <li><strong>COD Orders:</strong> Cash on Delivery available for orders below ₹10,000 (selected areas)</li>
              </ul>
            </div>
          </section>

          {/* Damaged/Lost Packages */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-red-500" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Damaged or Lost Packages</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg mb-3">
                <p className="text-red-800 text-sm">
                  <strong>Important:</strong> Report damaged or missing items within 24 hours of delivery
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li>Take photos of damaged packaging and products</li>
                <li>Contact our customer support immediately</li>
                <li>Keep all packaging materials until issue is resolved</li>
                <li>We will arrange replacement or full refund for damaged items</li>
                <li>Lost packages will be investigated with shipping partner</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-agri-light p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Shipping Support</h3>
            </div>
            <p className="text-gray-700 text-sm mb-3">
              For shipping inquiries, tracking updates, or delivery issues, contact us:
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Email:</strong> <a href="mailto:elitetechsolutions@gmail.com" className="text-agri-green hover:underline">elitetechsolutions@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+919676606857" className="text-agri-green hover:underline">+91 96766 06857</a></p>
              <p><strong>WhatsApp:</strong> <a href="https://wa.me/919676606857" target="_blank" rel="noopener noreferrer" className="text-agri-green hover:underline">+91 96766 06857</a></p>
              <p><strong>Address:</strong> Adda Road, Kanigiri, Prakasam Dist, Andhra Pradesh</p>
            </div>
          </section>

          {/* Updates */}
          <section className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500">
              This Shipping Policy is subject to change without prior notice. Updated delivery charges and timelines will be communicated on the website. For the most current information, please check this page regularly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
