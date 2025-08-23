import React, { useState, useEffect, useRef } from 'react'
import { AuthUser } from '../hooks/useAuth'
import { ArrowLeft, Send, Paperclip, Smile, MoreVertical, Hash, Users } from 'lucide-react'

interface ChannelDetailScreenProps {
  user: AuthUser
  channelId: string
  onBack: () => void
}

interface ChannelMessage {
  id: string
  sender_id: string
  sender_name: string
  sender_avatar?: string
  content: string
  timestamp: string
  type: 'text' | 'image' | 'file'
}

const ChannelDetailScreen: React.FC<ChannelDetailScreenProps> = ({ user, channelId, onBack }) => {
  const [messages, setMessages] = useState<ChannelMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const mockMessages: ChannelMessage[] = [
    {
      id: '1',
      sender_id: 'user1',
      sender_name: 'Ahmad Rahman',
      sender_avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Welcome everyone to the general channel! Feel free to introduce yourselves.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      type: 'text'
    },
    {
      id: '2',
      sender_id: 'user2',
      sender_name: 'Sarah Lee',
      sender_avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Hi everyone! I\'m Sarah, studying Computer Science. Excited to be here!',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      type: 'text'
    },
    {
      id: '3',
      sender_id: 'user3',
      sender_name: 'David Chen',
      sender_avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Hello! David here, Mathematics major. Looking forward to collaborating with everyone.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      type: 'text'
    },
    {
      id: '4',
      sender_id: 'user4',
      sender_name: 'Lisa Wong',
      sender_avatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Hey all! I\'m Lisa from Engineering. This platform looks amazing!',
      timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      type: 'text'
    },
    {
      id: '5',
      sender_id: user.id,
      sender_name: user.full_name,
      content: 'Hi everyone! Great to meet you all. Looking forward to learning together!',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      type: 'text'
    },
    {
      id: '6',
      sender_id: 'user1',
      sender_name: 'Ahmad Rahman',
      sender_avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Don\'t forget about the study session tomorrow at 2 PM in the library!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      type: 'text'
    }
  ]

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessages(mockMessages)
      setLoading(false)
    }

    loadMessages()
  }, [channelId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: ChannelMessage = {
      id: Date.now().toString(),
      sender_id: user.id,
      sender_name: user.full_name,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'text'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const isMyMessage = (senderId: string) => senderId === user.id

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading channel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex flex-col">
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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Hash size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-800">#general</h1>
                  <p className="text-sm text-gray-500 flex items-center space-x-1">
                    <Users size={12} />
                    <span>156 members</span>
                  </p>
                </div>
              </div>
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex space-x-3">
            <img
              src={message.sender_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(message.sender_name)}&background=3b82f6&color=fff`}
              alt={message.sender_name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <p className="font-semibold text-gray-800">{message.sender_name}</p>
                <p className="text-xs text-gray-500">{formatTime(message.timestamp)}</p>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl px-4 py-3 shadow-lg border border-white/20">
                <p className="text-sm text-gray-800 leading-relaxed">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white/80 backdrop-blur-lg border-t border-white/20 p-6">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button
            type="button"
            className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
          >
            <Paperclip size={20} />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Message #general..."
              className="w-full px-4 py-3 pr-12 bg-gray-100 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-gray-800 transition-all"
            >
              <Smile size={18} />
            </button>
          </div>

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChannelDetailScreen
