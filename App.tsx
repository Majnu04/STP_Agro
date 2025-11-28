import React, { useState, useEffect, useMemo, Suspense, useRef } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionHeader from './components/SectionHeader';
import Footer from './components/Footer';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import TrackOrder from './pages/TrackOrder';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ShippingPolicy from './pages/ShippingPolicy';
import { CATEGORIES, PRODUCTS, BRANDS, STATS, FILTER_CROPS, FILTER_CONCERNS } from './constants';
import { Truck, Users, Award, ChevronRight, ArrowRight, ShoppingBag, CheckCircle, MessageCircle, Star, Mail, Quote, Filter, X, Search } from 'lucide-react';
import { Language, Product } from './types';
import { TRANSLATIONS } from './translations';

// Lazy load ProductCard
const ProductCard = React.lazy(() => import('./components/ProductCard'));

// Product Skeleton Component
const ProductSkeleton = () => (
  <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden h-full flex flex-col animate-pulse">
    <div className="h-56 bg-cream-50 relative">
       <div className="absolute top-3 right-3 w-8 h-8 bg-cream-200 rounded-full"></div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="h-3 bg-cream-200 w-24 rounded mb-2"></div>
      <div className="h-4 bg-cream-200 w-full rounded mb-2"></div>
      <div className="h-4 bg-cream-200 w-2/3 rounded mb-4"></div>
      
      <div className="flex items-center mb-4">
        <div className="h-4 bg-cream-200 w-12 rounded mr-2"></div>
        <div className="h-3 bg-cream-200 w-16 rounded"></div>
      </div>

      <div className="mt-auto pt-4 border-t border-cream-50 flex justify-between items-center">
        <div className="flex flex-col gap-1">
           <div className="h-6 bg-cream-200 w-20 rounded"></div>
           <div className="h-3 bg-cream-200 w-16 rounded"></div>
        </div>
        <div className="h-10 w-10 bg-cream-200 rounded-xl"></div>
      </div>
    </div>
  </div>
);

// Trust Stat Component with Counter Animation
const TrustStat: React.FC<{ icon: string, value: string, label: string, t: any, originalLabel: string, countTo?: number, suffix?: string }> = ({ icon, value, label, t, originalLabel, countTo, suffix }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && countTo) {
      let startTime: number | null = null;
      const duration = 2000; // 2 seconds animation

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * countTo);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, countTo]);

  const getIcon = () => {
    switch(icon) {
      case 'Award': return '🎖️';
      case 'ShoppingBag': return '📦';
      case 'Users': return '👥';
      case 'Truck': return '🚚';
      default: return '🎖️';
    }
  };

  const getTranslatedLabel = () => {
    if (!t) return label;
    if (originalLabel === "Trusted Brands") return t.statTrustedBrands;
    if (originalLabel === "Quality Products") return t.statQualityProducts;
    if (originalLabel === "Happy Farmers") return t.statHappyFarmers;
    if (originalLabel === "Pincode Delivery") return t.statPincodeDelivery;
    return label;
  }

  const displayValue = countTo ? `${count.toLocaleString()}${suffix || ''}` : value;

  return (
    <div ref={statRef} className="flex flex-col md:flex-row items-center md:space-x-4 p-3 md:p-6 bg-white rounded-lg md:rounded-xl shadow-sm border border-cream-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="bg-agri-light p-2 md:p-3 rounded-full text-2xl md:text-4xl mb-1 md:mb-0">
        {getIcon()}
      </div>
      <div className="text-center md:text-left">
        <p className="text-lg md:text-2xl font-extrabold text-warm-text">{displayValue}</p>
        <p className="text-xs md:text-sm text-warm-secondary whitespace-nowrap">{getTranslatedLabel()}</p>
      </div>
    </div>
  );
};

// Toast Component
const Toast: React.FC<{ message: string; isVisible: boolean; onClose: () => void }> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[60] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-warm-text text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3">
        <CheckCircle size={20} className="text-agri-green" />
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};

// Floating WhatsApp Button
const WhatsAppButton = () => (
  <a 
    href="#" 
    className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] group"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={28} className="fill-current" />
    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-3 py-1 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      Chat with Expert
    </span>
  </a>
);

// Testimonial Card
const TestimonialCard: React.FC<{ name: string; location: string; text: string; image: string }> = ({ name, location, text, image }) => (
  <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm hover:shadow-md transition-shadow relative">
    <Quote className="absolute top-6 right-6 text-agri-light fill-current text-4xl opacity-50" size={40} />
    <div className="flex items-center mb-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover mr-4" />
      <div>
        <h4 className="font-bold text-warm-text">{name}</h4>
        <p className="text-xs text-warm-secondary">{location}</p>
      </div>
    </div>
    <div className="flex mb-3">
      {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-agri-yellow fill-current" />)}
    </div>
    <p className="text-warm-secondary text-sm leading-relaxed italic">"{text}"</p>
  </div>
);

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState(0); 
  const [toast, setToast] = useState({ show: false, message: '' });
  
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'te' || saved === 'hi') ? saved as Language : 'en';
  });

  // Page states
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<{name: string, email: string, isAdmin?: boolean} | null>(null);
  const [cartItems, setCartItems] = useState<Array<Product & {quantity: number}>>(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wishlistItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Listen for product updates from admin panel
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'products' && e.newValue) {
        setProducts(JSON.parse(e.newValue));
      }
      if (e.key === 'categories' && e.newValue) {
        setCategories(JSON.parse(e.newValue));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Check for logged in user
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [cartItems]);

  // Listen for admin panel open event from TopBar
  useEffect(() => {
    const handleAdminPanelOpen = () => {
      if (user?.isAdmin) {
        setShowAdmin(true);
      }
    };
    
    window.addEventListener('openAdminPanel', handleAdminPanelOpen);
    return () => window.removeEventListener('openAdminPanel', handleAdminPanelOpen);
  }, [user]);

  // Translation helper with safety fallback
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  // Filter States
  const [activeCrops, setActiveCrops] = useState<string[]>([]);
  const [activeConcerns, setActiveConcerns] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  
  // Temporary states for checkbox UI before applying
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  
  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Refs for scrolling
  const productsSectionRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (product?: Product) => {
    if (product) {
      const existing = cartItems.find(item => item.id === product.id);
      if (existing) {
        setCartItems(cartItems.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        ));
      } else {
        setCartItems([...cartItems, {...product, quantity: 1}]);
      }
      setCartCount(cartCount + 1);
    } else {
      setCartCount(prev => prev + 1);
    }
    setToast({ show: true, message: t.addedToCart });
  };

  const handleRemoveFromCart = (productId: number) => {
    const item = cartItems.find(i => i.id === productId);
    if (item) {
      setCartCount(cartCount - item.quantity);
      setCartItems(cartItems.filter(i => i.id !== productId));
    }
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === productId ? {...item, quantity} : item
    ));
    const item = cartItems.find(i => i.id === productId);
    if (item) {
      const diff = quantity - item.quantity;
      setCartCount(cartCount + diff);
    }
  };

  const handleAddToWishlist = (product: Product) => {
    if (!wishlistItems.find(item => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
      setToast({ show: true, message: t.addedToCart });
    }
  };

  const handleToggleWishlist = (productId: string) => {
    const numericId = typeof productId === 'string' ? parseInt(productId) : productId;
    const isInWishlist = wishlistItems.some(item => item.id === numericId);
    
    if (isInWishlist) {
      setWishlistItems(wishlistItems.filter(item => item.id !== numericId));
      setToast({ show: true, message: t.removedFromWishlist || 'Removed from wishlist' });
    } else {
      const product = products.find(p => p.id === numericId);
      if (product) {
        setWishlistItems([...wishlistItems, product]);
        setToast({ show: true, message: t.addedToWishlist || 'Added to wishlist' });
      }
    }
  };

  const handleRemoveFromWishlist = (productId: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  const handleLoginSuccess = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setCartItems([]);
    setWishlistItems([]);
    setShowProfile(false);
  };

  const handleCropChange = (crop: string) => {
    setSelectedCrops(prev => 
      prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop]
    );
  };

  const handleConcernChange = (concern: string) => {
    setSelectedConcerns(prev => 
      prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
    );
  };

  const applyFilters = () => {
    setActiveCrops(selectedCrops);
    setActiveConcerns(selectedConcerns);
    setIsMobileFilterOpen(false); // Close drawer on apply
    setToast({ show: true, message: t.filtersApplied });
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setSelectedCrops([]);
    setSelectedConcerns([]);
    setActiveCrops([]);
    setActiveConcerns([]);
    setSearchQuery('');
    setToast({ show: true, message: t.filtersReset });
  };

  const scrollToProducts = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory(''); // Clear category filter when searching
    if (query && productsSectionRef.current) {
       productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setSearchQuery(''); // Clear search when filtering by category
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = useMemo(() => {
    // Use the products state which loads from localStorage
    return products.filter((product: Product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !activeCategory || product.category.toLowerCase() === activeCategory.toLowerCase() || 
                             (activeCategory === 'Crop Protection' && product.category.toLowerCase() === 'protection') ||
                             (activeCategory === 'Crop Nutrition' && product.category.toLowerCase() === 'nutrition');
      const matchesCrop = activeCrops.length === 0 || (product.crops && product.crops.some(c => activeCrops.includes(c)));
      const matchesConcern = activeConcerns.length === 0 || (product.concerns && product.concerns.some(c => activeConcerns.includes(c)));
      return matchesCrop && matchesConcern && matchesSearch && matchesCategory;
    });
  }, [products, activeCrops, activeConcerns, searchQuery, activeCategory]);

  if (!t) return null; // Prevent render if translations are not loaded

  // Reusable Filter Content
  const filterContent = (
    <div className="bg-gradient-to-br from-white to-cream-50 border border-cream-200 rounded-3xl p-6 shadow-xl h-full overflow-y-auto flex flex-col">
       <div className="flex justify-between items-center mb-6 pb-4 border-b border-cream-200">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-agri-green/10 rounded-lg">
               <Filter size={20} className="text-agri-green"/>
             </div>
             <h3 className="font-extrabold text-xl text-warm-text">{t.filters}</h3>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={resetFilters}
              className="text-sm text-agri-green cursor-pointer font-semibold hover:underline px-3 py-1 rounded-lg hover:bg-agri-green/5 transition-all"
            >
              {t.reset}
            </button>
            <button 
              className="md:hidden text-warm-muted hover:text-warm-secondary transition-colors p-1"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
       </div>
       
       <div className="flex-grow overflow-y-auto pr-1 space-y-6">
         {/* Crops Filter */}
         <div className="bg-white rounded-2xl p-5 shadow-sm border border-cream-200">
           <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-base text-warm-text flex items-center gap-2">
                <span className="text-xl"></span>
                {t.crops}
              </h4>
              <div className="flex gap-2">
                 <button 
                   onClick={() => setSelectedCrops(FILTER_CROPS)} 
                   className="text-xs font-semibold text-agri-green hover:underline px-2 py-1 rounded hover:bg-agri-green/5 transition-all"
                 >
                   {t.selectAll}
                 </button>
                 <button 
                   onClick={() => setSelectedCrops([])} 
                   className="text-xs font-semibold text-warm-muted hover:text-red-500 hover:underline px-2 py-1 rounded hover:bg-red-50 transition-all"
                 >
                   {t.deselectAll}
                 </button>
              </div>
           </div>
           <div className="space-y-3">
             {FILTER_CROPS.map(c => (
               <label key={c} htmlFor={`crop-${c}`} className="flex items-center p-2 rounded-lg hover:bg-cream-50 cursor-pointer group transition-all">
                 <input 
                   type="checkbox" 
                   id={`crop-${c}`} 
                   checked={selectedCrops.includes(c)}
                   onChange={() => handleCropChange(c)}
                   className="w-5 h-5 text-agri-green rounded-md border-2 border-cream-200 focus:ring-2 focus:ring-agri-green cursor-pointer" 
                 />
                 <span className="ml-3 text-sm font-medium text-warm-secondary group-hover:text-agri-green transition-colors">{c}</span>
               </label>
             ))}
           </div>
         </div>

         {/* Concerns Filter */}
         <div className="bg-white rounded-2xl p-5 shadow-sm border border-cream-200">
           <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-base text-warm-text flex items-center gap-2">
                <span className="text-xl"></span>
                {t.concerns}
              </h4>
              <div className="flex gap-2">
                 <button 
                   onClick={() => setSelectedConcerns(FILTER_CONCERNS)} 
                   className="text-xs font-semibold text-agri-green hover:underline px-2 py-1 rounded hover:bg-agri-green/5 transition-all"
                 >
                   {t.selectAll}
                 </button>
                 <button 
                   onClick={() => setSelectedConcerns([])} 
                   className="text-xs font-semibold text-warm-muted hover:text-red-500 hover:underline px-2 py-1 rounded hover:bg-red-50 transition-all"
                 >
                   {t.deselectAll}
                 </button>
              </div>
           </div>
           <div className="space-y-3">
             {FILTER_CONCERNS.map(c => (
               <label key={c} htmlFor={`concern-${c}`} className="flex items-center p-2 rounded-lg hover:bg-cream-50 cursor-pointer group transition-all">
                 <input 
                   type="checkbox" 
                   id={`concern-${c}`} 
                   checked={selectedConcerns.includes(c)}
                   onChange={() => handleConcernChange(c)}
                   className="w-5 h-5 text-agri-green rounded-md border-2 border-cream-200 focus:ring-2 focus:ring-agri-green cursor-pointer" 
                 />
                 <span className="ml-3 text-sm font-medium text-warm-secondary group-hover:text-agri-green transition-colors">{c}</span>
               </label>
             ))}
           </div>
         </div>
       </div>
       
       <button 
         onClick={applyFilters}
         className="w-full py-3.5 bg-gradient-to-r from-agri-green to-green-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all text-sm font-bold mt-6 flex items-center justify-center gap-2"
       >
         <CheckCircle size={18} />
         {t.applyFilters}
       </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5ED] font-sans text-warm-text">
      <TopBar 
        language={language} 
        onLanguageChange={setLanguage} 
        t={t} 
        onLoginClick={() => setShowLogin(true)}
        onWishlistClick={() => setShowWishlist(true)}
        onTrackOrderClick={() => setShowTrackOrder(true)}
        onProfileClick={() => setShowProfile(true)}
        onLogout={handleLogout}
        user={user}
      />
      <Navbar 
        cartCount={cartCount} 
        t={t} 
        onSearch={handleSearch}
        onCartClick={() => setShowCart(true)}
        onWishlistClick={() => setShowWishlist(true)}
        onProfileClick={() => user ? setShowProfile(true) : setShowLogin(true)}
        onAdminClick={() => user?.isAdmin ? setShowAdmin(true) : null}
        isAdmin={user?.isAdmin}
        onCategoryClick={handleCategoryClick}
      />
      
      {/* Modals */}
      {showLogin && <Login onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} t={t} />}
      {showCart && <Cart onClose={() => setShowCart(false)} items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveFromCart} t={t} />}
      {showWishlist && <Wishlist onClose={() => setShowWishlist(false)} items={wishlistItems} onRemove={handleRemoveFromWishlist} onAddToCart={handleAddToCart} t={t} />}
      {showTrackOrder && <TrackOrder onClose={() => setShowTrackOrder(false)} t={t} />}
      {showProfile && <Profile isOpen={showProfile} onClose={() => setShowProfile(false)} user={user} onUpdateProfile={(data) => { setUser({...user, ...data}); localStorage.setItem('user', JSON.stringify({...user, ...data})); }} onLogout={handleLogout} />}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={wishlistItems.some(item => item.id === selectedProduct.id)}
          t={t}
        />
      )}
      {showAdmin && user?.isAdmin && <Admin onClose={() => {
        setShowAdmin(false);
        // Force reload products after closing admin panel
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        }
      }} />}
      {showAllProducts && <AllProducts onClose={() => setShowAllProducts(false)} products={products} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlistItems={wishlistItems} t={t} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} t={t} />}
      {showTerms && <TermsConditions onClose={() => setShowTerms(false)} t={t} />}
      {showShipping && <ShippingPolicy onClose={() => setShowShipping(false)} t={t} />}
      
      <main>
        <Hero t={t} onShopNow={scrollToProducts} />
        
        {/* Trust Stats Section */}
        <section className="bg-cream-50 py-4 md:py-8 lg:py-12 -mt-8 relative z-20">
           <div className="container mx-auto px-3 md:px-4">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 shadow-xl bg-white rounded-xl md:rounded-2xl p-3 md:p-6 lg:p-8 border border-cream-200">
                {STATS.map(stat => <TrustStat key={stat.id} {...stat} t={t} originalLabel={stat.label} />)}
             </div>
           </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-cream-50 via-white to-agri-light/20">
          <div className="container mx-auto px-3 md:px-4">
            <SectionHeader title={t.shopByCategory} subtitle={t.shopByCategorySub} />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
              {categories.slice(0, 5).map((cat) => (
                <div key={cat.id} className="group cursor-pointer" onClick={scrollToProducts}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-agri-green/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-0 group-hover:opacity-100 scale-90"></div>
                    <div className="relative w-full aspect-square mx-auto rounded-3xl overflow-hidden border-4 border-white group-hover:border-agri-green transition-all shadow-lg group-hover:shadow-2xl mb-4 bg-white">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-agri-green font-bold text-xs shadow-xl">
                          Browse
                        </div>
                      </div>
                  </div>
                </div>
                  <h3 className="font-bold text-warm-text group-hover:text-agri-green text-sm sm:text-base transition-colors text-center">{cat.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Best Sellers with Filter */}
        <section ref={productsSectionRef} className="py-16 bg-cream-100 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
               
               {/* Sidebar Filter - Desktop */}
               <div className="hidden md:block w-64 flex-shrink-0">
                  <div className="sticky top-24 h-[calc(100vh-120px)]">
                     {filterContent}
                  </div>
               </div>

               {/* Mobile Filter Drawer */}
               {isMobileFilterOpen && (
                 <div className="fixed inset-0 z-[60] md:hidden">
                    <div 
                      className="absolute inset-0 bg-black/70 backdrop-blur-md transition-all duration-300" 
                      onClick={() => setIsMobileFilterOpen(false)}
                    ></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-hidden flex flex-col">
                       {/* Drawer Handle */}
                       <div className="flex items-center justify-center py-3 border-b border-cream-200">
                         <div className="w-12 h-1.5 bg-cream-200 rounded-full"></div>
                       </div>
                       <div className="overflow-y-auto flex-1 px-4 pb-4">
                         {filterContent}
                       </div>
                    </div>
                 </div>
               )}

               {/* Products Grid */}
               <div className="flex-grow">
                 <SectionHeader 
                   title={t.bestSelling} 
                   subtitle={t.bestSellingSub} 
                   actionText={t.viewAll || 'View All'}
                   onAction={() => setShowAllProducts(true)}
                 />
                 
                 {/* Mobile Filter Trigger */}
                 <div className="md:hidden mb-6">
                    <button 
                      onClick={() => setIsMobileFilterOpen(true)} 
                      className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-agri-green to-green-600 text-white py-4 rounded-2xl shadow-lg font-bold hover:shadow-xl active:scale-[0.98] transition-all group"
                    >
                       <Filter size={20} className="group-hover:rotate-180 transition-transform duration-300" />
                       <span className="text-base">{t.filters}</span>
                       {(selectedCrops.length > 0 || selectedConcerns.length > 0) && (
                         <span className="bg-white text-agri-green text-xs w-6 h-6 rounded-full flex items-center justify-center font-extrabold shadow-inner animate-pulse">
                           {selectedCrops.length + selectedConcerns.length}
                         </span>
                       )}
                    </button>
                 </div>
                 
                 {/* Active Filters Display */}
                 {(activeCrops.length > 0 || activeConcerns.length > 0 || searchQuery || activeCategory) && (
                   <div className="flex flex-wrap gap-2 mb-6 animate-in fade-in zoom-in duration-300">
                      {activeCategory && (
                        <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-bold border-2 border-purple-200 flex items-center hover:bg-purple-100 transition-colors cursor-default">
                          📦 {activeCategory} <button onClick={() => setActiveCategory('')} className="ml-2 hover:text-red-500 rounded-full p-1 hover:bg-red-50 transition-colors"><X size={14} /></button>
                        </span>
                      )}
                      {searchQuery && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 flex items-center hover:bg-blue-100 transition-colors cursor-default">
                          Search: {searchQuery} <button onClick={() => setSearchQuery('')} className="ml-2 hover:text-red-500 rounded-full p-0.5 hover:bg-red-50 transition-colors"><X size={12} /></button>
                        </span>
                      )}
                      {activeCrops.map(c => (
                        <span key={c} className="px-3 py-1 bg-green-50 text-agri-green rounded-full text-xs font-bold border border-green-100 flex items-center hover:bg-green-100 transition-colors cursor-default">
                          {c} <button onClick={() => {
                             const newCrops = activeCrops.filter(item => item !== c);
                             setActiveCrops(newCrops);
                             setSelectedCrops(newCrops);
                          }} className="ml-2 hover:text-red-500 rounded-full p-0.5 hover:bg-red-50 transition-colors"><X size={12} /></button>
                        </span>
                      ))}
                      {activeConcerns.map(c => (
                        <span key={c} className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-bold border border-yellow-100 flex items-center hover:bg-yellow-100 transition-colors cursor-default">
                          {c} <button onClick={() => {
                             const newConcerns = activeConcerns.filter(item => item !== c);
                             setActiveConcerns(newConcerns);
                             setSelectedConcerns(newConcerns);
                          }} className="ml-2 hover:text-red-500 rounded-full p-0.5 hover:bg-red-50 transition-colors"><X size={12} /></button>
                        </span>
                      ))}
                      <button 
                        onClick={resetFilters} 
                        className="text-xs text-gray-500 hover:text-agri-green underline ml-2"
                      >
                        {t.clearFilters}
                      </button>
                   </div>
                 )}

                 {filteredProducts.length > 0 ? (
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                      {filteredProducts.map(product => (
                        <Suspense key={`bs-${product.id}`} fallback={<ProductSkeleton />}>
                          <div className="relative group">
                            {product.discount > 0 && (
                              <div className="absolute -top-2 -right-2 z-10 bg-red-500 text-white px-3 py-1 rounded-lg shadow-lg font-bold text-sm">
                                {product.discount}% OFF
                              </div>
                            )}
                            <ProductCard 
                              product={product} 
                              onAddToCart={() => handleAddToCart(product)}
                              onProductClick={() => setSelectedProduct(product)}
                              t={t}
                            />
                          </div>
                        </Suspense>
                      ))}
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center py-20 bg-cream-50 rounded-3xl border-2 border-dashed border-cream-200 text-center px-4 animate-in fade-in zoom-in duration-300">
                      <div className="bg-white p-6 rounded-full mb-6 shadow-sm border border-cream-200">
                        <Search size={40} className="text-warm-muted" />
                      </div>
                      <h3 className="text-xl font-extrabold text-warm-text mb-2">{t.noResultsFound}</h3>
                      <p className="text-warm-secondary mb-8 max-w-md mx-auto">{t.adjustFilters}</p>
                      
                      <div className="bg-white p-6 rounded-xl border border-cream-200 shadow-sm max-w-sm w-full mb-8 text-left">
                        <p className="font-bold text-warm-text mb-3 text-sm flex items-center">
                          <span className="w-1 h-4 bg-agri-green rounded-full mr-2"></span>
                          {t.tryTheseTips}
                        </p>
                        <ul className="space-y-3 text-sm text-warm-secondary">
                          <li className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-cream-200 rounded-full mt-1.5 mr-2.5 flex-shrink-0"></span>
                            {t.tip1}
                          </li>
                          <li className="flex items-start">
                             <span className="w-1.5 h-1.5 bg-cream-200 rounded-full mt-1.5 mr-2.5 flex-shrink-0"></span>
                             {t.tip2}
                          </li>
                           <li className="flex items-start">
                             <span className="w-1.5 h-1.5 bg-cream-200 rounded-full mt-1.5 mr-2.5 flex-shrink-0"></span>
                             {t.tip3}
                          </li>
                        </ul>
                      </div>

                      <button 
                        onClick={resetFilters} 
                        className="bg-warm-text text-white px-8 py-3 rounded-xl font-bold hover:bg-agri-green transition-colors shadow-lg hover:shadow-agri-green/40 active:scale-95 duration-200"
                      >
                        {t.clearFilters}
                      </button>
                   </div>
                 )}
                 
                 {filteredProducts.length > 0 && (
                   <div className="mt-12 flex justify-center">
                      <button className="bg-white border-2 border-cream-200 text-warm-secondary px-10 py-3 rounded-full font-bold hover:border-agri-green hover:text-agri-green transition-all shadow-sm hover:shadow-md">
                        {t.loadMore}
                      </button>
                   </div>
                 )}
               </div>
            </div>
          </div>
        </section>

      </main>

      <Footer t={t} onPrivacyClick={() => setShowPrivacy(true)} onTermsClick={() => setShowTerms(true)} onShippingClick={() => setShowShipping(true)} />
      <Toast message={toast.message} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      <WhatsAppButton />
    </div>
  );
};

export default App;
