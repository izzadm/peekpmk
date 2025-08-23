import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, MapPin, Star, Plus, Search, Filter, Heart, MessageCircle, Share2, Phone, Clock, Navigation } from 'lucide-react'
import { AuthUser } from '../hooks/useAuth'

interface HalalFoodMapScreenProps {
  user: AuthUser
  onBack: () => void
}

interface Restaurant {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  rating: number
  reviewCount: number
  cuisine: string
  priceRange: string
  isHalal: boolean
  halalCertified: boolean
  recommendedBy: string
  description: string
  phone?: string
  hours?: string
  image?: string
  tags: string[]
}

const HalalFoodMapScreen: React.FC<HalalFoodMapScreenProps> = ({ user, onBack }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)

  // Sample restaurant data
  const restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Halal Kitchen Seoul',
      address: '123 Myeong-dong, Jung-gu, Seoul',
      latitude: 37.5665,
      longitude: 126.9780,
      rating: 4.5,
      reviewCount: 128,
      cuisine: 'Middle Eastern',
      priceRange: '₩₩',
      isHalal: true,
      halalCertified: true,
      recommendedBy: 'Ali Bin Abu',
      description: 'Authentic Middle Eastern cuisine with halal certification. Great shawarma and kebabs!',
      phone: '+82-2-1234-5678',
      hours: '11:00 AM - 10:00 PM',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      tags: ['Halal Certified', 'Middle Eastern', 'Kebab', 'Shawarma']
    },
    {
      id: '2',
      name: 'Istanbul Restaurant',
      address: '456 Hongdae, Mapo-gu, Seoul',
      latitude: 37.5563,
      longitude: 126.9236,
      rating: 4.3,
      reviewCount: 89,
      cuisine: 'Turkish',
      priceRange: '₩₩₩',
      isHalal: true,
      halalCertified: false,
      recommendedBy: 'Alia Binti A',
      description: 'Turkish restaurant with halal options. Owner is Muslim and ensures halal preparation.',
      phone: '+82-2-2345-6789',
      hours: '12:00 PM - 11:00 PM',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      tags: ['Turkish', 'Halal Options', 'Doner', 'Baklava']
    },
    {
      id: '3',
      name: 'Malay Corner',
      address: '789 Itaewon, Yongsan-gu, Seoul',
      latitude: 37.5349,
      longitude: 126.9956,
      rating: 4.7,
      reviewCount: 156,
      cuisine: 'Malaysian',
      priceRange: '₩₩',
      isHalal: true,
      halalCertified: true,
      recommendedBy: 'Abu Bin Ali',
      description: 'Authentic Malaysian food! Feels like home. Nasi lemak and rendang are must-try!',
      phone: '+82-2-3456-7890',
      hours: '10:00 AM - 9:00 PM',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      tags: ['Malaysian', 'Halal Certified', 'Nasi Lemak', 'Rendang']
    },
    {
      id: '4',
      name: 'Bismillah Indian Cuisine',
      address: '321 Gangnam, Gangnam-gu, Seoul',
      latitude: 37.4979,
      longitude: 127.0276,
      rating: 4.2,
      reviewCount: 94,
      cuisine: 'Indian',
      priceRange: '₩₩',
      isHalal: true,
      halalCertified: true,
      recommendedBy: 'Alea Binti',
      description: 'Excellent Indian halal food. Great biryani and curry selection.',
      phone: '+82-2-4567-8901',
      hours: '11:30 AM - 10:30 PM',
      image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg',
      tags: ['Indian', 'Halal Certified', 'Biryani', 'Curry']
    },
    {
      id: '5',
      name: 'Halal BBQ House',
      address: '654 Hongik, Mapo-gu, Seoul',
      latitude: 37.5511,
      longitude: 126.9220,
      rating: 4.4,
      reviewCount: 73,
      cuisine: 'Korean BBQ',
      priceRange: '₩₩₩',
      isHalal: true,
      halalCertified: false,
      recommendedBy: 'Alya Binti',
      description: 'Korean BBQ with halal meat options. Great for group dining!',
      phone: '+82-2-5678-9012',
      hours: '5:00 PM - 12:00 AM',
      image: 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg',
      tags: ['Korean BBQ', 'Halal Options', 'Group Dining', 'Bulgogi']
    }
  ]

  const filters = [
    { id: 'all', name: 'All', count: restaurants.length },
    { id: 'certified', name: 'Certified', count: restaurants.filter(r => r.halalCertified).length },
    { id: 'malaysian', name: 'Malaysian', count: restaurants.filter(r => r.cuisine === 'Malaysian').length },
    { id: 'middle-eastern', name: 'Middle Eastern', count: restaurants.filter(r => r.cuisine === 'Middle Eastern').length },
    { id: 'nearby', name: 'Nearby', count: restaurants.length }
  ]

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'certified' && restaurant.halalCertified) ||
                         (selectedFilter === 'malaysian' && restaurant.cuisine === 'Malaysian') ||
                         (selectedFilter === 'middle-eastern' && restaurant.cuisine === 'Middle Eastern') ||
                         (selectedFilter === 'nearby')
    
    return matchesSearch && matchesFilter
  })

  // Initialize Naver Map
  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current && window.naver) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(37.5665, 126.9780), // Seoul center
          zoom: 12,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: window.naver.maps.MapTypeControlStyle.BUTTON,
            position: window.naver.maps.Position.TOP_RIGHT
          },
          zoomControl: true,
          zoomControlOptions: {
            style: window.naver.maps.ZoomControlStyle.SMALL,
            position: window.naver.maps.Position.TOP_LEFT
          }
        }

        const naverMap = new window.naver.maps.Map(mapRef.current, mapOptions)
        setMap(naverMap)

        // Add markers for restaurants
        restaurants.forEach(restaurant => {
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(restaurant.latitude, restaurant.longitude),
            map: naverMap,
            title: restaurant.name,
            icon: {
              content: `
                <div style="
                  background: ${restaurant.halalCertified ? '#10B981' : '#F59E0B'};
                  border: 2px solid white;
                  border-radius: 50%;
                  width: 24px;
                  height: 24px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                ">
                  <div style="
                    background: white;
                    border-radius: 50%;
                    width: 12px;
                    height: 12px;
                  "></div>
                </div>
              `,
              size: new window.naver.maps.Size(24, 24),
              anchor: new window.naver.maps.Point(12, 12)
            }
          })

          // Add click event to marker
          window.naver.maps.Event.addListener(marker, 'click', () => {
            setSelectedRestaurant(restaurant)
          })
        })

        // Get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
              setUserLocation(userPos)

              // Add user location marker
              new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(userPos.lat, userPos.lng),
                map: naverMap,
                title: 'Your Location',
                icon: {
                  content: `
                    <div style="
                      background: #3B82F6;
                      border: 3px solid white;
                      border-radius: 50%;
                      width: 20px;
                      height: 20px;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    "></div>
                  `,
                  size: new window.naver.maps.Size(20, 20),
                  anchor: new window.naver.maps.Point(10, 10)
                }
              })
            },
            (error) => {
              console.log('Error getting location:', error)
            }
          )
        }
      }
    }

    // Load Naver Maps API
    if (!window.naver) {
      const script = document.createElement('script')
      const clientId = import.meta.env.VITE_NAVER_MAPS_CLIENT_ID || 'YOUR_CLIENT_ID'
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`
      script.onload = initializeMap
      script.onerror = () => {
        console.error('Failed to load Naver Maps API. Please check your client ID.')
      }
      document.head.appendChild(script)
    } else {
      initializeMap()
    }
  }, [])

  const handleAddRecommendation = () => {
    setShowAddForm(true)
  }

  const handleSubmitRecommendation = (formData: any) => {
    // Here you would typically submit to your backend/Supabase
    console.log('New recommendation:', formData)
    setShowAddForm(false)
    // Show success message or refresh data
  }

  if (showAddForm) {
    return <AddRecommendationForm user={user} onBack={() => setShowAddForm(false)} onSubmit={handleSubmitRecommendation} />
  }

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 relative z-20">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Halal Food Map</h1>
          <button
            onClick={handleAddRecommendation}
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 relative z-20">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.name} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1">
        <div ref={mapRef} className="w-full h-96 bg-gray-200"></div>
        
        {/* Restaurant List Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg max-h-80 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-bold text-gray-800">
              {filteredRestaurants.length} Halal Restaurants Found
            </h3>
          </div>
          
          <div className="overflow-y-auto max-h-64">
            {filteredRestaurants.map(restaurant => (
              <div
                key={restaurant.id}
                onClick={() => setSelectedRestaurant(restaurant)}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{restaurant.name}</h4>
                        <p className="text-sm text-gray-600">{restaurant.cuisine} • {restaurant.priceRange}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{restaurant.rating}</span>
                            <span className="text-sm text-gray-500">({restaurant.reviewCount})</span>
                          </div>
                          {restaurant.halalCertified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Certified
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded-full">
                        <Heart className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Recommended by {restaurant.recommendedBy}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant Detail Modal */}
      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          user={user}
        />
      )}
    </div>
  )
}

// Restaurant Detail Modal Component
interface RestaurantDetailModalProps {
  restaurant: Restaurant
  onClose: () => void
  user: AuthUser
}

const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({ restaurant, onClose, user }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[70vh]">
          {/* Restaurant Image */}
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-48 object-cover"
          />

          <div className="p-6">
            {/* Restaurant Info */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-800">{restaurant.name}</h2>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Heart className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-gray-500">({restaurant.reviewCount} reviews)</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{restaurant.cuisine}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{restaurant.priceRange}</span>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                {restaurant.halalCertified && (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                    Halal Certified
                  </span>
                )}
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Halal Options
                </span>
              </div>

              <p className="text-gray-600 mb-4">{restaurant.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {restaurant.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{restaurant.address}</span>
                </div>
                {restaurant.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{restaurant.phone}</span>
                  </div>
                )}
                {restaurant.hours && (
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{restaurant.hours}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Recommended By */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Recommended by</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {restaurant.recommendedBy.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="font-medium text-gray-800">{restaurant.recommendedBy}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                <Navigation className="w-5 h-5" />
                <span>Directions</span>
              </button>
              <button className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Review</span>
              </button>
              <button className="bg-gray-100 text-gray-800 p-3 rounded-xl hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add Recommendation Form Component
interface AddRecommendationFormProps {
  user: AuthUser
  onBack: () => void
  onSubmit: (data: any) => void
}

const AddRecommendationForm: React.FC<AddRecommendationFormProps> = ({ user, onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cuisine: '',
    description: '',
    phone: '',
    hours: '',
    halalCertified: false,
    tags: '',
    priceRange: '₩₩'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      recommendedBy: user.name,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Add Recommendation</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter restaurant name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter full address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type *</label>
          <select
            required
            value={formData.cuisine}
            onChange={(e) => setFormData({...formData, cuisine: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select cuisine type</option>
            <option value="Malaysian">Malaysian</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Turkish">Turkish</option>
            <option value="Indian">Indian</option>
            <option value="Korean BBQ">Korean BBQ</option>
            <option value="International">International</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <select
            value={formData.priceRange}
            onChange={(e) => setFormData({...formData, priceRange: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="₩">₩ - Budget (Under ₩10,000)</option>
            <option value="₩₩">₩₩ - Moderate (₩10,000-₩25,000)</option>
            <option value="₩₩₩">₩₩₩ - Expensive (₩25,000+)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Tell us why you recommend this place..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="+82-2-1234-5678"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Operating Hours</label>
          <input
            type="text"
            value={formData.hours}
            onChange={(e) => setFormData({...formData, hours: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., 11:00 AM - 10:00 PM"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Halal Certified, Biryani, Family Friendly (separate with commas)"
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="halalCertified"
            checked={formData.halalCertified}
            onChange={(e) => setFormData({...formData, halalCertified: e.target.checked})}
            className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="halalCertified" className="text-sm font-medium text-gray-700">
            This restaurant has official halal certification
          </label>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
          >
            Submit Recommendation
          </button>
        </div>
      </form>
    </div>
  )
}

export default HalalFoodMapScreen
