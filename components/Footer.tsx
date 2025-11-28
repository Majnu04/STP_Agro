import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  t: any;
  onPrivacyClick: () => void;
  onTermsClick: () => void;
  onShippingClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ t, onPrivacyClick, onTermsClick, onShippingClick }) => {
  return (
    <footer className="bg-gradient-to-br from-[#054025] via-[#0A773D] to-[#065a2f] text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* About */}
          <div>
             <div className="flex items-center gap-3 mb-6">
               <img 
                 src="/Gemini_Generated_Image_kt73h3kt73h3kt73 (1).png" 
                 alt="STP Agro Logo" 
                 className="w-16 h-16 object-contain"
               />
               <div>
                 <h3 className="text-lg font-display font-extrabold leading-tight text-white">
                   STP AGRO
                 </h3>
                 <span className="text-agri-yellow text-[10px] tracking-[0.2em] font-semibold block">
                   FERTILIZERS
                 </span>
               </div>
             </div>
             <p className="text-gray-200 text-sm leading-relaxed mb-6">
               {t.aboutText}
             </p>
             <div className="flex space-x-3">
               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-agri-yellow hover:text-green-900 transition-all border border-white/20"><Facebook size={18} /></a>
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-agri-yellow hover:text-green-900 transition-all border border-white/20"><Twitter size={18} /></a>
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-agri-yellow hover:text-green-900 transition-all border border-white/20"><Instagram size={18} /></a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-agri-yellow hover:text-green-900 transition-all border border-white/20"><Linkedin size={18} /></a>
             </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-agri-yellow">{t.quickLinks}</h4>
            <ul className="space-y-3 text-sm text-gray-200">
              <li><a href="tel:+919676606857" className="hover:text-agri-yellow transition-colors flex items-center"><Phone size={14} className="mr-2" />{t.contactUs}</a></li>
              <li><a href="https://wa.me/919676606857" target="_blank" rel="noopener noreferrer" className="hover:text-agri-yellow transition-colors">WhatsApp</a></li>
              <li><a href="mailto:elitetechsolutions@gmail.com" className="hover:text-agri-yellow transition-colors">Email Us</a></li>
              <li><a href="https://maps.google.com/?q=Adda+Road+Kanigiri+Prakasam+Andhra+Pradesh" target="_blank" rel="noopener noreferrer" className="hover:text-agri-yellow transition-colors">Visit Store</a></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-agri-yellow">Policies</h4>
            <ul className="space-y-3 text-sm text-gray-200">
              <li><button onClick={onPrivacyClick} className="hover:text-agri-yellow transition-colors text-left">{t.privacyPolicy}</button></li>
              <li><button onClick={onTermsClick} className="hover:text-agri-yellow transition-colors text-left">{t.termsConditions}</button></li>
              <li><button onClick={onShippingClick} className="hover:text-agri-yellow transition-colors text-left">{t.shippingPolicy}</button></li>
              <li><a href="https://elitedigitalsolutions.tech" target="_blank" rel="noopener noreferrer" className="hover:text-agri-yellow transition-colors">Website Development</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-agri-yellow">{t.getInTouch}</h4>
            <div className="space-y-3 text-sm text-gray-200 mb-4">
              <a href="tel:+919676606857" className="flex items-center hover:text-agri-yellow transition-colors">
                <Phone size={16} className="mr-2 flex-shrink-0 text-agri-yellow" />
                <span>+91 96766 06857</span>
              </a>
              <a href="mailto:elitetechsolutions@gmail.com" className="flex items-center hover:text-agri-yellow transition-colors">
                <Mail size={16} className="mr-2 flex-shrink-0 text-agri-yellow" />
                <span>elitetechsolutions@gmail.com</span>
              </a>
              <a href="https://maps.google.com/?q=Adda+Road+Kanigiri+Prakasam+Andhra+Pradesh" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-agri-yellow transition-colors">
                <MapPin size={16} className="mr-2 flex-shrink-0 text-agri-yellow mt-0.5" />
                <span>Adda Road, Kanigiri, Prakasam, AP</span>
              </a>
            </div>
            
            {/* Google Map Embed */}
            <div className="rounded-lg overflow-hidden border-2 border-white/20 shadow-xl mt-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.7234567890123!2d79.5678!3d15.7089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQyJzMyLjAiTiA3OcKwMzQnMDQuMCJF!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%" 
                height="140" 
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="STP Agro Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-10 pb-4">
          <div className="text-center space-y-4">
            <p className="text-base md:text-lg font-bold text-white">
              &copy; 2025 <span className="text-agri-yellow">STP AGRO FERTILIZERS AND CHEMICALS</span>. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-200">
              <span>Developed by</span>
              <a 
                href="https://elitedigitalsolutions.tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-agri-yellow hover:text-white transition-colors font-bold text-base md:text-lg inline-flex items-center gap-1 group"
              >
                <span className="border-b-2 border-agri-yellow/50 group-hover:border-white">elitedigitalsolutions.tech</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;