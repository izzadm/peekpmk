import React from 'react'
import { Home, MessageCircle, Radio, Calendar, MoreHorizontal } from 'lucide-react'

interface BottomNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  onShowAnnouncements: () => void
  onShowChat: () => void
  onShowChannel: () => void
  onShowCalendar: () => void
  onShowMore: () => void
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeSection,
  setActiveSection,
  onShowAnnouncements,
  onShowChat,
  onShowChannel,
  onShowCalendar,
  onShowMore
}) => {
  const navItems = [
    {
      id: 'announcements',
      name: 'Home',
      icon: Home,
      onClick: onShowAnnouncements
    },
    {
      id: 'chat',
      name: 'Chat',
      icon: MessageCircle,
      onClick: onShowChat
    },
    {
      id: 'channel',
      name: 'Channels',
      icon: Radio,
      onClick: onShowChannel
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: Calendar,
      onClick: onShowCalendar
    },
    {
      id: 'more',
      name: 'More',
      icon: MoreHorizontal,
      onClick: onShowMore
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-white/20 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon
          const isActive = activeSection === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id)
                item.onClick()
              }}
              className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all ${
                isActive
                  ? 'text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <IconComponent size={20} />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation
