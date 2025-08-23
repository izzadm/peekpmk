import React from 'react'
import { AuthUser } from '../hooks/useAuth'
import { Bell, Search, Menu } from 'lucide-react'

interface HeaderProps {
  user: AuthUser
  onLogout: () => void
  onShowProfile: () => void
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onShowProfile }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">PeekPMK</h1>
              <p className="text-xs text-gray-500">AI Network Assistant</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all">
              <Search size={20} />
            </button>

            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Profile */}
            <button
              onClick={onShowProfile}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-xl transition-all"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.full_name?.charAt(0) || user.ppmk_id?.charAt(0) || 'U'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
