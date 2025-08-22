import React from 'react'
import { BookOpen, MapPin, Utensils, Home, GraduationCap, Heart, Download, ExternalLink } from 'lucide-react'

const Resources: React.FC = () => {
  const resourceCategories = [
    {
      icon: GraduationCap,
      title: 'Academic Resources',
      description: 'Study guides, university info, and academic support',
      color: 'from-blue-500 to-cyan-500',
      resources: [
        { name: 'Korean Language Study Guide', type: 'PDF', downloads: 1250 },
        { name: 'University Application Tips', type: 'Article', downloads: 890 },
        { name: 'Scholarship Opportunities', type: 'List', downloads: 2100 },
        { name: 'Academic Calendar 2024', type: 'PDF', downloads: 567 }
      ]
    },
    {
      icon: Utensils,
      title: 'Food & Dining',
      description: 'Halal restaurants, Malaysian food spots, and cooking tips',
      color: 'from-green-500 to-teal-500',
      resources: [
        { name: 'Halal Restaurant Directory', type: 'Map', downloads: 3200 },
        { name: 'Malaysian Ingredients Guide', type: 'PDF', downloads: 1800 },
        { name: 'Cooking Malaysian Food in Korea', type: 'Video', downloads: 950 },
        { name: 'Ramadan Dining Guide', type: 'Article', downloads: 1200 }
      ]
    },
    {
      icon: Home,
      title: 'Housing & Living',
      description: 'Accommodation tips, living costs, and practical advice',
      color: 'from-purple-500 to-pink-500',
      resources: [
        { name: 'Housing Search Guide', type: 'PDF', downloads: 2800 },
        { name: 'Living Cost Calculator', type: 'Tool', downloads: 1500 },
        { name: 'Utility Setup Checklist', type: 'Checklist', downloads: 890 },
        { name: 'Neighborhood Reviews', type: 'Article', downloads: 1100 }
      ]
    },
    {
      icon: MapPin,
      title: 'City Guides',
      description: 'Comprehensive guides for major Korean cities',
      color: 'from-orange-500 to-red-500',
      resources: [
        { name: 'Seoul Survival Guide', type: 'PDF', downloads: 4200 },
        { name: 'Busan Student Guide', type: 'PDF', downloads: 1800 },
        { name: 'Transportation Maps', type: 'Map', downloads: 2500 },
        { name: 'Emergency Contacts', type: 'List', downloads: 1900 }
      ]
    }
  ]

  const quickLinks = [
    { title: 'Malaysian Embassy Korea', url: '#', description: 'Official embassy services and support' },
    { title: 'Korean Immigration Service', url: '#', description: 'Visa and immigration information' },
    { title: 'Korea Tourism Organization', url: '#', description: 'Travel and cultural information' },
    { title: 'Study in Korea', url: '#', description: 'Official education portal' },
    { title: 'Korean Language Learning', url: '#', description: 'Free language learning resources' },
    { title: 'Healthcare Guide', url: '#', description: 'Medical services and insurance info' }
  ]

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-8">
            <BookOpen className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">Knowledge Hub</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Resources & Guides
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Everything you need to thrive as a Malaysian student in Korea. 
            From academic support to daily living tips, we've got you covered.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {resourceCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mr-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {category.resources.map((resource, resourceIndex) => (
                    <div
                      key={resourceIndex}
                      className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Download className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                            {resource.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {resource.type} • {resource.downloads.toLocaleString()} downloads
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                  ))}
                </div>
                
                <button className={`w-full mt-6 bg-gradient-to-r ${category.color} text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300`}>
                  View All Resources
                </button>
              </div>
            )
          })}
        </div>

        {/* Quick Links */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Essential Links
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">{link.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contribute Section */}
        <div className="text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-white/30 rounded-3xl p-12">
            <Heart className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Help Grow Our Knowledge Base
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Have valuable resources, guides, or tips to share? 
              Help fellow Malaysian students by contributing to our community knowledge base.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Contribute Resource
              </button>
              <button className="backdrop-blur-xl bg-white/20 border border-white/30 text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300">
                Suggest Topic
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resources
