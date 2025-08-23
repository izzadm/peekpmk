import React, { useState } from 'react'
import { X, ArrowLeft, Users, MapPin, Phone, Mail, Clock } from 'lucide-react'

interface OrganizationsModalProps {
  onClose: () => void
}

interface Organization {
  id: string
  name: string
  type: string
  description: string
  address: string
  contact: {
    phone?: string
    email?: string
    website?: string
  }
  operationHours?: string
  status: 'ACTIVE' | 'CLOSED' | 'LIMITED'
  leadership?: Array<{
    position: string
    name: string
    phone?: string
    email?: string
  }>
  members?: Array<{
    name: string
    university?: string
    batch?: string
    scholarship?: string
  }>
}

const OrganizationsModal: React.FC<OrganizationsModalProps> = ({ onClose }) => {
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null)

  const organizations: Organization[] = [
    {
      id: 'embassy',
      name: 'Embassy of Malaysia',
      type: 'Government',
      description: 'Official Malaysian diplomatic mission in South Korea',
      address: '129, Dokseodang-ro, Hannam-dong, Yongsan-gu, Seoul, Republic of Korea',
      contact: {
        phone: '+82-2-2077-8600',
        email: 'mwseoul@kln.gov.my',
        website: 'www.kln.gov.my/web/kor_seoul'
      },
      operationHours: 'Monday - Friday: 09:00 - 17:00 (Consular: 09:30 - 12:30)',
      status: 'ACTIVE'
    },
    {
      id: 'ppmk',
      name: 'Persatuan Pelajar Malaysia di Korea (PPMK)',
      type: 'Student Association',
      description: 'Main Malaysian student association in South Korea',
      address: 'Various Universities Across South Korea',
      contact: {
        email: 'ppmk.official@gmail.com'
      },
      status: 'ACTIVE',
      leadership: [
        {
          position: 'President',
          name: 'Ali Bin Abu',
          phone: '+82-10-1234-5678',
          email: 'president@ppmk.org'
        },
        {
          position: 'Vice President I',
          name: 'Alia Binti Ahmad',
          phone: '+82-10-2345-6789',
          email: 'vp1@ppmk.org'
        },
        {
          position: 'Vice President II',
          name: 'Abu Bin Ali',
          phone: '+82-10-3456-7890',
          email: 'vp2@ppmk.org'
        },
        {
          position: 'General Secretary',
          name: 'Alea Binti Hassan',
          phone: '+82-10-4567-8901',
          email: 'secretary@ppmk.org'
        },
        {
          position: 'Honorary Treasurer',
          name: 'Alya Binti Rahman',
          phone: '+82-10-5678-9012',
          email: 'treasurer@ppmk.org'
        }
      ]
    },
    {
      id: 'university-reps',
      name: 'University Representatives',
      type: 'Academic Network',
      description: 'Malaysian student representatives at various Korean universities',
      address: 'Multiple Universities',
      contact: {
        email: 'university.reps@ppmk.org'
      },
      status: 'ACTIVE',
      members: [
        { name: 'Ahmad Bin Ali', university: 'KAIST University' },
        { name: 'Siti Binti Omar', university: 'Yonsei University' },
        { name: 'Rahman Bin Hassan', university: 'Korea University' },
        { name: 'Fatimah Binti Ahmad', university: 'Hanyang University' },
        { name: 'Ismail Bin Ibrahim', university: 'Kyung Hee University' },
        { name: 'Aminah Binti Yusof', university: 'Ewha University' }
      ]
    },
    {
      id: 'scholarship-reps',
      name: 'Scholarship Representatives',
      type: 'Funding Network',
      description: 'Representatives for various Malaysian scholarship programs',
      address: 'Multiple Locations',
      contact: {
        email: 'scholarship.reps@ppmk.org'
      },
      status: 'ACTIVE',
      members: [
        { name: 'Azman Bin Ali', scholarship: 'MARA' },
        { name: 'Noraini Binti Hassan', scholarship: 'JPA' },
        { name: 'Hafiz Bin Omar', scholarship: 'YTM' },
        { name: 'Zainab Binti Ahmad', scholarship: 'PETRONAS' },
        { name: 'Farid Bin Ibrahim', scholarship: 'Yayasan Terengganu' },
        { name: 'Mariam Binti Yusof', scholarship: 'Self-Funded' }
      ]
    },
    {
      id: 'batch-reps',
      name: 'Batch Representatives',
      type: 'Year Groups',
      description: 'Representatives for different intake years',
      address: 'Multiple Locations',
      contact: {
        email: 'batch.reps@ppmk.org'
      },
      status: 'ACTIVE',
      members: [
        { name: 'Hakim Bin Ali', batch: 'Batch 2020' },
        { name: 'Nurul Binti Hassan', batch: 'Batch 2021' },
        { name: 'Danial Bin Omar', batch: 'Batch 2022' },
        { name: 'Aishah Binti Ahmad', batch: 'Batch 2023' },
        { name: 'Irfan Bin Ibrahim', batch: 'Batch 2024' },
        { name: 'Khadijah Binti Yusof', batch: 'Batch 2025' }
      ]
    },
    {
      id: 'club-leaders',
      name: 'Club Leaders',
      type: 'Activity Groups',
      description: 'Leaders of various Malaysian student clubs and activities',
      address: 'Multiple Locations',
      contact: {
        email: 'club.leaders@ppmk.org'
      },
      status: 'ACTIVE',
      members: [
        { name: 'Syafiq Bin Ali', university: 'Dance Club' },
        { name: 'Nadia Binti Hassan', university: 'Recreation Club' },
        { name: 'Arif Bin Omar', university: 'Volleyball Club' },
        { name: 'Laila Binti Ahmad', university: 'Badminton Club' },
        { name: 'Zulkifli Bin Ibrahim', university: 'Theatre Club' },
        { name: 'Farah Binti Yusof', university: 'Photography Club' }
      ]
    }
  ]

  const selectedOrg = organizations.find(org => org.id === selectedOrganization)

  if (selectedOrg) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedOrganization(null)}
                className="p-1 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold text-center flex-1">{selectedOrg.name}</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Basic Info */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {selectedOrg.type}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedOrg.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedOrg.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{selectedOrg.description}</p>
            </div>

            {/* Address */}
            <div className="mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Address</h3>
                  <p className="text-gray-600">{selectedOrg.address}</p>
                </div>
              </div>
            </div>

            {/* Operation Hours */}
            {selectedOrg.operationHours && (
              <div className="mb-6">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Operation Hours</h3>
                    <p className="text-gray-600">{selectedOrg.operationHours}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-3">Contact Information</h3>
              <div className="space-y-2">
                {selectedOrg.contact.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{selectedOrg.contact.phone}</span>
                  </div>
                )}
                {selectedOrg.contact.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{selectedOrg.contact.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Leadership */}
            {selectedOrg.leadership && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Leadership</h3>
                <div className="space-y-3">
                  {selectedOrg.leadership.map((leader, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">{leader.name}</h4>
                          <p className="text-sm text-gray-600">{leader.position}</p>
                        </div>
                        <div className="flex space-x-2">
                          {leader.phone && (
                            <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                              <Phone className="w-4 h-4 text-blue-600" />
                            </button>
                          )}
                          {leader.email && (
                            <button className="p-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                              <Mail className="w-4 h-4 text-green-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Members */}
            {selectedOrg.members && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">
                  {selectedOrg.type === 'Academic Network' ? 'University Representatives' :
                   selectedOrg.type === 'Funding Network' ? 'Scholarship Representatives' :
                   selectedOrg.type === 'Year Groups' ? 'Batch Representatives' :
                   selectedOrg.type === 'Activity Groups' ? 'Club Leaders' : 'Members'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedOrg.members.map((member, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-medium text-gray-800">{member.name}</h4>
                      <p className="text-sm text-gray-600">
                        {member.university || member.batch || member.scholarship}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Organizations</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Organizations List */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-4">
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => setSelectedOrganization(org.id)}
                className="w-full bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-left transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-800">{org.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {org.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{org.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className={`px-2 py-1 rounded-full ${
                        org.status === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {org.status}
                      </span>
                      {org.leadership && (
                        <span>{org.leadership.length} Leaders</span>
                      )}
                      {org.members && (
                        <span>{org.members.length} Members</span>
                      )}
                    </div>
                  </div>
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizationsModal
