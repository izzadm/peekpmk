import React from 'react'
import { Users, Mail, MessageCircle, Instagram, Facebook, Twitter, Heart, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: MessageCircle, href: '#', label: 'Discord' }
  ]

  const quickLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Community Guidelines', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Contact Support', href: '#' },
    { label: 'FAQ', href: '#' }
  ]

  const cities = [
    { name: 'Seoul', href: '#' },
    { name: 'Busan', href: '#' },
    { name: 'Daegu', href: '#' },
    { name: 'Incheon', href: '#' },
    { name: 'Gwangju', href: '#' },
    { name: 'Daejeon', href: '#' }
  ]

  return (
    <footer className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">MalaysianKorea</h3>
                  <p className="text-sm text-gray-600">Connect • Share • Thrive</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
                Building bridges between Malaysian students across Korea. 
                From Seoul to Busan, we're creating a home away from home for every Malaysian student.
              </p>
              
              <div className="flex items-center space-x-2 text-gray-600 mb-6">
                <MapPin className="w-5 h-5" />
                <span>Serving Malaysian students across 15+ Korean cities</span>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 group"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cities */}
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-6">Our Communities</h4>
              <ul className="space-y-3">
                {cities.map((city, index) => (
                  <li key={index}>
                    <a
                      href={city.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{city.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-white/20 pt-12 mb-12">
            <div className="text-center max-w-2xl mx-auto">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                Stay Connected
              </h4>
              <p className="text-gray-600 mb-8">
                Get the latest updates on events, resources, and community news delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                <div className="relative flex-1 w-full">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-600">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>for Malaysian students in Korea</span>
              </div>
              
              <div className="text-gray-600 text-sm">
                © 2024 MalaysianKorea Community. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
