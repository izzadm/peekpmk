import React, { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import AuthScreen from './components/AuthScreen'
import MainApp from './components/MainApp'

const App: React.FC = () => {
  const { user, loading } = useAuth()
  const [forceRender, setForceRender] = useState(0)

  console.log('App render - user:', user, 'loading:', loading, 'forceRender:', forceRender)

  // Listen for localStorage changes to force re-render
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('Storage changed, forcing re-render')
      setForceRender(prev => prev + 1)
    }

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange)
    
    // Also check periodically for localStorage changes
    const interval = setInterval(() => {
      const storedUser = localStorage.getItem('ppmk_user')
      if (storedUser && !user) {
        console.log('Found user in localStorage but not in state, forcing re-render')
        setForceRender(prev => prev + 1)
      }
    }, 500)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-pulse">
            <span className="text-white text-2xl font-bold">P</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Check localStorage as fallback
  const storedUser = localStorage.getItem('ppmk_user')
  const hasStoredUser = storedUser && storedUser !== 'null'
  
  console.log('Render decision - user:', !!user, 'hasStoredUser:', hasStoredUser)

  // This should automatically redirect when user state changes
  return (user || hasStoredUser) ? <MainApp user={user || JSON.parse(storedUser || '{}')} /> : <AuthScreen />
}

export default App
