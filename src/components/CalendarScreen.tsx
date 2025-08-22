import React, { useState, useEffect } from 'react'
import { AuthUser } from '../hooks/useAuth'
import { ArrowLeft, Search, Calendar as CalendarIcon } from 'lucide-react'

interface CalendarScreenProps {
  user: AuthUser
  onBack: () => void
}

interface PPMKEvent {
  id: string
  title: string
  location: string
  date: string
  day: number
  month: string
  type: 'celebration' | 'academic' | 'competition' | 'meeting'
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ user, onBack }) => {
  const [events, setEvents] = useState<PPMKEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const mockPPMKEvents: PPMKEvent[] = [
    {
      id: '1',
      title: 'Hari Sultan PPMK',
      location: 'Suwon, Sungkyunkwan University',
      date: '2024-09-05',
      day: 5,
      month: 'September',
      type: 'celebration'
    },
    {
      id: '2',
      title: 'Sambutan Hari Malaysia',
      location: 'Seoul, Embassy of Malaysia',
      date: '2024-09-16',
      day: 16,
      month: 'September',
      type: 'celebration'
    },
    {
      id: '3',
      title: 'Larian Merdeka 5KM',
      location: 'Anyang-cheon, Dongguk Ilsan University',
      date: '2024-10-14',
      day: 14,
      month: 'October',
      type: 'competition'
    },
    {
      id: '4',
      title: 'PPMK Annual General Meeting',
      location: 'Seoul, Malaysian Embassy',
      date: '2024-11-20',
      day: 20,
      month: 'November',
      type: 'meeting'
    },
    {
      id: '5',
      title: 'Korean Language Competition',
      location: 'Busan, Pusan National University',
      date: '2024-11-28',
      day: 28,
      month: 'November',
      type: 'academic'
    },
    {
      id: '6',
      title: 'PPMK Cultural Night',
      location: 'Seoul, Korea University',
      date: '2024-12-15',
      day: 15,
      month: 'December',
      type: 'celebration'
    }
  ]

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      setEvents(mockPPMKEvents)
      setLoading(false)
    }

    loadEvents()
  }, [])

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.month]) {
      acc[event.month] = []
    }
    acc[event.month].push(event)
    return acc
  }, {} as Record<string, PPMKEvent[]>)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PPMK events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Calendar</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </header>

      {/* Events List */}
      <div className="px-4 py-6">
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="text-center py-12">
            <CalendarIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">No PPMK events match your search.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedEvents).map(([month, monthEvents]) => (
              <div key={month}>
                {/* Month Header */}
                <h2 className="text-lg font-semibold text-gray-800 mb-4">{month}</h2>
                
                {/* Events for this month */}
                <div className="space-y-3">
                  {monthEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {/* Date Box */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-lg flex flex-col items-center justify-center">
                          <CalendarIcon size={16} className="text-gray-600 mb-1" />
                          <span className="text-xs font-bold text-gray-800">{event.day}</span>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 mb-1 truncate">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarScreen
