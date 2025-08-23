import React, { useState, useEffect } from 'react'
import { AuthUser } from '../hooks/useAuth'
import { ArrowLeft, Search, Plus, Radio, Users, Hash } from 'lucide-react'

interface ChannelScreenProps {
  user: AuthUser
  onBack: () => void
  onSelectChannel: (channelId: string) => void
}

interface Channel {
  id: string
  name: string
  description: string
  type: 'public' | 'private'
  members_count: number
  is_member: boolean
  category: string
  avatar?: string
}

const ChannelScreen: React.FC<ChannelScreenProps> = ({ user, onBack, onSelectChannel }) => {
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'academic', name: 'Academic' },
    { id: 'social', name: 'Social' },
    { id: 'tech', name: 'Technology' },
    { id: 'sports', name: 'Sports' }
  ]

  const mockChannels: Channel[] = [
    {
      id: '1',
      name: 'general',
      description: 'General discussions and announcements',
      type: 'public',
      members_count: 156,
      is_member: true,
      category: 'academic',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'mathematics-help',
      description: 'Get help with math problems and share solutions',
      type: 'public',
      members_count: 89,
      is_member: true,
      category: 'academic',
      avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      name: 'programming-club',
      description: 'Discuss coding, share projects, and collaborate',
      type: 'public',
      members_count: 124,
      is_member: false,
      category: 'tech',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '4',
      name: 'study-buddies',
      description: 'Find study partners and form study groups',
      type: 'public',
      members_count: 67,
      is_member: true,
      category: 'social',
      avatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '5',
      name: 'campus-events',
      description: 'Stay updated on campus events and activities',
      type: 'public',
      members_count: 203,
      is_member: false,
      category: 'social',
      avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '6',
      name: 'sports-talk',
      description: 'Discuss sports, organize games, and share updates',
      type: 'public',
      members_count: 45,
      is_member: false,
      category: 'sports',
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ]

  useEffect(() => {
    const loadChannels = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setChannels(mockChannels)
      setLoading(false)
    }

    loadChannels()
  }, [])

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         channel.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || channel.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleJoinChannel = (channelId: string) => {
    setChannels(prev => prev.map(channel =>
      channel.id === channelId
        ? { ...channel, is_member: !channel.is_member, members_count: channel.is_member ? channel.members_count - 1 : channel.members_count + 1 }
        : channel
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={onBack}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Channels</h1>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all">
                <Plus size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 pb-24">
          {/* Search */}
          <div className="relative mb-6">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-800'
                }`}
              >
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Channels List */}
          <div className="space-y-3">
            {filteredChannels.map((channel) => (
              <div
                key={channel.id}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={channel.avatar}
                      alt={channel.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Hash size={12} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-800">#{channel.name}</h3>
                      {channel.type === 'private' && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Private</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>{channel.members_count} members</span>
                      </span>
                      <span className="capitalize">{channel.category}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col space-y-2">
                    {channel.is_member ? (
                      <>
                        <button
                          onClick={() => onSelectChannel(channel.id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all text-sm font-medium"
                        >
                          Open
                        </button>
                        <button
                          onClick={() => handleJoinChannel(channel.id)}
                          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all text-sm font-medium"
                        >
                          Leave
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleJoinChannel(channel.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all text-sm font-medium"
                      >
                        Join
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredChannels.length === 0 && (
            <div className="text-center py-12">
              <Radio size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No channels found</h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try a different search term' : 'No channels available in this category'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChannelScreen
