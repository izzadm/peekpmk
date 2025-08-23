import React, { useState } from 'react'
import { ArrowLeft, MessageCircle, FileText, Send, Bot, Clock, User, ChevronDown, ChevronUp } from 'lucide-react'
import { AuthUser } from '../hooks/useAuth'

interface HelpdeskScreenProps {
  user: AuthUser
  onBack: () => void
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

interface Complaint {
  id: string
  title: string
  description: string
  category: string
  status: 'pending' | 'in-progress' | 'resolved'
  submittedAt: string
  submittedBy: string
}

const HelpdeskScreen: React.FC<HelpdeskScreenProps> = ({ user, onBack }) => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [complaintForm, setComplaintForm] = useState({
    title: '',
    description: '',
    category: 'general'
  })
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'PPMK Team',
      message: 'Hello! How can we help you today?',
      timestamp: '09:00',
      isTeam: true
    }
  ])

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I register for PPMK events?',
      answer: 'You can register for PPMK events through the announcements section in the app. Look for event posts and click on the registration link provided.',
      category: 'Events'
    },
    {
      id: '2',
      question: 'Where can I find halal food in Seoul?',
      answer: 'Use the Halal Food Map feature in the app to discover halal restaurants recommended by fellow Malaysian students. You can filter by cuisine type and certification status.',
      category: 'Food'
    },
    {
      id: '3',
      question: 'How do I contact my university representative?',
      answer: 'Go to More > Organizations > University Representatives to find contact information for your university\'s Malaysian student representative.',
      category: 'Academic'
    },
    {
      id: '4',
      question: 'What should I do in case of emergency?',
      answer: 'Contact the Malaysian Embassy immediately at +82-10-8974-8699 (Emergency line) or reach out to your batch representative through the Organizations section.',
      category: 'Emergency'
    },
    {
      id: '5',
      question: 'How do I update my profile information?',
      answer: 'Tap on your profile picture in the top-left corner of the main screen, then select "Edit Profile" to update your information.',
      category: 'Account'
    },
    {
      id: '6',
      question: 'Can I suggest new features for the app?',
      answer: 'Yes! Please submit your suggestions through the Complaints section, selecting "Feature Request" as the category.',
      category: 'App'
    }
  ]

  const complaints: Complaint[] = [
    {
      id: '1',
      title: 'App crashes when opening chat',
      description: 'The app crashes whenever I try to open the chat feature on my Samsung Galaxy S21.',
      category: 'technical',
      status: 'in-progress',
      submittedAt: '2024-01-15',
      submittedBy: 'Ali Bin Abu'
    },
    {
      id: '2',
      title: 'Missing university in representatives list',
      description: 'My university (Sejong University) is not listed in the university representatives section.',
      category: 'content',
      status: 'resolved',
      submittedAt: '2024-01-10',
      submittedBy: 'Alia Binti A'
    }
  ]

  const categories = [
    { id: 'general', name: 'General Inquiry' },
    { id: 'technical', name: 'Technical Issue' },
    { id: 'content', name: 'Content Request' },
    { id: 'feature', name: 'Feature Request' },
    { id: 'account', name: 'Account Issue' }
  ]

  const faqCategories = ['All', 'Events', 'Food', 'Academic', 'Emergency', 'Account', 'App']

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would submit to your backend/Supabase
    console.log('New complaint:', complaintForm)
    setComplaintForm({ title: '', description: '', category: 'general' })
    alert('Complaint submitted successfully!')
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      sender: user.full_name || 'You',
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isTeam: false
    }

    setChatMessages([...chatMessages, newMessage])
    setChatMessage('')

    // Simulate team response after 2 seconds
    setTimeout(() => {
      const teamResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'PPMK Team',
        message: 'Thank you for your message. We\'ll get back to you shortly!',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isTeam: true
      }
      setChatMessages(prev => [...prev, teamResponse])
    }, 2000)
  }

  // FAQs (Chatbot) Screen
  if (selectedFeature === 'faqs') {
    return (
      <div className="min-h-screen bg-gray-100 font-inter">
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedFeature(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">FAQs (Chatbot)</h1>
            <div className="w-16"></div>
          </div>
        </div>

        <div className="p-6">
          {/* Bot Header */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">AINA Assistant</h3>
              <p className="text-sm text-gray-600">Here to help with common questions</p>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="flex space-x-2 overflow-x-auto mb-6">
            {faqCategories.map(category => (
              <button
                key={category}
                className="flex-shrink-0 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {faqs.map(faq => (
              <div key={faq.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <div>
                    <h4 className="font-medium text-gray-800">{faq.question}</h4>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full mt-2 inline-block">
                      {faq.category}
                    </span>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <p className="text-gray-600 mt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Live Chat Screen
  if (selectedFeature === 'live-chat') {
    return (
      <div className="min-h-screen bg-gray-100 font-inter flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedFeature(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-800">Live Chat</h1>
              <p className="text-sm text-green-600">PPMK Team • Online</p>
            </div>
            <div className="w-16"></div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {chatMessages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.isTeam ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.isTeam 
                  ? 'bg-white border border-gray-200' 
                  : 'bg-blue-500 text-white'
              }`}>
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.isTeam ? 'text-gray-500' : 'text-blue-100'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    )
  }

  // Complaints Screen
  if (selectedFeature === 'complaints') {
    return (
      <div className="min-h-screen bg-gray-100 font-inter">
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedFeature(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Complaints</h1>
            <div className="w-16"></div>
          </div>
        </div>

        <div className="p-6">
          {/* Submit New Complaint Form */}
          <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Submit New Complaint</h3>
            
            <form onSubmit={handleSubmitComplaint} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={complaintForm.title}
                  onChange={(e) => setComplaintForm({...complaintForm, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={complaintForm.category}
                  onChange={(e) => setComplaintForm({...complaintForm, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  required
                  value={complaintForm.description}
                  onChange={(e) => setComplaintForm({...complaintForm, description: e.target.value})}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide detailed information about your complaint..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Submit Complaint
              </button>
            </form>
          </div>

          {/* Previous Complaints */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Previous Complaints</h3>
            
            <div className="space-y-4">
              {complaints.map(complaint => (
                <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{complaint.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      complaint.status === 'resolved' 
                        ? 'bg-green-100 text-green-800'
                        : complaint.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {complaint.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{complaint.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Category: {categories.find(c => c.id === complaint.category)?.name}</span>
                    <span>Submitted: {complaint.submittedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main Helpdesk Screen
  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Helpdesk</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {/* FAQs (Chatbot) */}
          <button
            onClick={() => setSelectedFeature('faqs')}
            className="w-full bg-white border border-gray-200 rounded-2xl p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">FAQs (Chatbot)</h3>
                <p className="text-gray-600 text-sm">Get instant answers to common questions</p>
              </div>
            </div>
          </button>

          {/* Live Chat */}
          <button
            onClick={() => setSelectedFeature('live-chat')}
            className="w-full bg-white border border-gray-200 rounded-2xl p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Live chat with PPMK team (07:00 - 16:30)</h3>
                <p className="text-gray-600 text-sm">Chat directly with our support team</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Online now</span>
                </div>
              </div>
            </div>
          </button>

          {/* Complaints */}
          <button
            onClick={() => setSelectedFeature('complaints')}
            className="w-full bg-white border border-gray-200 rounded-2xl p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Complaints</h3>
                <p className="text-gray-600 text-sm">Submit and track your complaints</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HelpdeskScreen
