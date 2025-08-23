import React, { useState } from 'react'
import { AuthUser } from '../hooks/useAuth'
import { Home, MessageCircle, Calendar, MapPin, MoreHorizontal } from 'lucide-react'
import AnnouncementsScreen from './AnnouncementsScreen'
import ChatScreen from './ChatScreen'
import ChatRoomScreen from './ChatRoomScreen'
import CalendarScreen from './CalendarScreen'
import MapScreen from './MapScreen'
import MoreScreen from './MoreScreen'
import ProfileScreen from './ProfileScreen'

interface MainAppProps {
  user: AuthUser
  onUserUpdate?: (updatedUser: AuthUser) => void
}

const MainApp: React.FC<MainAppProps> = ({ user, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState('Home')
  const [showProfile, setShowProfile] = useState(false)
  const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null)

  const handleNavigateToProfile = () => {
    setShowProfile(true)
  }

  const handleBackFromProfile = () => {
    setShowProfile(false)
  }

  const handleSelectChatRoom = (roomId: string) => {
    setSelectedChatRoom(roomId)
  }

  const handleBackFromChatRoom = () => {
    setSelectedChatRoom(null)
  }

  const handleBackFromChat = () => {
    setActiveTab('Home')
  }

  const handleTabClick = (tabId: string) => {
    setSelectedChatRoom(null)
    setActiveTab(tabId)
  }

  const tabs = [
    { id: 'Home', icon: Home, component: AnnouncementsScreen },
    { id: 'Chat', icon: MessageCircle, component: ChatScreen },
    { id: 'Calendar', icon: Calendar, component: CalendarScreen },
    { id: 'Map', icon: MapPin, component: MapScreen },
    { id: 'More', icon: MoreHorizontal, component: MoreScreen }
  ]

  // Show profile screen if requested
  if (showProfile) {
    return (
      <ProfileScreen 
        user={user} 
        onBack={handleBackFromProfile}
        onUserUpdate={onUserUpdate}
      />
    )
  }

  // Show chat room screen if a room is selected
  if (selectedChatRoom) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 overflow-hidden">
          <ChatRoomScreen 
            user={user} 
            roomId={selectedChatRoom}
            onBack={handleBackFromChatRoom}
          />
        </div>
        
        {/* Bottom Navigation - Always visible with proper z-index */}
        <nav className="bg-white border-t border-gray-200 px-4 py-2 relative z-50">
          <div className="flex justify-around">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={20} />
                <span className="text-xs mt-1 font-medium">{tab.id}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'More' ? (
          <MoreScreen 
            user={user} 
            onUserUpdate={onUserUpdate}
          />
        ) : activeTab === 'Home' ? (
          <AnnouncementsScreen 
            user={user} 
            onBack={() => {}} 
            onNavigateToProfile={handleNavigateToProfile}
          />
        ) : activeTab === 'Chat' ? (
          <ChatScreen 
            user={user} 
            onBack={handleBackFromChat}
            onSelectRoom={handleSelectChatRoom}
          />
        ) : activeTab === 'Calendar' ? (
          <CalendarScreen user={user} />
        ) : activeTab === 'Map' ? (
          <MapScreen user={user} />
        ) : (
          <AnnouncementsScreen 
            user={user} 
            onBack={() => {}} 
            onNavigateToProfile={handleNavigateToProfile}
          />
        )}
      </div>

      {/* Bottom Navigation with proper z-index */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2 relative z-50">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={20} />
              <span className="text-xs mt-1 font-medium">{tab.id}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default MainApp
