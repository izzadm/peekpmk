import React from 'react'
import { AuthUser } from '../hooks/useAuth'
import { 
  Calendar,
  Users,
  MessageSquare,
  BookOpen,
  Bell,
  TrendingUp
} from 'lucide-react'

interface IndexScreenProps {
  user: AuthUser
}

const IndexScreen: React.FC<IndexScreenProps> = ({ user }) => {
  const quickActions = [
    {
      id: 'chat',
      title: 'Chat Rooms',
      subtitle: 'Join conversations',
      icon: MessageSquare,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'events',
      title: 'Events',
      subtitle: 'Upcoming activities',
      icon: Calendar,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 'study',
      title: 'Study Materials',
      subtitle: 'Academic resources',
      icon: BookOpen,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'community',
      title: 'Community',
      subtitle: 'Connect with others',
      icon: Users,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'message',
      title: 'New message in General Chat',
      time: '2 hours ago',
      icon: MessageSquare
    },
    {
      id: 2,
      type: 'event',
      title: 'Study Group Session Tomorrow',
      time: '4 hours ago',
      icon: Calendar
    },
    {
      id: 3,
      type: 'announcement',
      title: 'Welcome to PPMK Community',
      time: '1 day ago',
      icon: Bell
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user.full_name?.split(' ')[0] || 'Student'}!
            </h1>
            <p className="text-blue-100 mt-1">PPMK Community Platform</p>
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Users size={24} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">150+</div>
            <div className="text-blue-100 text-sm">Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-blue-100 text-sm">Chat Rooms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">25</div>
            <div className="text-blue-100 text-sm">Events</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.id}
              className={`${action.bgColor} p-4 rounded-xl border border-gray-100`}
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                <action.icon size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">{action.title}</h3>
              <p className="text-gray-600 text-xs mt-1">{action.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              className={`p-4 flex items-center space-x-4 ${
                index !== recentActivity.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <activity.icon size={18} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 text-sm">{activity.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Highlights */}
      <div className="px-6 pb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Community Highlights</h2>
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp size={24} />
            <h3 className="font-semibold">Growing Community</h3>
          </div>
          <p className="text-green-100 text-sm mb-4">
            Our PPMK community continues to grow with new members joining every week. 
            Connect, learn, and grow together!
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <div>
              <span className="font-semibold">+15</span>
              <span className="text-green-100 ml-1">new members</span>
            </div>
            <div>
              <span className="font-semibold">+50</span>
              <span className="text-green-100 ml-1">messages today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexScreen
