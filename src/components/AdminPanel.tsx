import React, { useState, useEffect } from 'react'
import { 
  ArrowLeft, 
  Users, 
  MessageSquare, 
  BookOpen, 
  Bell,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Settings
} from 'lucide-react'
import { AuthUser } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

interface AdminPanelProps {
  user: AuthUser
  onBack: () => void
}

interface ChatRoom {
  id: string
  name: string
  description: string
  created_at: string
  member_count?: number
}

interface User {
  id: string
  ppmk_id: string
  full_name: string
  email: string
  created_at: string
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState<User[]>([])
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const [newRoomDescription, setNewRoomDescription] = useState('')

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'users') {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setUsers(data || [])
      } else if (activeTab === 'chat-rooms') {
        const { data, error } = await supabase
          .from('chat_rooms')
          .select(`
            *,
            chat_room_members(count)
          `)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setChatRooms(data || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const createChatRoom = async () => {
    if (!newRoomName.trim()) return

    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .insert([
          {
            name: newRoomName.trim(),
            description: newRoomDescription.trim() || null
          }
        ])
        .select()

      if (error) throw error

      setNewRoomName('')
      setNewRoomDescription('')
      setShowCreateRoom(false)
      loadData()
    } catch (error) {
      console.error('Error creating chat room:', error)
    }
  }

  const deleteChatRoom = async (roomId: string) => {
    if (!confirm('Are you sure you want to delete this chat room?')) return

    try {
      const { error } = await supabase
        .from('chat_rooms')
        .delete()
        .eq('id', roomId)

      if (error) throw error
      loadData()
    } catch (error) {
      console.error('Error deleting chat room:', error)
    }
  }

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'chat-rooms', label: 'Chat Rooms', icon: MessageSquare },
    { id: 'content', label: 'Content', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-sm text-gray-600">Manage app content and users</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Users ({users.length})
                  </h2>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {users.map((user, index) => (
                    <div
                      key={user.id}
                      className={`p-4 flex items-center justify-between ${
                        index !== users.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {user.full_name || 'No Name'}
                          </h3>
                          <p className="text-sm text-gray-600">{user.ppmk_id}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Rooms Tab */}
            {activeTab === 'chat-rooms' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Chat Rooms ({chatRooms.length})
                  </h2>
                  <button
                    onClick={() => setShowCreateRoom(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={20} />
                    <span>Create Room</span>
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {chatRooms.map((room, index) => (
                    <div
                      key={room.id}
                      className={`p-4 flex items-center justify-between ${
                        index !== chatRooms.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <MessageSquare size={20} className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{room.name}</h3>
                          <p className="text-sm text-gray-600">{room.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(room.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => deleteChatRoom(room.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="text-center py-12">
                <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Content Management</h3>
                <p className="text-gray-500">Manage study materials and announcements</p>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">App Settings</h3>
                <p className="text-gray-500">Configure application settings</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Room Modal */}
      {showCreateRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Chat Room</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter room name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newRoomDescription}
                  onChange={(e) => setNewRoomDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter room description"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateRoom(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createChatRoom}
                disabled={!newRoomName.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
