import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Edit2, Trash2, Save, Image as ImageIcon, Package, Upload, Truck, Grid, MessageCircle, Send, User, Mic, Square, Paperclip } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  crops?: string[];
  concerns?: string[];
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
}

interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  status: string;
  orderDate: string;
  estimatedDelivery: string;
  currentLocation: string;
  timeline: Array<{
    status: string;
    date: string;
    completed: boolean;
  }>;
}

interface ChatMessage {
  id: string;
  from: 'user' | 'admin';
  text: string;
  attachments?: { name: string; type: string }[];
  timestamp: number;
}

interface CustomerChat {
  oderId: string;
  odername: string;
  customerEmail: string;
  customerPhone?: string;
  messages: ChatMessage[];
  lastActivity: number;
  unread: boolean;
}

interface AdminProps {
  onClose: () => void;
}

const Admin: React.FC<AdminProps> = ({ onClose }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'categories' | 'messages'>('products');
  const [customerChats, setCustomerChats] = useState<CustomerChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<CustomerChat | null>(null);
  const [adminReply, setAdminReply] = useState('');
  const [adminFiles, setAdminFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Load products from localStorage
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Load default products from constants
      import('../constants').then(module => {
        setProducts(module.PRODUCTS);
        localStorage.setItem('products', JSON.stringify(module.PRODUCTS));
      });
    }

    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Create default orders
      const defaultOrders: Order[] = [
        {
          orderId: 'ORD12345',
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          status: 'in_transit',
          orderDate: '2025-11-25',
          estimatedDelivery: '2025-11-30',
          currentLocation: 'Distribution Center, Mumbai',
          timeline: [
            { status: 'Order Placed', date: '2025-11-25 10:30 AM', completed: true },
            { status: 'Order Confirmed', date: '2025-11-25 11:00 AM', completed: true },
            { status: 'Packed', date: '2025-11-26 09:15 AM', completed: true },
            { status: 'Shipped', date: '2025-11-26 02:30 PM', completed: true },
            { status: 'In Transit', date: '2025-11-27 08:00 AM', completed: true },
            { status: 'Out for Delivery', date: 'Pending', completed: false },
            { status: 'Delivered', date: 'Pending', completed: false },
          ]
        }
      ];
      setOrders(defaultOrders);
      localStorage.setItem('orders', JSON.stringify(defaultOrders));
    }

    // Load categories from localStorage
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // Create default categories
      const defaultCategories: Category[] = [
        { id: 1, name: 'Seeds', description: 'High-quality seeds for all crops', icon: '🌱', image: '' },
        { id: 2, name: 'Crop Protection', description: 'Pesticides and crop protection solutions', icon: '🛡️', image: '' },
        { id: 3, name: 'Crop Nutrition', description: 'Fertilizers and nutrients for healthy growth', icon: '🌿', image: '' },
        { id: 4, name: 'Equipment', description: 'Agricultural equipment and tools', icon: '🚜', image: '' },
        { id: 5, name: 'Organic', description: 'Organic farming products', icon: '🍃', image: '' },
        { id: 6, name: 'Smart Farming', description: 'Technology-enabled farming solutions', icon: '📱', image: '' },
      ];
      setCategories(defaultCategories);
      localStorage.setItem('categories', JSON.stringify(defaultCategories));
    }

    // Load customer chats from localStorage
    const savedChats = localStorage.getItem('customerChats');
    if (savedChats) {
      setCustomerChats(JSON.parse(savedChats));
    }

    // Listen for new chat messages
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'customerChats' && e.newValue) {
        setCustomerChats(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Poll for new messages every 2 seconds
    const pollInterval = setInterval(() => {
      const chats = localStorage.getItem('customerChats');
      if (chats) {
        setCustomerChats(JSON.parse(chats));
      }
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(pollInterval);
    };
  }, []);

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
        const audioFile = new File([audioBlob], `admin-voice-${Date.now()}.webm`, { type: 'audio/webm' });
        setAdminFiles(prev => [...prev, audioFile]);
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

  const handleAdminFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAdminFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeAdminFile = (index: number) => {
    setAdminFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendAdminReply = () => {
    if (!adminReply.trim() && adminFiles.length === 0) return;
    if (!selectedChat) return;
    
    const attachmentMeta = adminFiles.map(f => ({ name: f.name, type: f.type }));
    
    const newMessage: ChatMessage = {
      id: `admin-${Date.now()}`,
      from: 'admin',
      text: adminReply.trim(),
      attachments: attachmentMeta.length > 0 ? attachmentMeta : undefined,
      timestamp: Date.now()
    };

    const updatedChats = customerChats.map(chat => {
      if (chat.oderId === selectedChat.oderId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastActivity: Date.now(),
          unread: false
        };
      }
      return chat;
    });

    setCustomerChats(updatedChats);
    localStorage.setItem('customerChats', JSON.stringify(updatedChats));
    
    // Update selected chat
    const updatedSelectedChat = updatedChats.find(c => c.oderId === selectedChat.oderId);
    if (updatedSelectedChat) {
      setSelectedChat(updatedSelectedChat);
    }
    
    setAdminReply('');
    setAdminFiles([]);
  };

  const markChatAsRead = (chat: CustomerChat) => {
    const updatedChats = customerChats.map(c => {
      if (c.oderId === chat.oderId) {
        return { ...c, unread: false };
      }
      return c;
    });
    setCustomerChats(updatedChats);
    localStorage.setItem('customerChats', JSON.stringify(updatedChats));
  };

  const saveProducts = (updatedProducts: Product[]) => {
    try {
      setProducts(updatedProducts);
      // Remove base64 images before saving to localStorage to avoid quota issues
      // Keep URLs from DigitalOcean Spaces (starts with http)
      const productsToSave = updatedProducts.map(p => ({
        ...p,
        image: p.image.startsWith('data:') ? '' : p.image // Only remove base64, keep all URLs
      }));
      localStorage.setItem('products', JSON.stringify(productsToSave));
      // Trigger a custom event to notify other components
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded. Please use cloud upload for images or reduce the number of products.');
        console.error('Storage quota exceeded:', error);
      } else {
        console.error('Error saving products:', error);
      }
    }
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: '',
      category: 'Seeds',
      price: 0,
      originalPrice: 0,
      discount: 0,
      image: '',
      rating: 0,
      reviews: 0,
      inStock: true,
      crops: [],
      concerns: []
    };
    setEditingProduct(newProduct);
    setIsAddingNew(true);
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;

    // Validate that image URL exists
    if (!editingProduct.image || editingProduct.image.trim() === '') {
      alert('Please upload an image before saving the product.');
      return;
    }

    console.log('Saving product with image:', editingProduct.image);

    if (isAddingNew) {
      saveProducts([...products, editingProduct]);
    } else {
      saveProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    }
    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      saveProducts(products.filter(p => p.id !== id));
    }
  };

  // Order Management Functions
  const saveOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleAddOrder = () => {
    const newOrder: Order = {
      orderId: 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName: '',
      customerEmail: '',
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
      estimatedDelivery: '',
      currentLocation: '',
      timeline: [
        { status: 'Order Placed', date: new Date().toLocaleString(), completed: true },
        { status: 'Order Confirmed', date: 'Pending', completed: false },
        { status: 'Packed', date: 'Pending', completed: false },
        { status: 'Shipped', date: 'Pending', completed: false },
        { status: 'In Transit', date: 'Pending', completed: false },
        { status: 'Out for Delivery', date: 'Pending', completed: false },
        { status: 'Delivered', date: 'Pending', completed: false },
      ]
    };
    setEditingOrder(newOrder);
    setIsAddingNew(true);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder({...order});
    setIsAddingNew(false);
  };

  const handleSaveOrder = () => {
    if (!editingOrder) return;

    if (isAddingNew) {
      saveOrders([...orders, editingOrder]);
    } else {
      saveOrders(orders.map(o => o.orderId === editingOrder.orderId ? editingOrder : o));
    }
    setEditingOrder(null);
    setIsAddingNew(false);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      saveOrders(orders.filter(o => o.orderId !== orderId));
    }
  };

  const updateOrderTimeline = (index: number, completed: boolean) => {
    if (!editingOrder) return;
    const updatedTimeline = [...editingOrder.timeline];
    updatedTimeline[index].completed = completed;
    if (completed && updatedTimeline[index].date === 'Pending') {
      updatedTimeline[index].date = new Date().toLocaleString();
    }
    setEditingOrder({ ...editingOrder, timeline: updatedTimeline });
  };

  // Category Management Functions
  const saveCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      name: '',
      description: '',
      icon: '📦',
      image: ''
    };
    setEditingCategory(newCategory);
    setIsAddingNew(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory({...category});
    setIsAddingNew(false);
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;

    if (isAddingNew) {
      saveCategories([...categories, editingCategory]);
    } else {
      saveCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
    }
    setEditingCategory(null);
    setIsAddingNew(false);
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      saveCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingCategory) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB.');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('http://localhost:5000/api/upload/image', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setEditingCategory({ ...editingCategory, image: data.url });
          alert('Image uploaded successfully!');
        } else {
          alert('Upload failed: ' + (data.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload image.');
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB. Please upload a smaller image or compress it.');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      try {
        // Upload to DigitalOcean Spaces via backend
        const response = await fetch('http://localhost:5000/api/upload/image', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setEditingProduct({ ...editingProduct, image: data.url });
          alert('Image uploaded to cloud successfully!');
        } else {
          alert('Cloud upload failed: ' + (data.message || 'Unknown error'));
          console.error('Upload failed:', data);
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload to cloud. Please ensure the backend server is running on port 5000.');
      }
    }
  };

  const productCategories = ['Seeds', 'Protection', 'Nutrition', 'Equipment'];
  const allCrops = ['Tomato', 'Cotton', 'Wheat', 'Paddy', 'Chili', 'Cauliflower'];
  const allConcerns = ['Pest Control', 'Growth', 'Yield', 'Soil Health', 'Disease'];

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Package className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
              <p className="text-green-100 text-sm">Manage products and inventory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-2 sm:px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 sm:gap-4 min-w-max">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 sm:px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'products'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Package size={16} className="inline mr-1 sm:mr-2" />
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 sm:px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'orders'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Truck size={16} className="inline mr-1 sm:mr-2" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 sm:px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'categories'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid size={16} className="inline mr-1 sm:mr-2" />
              Categories
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 sm:px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base relative ${
                activeTab === 'messages'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageCircle size={16} className="inline mr-1 sm:mr-2" />
              Messages
              {customerChats.filter(c => c.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {customerChats.filter(c => c.unread).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)]">
          {activeTab === 'products' && (
            <>
              <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
                <h3 className="text-base sm:text-xl font-bold text-gray-800">Product Management</h3>
                <button
                  onClick={handleAddProduct}
                  className="flex items-center gap-1 sm:gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Add Product</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              {/* Product List */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 sm:gap-4">
                {products.map(product => (
                  <div key={product.id} className="border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-3 sm:gap-4">
                      <img
                        src={product.image || 'https://via.placeholder.com/100'}
                        alt={product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                          <div className="flex-grow">
                            <h4 className="font-bold text-gray-800 text-base sm:text-lg">{product.name}</h4>
                            <p className="text-sm text-gray-500">{product.category}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                              <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                              <span className="text-sm font-semibold text-red-500">{product.discount}% OFF</span>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto justify-end">
                            <button
                              onClick={() => {
                                setEditingProduct(product);
                                setIsAddingNew(false);
                              }}
                              className="flex-1 sm:flex-initial px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                            >
                              <Edit2 size={16} className="inline mr-1" />
                              <span className="hidden xs:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="flex-1 sm:flex-initial px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                            >
                              <Trash2 size={16} className="inline mr-1" />
                              <span className="hidden xs:inline">Delete</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-600">
                          <span className="flex items-center gap-1">⭐ {product.rating}</span>
                          <span>({product.reviews} reviews)</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.inStock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <>
              <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
                <h3 className="text-base sm:text-xl font-bold text-gray-900">Track Orders</h3>
                <button
                  onClick={handleAddOrder}
                  className="flex items-center gap-1 sm:gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Add Order</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              <div className="grid gap-3 sm:gap-4">
                {orders.map((order) => (
                  <div key={order.orderId} className="bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 items-center">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Order ID</p>
                        <p className="font-bold text-gray-900">{order.orderId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Customer</p>
                        <p className="font-semibold text-gray-900">{order.customerName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'in_transit' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Est. Delivery</p>
                        <p className="font-semibold text-gray-900">{order.estimatedDelivery}</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1 flex gap-2 justify-end">
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="flex-1 sm:flex-initial px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                        >
                          <Edit2 size={14} className="inline mr-1" />
                          <span className="hidden xs:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.orderId)}
                          className="flex-1 sm:flex-initial px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                        >
                          <Trash2 size={14} className="inline mr-1" />
                          <span className="hidden xs:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'categories' && (
            <>
              <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
                <h3 className="text-base sm:text-xl font-bold text-gray-900">Categories</h3>
                <button
                  onClick={handleAddCategory}
                  className="flex items-center gap-1 sm:gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Add Category</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{category.icon}</div>
                        <div>
                          <h4 className="font-bold text-gray-900">{category.name}</h4>
                          <p className="text-sm text-gray-500">{category.description}</p>
                        </div>
                      </div>
                    </div>
                    {category.image && (
                      <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="flex-1 p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold"
                      >
                        <Edit2 size={16} className="inline mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="flex-1 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold"
                      >
                        <Trash2 size={16} className="inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'messages' && (
            <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-280px)] min-h-[400px]">
              {/* Chat List */}
              <div className="w-full lg:w-1/3 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <MessageCircle size={20} />
                    Customer Chats
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {customerChats.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <MessageCircle size={48} className="mx-auto mb-4 opacity-30" />
                      <p>No customer messages yet</p>
                      <p className="text-sm mt-2">Messages from customers will appear here</p>
                    </div>
                  ) : (
                    customerChats.sort((a, b) => b.lastActivity - a.lastActivity).map(chat => (
                      <div
                        key={chat.oderId}
                        onClick={() => {
                          setSelectedChat(chat);
                          markChatAsRead(chat);
                        }}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedChat?.oderId === chat.oderId ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User size={20} className="text-gray-500" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{chat.odername || 'Anonymous'}</p>
                              <p className="text-xs text-gray-500">{chat.customerEmail || chat.customerPhone || 'No contact'}</p>
                            </div>
                          </div>
                          {chat.unread && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-2 truncate">
                          {chat.messages[chat.messages.length - 1]?.text || 'Attachment'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(chat.lastActivity).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
                {selectedChat ? (
                  <>
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User size={20} className="text-green-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{selectedChat.odername || 'Anonymous'}</p>
                          <p className="text-sm text-gray-500">{selectedChat.customerEmail || selectedChat.customerPhone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                      {selectedChat.messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            msg.from === 'admin' 
                              ? 'bg-green-600 text-white' 
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}>
                            <p className="text-sm whitespace-pre-line">{msg.text}</p>
                            {msg.attachments && msg.attachments.length > 0 && (
                              <div className="mt-2 space-y-1 text-xs opacity-80">
                                {msg.attachments.map((file, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <span>📎 {file.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            <p className={`text-[10px] mt-2 ${msg.from === 'admin' ? 'text-green-200' : 'text-gray-400'}`}>
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200 bg-white space-y-2">
                      {/* Attached files preview */}
                      {adminFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg">
                          {adminFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 text-xs">
                              <span className="max-w-[100px] truncate">{file.name}</span>
                              <button onClick={() => removeAdminFile(idx)} className="text-red-500 hover:text-red-700 ml-1">
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
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Paperclip size={14} />
                          <label className="cursor-pointer font-semibold hover:text-green-600">
                            Attach
                            <input type="file" className="hidden" multiple accept="image/*,audio/*,video/*" onChange={handleAdminFileChange} />
                          </label>
                        </div>
                        <div className="h-4 w-px bg-gray-200"></div>
                        <button 
                          onClick={isRecording ? stopRecording : startRecording}
                          className={`flex items-center gap-1 font-semibold transition-colors ${isRecording ? 'text-red-500 hover:text-red-700' : 'hover:text-green-600'}`}
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
                          value={adminReply}
                          onChange={(e) => setAdminReply(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendAdminReply();
                            }
                          }}
                          placeholder="Type your reply..."
                          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-12"
                        />
                        <button 
                          onClick={handleSendAdminReply}
                          className="bg-green-600 text-white px-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MessageCircle size={64} className="mx-auto mb-4 opacity-30" />
                      <p className="font-semibold">Select a conversation</p>
                      <p className="text-sm mt-2">Choose a chat from the list to view messages</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                {isAddingNew ? 'Add New Product' : 'Edit Product'}
              </h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingNew(false);
                }}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {productCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* In Stock */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Status</label>
                  <select
                    value={editingProduct.inStock ? 'true' : 'false'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.value === 'true' })}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => {
                      const price = Number(e.target.value);
                      const discount = editingProduct.originalPrice > 0 
                        ? Math.round(((editingProduct.originalPrice - price) / editingProduct.originalPrice) * 100)
                        : 0;
                      setEditingProduct({ ...editingProduct, price, discount });
                    }}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="450"
                  />
                </div>

                {/* Original Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice}
                    onChange={(e) => {
                      const originalPrice = Number(e.target.value);
                      const discount = originalPrice > 0 
                        ? Math.round(((originalPrice - editingProduct.price) / originalPrice) * 100)
                        : 0;
                      setEditingProduct({ ...editingProduct, originalPrice, discount });
                    }}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="800"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (0-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editingProduct.rating}
                    onChange={(e) => setEditingProduct({ ...editingProduct, rating: Number(e.target.value) })}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="4.5"
                  />
                </div>

                {/* Reviews */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reviews Count</label>
                  <input
                    type="number"
                    value={editingProduct.reviews}
                    onChange={(e) => setEditingProduct({ ...editingProduct, reviews: Number(e.target.value) })}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="120"
                  />
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={editingProduct.image}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="flex-grow px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    <label className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors">
                      <Upload size={20} />
                      <span className="font-semibold">Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {editingProduct.image && (
                    <img
                      src={editingProduct.image}
                      alt="Preview"
                      className="mt-3 w-full sm:w-40 h-40 object-cover rounded-lg border border-gray-200"
                    />
                  )}
                </div>

                {/* Crops */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Suitable Crops</label>
                  <div className="flex flex-wrap gap-2">
                    {allCrops.map(crop => (
                      <label key={crop} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
                        <input
                          type="checkbox"
                          checked={editingProduct.crops.includes(crop)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditingProduct({ ...editingProduct, crops: [...editingProduct.crops, crop] });
                            } else {
                              setEditingProduct({ ...editingProduct, crops: editingProduct.crops.filter(c => c !== crop) });
                            }
                          }}
                          className="rounded text-blue-600"
                        />
                        <span className="text-sm">{crop}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Concerns */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Addresses Concerns</label>
                  <div className="flex flex-wrap gap-2">
                    {allConcerns.map(concern => (
                      <label key={concern} className="flex items-center gap-2 bg-gray-50 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={editingProduct.concerns.includes(concern)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditingProduct({ ...editingProduct, concerns: [...editingProduct.concerns, concern] });
                            } else {
                              setEditingProduct({ ...editingProduct, concerns: editingProduct.concerns.filter(c => c !== concern) });
                            }
                          }}
                          className="rounded text-blue-600 w-4 h-4"
                        />
                        <span className="text-sm">{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Discount Display */}
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm sm:text-base text-gray-600">
                  Calculated Discount: <span className="font-bold text-green-600 text-lg">{editingProduct.discount}%</span>
                </p>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSaveProduct}
                  className="flex-grow flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  <Save size={20} />
                  {isAddingNew ? 'Add Product' : 'Save Changes'}
                </button>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingNew(false);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck className="text-white" size={24} />
                <h3 className="text-xl font-bold text-white">
                  {isAddingNew ? 'Add New Order' : `Edit Order ${editingOrder.orderId}`}
                </h3>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Order ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Order ID</label>
                  <input
                    type="text"
                    value={editingOrder.orderId}
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
                  />
                </div>

                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    value={editingOrder.customerName}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Customer Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Email</label>
                  <input
                    type="email"
                    value={editingOrder.customerEmail}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customerEmail: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="in_transit">In Transit</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                {/* Order Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Order Date</label>
                  <input
                    type="date"
                    value={editingOrder.orderDate}
                    onChange={(e) => setEditingOrder({ ...editingOrder, orderDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Estimated Delivery */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Delivery</label>
                  <input
                    type="date"
                    value={editingOrder.estimatedDelivery}
                    onChange={(e) => setEditingOrder({ ...editingOrder, estimatedDelivery: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Current Location */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Location</label>
                  <input
                    type="text"
                    value={editingOrder.currentLocation}
                    onChange={(e) => setEditingOrder({ ...editingOrder, currentLocation: e.target.value })}
                    placeholder="e.g., Distribution Center, Mumbai"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Order Timeline</h4>
                <div className="space-y-3">
                  {editingOrder.timeline.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={(e) => updateOrderTimeline(index, e.target.checked)}
                        className="w-5 h-5 accent-blue-600"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.status}</p>
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) => {
                            const updatedTimeline = [...editingOrder.timeline];
                            updatedTimeline[index].date = e.target.value;
                            setEditingOrder({ ...editingOrder, timeline: updatedTimeline });
                          }}
                          placeholder="Date/Time"
                          className="text-sm text-gray-600 mt-1 w-full px-2 py-1 border border-gray-200 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSaveOrder}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:shadow-lg transition-all font-bold flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Save Order
                </button>
                <button
                  onClick={() => {
                    setEditingOrder(null);
                    setIsAddingNew(false);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Grid className="text-white" size={24} />
                <h3 className="text-xl font-bold text-white">
                  {isAddingNew ? 'Add New Category' : `Edit Category`}
                </h3>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 gap-4">
                {/* Category Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    placeholder="e.g., Seeds, Equipment"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    placeholder="Brief description of the category"
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Icon (Emoji)</label>
                  <input
                    type="text"
                    value={editingCategory.icon}
                    onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                    placeholder="e.g., 🌱, 🚜, 🛡️"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-2xl"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category Image</label>
                  <div className="space-y-3">
                    {editingCategory.image && (
                      <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
                        <img src={editingCategory.image} alt="Category" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 cursor-pointer transition-colors bg-gray-50 hover:bg-purple-50">
                      <Upload size={20} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-600">
                        {editingCategory.image ? 'Change Image' : 'Upload Image (Max 5MB)'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCategoryImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSaveCategory}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl hover:shadow-lg transition-all font-bold flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Save Category
                </button>
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setIsAddingNew(false);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Admin;
