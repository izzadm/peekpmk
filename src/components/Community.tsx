import React from 'react'
import { Users, MessageSquare, Star, MapPin } from 'lucide-react'

const Community: React.FC = () => {
  const testimonials = [
    {
      name: 'Aisha Rahman',
      university: 'Seoul National University',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      text: 'This community helped me find my closest friends in Seoul. From study groups to weekend hangouts, I never felt alone.',
      rating: 5
    },
    {
      name: 'Ahmad Zaki',
      university: 'KAIST',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      text: 'The academic support here is incredible. Senior students always willing to help with course selection and study tips.',
      rating: 5
    },
    {
      name: 'Siti Nurhaliza',
      university: 'Yonsei University',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      text: 'Found the best halal restaurants through this community. The food recommendations are spot on!',
      rating: 5
    }
  ]

  const cities = [
    { name: 'Seoul', members: 1200, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
    { name: 'Busan', members: 450, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
    { name: 'Daegu', members: 320, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
    { name: 'Incheon', members: 280, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Community Stats */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Vibrant Community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Join Malaysian students across Korea's major cities and be part of something special.
          </p>
        </div>

        {/* City Communities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {cities.map((city, index) => (
            <div
              key={index}
              className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{city.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{city.members} members</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  Join {city.name} Group
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            What Our Members Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.university}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-red-500/20 border border-white/30 rounded-3xl p-12">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Become Part of Our Family
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're just arriving in Korea or have been here for years, 
              there's always a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Join Now - It's Free!
              </button>
              <button className="backdrop-blur-xl bg-white/20 border border-white/30 text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community
