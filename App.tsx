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
import { CATEGORIES, PRODUCTS, BRANDS, STATS } from './constants';
import { Truck, Users, Award, ChevronRight, ArrowRight, ShoppingBag, CheckCircle, MessageCircle, Star, Mail, Quote, X, Search, Send, Paperclip, Mic, Square, Loader2 } from 'lucide-react';
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

// Minimal in-app chat components
type ChatMessage = {
  id: string;
  from: 'user' | 'admin';
  text?: string;
  attachments?: { name: string; type: string }[];
  timestamp: number;
};

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => (
  <div className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
    <div className={`${message.from === 'user' ? 'bg-agri-green text-white' : 'bg-white text-warm-text'} rounded-2xl px-4 py-3 shadow-sm max-w-[80%] border border-cream-200`}>
      {message.text && <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>}
      {message.attachments && message.attachments.length > 0 && (
        <div className="mt-2 space-y-1 text-xs opacity-80">
          {message.attachments.map((file, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Paperclip size={14} />
              <span>{file.name}</span>
              <span className="uppercase text-[10px]">{file.type.split('/')[0]}</span>
            </div>
          ))}
        </div>
      )}
      <p className="text-[10px] mt-2 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</p>
    </div>
  </div>
);

const ChatWidget: React.FC<{ onClose: () => void; messages: ChatMessage[]; onSend: (text: string, files: File[]) => void; open: boolean; }> = ({ onClose, messages, onSend, open }) => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Recording timer effect
  useEffect(() => {
    let interval: number | undefined;
    if (isRecording) {
      interval = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isRecording]);

  // Cleanup recording on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], `voice-message-${Date.now()}.webm`, { type: 'audio/webm' });
        setFiles(prev => [...prev, audioFile]);
        stream.getTracks().forEach(track => track.stop());
        setRecordingTime(0);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please allow microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!text.trim() && files.length === 0) return;
    onSend(text.trim(), files);
    setText('');
    setFiles([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-24 z-[70] w-auto sm:w-full sm:max-w-sm bg-white rounded-2xl shadow-2xl border border-cream-200 flex flex-col overflow-hidden max-h-[80vh]">
      <div className="px-4 py-3 bg-agri-green text-white flex items-center justify-between">
        <div>
          <p className="font-bold text-sm">Chat with Expert</p>
          <p className="text-[11px] opacity-90">Send text, images, audio, or video</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
          <X size={18} />
        </button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto bg-cream-50 space-y-2 max-h-[50vh] sm:max-h-none sm:h-80">
        {messages.map(msg => <ChatBubble key={msg.id} message={msg} />)}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 border-t border-cream-200 bg-white space-y-2">
        {/* Attached files preview */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 p-2 bg-cream-50 rounded-lg">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-cream-200 text-xs">
                <span className="max-w-[100px] truncate">{file.name}</span>
                <button onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700 ml-1">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Recording indicator */}
        {isRecording && (
          <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-200">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-600 font-medium">Recording... {formatTime(recordingTime)}</span>
          </div>
        )}
        
        <div className="flex items-center gap-3 text-xs text-warm-secondary">
          <div className="flex items-center gap-2">
            <Paperclip size={14} />
            <label className="cursor-pointer font-semibold hover:text-agri-green">
              Attach
              <input type="file" className="hidden" multiple accept="image/*,audio/*,video/*" onChange={handleFileChange} />
            </label>
          </div>
          <div className="h-4 w-px bg-cream-200"></div>
          <button 
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center gap-1 font-semibold transition-colors ${isRecording ? 'text-red-500 hover:text-red-700' : 'hover:text-agri-green'}`}
          >
            {isRecording ? (
              <>
                <Square size={14} className="fill-current" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Mic size={14} />
                <span>Voice</span>
              </>
            )}
          </button>
        </div>
        <div className="flex gap-2">
          <textarea
            className="flex-1 border border-cream-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agri-green resize-none h-24"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend} className="bg-agri-green text-white px-4 rounded-xl hover:bg-agri-darkGreen flex items-center justify-center h-24 w-14">
            <Send size={18} />
          </button>
        </div>
        <p className="text-[11px] text-warm-muted">Admin will be notified. Replies will appear here.</p>
      </div>
    </div>
  );
};

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
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [
      { id: 'seed-1', from: 'admin', text: 'Hi! How can we help you today?', timestamp: Date.now() }
    ];
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

  // Persist chat messages
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Poll for admin replies in customer chat
  useEffect(() => {
    const pollForAdminReplies = () => {
      const chatId = user?.email || user?.phone || localStorage.getItem('guestChatId');
      if (!chatId) return;
      
      const savedChats = localStorage.getItem('customerChats');
      if (!savedChats) return;
      
      const customerChats = JSON.parse(savedChats);
      const myChat = customerChats.find((c: { oderId: string }) => c.oderId === chatId);
      
      if (myChat) {
        // Check for new admin messages
        const adminMessages = myChat.messages.filter((m: ChatMessage) => m.from === 'admin');
        const currentAdminMessages = chatMessages.filter(m => m.from === 'admin' && !m.id.startsWith('admin-auto'));
        
        // If there are more admin messages in customerChats, update local chat
        if (adminMessages.length > currentAdminMessages.length) {
          const newAdminMessages = adminMessages.filter((am: ChatMessage) => 
            !chatMessages.find(m => m.id === am.id)
          );
          if (newAdminMessages.length > 0) {
            setChatMessages(prev => [...prev, ...newAdminMessages]);
          }
        }
      }
    };

    const pollInterval = setInterval(pollForAdminReplies, 3000);
    return () => clearInterval(pollInterval);
  }, [user, chatMessages]);

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

  // Search and category selection
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('');

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
    // Clear all user-related data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('wishlistItems');
    localStorage.removeItem('chatMessages');
    
    // Reset all user-related state
    setUser(null);
    setCartItems([]);
    setWishlistItems([]);
    setChatMessages([
      { id: 'seed-1', from: 'admin', text: 'Hi! How can we help you today?', timestamp: Date.now() }
    ]);
    setShowProfile(false);
  };

  const handleSendChat = (text: string, files: File[]) => {
    const attachmentMeta = files.map(f => ({ name: f.name, type: f.type }));
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      from: 'user',
      text,
      attachments: attachmentMeta,
      timestamp: Date.now()
    };
    setChatMessages(prev => [...prev, newMessage]);
    
    // Save to customerChats for admin to see
    const chatId = user?.email || user?.phone || `guest-${localStorage.getItem('guestChatId') || Date.now()}`;
    if (!localStorage.getItem('guestChatId') && !user) {
      localStorage.setItem('guestChatId', `${Date.now()}`);
    }
    
    const savedChats = localStorage.getItem('customerChats');
    const customerChats = savedChats ? JSON.parse(savedChats) : [];
    
    const existingChatIndex = customerChats.findIndex((c: { oderId: string }) => c.oderId === chatId);
    
    if (existingChatIndex >= 0) {
      // Add message to existing chat
      customerChats[existingChatIndex].messages.push(newMessage);
      customerChats[existingChatIndex].lastActivity = Date.now();
      customerChats[existingChatIndex].unread = true;
    } else {
      // Create new chat
      customerChats.push({
        oderId: chatId,
        odername: user?.name || 'Guest User',
        customerEmail: user?.email || '',
        customerPhone: user?.phone || '',
        messages: [
          { id: 'seed-1', from: 'admin', text: 'Hi! How can we help you today?', timestamp: Date.now() - 1000 },
          newMessage
        ],
        lastActivity: Date.now(),
        unread: true
      });
    }
    
    localStorage.setItem('customerChats', JSON.stringify(customerChats));
    
    // Auto-reply placeholder (will be replaced when admin actually replies)
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: `admin-${Date.now()}`, from: 'admin', text: 'Thanks for reaching out! Our team will review your message and reply shortly.', timestamp: Date.now() }]);
    }, 1200);
  };

  const clearSearchAndCategory = () => {
    setSearchQuery('');
    setActiveCategory('');
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
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  if (!t) return null; // Prevent render if translations are not loaded

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



        {/* Best Sellers (filters removed) */}
        <section ref={productsSectionRef} className="py-16 bg-cream-100 relative">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title={t.bestSelling} 
              subtitle={t.bestSellingSub} 
              actionText={t.viewAll || 'View All'}
              onAction={() => setShowAllProducts(true)}
            />

            {(searchQuery || activeCategory) && (
              <div className="flex flex-wrap gap-2 mb-6 animate-in fade-in zoom-in duration-300">
                {activeCategory && (
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-bold border-2 border-purple-200 flex items-center hover:bg-purple-100 transition-colors cursor-default">
                    📦 {activeCategory}
                    <button onClick={() => setActiveCategory('')} className="ml-2 hover:text-red-500 rounded-full p-1 hover:bg-red-50 transition-colors">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 flex items-center hover:bg-blue-100 transition-colors cursor-default">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')} className="ml-2 hover:text-red-500 rounded-full p-0.5 hover:bg-red-50 transition-colors">
                      <X size={12} />
                    </button>
                  </span>
                )}
                <button 
                  onClick={clearSearchAndCategory} 
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
                <p className="text-warm-secondary mb-8 max-w-md mx-auto">{t.tryDifferentSearch || 'Try a different search term or clear your selections.'}</p>

                <button 
                  onClick={clearSearchAndCategory} 
                  className="bg-warm-text text-white px-8 py-3 rounded-xl font-bold hover:bg-agri-green transition-colors shadow-lg hover:shadow-agri-green/40 active:scale-95 duration-200"
                >
                  {t.clearFilters}
                </button>
              </div>
            )}
            
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setShowAllProducts(true)}
                  className="bg-white border-2 border-cream-200 text-warm-secondary px-10 py-3 rounded-full font-bold hover:border-agri-green hover:text-agri-green transition-all shadow-sm hover:shadow-md"
                >
                  {t.loadMore}
                </button>
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer t={t} onPrivacyClick={() => setShowPrivacy(true)} onTermsClick={() => setShowTerms(true)} onShippingClick={() => setShowShipping(true)} />
      <Toast message={toast.message} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      <button 
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[60] bg-[#25D366] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl hover:scale-110 transition-transform hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] group flex items-center justify-center"
        aria-label="Chat with Expert"
      >
        <MessageCircle size={28} className="fill-current" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-3 py-1 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with Expert
        </span>
      </button>
      <ChatWidget open={showChat} onClose={() => setShowChat(false)} messages={chatMessages} onSend={handleSendChat} />
    </div>
  );
};

export default App;
