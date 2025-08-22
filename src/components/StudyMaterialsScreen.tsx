import React, { useState } from 'react'
import { ArrowLeft, BookOpen, FileText, Brain, Clock, Download, Star } from 'lucide-react'
import { AuthUser } from '../hooks/useAuth'

interface StudyMaterialsScreenProps {
  user: AuthUser
  onBack: () => void
}

const StudyMaterialsScreen: React.FC<StudyMaterialsScreenProps> = ({ user, onBack }) => {
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const universities = [
    {
      id: 'hanyang',
      name: 'HANYANG UNIVERSITY',
      subjects: [
        { id: 'cs', name: 'COMPUTER SCIENCE' },
        { id: 'engineering', name: 'ENGINEERING' },
        { id: 'business', name: 'BUSINESS' },
        { id: 'korean', name: 'KOREAN LANGUAGE' }
      ]
    },
    {
      id: 'yonsei',
      name: 'YONSEI UNIVERSITY',
      subjects: [
        { id: 'cs', name: 'COMPUTER SCIENCE' },
        { id: 'medicine', name: 'MEDICINE' },
        { id: 'economics', name: 'ECONOMICS' },
        { id: 'korean', name: 'KOREAN LANGUAGE' }
      ]
    },
    {
      id: 'korea',
      name: 'KOREA UNIVERSITY',
      subjects: [
        { id: 'cs', name: 'COMPUTER SCIENCE' },
        { id: 'law', name: 'LAW' },
        { id: 'business', name: 'BUSINESS' },
        { id: 'korean', name: 'KOREAN LANGUAGE' }
      ]
    }
  ]

  const materialSections = [
    {
      id: 'past-papers',
      title: 'PAST PAPERS',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
      materials: [
        { name: 'Midterm 2023', downloads: 245, rating: 4.8 },
        { name: 'Final 2023', downloads: 189, rating: 4.6 },
        { name: 'Midterm 2022', downloads: 156, rating: 4.7 },
        { name: 'Final 2022', downloads: 134, rating: 4.5 }
      ]
    },
    {
      id: 'quiz',
      title: 'QUIZ',
      icon: Brain,
      color: 'bg-green-100 text-green-600',
      materials: [
        { name: 'Chapter 1-3 Quiz', downloads: 89, rating: 4.9 },
        { name: 'Midterm Practice Quiz', downloads: 156, rating: 4.7 },
        { name: 'Final Practice Quiz', downloads: 123, rating: 4.8 },
        { name: 'Weekly Quiz Collection', downloads: 67, rating: 4.6 }
      ]
    },
    {
      id: 'revision',
      title: 'REVISION',
      icon: Clock,
      color: 'bg-purple-100 text-purple-600',
      materials: [
        { name: 'Summary Notes', downloads: 234, rating: 4.9 },
        { name: 'Key Concepts Guide', downloads: 178, rating: 4.8 },
        { name: 'Formula Sheet', downloads: 145, rating: 4.7 },
        { name: 'Study Schedule Template', downloads: 98, rating: 4.6 }
      ]
    }
  ]

  if (selectedUniversity && selectedSubject) {
    const university = universities.find(u => u.id === selectedUniversity)
    const subject = university?.subjects.find(s => s.id === selectedSubject)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 font-inter">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-lg border-b border-white/20 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedSubject(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-800">{university?.name}</h1>
              <p className="text-sm text-gray-600">{">> "}{subject?.name}</p>
            </div>
            <div className="w-16"></div>
          </div>
        </div>

        {/* Material Sections */}
        <div className="p-4 space-y-4">
          {materialSections.map((section) => {
            const IconComponent = section.icon
            return (
              <div key={section.id} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="bg-gray-200 px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${section.color} flex items-center justify-center`}>
                      <IconComponent size={16} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">{section.title}</h2>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  {section.materials.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Download className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{material.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{material.downloads} downloads</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span>{material.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (selectedUniversity) {
    const university = universities.find(u => u.id === selectedUniversity)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 font-inter">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-lg border-b border-white/20 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedUniversity(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <h1 className="text-lg font-bold text-gray-800">{university?.name}</h1>
            <div className="w-16"></div>
          </div>
        </div>

        {/* Subjects */}
        <div className="p-4 space-y-3">
          {university?.subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className="w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left hover:bg-white/90 transition-all"
            >
              <h2 className="text-lg font-bold text-gray-800">{subject.name}</h2>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 font-inter">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-white/20 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-bold text-gray-800">Study Materials</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Universities */}
      <div className="p-4 space-y-3">
        {universities.map((university) => (
          <button
            key={university.id}
            onClick={() => setSelectedUniversity(university.id)}
            className="w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left hover:bg-white/90 transition-all"
          >
            <h2 className="text-lg font-bold text-gray-800">{university.name}</h2>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StudyMaterialsScreen
