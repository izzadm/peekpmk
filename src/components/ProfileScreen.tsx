import React, { useState } from 'react'
import { AuthUser } from '../hooks/useAuth'
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Save, X } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface ProfileScreenProps {
  user: AuthUser
  onBack: () => void
  onUserUpdate?: (updatedUser: AuthUser) => void
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onBack, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Form state
  const [formData, setFormData] = useState({
    full_name: user.full_name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    date_of_birth: user.date_of_birth || ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const { data, error: updateError } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          date_of_birth: formData.date_of_birth,
          updated_at: new Date().toISOString()
        })
        .eq('ppmk_id', user.ppmk_id)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      // Update the user object with new data
      const updatedUser = { ...user, ...formData }
      
      // Call the update callback if provided
      if (onUserUpdate) {
        onUserUpdate(updatedUser)
      }

      setSuccess('Profile updated successfully!')
      setIsEditing(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      console.error('Profile update error:', err)
      setError(err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset form data to original user data
    setFormData({
      full_name: user.full_name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      date_of_birth: user.date_of_birth || ''
    })
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Profile</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {(user.full_name || user.ppmk_id || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                {user.full_name || 'User'}
              </h2>
              <p className="text-gray-600">{user.ppmk_id}</p>
              <p className="text-sm text-gray-500">PPMK Member</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 space-y-6">
            {/* Full Name */}
            <div className="flex items-start space-x-3">
              <User className="w-5 h-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-gray-900">{user.full_name || 'Not provided'}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                ) : (
                  <p className="text-gray-900">{user.email || 'Not provided'}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-gray-900">{user.phone || 'Not provided'}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your address"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-900">{user.address || 'Not provided'}</p>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">
                    {user.date_of_birth 
                      ? new Date(user.date_of_birth).toLocaleDateString()
                      : 'Not provided'
                    }
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">PPMK ID</span>
                <span className="text-gray-900 font-medium">{user.ppmk_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IC Number</span>
                <span className="text-gray-900 font-medium">{user.ic_number || 'Not available'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="text-gray-900 font-medium">
                  {user.created_at 
                    ? new Date(user.created_at).toLocaleDateString()
                    : 'Not available'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
