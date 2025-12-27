import React, { useState } from 'react';
import { Phone, Globe, ChevronDown, User, LogOut } from 'lucide-react';
import { Language } from '../types';

interface TopBarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: any;
  onLoginClick: () => void;
  onWishlistClick: () => void;
  onTrackOrderClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
  user: {name: string, email: string} | null;
}

const TopBar: React.FC<TopBarProps> = ({ language, onLanguageChange, t, onLoginClick, onWishlistClick, onTrackOrderClick, onProfileClick, onLogout, user }) => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    console.log('Changing language to:', lang);
    onLanguageChange(lang);
    setIsLanguageDropdownOpen(false);
  };

  const toggleDropdown = () => {
    console.log('Toggle dropdown, current state:', isLanguageDropdownOpen);
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  return (
    <div className="bg-gradient-to-r from-[#054025] via-[#0A773D] to-[#065a2f] border-b border-white/10 text-xs sm:text-sm text-gray-100 shadow-lg relative z-[140]">
      <div className="container mx-auto px-3 sm:px-4 h-10 md:h-11 flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-6">
          <a href="tel:+919676606857" className="flex items-center hover:text-agri-yellow transition-all font-semibold min-w-0">
            <Phone size={14} className="mr-1 flex-shrink-0" />
            <span className="hidden sm:inline">+91 96766 06857</span>
          </a>
          <span className="text-white/30 hidden md:inline">|</span>
          <a href="#" className="hover:text-agri-yellow transition-all font-semibold hidden md:inline">{t.sellOnPlatform}</a>
          <span className="text-white/30 hidden md:inline">|</span>
          <a href="#" className="hover:text-agri-yellow transition-all font-semibold hidden md:inline">{t.bulkOrder}</a>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-6">
          <a onClick={onTrackOrderClick} className="hover:text-agri-yellow transition-all font-semibold cursor-pointer">{t.trackOrder}</a>
          <a onClick={onWishlistClick} className="hover:text-agri-yellow transition-all font-semibold cursor-pointer hidden md:inline">{t.wishlist}</a>
          
          {/* User Section */}
          <div className="relative z-[180]">
            <button
              onClick={() => user ? setIsUserDropdownOpen(!isUserDropdownOpen) : onLoginClick()}
              type="button"
              className="flex items-center font-bold text-agri-yellow hover:text-yellow-200 transition-all cursor-pointer bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1.5 md:py-1.5 rounded-lg border border-white/30 hover:border-agri-yellow hover:bg-white/30 active:scale-95"
            >
              <User className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-1.5" />
              <span className="text-[10px] md:text-xs">{user ? user.name : t.login}</span>
              {user && <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />}
            </button>

            {/* User Dropdown */}
            {user && isUserDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-2xl rounded-xl py-2 border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      if (onProfileClick) onProfileClick();
                    }}
                    type="button"
                    className="w-full px-4 py-3 text-left text-sm hover:bg-agri-green hover:text-white transition-all flex items-center space-x-2 text-gray-700 font-semibold"
                  >
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  {localStorage.getItem('isAdmin') === 'true' && (
                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        window.dispatchEvent(new CustomEvent('openAdminPanel'));
                      }}
                      type="button"
                      className="w-full px-4 py-3 text-left text-sm hover:bg-agri-green hover:text-white transition-all flex items-center space-x-2 text-gray-700 font-semibold"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Admin Panel</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      if (onLogout) onLogout();
                    }}
                    type="button"
                    className="w-full px-4 py-3 text-left text-sm hover:bg-red-500 hover:text-white transition-all flex items-center space-x-2 text-red-600 font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
          
          {/* Language Selector */}
          <div className="relative z-[200]">
            <button 
              onClick={toggleDropdown}
              type="button"
              className="flex items-center cursor-pointer hover:text-agri-yellow focus:outline-none font-bold bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-white/30 hover:border-agri-yellow hover:bg-white/30 transition-all"
            >
              <Globe size={14} className="mr-1 md:mr-1.5" />
              <span className="text-[10px] md:text-xs">
                {language === 'en' ? 'EN' : language === 'te' ? 'తె' : 'हि'}
              </span>
              <ChevronDown size={12} className={`ml-1 md:ml-1.5 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isLanguageDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-[180]" 
                  onClick={() => setIsLanguageDropdownOpen(false)}
                ></div>
                <div className="absolute right-0 top-full mt-2 w-40 bg-white shadow-2xl rounded-xl py-2 border border-gray-200 z-[210] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <button 
                    onClick={() => handleLanguageChange('en')}
                    type="button"
                    className={`block w-full text-left px-4 py-3 hover:bg-agri-green hover:text-white transition-all font-bold text-sm ${language === 'en' ? 'text-agri-green bg-green-50' : 'text-gray-700'}`}
                  >
                    🇬🇧 English
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('te')}
                    type="button"
                    className={`block w-full text-left px-4 py-3 hover:bg-agri-green hover:text-white transition-all font-semibold text-sm ${language === 'te' ? 'text-agri-green bg-green-50' : 'text-gray-700'}`}
                  >
                    🇮🇳 తెలుగు
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('hi')}
                    type="button"
                    className={`block w-full text-left px-4 py-3 hover:bg-agri-green hover:text-white transition-all font-semibold text-sm ${language === 'hi' ? 'text-agri-green bg-green-50' : 'text-gray-700'}`}
                  >
                    🇮🇳 हिन्दी
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;