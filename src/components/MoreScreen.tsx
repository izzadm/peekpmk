import React, { useState } from 'react'
import { AuthUser } from '../hooks/useAuth'
import { 
  User, 
  Bell, 
  MessageSquare, 
  Users, 
  BookOpen, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Settings
} from 'lucide-react'
import ProfileScreen from './ProfileScreen'
import AnnouncementsScreen from './AnnouncementsScreen'
import OrganizationsModal from './OrganizationsModal'
import HelpdeskScreen from './HelpdeskScreen'
import StudyMaterialsScreen from './StudyMaterialsScreen'

interface MoreScreenProps {
  user: AuthUser
  onLogout: () => void
  onUserUpdate?: (updatedUser: AuthUser) => void
}

const MoreScreen: React.FC<MoreScreenProps> = ({ user, onLogout, onUserUpdate }) => {
  const [activeScreen, setActiveScreen] = useState<string | null>(null)
  const [showOrganizations, setShowOrganizations] = useState(false)
  const [currentUser, setCurrentUser] = useState<AuthUser>(user)

  const handleBack = () => {
    setActiveScreen(null)
  }

  const handleNavigateToProfile = () => {
    setActiveScreen('profile')
  }

  const handleUserUpdate = (updatedUser: AuthUser) => {
    setCurrentUser(updatedUser)
    if (onUserUpdate) {
      onUserUpdate(updatedUser)
    }
  }

  if (activeScreen === 'profile') {
    return (
      <ProfileScreen 
        user={currentUser} 
        onBack={handleBack}
        onUserUpdate={handleUserUpdate}
      />
    )
  }

  if (activeScreen === 'announcements') {
    return (
      <AnnouncementsScreen 
        user={currentUser} 
        onBack={handleBack}
        onNavigateToProfile={handleNavigateToProfile}
      />
    )
  }

  if (activeScreen === 'helpdesk') {
    return <HelpdeskScreen user={currentUser} onBack={handleBack} />
  }

  if (activeScreen === 'study-materials') {
    return <StudyMaterialsScreen user={currentUser} onBack={handleBack} />
  }

  const menuItems = [
    {
      id: 'profile',
      icon: User,
      title: 'Profile',
      subtitle: 'Manage your account',
      action: () => setActiveScreen('profile')
    },
    {
      id: 'announcements',
      icon: Bell,
      title: 'Announcements',
      subtitle: 'PPMK notifications',
      action: () => setActiveScreen('announcements')
    },
    {
      id: 'organizations',
      icon: Users,
      title: 'Organizations',
      subtitle: 'Student groups & clubs',
      action: () => setShowOrganizations(true)
    },
    {
      id: 'study-materials',
      icon: BookOpen,
      title: 'Study Materials',
      subtitle: 'Academic resources & materials',
      action: () => setActiveScreen('study-materials')
    },
    {
      id: 'helpdesk',
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get assistance',
      action: () => setActiveScreen('helpdesk')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={32} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {currentUser.full_name?.toUpperCase() || 'USER NAME'}
            </h1>
            <p className="text-gray-600 text-sm">{currentUser.ppmk_id}</p>
            <p className="text-gray-500 text-xs">{currentUser.email || 'No email added'}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <item.icon size={20} className="text-gray-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={onLogout}
            className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-between hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <LogOut size={20} className="text-red-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-red-600">Sign Out</h3>
                <p className="text-sm text-red-400">Log out of your account</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-red-400" />
          </button>
        </div>
      </div>

      {/* Organizations Modal */}
      {showOrganizations && (
        <OrganizationsModal onClose={() => setShowOrganizations(false)} />
      )}
    </div>
  )
}

export default MoreScreen
