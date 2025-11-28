import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, MapPin, Edit2, Save, Lock, LogOut } from 'lucide-react';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onUpdateProfile: (data: any) => void;
  onLogout?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ isOpen, onClose, user, onUpdateProfile, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    }
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        address: user.address || {
          street: '',
          city: '',
          state: '',
          pincode: '',
          country: 'India'
        }
      });
    }
  }, [user]);

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }

    // Call password change API
    console.log('Changing password...');
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4 text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-4 ring-white/30">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">My Profile</h2>
              <p className="text-white/90 text-sm">Manage your account information</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Profile Info Section */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all hover:shadow-lg font-semibold text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors font-semibold text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all hover:shadow-lg font-semibold text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                <User className="w-4 h-4 text-green-600" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-gray-900 text-lg font-medium">{formData.name || 'Not provided'}</p>
              )}
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                <Mail className="w-4 h-4 text-green-600" />
                Email Address
              </label>
              <p className="text-gray-900 text-lg font-medium">{formData.email}</p>
              <p className="text-gray-500 text-xs mt-1 italic">Email cannot be changed</p>
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                <Phone className="w-4 h-4 text-green-600" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-gray-900 text-lg font-medium">{formData.phone || 'Not provided'}</p>
              )}
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
              <MapPin className="w-5 h-5 text-green-600" />
              Address Information
            </h3>

            {/* Street */}
            <div>
              <label className="text-gray-600 text-sm font-semibold mb-2 block">Street Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, street: e.target.value }
                  })}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter street address"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.address.street || 'Not provided'}</p>
              )}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 text-sm font-semibold mb-2 block">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, city: e.target.value }
                    })}
                    className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="City"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.address.city || 'Not provided'}</p>
                )}
              </div>
              <div>
                <label className="text-gray-600 text-sm font-semibold mb-2 block">State</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, state: e.target.value }
                    })}
                    className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="State"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.address.state || 'Not provided'}</p>
                )}
              </div>
            </div>

            {/* Pincode */}
            <div>
              <label className="text-gray-600 text-sm font-semibold mb-2 block">Pincode</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address.pincode}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, pincode: e.target.value }
                  })}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Pincode"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.address.pincode || 'Not provided'}</p>
              )}
            </div>
          </div>

          {/* Change Password Section */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="flex items-center gap-2 text-gray-900 hover:text-green-600 transition-colors font-semibold"
            >
              <Lock className="w-5 h-5 text-green-600" />
              <span>Change Password</span>
            </button>

            {showChangePassword && (
              <div className="mt-4 space-y-3">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleChangePassword}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-all hover:shadow-lg font-semibold"
                >
                  Update Password
                </button>
              </div>
            )}
          </div>

          {/* Account Info */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account Details</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">Account Type: <span className="text-gray-900 font-semibold">{user?.role || 'User'}</span></p>
              <p className="text-gray-600">Member Since: <span className="text-gray-900 font-semibold">{new Date(user?.createdAt).toLocaleDateString() || 'N/A'}</span></p>
            </div>
          </div>

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to logout?')) {
                  onLogout();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition-all hover:shadow-lg font-semibold"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
