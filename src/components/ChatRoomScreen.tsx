import React, { useState, useEffect, useRef } from 'react'
import { AuthUser } from '../hooks/useAuth'
import { ArrowLeft, Send, Paperclip, Smile, MoreVertical, Users } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface ChatRoomScreenProps {
  user: AuthUser
  roomId: string
  onBack: () => void
}

interface Message {
  id: string
  sender_id: string
  sender_name: string
  sender_avatar?: string
  content: string
  timestamp: string
  type: 'text' | 'image' | 'file'
}

interface RoomInfo {
  id: string
  name: string
  type: string
  description?: string
  member_count: number
}

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ user, roomId, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadRoomData()
  }, [roomId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadRoomData = async () => {
    try {
      setLoading(true)
      
      // Load room info
      const { data: roomData, error: roomError } = await supabase
        .from('chat_rooms')
        .select(`
          id,
          name,
          type,
          description,
          chat_room_members(count)
        `)
        .eq('id', roomId)
        .single()

      if (roomError) {
        console.error('Error loading room info:', roomError)
        return
      }

      setRoomInfo({
        id: roomData.id,
        name: roomData.name,
        type: roomData.type,
        description: roomData.description,
        member_count: roomData.chat_room_members?.[0]?.count || 0
      })

      // Load messages with sender info
      const { data: messagesData, error: messagesError } = await supabase
        .from('chat_messages')
        .select(`
          id,
          sender_id,
          content,
          message_type,
          created_at,
          users(
            full_name,
            profile_picture
          )
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true })

      if (messagesError) {
        console.error('Error loading messages:', messagesError)
        return
      }

      const processedMessages: Message[] = (messagesData || []).map(msg => ({
        id: msg.id,
        sender_id: msg.sender_id,
        sender_name: msg.users?.full_name || 'Unknown User',
        sender_avatar: msg.users?.profile_picture,
        content: msg.content,
        timestamp: msg.created_at,
        type: msg.message_type as 'text' | 'image' | 'file'
      }))

      setMessages(processedMessages)
    } catch (error) {
      console.error('Error loading room data:', error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          room_id: roomId,
          sender_id: user.id,
          content: newMessage.trim(),
          message_type: 'text'
        })
        .select(`
          id,
          sender_id,
          content,
          message_type,
          created_at
        `)
        .single()

      if (error) {
        console.error('Error sending message:', error)
        return
      }

      // Add message to local state
      const newMsg: Message = {
        id: data.id,
        sender_id: data.sender_id,
        sender_name: user.full_name,
        content: data.content,
        timestamp: data.created_at,
        type: data.message_type as 'text'
      }

      setMessages(prev => [...prev, newMsg])
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
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
          <p className="text-gray-600">Loading chat...</p>
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
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users size={20} className="text-blue-500" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-800">{roomInfo?.name}</h1>
                  <p className="text-sm text-gray-500">{roomInfo?.member_count} members</p>
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
          <div
            key={message.id}
            className={`flex ${isMyMessage(message.sender_id) ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex space-x-3 max-w-xs lg:max-w-md ${isMyMessage(message.sender_id) ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {!isMyMessage(message.sender_id) && (
                <img
                  src={message.sender_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(message.sender_name)}&background=3b82f6&color=fff`}
                  alt={message.sender_name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div className={`${isMyMessage(message.sender_id) ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-800'} rounded-2xl px-4 py-3 shadow-lg backdrop-blur-lg border border-white/20`}>
                {!isMyMessage(message.sender_id) && (
                  <p className="text-xs font-medium text-gray-600 mb-1">{message.sender_name}</p>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${isMyMessage(message.sender_id) ? 'text-blue-100' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </p>
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
              placeholder="Type a message..."
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

export default ChatRoomScreen
