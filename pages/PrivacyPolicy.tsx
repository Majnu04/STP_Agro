import React from 'react';
import { X, Shield, Lock, Eye, Database, Cookie, Mail } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
  t: any;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose, t }) => {
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
        <div className="bg-gradient-to-r from-agri-green to-green-600 p-6 relative sticky top-0 z-10">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            title="Close"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="text-agri-green" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-white tracking-wide">Privacy Policy</h2>
              <p className="text-green-100 text-sm font-body">Last updated: November 27, 2024</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Introduction */}
          <div className="bg-green-50 border-l-4 border-agri-green p-4 rounded-r-lg">
            <p className="text-gray-700 text-sm leading-relaxed">
              At STP Agro Fertilizers and Chemicals, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </div>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Database className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Information We Collect</h3>
            </div>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Name, email address, and phone number</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely through payment gateways)</li>
                  <li>Account credentials (username and password)</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Usage Information</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Browser type and version</li>
                  <li>Device information and IP address</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Products viewed and purchase history</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Eye className="text-agri-green" size={20} />
              <h3 className="text-xl font-serif font-bold text-gray-900">How We Use Your Information</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm font-body">
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><strong>Order Processing:</strong> To process and fulfill your orders, including shipping and delivery</li>
                <li><strong>Customer Service:</strong> To respond to your inquiries and provide customer support</li>
                <li><strong>Account Management:</strong> To create and manage your account</li>
                <li><strong>Marketing:</strong> To send promotional emails and updates (with your consent)</li>
                <li><strong>Improvements:</strong> To analyze usage patterns and improve our website and services</li>
                <li><strong>Security:</strong> To protect against fraudulent activities and maintain website security</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Cookie className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Cookies and Tracking</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>We use cookies and similar tracking technologies to enhance your browsing experience:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Track your activity to deliver personalized advertisements</li>
              </ul>
              <p className="mt-3 text-gray-600">You can control cookies through your browser settings. Disabling cookies may affect website functionality.</p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Lock className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Data Security</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>We implement industry-standard security measures to protect your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure payment processing through trusted payment gateways</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Restricted access to personal information on a need-to-know basis</li>
                <li>Secure storage with encryption at rest</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg mt-3">
                <p className="text-yellow-800 text-xs">
                  <strong>Note:</strong> No method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Sharing */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Database className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Information Sharing</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>We do not sell or rent your personal information. We may share information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (shipping, payment processing, analytics)</li>
                <li><strong>Legal Compliance:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Your Rights</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Data Portability:</strong> Request transfer of your data to another service provider</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-agri-light p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="text-agri-green" size={20} />
              <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
            </div>
            <p className="text-gray-700 text-sm mb-3">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Email:</strong> <a href="mailto:elitetechsolutions@gmail.com" className="text-agri-green hover:underline">elitetechsolutions@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+919676606857" className="text-agri-green hover:underline">+91 96766 06857</a></p>
              <p><strong>Address:</strong> Adda Road, Kanigiri, Prakasam Dist, Andhra Pradesh</p>
            </div>
          </section>

          {/* Updates */}
          <section className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
