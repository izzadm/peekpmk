import React, { useState } from 'react'
import { ArrowLeft, User, Lock, LogIn } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface LoginScreenProps {
  onBack: () => void
  isDemoMode?: boolean
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, isDemoMode = false }) => {
  const [ppmkId, setPpmkId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!ppmkId.trim() || !password.trim()) {
        setError('Please enter your PPMK ID and password')
        return
      }

      console.log('Starting login process...')
      
      // Perform sign in
      const result = await signIn(ppmkId.trim(), password)
      
      console.log('Login successful, result:', result)
      
      // Force a page reload as a last resort to ensure state is properly updated
      setTimeout(() => {
        window.location.reload()
      }, 100)
      
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-3"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-gray-900">LOG IN</h1>
              <p className="text-gray-600 text-sm mt-1">Welcome back to PPMK apps</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Debug Info */}
          <div className="mb-6 p-3 bg-blue-100 border border-blue-300 text-blue-700 rounded-lg text-sm">
            <p className="font-medium">Test Credentials:</p>
            <p>PPMK ID: PPMK001</p>
            <p>Password: password123</p>
            <p className="mt-2 text-xs">Enter your PPMK ID (not email)</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                PPMK ID
              </label>
              <input
                type="text"
                value={ppmkId}
                onChange={(e) => setPpmkId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                placeholder="Enter your PPMK ID (e.g., PPMK001)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="w-5 h-5" />
              <span>{loading ? 'Signing in...' : 'LOG IN'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
