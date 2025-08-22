import React from 'react'
import { AuthUser } from '../hooks/useAuth'
import { Bell, Users, MapPin, MessageSquare, Calendar, Star } from 'lucide-react'

interface HomeScreenProps {
  user: AuthUser
}

const HomeScreen: React.FC<HomeScreenProps> = ({ user }) => {
  const quickActions = [
    { icon: MessageSquare, label: 'Chat', color: 'bg-blue-500' },
    { icon: Calendar, label: 'Events', color: 'bg-green-500' },
    { icon: MapPin, label: 'Halal Food', color: 'bg-orange-500' },
    { icon: Users, label: 'Community', color: 'bg-purple-500' }
  ]

  const recentActivities = [
    { title: 'New message from Ahmad', time: '2 min ago', type: 'message' },
    { title: 'Prayer time reminder', time: '15 min ago', type: 'reminder' },
    { title: 'Community event tomorrow', time: '1 hour ago', type: 'event' },
    { title: 'New halal restaurant added', time: '2 hours ago', type: 'food' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Assalamu Alaikum, {user.name || 'Brother'}
              </h1>
              <p className="text-gray-600 mt-1">Welcome back to your community</p>
            </div>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">{action.label}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Prayer Times */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Prayer Times</h2>
          <div className="space-y-3">
            {[
              { name: 'Fajr', time: '5:30 AM', passed: true },
              { name: 'Dhuhr', time: '12:45 PM', passed: true },
              { name: 'Asr', time: '3:20 PM', passed: false, current: true },
              { name: 'Maghrib', time: '6:15 PM', passed: false },
              { name: 'Isha', time: '7:45 PM', passed: false }
            ].map((prayer, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className={`font-medium ${prayer.current ? 'text-blue-600' : prayer.passed ? 'text-gray-400' : 'text-gray-900'}`}>
                  {prayer.name}
                </span>
                <span className={`${prayer.current ? 'text-blue-600' : prayer.passed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {prayer.time}
                </span>
                {prayer.current && (
                  <Star className="w-4 h-4 text-blue-600 fill-current" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.title}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white">
          <h2 className="text-lg font-semibold mb-4">Community Impact</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">127</div>
              <div className="text-sm opacity-90">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm opacity-90">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">89</div>
              <div className="text-sm opacity-90">Restaurants</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
