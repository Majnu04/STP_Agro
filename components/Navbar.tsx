import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Sprout, Shield } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  cartCount: number;
  t: any;
  onSearch: (query: string) => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onProfileClick: () => void;
  onAdminClick?: () => void;
  isAdmin?: boolean;
  onCategoryClick?: (category: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, t, onSearch, onCartClick, onWishlistClick, onProfileClick, onAdminClick, isAdmin, onCategoryClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="sticky top-0 z-50 glass-effect shadow-lg border-b border-cream-200 transition-all duration-300">
      {/* Main Header Content */}
      <div className="container mx-auto px-3 md:px-4 h-20 md:h-24 flex items-center justify-between gap-2">
        
        {/* Logo */}
        <div className="flex items-center cursor-pointer min-w-fit group transition-all" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative">
            <div className="absolute inset-0 bg-agri-green/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100"></div>
            <img 
              src="/Gemini_Generated_Image_kt73h3kt73h3kt73 (1).png" 
              alt="STP Agro Logo" 
              className="w-12 h-12 md:w-20 md:h-20 object-contain mr-2 md:mr-4 relative z-10 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <h1 className="text-sm sm:text-lg md:text-2xl font-bold text-warm-text tracking-tight leading-none group-hover:tracking-normal transition-all font-display">
              STP AGRO <span className="gradient-text">FERTILIZERS</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-warm-secondary font-semibold tracking-[0.2em] uppercase mt-0.5 md:mt-1.5">
              & Chemicals
            </p>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
          <div className="flex w-full border-2 border-cream-200 rounded-2xl overflow-hidden focus-within:border-agri-green focus-within:ring-4 focus-within:ring-agri-green/10 transition-all bg-white shadow-md focus-within:shadow-xl">
            <div className="pl-6 pr-2 flex items-center justify-center text-warm-muted">
              <Search size={20} className="stroke-2" />
            </div>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              className="w-full py-4 px-2 bg-transparent outline-none text-warm-text placeholder-warm-muted font-medium text-base"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="bg-gradient-to-r from-agri-green to-green-600 text-white px-10 font-bold text-sm hover:from-agri-darkGreen hover:to-green-700 transition-all uppercase shadow-lg hover:shadow-xl tracking-wider">
              {t.searchButton}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-6">
          {isAdmin && onAdminClick && (
            <div onClick={onAdminClick} className="hidden md:flex flex-col items-center cursor-pointer group">
              <div className="p-2 rounded-full group-hover:bg-purple-50 transition-colors">
                <Shield className="text-purple-600 group-hover:text-purple-700 transition-colors" size={22} />
              </div>
              <span className="text-[10px] font-bold mt-0.5 text-purple-600 group-hover:text-purple-700 uppercase tracking-wide">Admin</span>
            </div>
          )}
          <div onClick={onProfileClick} className="hidden md:flex flex-col items-center cursor-pointer group">
            <div className="p-2 rounded-full group-hover:bg-agri-light transition-colors">
              <User className="text-warm-icon group-hover:text-agri-green transition-colors" size={22} />
            </div>
            <span className="text-[10px] font-bold mt-0.5 text-warm-secondary group-hover:text-agri-green uppercase tracking-wide">{t.profile}</span>
          </div>
          <div onClick={onCartClick} className="relative flex flex-col items-center cursor-pointer group">
            <div className="relative p-2 rounded-full group-hover:bg-agri-light transition-colors">
              <ShoppingCart className="text-warm-icon group-hover:text-agri-green transition-colors" size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-agri-yellow text-warm-text text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:block text-[10px] font-bold mt-0.5 text-warm-secondary group-hover:text-agri-green uppercase tracking-wide">{t.cart}</span>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2.5 text-warm-icon hover:text-agri-green hover:bg-agri-light rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Navigation Links - Desktop */}
      <nav className="hidden md:block border-t border-cream-200">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <li 
                key={item.label} 
                className="group relative"
                onMouseEnter={() => setActiveMegaMenu(item.label)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    if (onCategoryClick) onCategoryClick(item.label);
                  }}
                  className="flex items-center px-4 py-3.5 text-sm font-semibold text-warm-secondary hover:text-agri-green transition-colors relative cursor-pointer"
                >
                  {item.label}
                  {item.hasMegaMenu && <ChevronDown size={14} className="ml-1 opacity-50 group-hover:rotate-180 transition-transform duration-200" />}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-agri-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>

                {/* Mega Menu Dropdown */}
                {item.hasMegaMenu && activeMegaMenu === item.label && (
                  <div className="absolute left-0 top-full w-[700px] bg-white shadow-xl rounded-xl border border-cream-200 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200 -mt-1 ml-4">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-8 grid grid-cols-2 gap-6">
                        {item.subItems?.map((sub, idx) => (
                          <div key={idx}>
                            <h4 className="font-bold text-warm-text mb-3 pb-2 border-b border-cream-200 flex items-center">
                                <span className="w-1.5 h-1.5 bg-agri-green rounded-full mr-2"></span>
                                {sub.title}
                            </h4>
                            <ul className="space-y-2">
                              {sub.items.map((subItem) => (
                                <li key={subItem}>
                                  <a href="#" className="text-sm text-warm-secondary hover:text-agri-green hover:translate-x-1 inline-block transition-all hover:font-medium">
                                    {subItem}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="col-span-4 bg-agri-light rounded-xl p-5 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-agri-green opacity-0 group-hover:opacity-5 transition-opacity"></div>
                        <Sprout size={40} className="text-agri-green mb-3" />
                        <span className="block text-warm-text font-bold text-lg mb-1">{t.superSaver}</span>
                        <span className="text-sm text-warm-secondary mb-4">Get 30% {t.offOnAll} {item.label} {t.today}!</span>
                        <button className="text-xs bg-agri-green text-white px-4 py-2 rounded-lg font-bold hover:bg-agri-darkGreen shadow-md hover:shadow-lg transition-all w-full">{t.viewOffers}</button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-cream-200 z-50 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="p-4">
             <div className="flex w-full border border-cream-200 rounded-lg overflow-hidden mb-6 bg-cream-50">
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  className="w-full py-3 px-4 bg-transparent outline-none text-warm-text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button className="bg-agri-green text-white px-4">
                  <Search size={20} />
                </button>
              </div>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a 
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      if (onCategoryClick) onCategoryClick(item.label);
                    }}
                    className="flex justify-between items-center px-4 py-3 text-warm-text font-bold hover:bg-agri-light hover:text-agri-green rounded-lg transition-colors cursor-pointer"
                  >
                    {item.label}
                    {item.hasMegaMenu && <ChevronDown size={16} />}
                  </a>
                </li>
              ))}
              <li className="border-t border-cream-200 my-4 pt-4">
                 <a onClick={onProfileClick} className="block px-4 py-3 text-warm-secondary hover:text-agri-green font-medium cursor-pointer">{t.profile}</a>
                 <a onClick={onWishlistClick} className="block px-4 py-3 text-warm-secondary hover:text-agri-green font-medium cursor-pointer">{t.wishlist}</a>
                 {isAdmin && onAdminClick && (
                   <a onClick={onAdminClick} className="block px-4 py-3 text-purple-600 hover:text-purple-700 font-bold cursor-pointer flex items-center">
                     <Shield size={18} className="mr-2" />
                     Admin Panel
                   </a>
                 )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;