import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const DatabaseTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing')
  const [userCount, setUserCount] = useState<number>(0)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setConnectionStatus('testing')
      setError('')

      // Test basic connection with proper count syntax
      const { count, error: queryError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      if (queryError) {
        throw queryError
      }

      setUserCount(count || 0)
      setConnectionStatus('connected')
    } catch (err: any) {
      console.error('Database connection error:', err)
      setError(err.message || 'Connection failed')
      setConnectionStatus('error')
    }
  }

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 border z-50">
      <h3 className="font-semibold text-sm mb-2">Database Status</h3>
      
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          connectionStatus === 'testing' ? 'bg-yellow-400 animate-pulse' :
          connectionStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'
        }`}></div>
        
        <span className="text-sm">
          {connectionStatus === 'testing' && 'Testing...'}
          {connectionStatus === 'connected' && `Connected (${userCount} users)`}
          {connectionStatus === 'error' && 'Connection Failed'}
        </span>
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-2">{error}</p>
      )}

      <button
        onClick={testConnection}
        className="text-xs text-blue-600 hover:underline mt-2 block"
      >
        Test Again
      </button>
    </div>
  )
}

export default DatabaseTest
