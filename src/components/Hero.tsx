import React from 'react'
import { ArrowRight, MapPin, Users, Heart } from 'lucide-react'

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-8">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-gray-700">Connecting Hearts Across Borders</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Your Home Away From
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent"> Home</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow Malaysian students in Korea. Share experiences, find support, 
            and build lasting friendships in the Land of the Morning Calm.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <span>Join Our Community</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="backdrop-blur-xl bg-white/20 border border-white/30 text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
              Explore Features
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">2,500+</h3>
            <p className="text-gray-600">Active Members</p>
          </div>
          
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <MapPin className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">15+</h3>
            <p className="text-gray-600">Cities Covered</p>
          </div>
          
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
            <p className="text-gray-600">Events Hosted</p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-4 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop"
              alt="Korean cityscape with Malaysian students"
              className="w-full h-96 object-cover rounded-2xl"
            />
            <div className="absolute inset-4 bg-gradient-to-t from-black/50 to-transparent rounded-2xl flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Seoul • Busan • Daegu • Incheon</h3>
                <p className="text-lg opacity-90">Malaysians thriving in Korea's vibrant cities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
