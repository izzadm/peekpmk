import React, { useState, useEffect } from 'react'
import { AuthUser } from '../hooks/useAuth'
import { ArrowLeft, Search, Users, Activity, Code, MessageCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface ChatScreenProps {
  user: AuthUser
  onBack: () => void
  onSelectRoom: (roomId: string) => void
}

interface ChatRoom {
  id: string
  name: string
  type: 'official' | 'club' | 'event' | 'study'
  description?: string
  icon?: string
  is_active: boolean
  last_message?: string
  last_message_time?: string
  unread_count: number
}

const ChatScreen: React.FC<ChatScreenProps> = ({ user, onBack, onSelectRoom }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadChatRooms()
  }, [user.id])

  const loadChatRooms = async () => {
    try {
      setLoading(true)
      
      // Get user's chat rooms with latest message info
      const { data: rooms, error } = await supabase
        .from('chat_rooms')
        .select(`
          id,
          name,
          type,
          description,
          icon,
          is_active,
          chat_room_members!inner(user_id),
          chat_messages(
            content,
            created_at
          )
        `)
        .eq('chat_room_members.user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading chat rooms:', error)
        return
      }

      // Process rooms with last message info
      const processedRooms: ChatRoom[] = (rooms || []).map(room => {
        const messages = room.chat_messages || []
        const lastMessage = messages.length > 0 ? messages[0] : null
        
        return {
          id: room.id,
          name: room.name,
          type: room.type,
          description: room.description,
          icon: room.icon,
          is_active: room.is_active,
          last_message: lastMessage?.content || 'No messages yet',
          last_message_time: lastMessage?.created_at,
          unread_count: 0 // TODO: Implement unread count logic
        }
      })

      setChatRooms(processedRooms)
    } catch (error) {
      console.error('Error loading chat rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIconComponent = (iconType?: string, roomType?: string) => {
    switch (iconType || roomType) {
      case 'users':
      case 'official':
        return <Users size={20} className="text-blue-500" />
      case 'activity':
      case 'club':
        return <Activity size={20} className="text-green-500" />
      case 'code':
      case 'event':
        return <Code size={20} className="text-purple-500" />
      default:
        return <MessageCircle size={20} className="text-gray-500" />
    }
  }

  const filteredChatRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (room.description && room.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
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

      <div className="relative z-10 pb-20">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h1 className="text-xl font-bold text-gray-800">Chat</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Search */}
          <div className="relative mb-6">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-200 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-700"
            />
          </div>

          {/* Chat Rooms List */}
          <div className="space-y-1">
            {filteredChatRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className="w-full bg-white border-b border-gray-200 p-4 transition-all text-left hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getIconComponent(room.icon, room.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-left">{room.name}</h3>
                    {room.last_message && (
                      <p className="text-sm text-gray-500 truncate mt-1">{room.last_message}</p>
                    )}
                  </div>

                  {/* Time and unread count */}
                  <div className="flex-shrink-0 text-right">
                    {room.last_message_time && (
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(room.last_message_time)}
                      </span>
                    )}
                    {room.unread_count > 0 && (
                      <div className="mt-1">
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                          {room.unread_count}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredChatRooms.length === 0 && !loading && (
            <div className="text-center py-12">
              <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No chats found</h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try a different search term' : 'You will be automatically assigned to relevant chat groups'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatScreen
