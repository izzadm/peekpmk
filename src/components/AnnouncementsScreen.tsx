import React, { useState, useEffect } from 'react'
import { AuthUser } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { Search, ArrowLeft, Mail, Settings, RefreshCw } from 'lucide-react'

interface AnnouncementsScreenProps {
  user: AuthUser
  onBack: () => void
  onNavigateToProfile: () => void
}

interface Announcement {
  id: string
  subject: string
  body: string
  sender_email: string
  sender_name: string
  received_at: string
  is_read: boolean
  email_message_id: string
  has_attachments: boolean
}

const AnnouncementsScreen: React.FC<AnnouncementsScreenProps> = ({ 
  user, 
  onBack, 
  onNavigateToProfile 
}) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [activeTab, setActiveTab] = useState('Unread')
  const [searchQuery, setSearchQuery] = useState('')
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null)

  const tabs = ['Unread', 'Mentions', 'Replies', 'Reaction', 'More']

  // Check if user has email configured
  const hasEmailConfigured = user.email && user.email.trim() !== ''

  const mockPpmkEmails: Announcement[] = [
    {
      id: '1',
      subject: 'General Announcement - Majlis Anugerah Dirhayu 2025',
      body: 'Dear PPMK members, we are excited to announce that the theme for Majlis Anugerah Dirhayu 2025 is Forevermore: A Twilight Ball! Please mark your calendars for this special event.',
      sender_email: 'announcement@ppmk.org.my',
      sender_name: 'PPMK Official',
      received_at: new Date().toISOString(),
      is_read: false,
      email_message_id: 'msg_001',
      has_attachments: false
    },
    {
      id: '2',
      subject: 'MARA Scholars Meeting - August 26th',
      body: 'Greetings everyone! On August 26th, the Deputy Director General of MARA wants to meet 40 MARA students. Please confirm your attendance by replying to this email.',
      sender_email: 'mara@ppmk.org.my',
      sender_name: 'MARA Office',
      received_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      is_read: false,
      email_message_id: 'msg_002',
      has_attachments: true
    },
    {
      id: '3',
      subject: 'Scholarship Application Deadline Reminder',
      body: 'Reminder: The deadline for scholarship applications is approaching. Please submit your documents by the end of this month. Contact us if you need assistance.',
      sender_email: 'scholarship@ppmk.org.my',
      sender_name: 'PPMK Scholarship Committee',
      received_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      is_read: true,
      email_message_id: 'msg_003',
      has_attachments: false
    },
    {
      id: '4',
      subject: 'Cultural Night 2025 - Registration Open',
      body: 'Join us for the annual Cultural Night celebration. Registration is now open for performers and participants. Show your talent and represent your culture!',
      sender_email: 'cultural@ppmk.org.my',
      sender_name: 'PPMK Cultural Committee',
      received_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      is_read: true,
      email_message_id: 'msg_004',
      has_attachments: false
    }
  ]

  useEffect(() => {
    if (hasEmailConfigured) {
      loadEmailAnnouncements()
    } else {
      setLoading(false)
    }
  }, [hasEmailConfigured, user.email]) // Re-run when user email changes

  const loadEmailAnnouncements = async () => {
    setLoading(true)
    setSyncing(true)
    
    try {
      // Simulate email sync API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In real implementation, this would call email API with user.email
      // const response = await syncUserEmails(user.email)
      
      setAnnouncements(mockPpmkEmails)
      setLastSyncTime(new Date())
    } catch (error) {
      console.error('Failed to sync emails:', error)
    } finally {
      setLoading(false)
      setSyncing(false)
    }
  }

  const syncEmails = async () => {
    if (!hasEmailConfigured) return
    
    setSyncing(true)
    try {
      // Simulate email sync
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In real implementation, fetch new emails from user's email
      // const newEmails = await fetchEmailsFromProvider(user.email)
      
      setLastSyncTime(new Date())
    } catch (error) {
      console.error('Sync failed:', error)
    } finally {
      setSyncing(false)
    }
  }

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.sender_name.toLowerCase().includes(searchQuery.toLowerCase())
    
    switch (activeTab) {
      case 'Unread':
        return !announcement.is_read && matchesSearch
      case 'Mentions':
        return announcement.body.toLowerCase().includes(user.full_name?.toLowerCase() || '') && matchesSearch
      case 'Replies':
        return announcement.subject.toLowerCase().includes('reply') && matchesSearch
      case 'Reaction':
        return announcement.has_attachments && matchesSearch
      case 'More':
        return matchesSearch
      default:
        return matchesSearch
    }
  })

  const handleAnnouncementClick = (announcementId: string) => {
    setAnnouncements(prev => prev.map(announcement => 
      announcement.id === announcementId 
        ? { ...announcement, is_read: true }
        : announcement
    ))
  }

  // Email not configured view
  if (!hasEmailConfigured) {
    return (
      <div className="min-h-screen bg-white font-inter">
        <header className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Announcements</h1>
            <div className="w-10"></div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Email Required</h2>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              To receive PPMK announcements, please add your email address in your profile. 
              We'll sync all PPMK emails to show them here.
            </p>
            <button
              onClick={onNavigateToProfile}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Settings size={16} />
              <span>Add Email in Profile</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Loading view
  if (loading) {
    return (
      <div className="min-h-screen bg-white font-inter">
        <header className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Announcements</h1>
            <div className="w-10"></div>
          </div>
        </header>

        <div className="px-4 py-3 bg-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="search"
              className="w-full pl-10 pr-4 py-2 bg-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Syncing with your email...</p>
            <p className="text-gray-500 text-sm mt-1">Connecting to {user.email}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Announcements</h1>
          <button
            onClick={syncEmails}
            disabled={syncing}
            className="p-2 text-blue-500 hover:text-blue-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={20} className={syncing ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {tab === 'Unread' && announcements.filter(a => !a.is_read).length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {announcements.filter(a => !a.is_read).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="flex-1">
        {filteredAnnouncements.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No announcements found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                onClick={() => handleAnnouncementClick(announcement.id)}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !announcement.is_read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">
                        {announcement.sender_name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-semibold ${
                        !announcement.is_read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {announcement.subject}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {announcement.has_attachments && (
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        )}
                        {!announcement.is_read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                      {announcement.body}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{announcement.sender_name}</span>
                      <span>
                        {new Date(announcement.received_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Email Sync Status */}
      <div className="bg-blue-50 border-t border-blue-200 p-3">
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${syncing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-xs text-blue-700">
            {syncing ? 'Syncing emails...' : `Synced with ${user.email}`}
            {lastSyncTime && !syncing && (
              <span> • Last updated: {lastSyncTime.toLocaleTimeString()}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementsScreen
