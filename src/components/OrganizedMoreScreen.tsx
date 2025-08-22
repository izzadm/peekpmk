import React, { useState } from 'react'
import { ArrowLeft, Users, MapPin, Building2, BookOpen, Wrench } from 'lucide-react'
import { AuthUser } from '../hooks/useAuth'
import StudyMaterialsScreen from './StudyMaterialsScreen'
import HalalFoodMapScreen from './HalalFoodMapScreen'
import HelpdeskScreen from './HelpdeskScreen'

interface OrganizedMoreScreenProps {
  user: AuthUser
  onBack: () => void
}

const OrganizedMoreScreen: React.FC<OrganizedMoreScreenProps> = ({ user, onBack }) => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null)

  const features = [
    {
      id: 'halal-food-map',
      name: 'Halal Food Map',
      icon: MapPin,
      color: 'bg-green-500',
      description: 'Locate halal restaurants nearby'
    },
    {
      id: 'organizations',
      name: 'Organizations',
      icon: Building2,
      color: 'bg-purple-500',
      description: 'Malaysian student organizations'
    },
    {
      id: 'study-materials',
      name: 'Study Materials',
      icon: BookOpen,
      color: 'bg-orange-500',
      description: 'Academic resources and materials'
    },
    {
      id: 'helpdesk',
      name: 'Helpdesk',
      icon: Wrench,
      color: 'bg-red-500',
      description: 'Get help and support'
    }
  ]

  const organizations = [
    {
      id: 'embassy',
      name: 'Embassy of Malaysia',
      address: '129, Dokseodang-ro\nHannam-dong,\nYongsan-gu\nSeoul,\nRepublic of Korea',
      operationHours: {
        weekdays: 'Monday - Friday\n09:00 - 17:00 (Consular Section:\n09:30 - 12:30)',
        status: 'CLOSED',
        weekend: 'Saturday & Sunday'
      },
      contact: {
        general: '+82-2-2077-8600 (General Line)',
        emergency: 'Emergency: +82-10-8974-8699',
        fax: '+82-2-794-5148/ 5480',
        email: 'mwseoul@kln.gov.my / seoconsul@kln.gov.my (Consular Matters)'
      }
    },
    {
      id: 'ppmk',
      name: 'Persatuan Pelajar Malaysia di Korea (PPMK)',
      address: 'Various Universities\nAcross South Korea',
      operationHours: {
        weekdays: 'Contact via social media',
        status: 'ACTIVE',
        weekend: 'Available'
      },
      contact: {
        general: 'Contact via Facebook/Instagram',
        emergency: 'Emergency contacts available',
        email: 'ppmk.official@gmail.com'
      },
      leadership: [
        {
          position: 'PRESIDENT',
          name: 'ALI BIN A',
          phone: '+82-10-1234-5678',
          email: 'president@ppmk.org'
        },
        {
          position: 'VICE PRESIDENT I',
          name: 'ALIA BINTI A',
          phone: '+82-10-2345-6789',
          email: 'vp1@ppmk.org'
        },
        {
          position: 'VICE PRESIDENT II',
          name: 'ABU BIN ALI',
          phone: '+82-10-3456-7890',
          email: 'vp2@ppmk.org'
        },
        {
          position: 'GENERAL SECRETARY',
          name: 'ALEA BINTI',
          phone: '+82-10-4567-8901',
          email: 'secretary@ppmk.org'
        },
        {
          position: 'HONORARY TREASURER',
          name: 'ALYA BINTI',
          phone: '+82-10-5678-9012',
          email: 'treasurer@ppmk.org'
        }
      ]
    },
    {
      id: 'university-representatives',
      name: 'University Representatives',
      address: 'Various Universities\nAcross South Korea',
      operationHours: {
        weekdays: 'Contact via university channels',
        status: 'ACTIVE',
        weekend: 'Available'
      },
      contact: {
        general: 'Contact via university representatives',
        emergency: 'Emergency contacts available',
        email: 'university.reps@malaysia-korea.org'
      },
      universities: [
        {
          name: 'KAIST UNIVERSITY',
          representative: 'ALI BIN ABU',
          phone: '+82-10-1111-2222',
          email: 'ali.abu@kaist.ac.kr'
        },
        {
          name: 'YONSEI UNIVERSITY',
          representative: 'ALI BIN ABU',
          phone: '+82-10-2222-3333',
          email: 'ali.abu@yonsei.ac.kr'
        },
        {
          name: 'KOREA UNIVERSITY',
          representative: 'ALIA BINTI A',
          phone: '+82-10-3333-4444',
          email: 'alia.a@korea.ac.kr'
        },
        {
          name: 'HANYANG UNIVERSITY',
          representative: 'ABU BIN ALI',
          phone: '+82-10-4444-5555',
          email: 'abu.ali@hanyang.ac.kr'
        },
        {
          name: 'KYUNGHEE UNIVERSITY',
          representative: 'ALEA BINTI',
          phone: '+82-10-5555-6666',
          email: 'alea@khu.ac.kr'
        },
        {
          name: 'EWHA UNIVERSITY',
          representative: 'ALYA BINTI',
          phone: '+82-10-6666-7777',
          email: 'alya@ewha.ac.kr'
        }
      ]
    },
    {
      id: 'scholarship-representatives',
      name: 'Scholarship Representatives',
      address: 'Various Scholarship Programs\nAcross South Korea',
      operationHours: {
        weekdays: 'Contact via scholarship channels',
        status: 'ACTIVE',
        weekend: 'Available'
      },
      contact: {
        general: 'Contact via scholarship representatives',
        emergency: 'Emergency contacts available',
        email: 'scholarship.reps@malaysia-korea.org'
      },
      scholarships: [
        {
          name: 'MARA',
          representative: 'ALI BIN ABU',
          phone: '+82-10-7777-8888',
          email: 'ali.abu@mara.gov.my'
        },
        {
          name: 'JPA',
          representative: 'ALI BIN ABU',
          phone: '+82-10-8888-9999',
          email: 'ali.abu@jpa.gov.my'
        },
        {
          name: 'YTM',
          representative: 'ALIA BINTI A',
          phone: '+82-10-9999-0000',
          email: 'alia.a@ytm.org.my'
        },
        {
          name: 'PETRONAS',
          representative: 'ABU BIN ALI',
          phone: '+82-10-0000-1111',
          email: 'abu.ali@petronas.com.my'
        },
        {
          name: 'YAYASAN TERENGGANU',
          representative: 'ALEA BINTI',
          phone: '+82-10-1111-2222',
          email: 'alea@yayasanterengganu.org.my'
        },
        {
          name: 'SELF-FUNDED',
          representative: 'ALYA BINTI',
          phone: '+82-10-2222-3333',
          email: 'alya@selffunded.org'
        }
      ]
    },
    {
      id: 'batch-representatives',
      name: 'Batch Representatives',
      address: 'Various Batch Years\nAcross South Korea',
      operationHours: {
        weekdays: 'Contact via batch channels',
        status: 'ACTIVE',
        weekend: 'Available'
      },
      contact: {
        general: 'Contact via batch representatives',
        emergency: 'Emergency contacts available',
        email: 'batch.reps@malaysia-korea.org'
      },
      batches: [
        {
          name: 'BATCH 20',
          representative: 'ALI BIN ABU',
          phone: '+82-10-2020-2020',
          email: 'ali.abu@batch20.org'
        },
        {
          name: 'BATCH 21',
          representative: 'ALI BIN ABU',
          phone: '+82-10-2121-2121',
          email: 'ali.abu@batch21.org'
        },
        {
          name: 'BATCH 22',
          representative: 'ALIA BINTI A',
          phone: '+82-10-2222-2222',
          email: 'alia.a@batch22.org'
        },
        {
          name: 'BATCH 23',
          representative: 'ABU BIN ALI',
          phone: '+82-10-2323-2323',
          email: 'abu.ali@batch23.org'
        },
        {
          name: 'BATCH 24',
          representative: 'ALEA BINTI',
          phone: '+82-10-2424-2424',
          email: 'alea@batch24.org'
        },
        {
          name: 'BATCH 25',
          representative: 'ALYA BINTI',
          phone: '+82-10-2525-2525',
          email: 'alya@batch25.org'
        }
      ]
    },
    {
      id: 'club-leaders',
      name: 'Club Leaders',
      address: 'Various Clubs\nAcross South Korea',
      operationHours: {
        weekdays: 'Contact via club channels',
        status: 'ACTIVE',
        weekend: 'Available'
      },
      contact: {
        general: 'Contact via club leaders',
        emergency: 'Emergency contacts available',
        email: 'club.leaders@malaysia-korea.org'
      },
      clubs: [
        {
          name: 'DANCE CLUB',
          representative: 'ALIA BINTI A',
          phone: '+82-10-3001-3001',
          email: 'alia.a@danceclub.org'
        },
        {
          name: 'RECREATION CLUB',
          representative: 'ALI BIN ABU',
          phone: '+82-10-3002-3002',
          email: 'ali.abu@recreationclub.org'
        },
        {
          name: 'VOLLEYBALL CLUB',
          representative: 'ALIA BINTI A',
          phone: '+82-10-3003-3003',
          email: 'alia.a@volleyballclub.org'
        },
        {
          name: 'BADMINTON CLUB',
          representative: 'ABU BIN ALI',
          phone: '+82-10-3004-3004',
          email: 'abu.ali@badmintonclub.org'
        },
        {
          name: 'THEATRE CLUB',
          representative: 'ALEA BINTI',
          phone: '+82-10-3005-3005',
          email: 'alea@theatreclub.org'
        },
        {
          name: 'PHOTOGRAPHY CLUB',
          representative: 'ALYA BINTI',
          phone: '+82-10-3006-3006',
          email: 'alya@photographyclub.org'
        }
      ]
    }
  ]

  if (selectedFeature === 'study-materials') {
    return <StudyMaterialsScreen user={user} onBack={() => setSelectedFeature(null)} />
  }

  if (selectedFeature === 'halal-food-map') {
    return <HalalFoodMapScreen user={user} onBack={() => setSelectedFeature(null)} />
  }

  if (selectedFeature === 'helpdesk') {
    return <HelpdeskScreen user={user} onBack={() => setSelectedFeature(null)} />
  }

  // Organizations Modal
  if (selectedFeature === 'organizations') {
    if (selectedOrganization) {
      const org = organizations.find(o => o.id === selectedOrganization)
      if (!org) return null

      // Club Leaders Organization Detail View
      if (org.id === 'club-leaders') {
        return (
          <div className="min-h-screen bg-gray-100 font-inter">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedOrganization(null)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-bold text-gray-800">{`Organizations > ${org.name}`}</h1>
                <div className="w-16"></div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Club Leaders Grid */}
              <div className="grid grid-cols-2 gap-4">
                {org.clubs?.map((club, index) => (
                  <div key={index} className="bg-gray-300 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{club.name}</h3>
                      <p className="font-medium text-gray-700 text-sm">{club.representative}</p>
                    </div>
                    <div className="flex justify-center space-x-3">
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Club Slots (Empty for now) */}
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={`empty-club-${index}`} className="bg-gray-300 rounded-lg p-4 h-24">
                    {/* Empty club leader slots */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      // Batch Representatives Organization Detail View
      if (org.id === 'batch-representatives') {
        return (
          <div className="min-h-screen bg-gray-100 font-inter">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedOrganization(null)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-bold text-gray-800">{`Organizations > ${org.name}`}</h1>
                <div className="w-16"></div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Batch Representatives Grid */}
              <div className="grid grid-cols-2 gap-4">
                {org.batches?.map((batch, index) => (
                  <div key={index} className="bg-gray-300 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{batch.name}</h3>
                      <p className="font-medium text-gray-700 text-sm">{batch.representative}</p>
                    </div>
                    <div className="flex justify-center space-x-3">
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Batch Slots (Empty for now) */}
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={`empty-batch-${index}`} className="bg-gray-300 rounded-lg p-4 h-24">
                    {/* Empty batch representative slots */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      // Scholarship Representatives Organization Detail View
      if (org.id === 'scholarship-representatives') {
        return (
          <div className="min-h-screen bg-gray-100 font-inter">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedOrganization(null)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-bold text-gray-800">{`Organizations > ${org.name}`}</h1>
                <div className="w-16"></div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Scholarship Representatives Grid */}
              <div className="grid grid-cols-2 gap-4">
                {org.scholarships?.map((scholarship, index) => (
                  <div key={index} className="bg-gray-300 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{scholarship.name}</h3>
                      <p className="font-medium text-gray-700 text-sm">{scholarship.representative}</p>
                    </div>
                    <div className="flex justify-center space-x-3">
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Scholarship Slots (Empty for now) */}
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={`empty-scholarship-${index}`} className="bg-gray-300 rounded-lg p-4 h-24">
                    {/* Empty scholarship representative slots */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      // University Representatives Organization Detail View
      if (org.id === 'university-representatives') {
        return (
          <div className="min-h-screen bg-gray-100 font-inter">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedOrganization(null)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-bold text-gray-800">{`Organizations > ${org.name}`}</h1>
                <div className="w-16"></div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* University Representatives Grid */}
              <div className="grid grid-cols-2 gap-4">
                {org.universities?.map((university, index) => (
                  <div key={index} className="bg-gray-300 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{university.name}</h3>
                      <p className="font-medium text-gray-700 text-sm">{university.representative}</p>
                    </div>
                    <div className="flex justify-center space-x-3">
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional University Slots (Empty for now) */}
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={`empty-uni-${index}`} className="bg-gray-300 rounded-lg p-4 h-24">
                    {/* Empty university representative slots */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      // PPMK Organization Detail View
      if (org.id === 'ppmk') {
        return (
          <div className="min-h-screen bg-gray-100 font-inter">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedOrganization(null)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-bold text-gray-800">{`Organizations > ${org.name}`}</h1>
                <div className="w-16"></div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Leadership Grid */}
              <div className="grid grid-cols-2 gap-4">
                {org.leadership?.map((leader, index) => (
                  <div key={index} className="bg-gray-300 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{leader.position}</h3>
                      <p className="font-medium text-gray-700 text-sm">{leader.name}</p>
                    </div>
                    <div className="flex justify-center space-x-3">
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Leadership Positions (Empty for now) */}
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={`empty-${index}`} className="bg-gray-300 rounded-lg p-4 h-24">
                    {/* Empty leadership position slots */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      // Embassy Organization Detail View (existing)
      return (
        <div className="min-h-screen bg-gray-100 font-inter">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedOrganization(null)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-lg font-bold text-gray-800">{`Organizations > ${org.name}`}</h1>
              <div className="w-16"></div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Address Section */}
            <div className="bg-gray-300 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-gray-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Address</h3>
                  <p className="text-gray-700 whitespace-pre-line">{org.address}</p>
                </div>
              </div>
            </div>

            {/* Operation Hours Section */}
            <div className="bg-gray-300 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-gray-700 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">Operation Hours</h3>
                  <p className="text-gray-700 whitespace-pre-line mb-2">{org.operationHours.weekdays}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{org.operationHours.weekend}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      org.operationHours.status === 'CLOSED' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {org.operationHours.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Us Section */}
            <div className="bg-gray-300 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Contact Us</h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-gray-700 mt-1" />
                  <div>
                    <p className="text-gray-700">{org.contact.general}</p>
                    {org.contact.emergency && (
                      <p className="text-gray-700">{org.contact.emergency}</p>
                    )}
                    {org.contact.fax && (
                      <p className="text-gray-700">{org.contact.fax}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-gray-700 mt-1" />
                  <div>
                    <p className="text-gray-700 whitespace-pre-line">{org.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Organizations List Modal
    return (
      <div className="min-h-screen bg-gray-100 font-inter">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedFeature(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Organizations</h1>
            <div className="w-16"></div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => setSelectedOrganization(org.id)}
                className="w-full bg-white border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-800">{org.name}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
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
            <span>Back</span>
          </button>
          <h1 className="text-lg font-bold text-gray-800">More</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="px-4 pt-6">
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-6">
            {features.slice(0, 4).map((feature) => {
              const IconComponent = feature.icon
              return (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature.id)}
                  className="flex flex-col items-center space-y-3 p-4 rounded-xl hover:bg-gray-50 transition-all group"
                >
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-gray-800 text-sm">{feature.name}</h3>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Feature Details for non-organizations features */}
      {selectedFeature && selectedFeature !== 'study-materials' && selectedFeature !== 'organizations' && selectedFeature !== 'halal-food-map' && selectedFeature !== 'helpdesk' && (
        <div className="p-4 mt-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {features.find(f => f.id === selectedFeature)?.name}
            </h2>
            <p className="text-gray-600 mb-6">
              {features.find(f => f.id === selectedFeature)?.description}
            </p>
            <div className="text-center">
              <p className="text-gray-500 mb-4">Coming Soon!</p>
              <button
                onClick={() => setSelectedFeature(null)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrganizedMoreScreen
