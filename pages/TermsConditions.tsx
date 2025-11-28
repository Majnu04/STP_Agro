import React from 'react';
import { X, FileText, AlertCircle, ShieldCheck, Ban, CreditCard, Truck } from 'lucide-react';

interface TermsConditionsProps {
  onClose: () => void;
  t: any;
}

const TermsConditions: React.FC<TermsConditionsProps> = ({ onClose, t }) => {
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
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6 relative sticky top-0 z-10">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            title="Close"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="text-gray-900" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-white tracking-wide">Terms & Conditions</h2>
              <p className="text-gray-300 text-sm font-body">Last updated: November 27, 2024</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Introduction */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-4 rounded-r-lg">
            <p className="text-gray-700 text-sm leading-relaxed">
              Welcome to STP Agro Fertilizers and Chemicals. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully before placing any orders.
            </p>
          </div>

          {/* Acceptance */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Acceptance of Terms</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                <li>You must be at least 18 years old to use our services</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You agree to provide accurate and complete information</li>
              </ul>
            </div>
          </section>

          {/* Products */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Products and Services</h3>
            </div>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Product Information</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>We strive to display accurate product information, images, and prices</li>
                  <li>Colors may vary due to screen settings and photography</li>
                  <li>We reserve the right to correct any errors or inaccuracies</li>
                  <li>Product availability is subject to change without notice</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Agricultural Products</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Products must be used according to manufacturer's instructions</li>
                  <li>We are not liable for improper use or application</li>
                  <li>Certain products may require licenses or permits</li>
                  <li>Storage and handling instructions must be followed</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Orders and Payments */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Orders and Payments</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Order Process</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>All orders are subject to acceptance and availability</li>
                    <li>We reserve the right to refuse or cancel any order</li>
                    <li>Order confirmation will be sent via email</li>
                    <li>Bulk orders may require additional verification</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Terms</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
                    <li>Payment must be received before order processing</li>
                    <li>We accept credit cards, debit cards, UPI, and net banking</li>
                    <li>Payment information is processed securely through trusted gateways</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Truck className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Shipping and Delivery</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><strong>Delivery Time:</strong> Estimated delivery times are provided but not guaranteed</li>
                <li><strong>Shipping Charges:</strong> Calculated based on weight, distance, and delivery speed</li>
                <li><strong>Risk of Loss:</strong> Title and risk of loss pass to you upon delivery</li>
                <li><strong>Delivery Address:</strong> Ensure accurate address; we are not responsible for incorrect deliveries</li>
                <li><strong>Inspection:</strong> Inspect products upon delivery and report damages within 24 hours</li>
              </ul>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Returns and Refunds</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Return Window:</strong> Products can be returned within 7 days of delivery (conditions apply)
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li>Products must be unused, in original packaging with all tags</li>
                <li>Perishable products and chemicals cannot be returned once opened</li>
                <li>Refunds will be processed within 7-10 business days</li>
                <li>Shipping charges are non-refundable except in case of defective products</li>
                <li>Return shipping costs are borne by the customer unless product is defective</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Ban className="text-red-500" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Prohibited Uses</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>You may not use our website or services for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li>Any unlawful purpose or in violation of applicable laws</li>
                <li>Transmitting harmful code, viruses, or malicious software</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Impersonating any person or entity</li>
                <li>Collecting information about other users</li>
                <li>Reselling products without authorization</li>
              </ul>
            </div>
          </section>

          {/* Liability */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Limitation of Liability</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
                <p className="text-red-800 text-xs">
                  <strong>Important:</strong> To the maximum extent permitted by law, STP Agro shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600 mt-3">
                <li>We provide products and services "as is" without warranties</li>
                <li>We are not responsible for crop failures or yield results</li>
                <li>Our liability is limited to the purchase price of the product</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Intellectual Property</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>All content on this website, including text, images, logos, and software, is owned by STP Agro or its licensors and protected by intellectual property laws.</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                <li>You may not reproduce, distribute, or modify any content without permission</li>
                <li>Product names and brands are trademarks of their respective owners</li>
                <li>Unauthorized use may result in legal action</li>
              </ul>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Changes to Terms</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after changes constitutes acceptance of the modified terms.</p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Governing Law</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>These Terms and Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Prakasam District, Andhra Pradesh.</p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-agri-light p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
            </div>
            <p className="text-gray-700 text-sm mb-3">
              For questions regarding these Terms and Conditions, please contact us:
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Email:</strong> <a href="mailto:elitetechsolutions@gmail.com" className="text-agri-green hover:underline">elitetechsolutions@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+919676606857" className="text-agri-green hover:underline">+91 96766 06857</a></p>
              <p><strong>Address:</strong> Adda Road, Kanigiri, Prakasam Dist, Andhra Pradesh</p>
            </div>
          </section>

          {/* Agreement */}
          <section className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500">
              By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
