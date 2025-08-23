import React, { useState } from 'react'
import { AuthUser } from '../hooks/useAuth'
import { MapPin, Search, Filter, Plus, Star, Navigation, Phone } from 'lucide-react'
import HalalFoodMapScreen from './HalalFoodMapScreen'

interface MapScreenProps {
  user: AuthUser
}

interface MapLocation {
  id: string
  name: string
  address: string
  category: string
  rating: number
  distance: string
  image: string
  isHalal?: boolean
  halalCertified?: boolean
}

const MapScreen: React.FC<MapScreenProps> = ({ user }) => {
  const [showHalalFoodMap, setShowHalalFoodMap] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All', icon: MapPin, count: 156 },
    { id: 'halal-food', name: 'Halal Food', icon: MapPin, count: 89 },
    { id: 'mosque', name: 'Mosques', icon: MapPin, count: 23 },
    { id: 'community', name: 'Community', icon: MapPin, count: 18 },
    { id: 'shopping', name: 'Shopping', icon: MapPin, count: 26 }
  ]

  const locations: MapLocation[] = [
    {
      id: '1',
      name: 'Halal Kitchen Seoul',
      address: '123 Myeong-dong, Jung-gu, Seoul',
      category: 'halal-food',
      rating: 4.5,
      distance: '0.8 km',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      isHalal: true,
      halalCertified: true
    },
    {
      id: '2',
      name: 'Seoul Central Mosque',
      address: '732 Hannam-dong, Yongsan-gu, Seoul',
      category: 'mosque',
      rating: 4.8,
      distance: '1.2 km',
      image: 'https://images.pexels.com/photos/1640778/pexels-photo-1640778.jpeg'
    },
    {
      id: '3',
      name: 'Istanbul Restaurant',
      address: '456 Hongdae, Mapo-gu, Seoul',
      category: 'halal-food',
      rating: 4.3,
      distance: '2.1 km',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      isHalal: true,
      halalCertified: false
    },
    {
      id: '4',
      name: 'Muslim Community Center',
      address: '789 Itaewon, Yongsan-gu, Seoul',
      category: 'community',
      rating: 4.6,
      distance: '1.5 km',
      image: 'https://images.pexels.com/photos/1640779/pexels-photo-1640779.jpeg'
    },
    {
      id: '5',
      name: 'Halal Mart Seoul',
      address: '321 Gangnam, Gangnam-gu, Seoul',
      category: 'shopping',
      rating: 4.4,
      distance: '3.2 km',
      image: 'https://images.pexels.com/photos/1640780/pexels-photo-1640780.jpeg'
    }
  ]

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (showHalalFoodMap) {
    return (
      <HalalFoodMapScreen 
        user={user} 
        onBack={() => setShowHalalFoodMap(false)} 
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Explore Map</h1>
            <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors">
              <Plus size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Category Filters */}
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-4 text-white mb-6">
          <h2 className="text-lg font-semibold mb-2">Halal Food Map</h2>
          <p className="text-sm opacity-90 mb-4">
            Discover halal restaurants recommended by the community
          </p>
          <button
            onClick={() => setShowHalalFoodMap(true)}
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Explore Halal Food
          </button>
        </div>

        {/* Location List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredLocations.length} Places Found
            </h2>
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter size={18} className="text-gray-600" />
            </button>
          </div>

          {filteredLocations.map(location => (
            <div key={location.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{location.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {location.category.replace('-', ' ')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{location.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{location.address}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{location.distance}</span>
                      {location.halalCertified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Halal Certified
                        </span>
                      )}
                      {location.isHalal && !location.halalCertified && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Halal Options
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        <Phone className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                        <Navigation className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No places found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapScreen
