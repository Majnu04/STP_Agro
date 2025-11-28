import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sprout, X } from 'lucide-react';

interface LoginProps {
  onClose: () => void;
  onLoginSuccess: () => void;
  t: any;
}

const Login: React.FC<LoginProps> = ({ onClose, onLoginSuccess, t }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Close on ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        // Check for admin credentials first (no database check needed)
        if (formData.email === 'gourishanker005@gmail.com' && formData.password === 'Gouri123') {
          // Admin login - no backend call needed
          const token = btoa(JSON.stringify({ email: formData.email, role: 'admin', timestamp: Date.now() }));
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify({
            name: 'Admin',
            email: formData.email,
            isAdmin: true
          }));
          onLoginSuccess();
          onClose();
          return;
        }

        // For regular users - check backend/database
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          // Store token and user data
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify({
            name: data.user.name,
            email: data.user.email,
            isAdmin: data.user.role === 'admin'
          }));
          onLoginSuccess();
          onClose();
        } else {
          alert(data.message || 'Invalid credentials. Please register first.');
        }
      } else {
        // Register API call
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          // Store token and user data
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify({
            name: data.user.name,
            email: data.user.email,
            isAdmin: data.user.role === 'admin'
          }));
          onLoginSuccess();
          onClose();
        } else {
          alert(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Failed to connect to server. Please try again.');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300 overflow-y-auto"
      onClick={handleBackdropClick}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`
        .modal-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full my-8 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-green to-green-600 p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            title="Close"
          >
            <ArrowLeft size={24} />
          </button>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            title="Close"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col items-center pt-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-lg overflow-hidden p-2">
              <img 
                src="/Gemini_Generated_Image_kt73h3kt73h3kt73 (1).png" 
                alt="STP Agro Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-display font-extrabold text-white">
              {isLogin ? t?.login || 'Login' : t?.register || 'Register'}
            </h2>
            <p className="text-green-100 text-sm mt-1">
              {isLogin ? t?.welcomeBack || 'Welcome back to STP Agro' : t?.createAccount || 'Create your account'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t?.fullName || 'Full Name'}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agri-green focus:outline-none transition-colors"
                placeholder={t?.enterName || 'Enter your name'}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t?.email || 'Email'}
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agri-green focus:outline-none transition-colors"
                placeholder={t?.enterEmail || 'Enter your email'}
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t?.phoneNumber || 'Phone Number'}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agri-green focus:outline-none transition-colors"
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t?.password || 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-agri-green focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t?.confirmPassword || 'Confirm Password'}
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agri-green focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {isLogin && (
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-agri-green" />
                <span className="text-gray-600">{t?.rememberMe || 'Remember me'}</span>
              </label>
              <a href="#" className="text-agri-green font-semibold hover:underline">
                {t?.forgotPassword || 'Forgot Password?'}
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-agri-green to-green-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            {isLogin ? t?.login || 'Login' : t?.register || 'Register'}
          </button>

          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm">
              {isLogin ? (t?.dontHaveAccount || "Don't have an account?") : (t?.alreadyHaveAccount || "Already have an account?")}
              {' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-agri-green font-bold hover:underline"
              >
                {isLogin ? (t?.registerHere || 'Register here') : (t?.loginHere || 'Login here')}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
