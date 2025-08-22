import React from 'react'
import { MessageCircle, Calendar, BookOpen, Users, MapPin, Heart, Utensils, GraduationCap } from 'lucide-react'

const Features: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Community Chat',
      description: 'Connect instantly with fellow Malaysians through our vibrant chat groups organized by cities and interests.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calendar,
      title: 'Events & Meetups',
      description: 'Join exciting events, cultural celebrations, and casual meetups happening across Korea.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BookOpen,
      title: 'Study Resources',
      description: 'Access shared notes, study guides, and academic resources from students across different universities.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Utensils,
      title: 'Food & Culture',
      description: 'Discover halal restaurants, Malaysian food spots, and share cultural experiences with the community.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: MapPin,
      title: 'City Guides',
      description: 'Get insider tips and comprehensive guides for living in Seoul, Busan, Daegu, and other Korean cities.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: GraduationCap,
      title: 'Academic Support',
      description: 'Find study partners, get help with Korean language, and navigate university life together.',
      color: 'from-cyan-500 to-blue-500'
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-8">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-gray-700">Everything You Need</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Built for Malaysian Students
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From finding halal food to academic support, we've got everything covered 
            to make your Korean journey unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-white/30 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Connect?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of Malaysian students who have found their community in Korea.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
