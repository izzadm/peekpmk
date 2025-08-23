import React from 'react'
import { LogIn, UserPlus } from 'lucide-react'

interface WelcomeScreenProps {
  onShowLogin: () => void
  onShowSignup: () => void
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onShowLogin, onShowSignup }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-3xl">P</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">PeekPMK apps</h1>
            <p className="text-gray-600">Welcome to PeekPMK Community Platform</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={onShowLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center space-x-3 shadow-lg"
            >
              <LogIn className="w-5 h-5" />
              <span>LOG IN</span>
            </button>

            <button
              onClick={onShowSignup}
              className="w-full bg-white/70 backdrop-blur-sm text-gray-700 py-4 px-6 rounded-xl font-medium hover:bg-white/90 transition-all flex items-center justify-center space-x-3 border border-gray-200 shadow-lg"
            >
              <UserPlus className="w-5 h-5" />
              <span>SIGN UP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen
