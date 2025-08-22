import React from 'react'
import { Calendar, MapPin, Users, Clock, ArrowRight, Heart } from 'lucide-react'

const Events: React.FC = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Malaysian Night Market in Seoul',
      date: '2024-02-15',
      time: '18:00',
      location: 'Hongdae Park',
      attendees: 85,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      description: 'Experience authentic Malaysian street food and culture in the heart of Seoul.',
      category: 'Cultural'
    },
    {
      id: 2,
      title: 'Study Group: Korean Language Exchange',
      date: '2024-02-18',
      time: '14:00',
      location: 'Seoul National University',
      attendees: 32,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      description: 'Practice Korean with native speakers while helping them learn English/Malay.',
      category: 'Academic'
    },
    {
      id: 3,
      title: 'Hiking Adventure: Namsan Tower',
      date: '2024-02-22',
      time: '09:00',
      location: 'Namsan Park',
      attendees: 28,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      description: 'Join fellow Malaysians for a scenic hike and breathtaking city views.',
      category: 'Recreation'
    },
    {
      id: 4,
      title: 'Hari Raya Celebration 2024',
      date: '2024-03-01',
      time: '12:00',
      location: 'Malaysian Embassy',
      attendees: 150,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      description: 'Celebrate Hari Raya with traditional food, music, and cultural performances.',
      category: 'Cultural'
    },
    {
      id: 5,
      title: 'Career Workshop: Tech Industry in Korea',
      date: '2024-03-05',
      time: '19:00',
      location: 'COEX Convention Center',
      attendees: 67,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      description: 'Learn about career opportunities in Korea\'s booming tech sector.',
      category: 'Professional'
    },
    {
      id: 6,
      title: 'Busan Beach Cleanup & BBQ',
      date: '2024-03-10',
      time: '10:00',
      location: 'Haeundae Beach, Busan',
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      description: 'Give back to the community while enjoying a beachside BBQ with friends.',
      category: 'Community Service'
    }
  ]

  const categories = ['All', 'Cultural', 'Academic', 'Recreation', 'Professional', 'Community Service']
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filteredEvents = selectedCategory === 'All' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors = {
      'Cultural': 'from-red-500 to-pink-500',
      'Academic': 'from-blue-500 to-cyan-500',
      'Recreation': 'from-green-500 to-teal-500',
      'Professional': 'from-purple-500 to-indigo-500',
      'Community Service': 'from-orange-500 to-yellow-500'
    }
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-8">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Upcoming Events</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Connect Through Events
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Join exciting events, cultural celebrations, and networking opportunities 
            happening across Korea's major cities.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'backdrop-blur-xl bg-white/10 border border-white/20 text-gray-700 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
                  <span>Join Event</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Event CTA */}
        <div className="text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/30 rounded-3xl p-12">
            <Heart className="w-16 h-16 text-purple-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Want to Host an Event?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Have an idea for bringing the community together? We'd love to help you organize it!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Create Event
              </button>
              <button className="backdrop-blur-xl bg-white/20 border border-white/30 text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300">
                Event Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events
