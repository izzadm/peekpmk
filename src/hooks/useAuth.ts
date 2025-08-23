import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export interface AuthUser {
  id: string
  ppmk_id: string
  full_name: string
  email: string
  phone?: string
  university?: string
  course?: string
  year_of_study?: number
  profile_picture?: string
  created_at?: string
  updated_at?: string
  last_login?: string
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Force re-render function
  const [, forceUpdate] = useState({})
  const triggerRerender = useCallback(() => {
    forceUpdate({})
  }, [])

  useEffect(() => {
    // Check for existing session in localStorage
    const checkSession = () => {
      const storedUser = localStorage.getItem('ppmk_user')
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('ppmk_user')
        }
      }
      setLoading(false)
    }

    checkSession()
  }, [])

  const verifyPpmkId = async (ppmkId: string, icNumber: string) => {
    try {
      console.log('Verifying PPMK ID:', ppmkId, 'with IC:', icNumber)
      
      const { data, error } = await supabase.rpc('verify_user_credentials', {
        p_ppmk_id: ppmkId.trim(),
        p_ic_number: icNumber.trim()
      })

      console.log('Verification result:', { data, error })

      if (error) {
        console.error('Verification error:', error)
        throw new Error(error.message || 'Verification failed')
      }

      if (!data || data.length === 0) {
        throw new Error('Invalid PPMK ID or IC number')
      }

      return data[0]
    } catch (error: any) {
      console.error('Verification error:', error)
      throw error
    }
  }

  const signUp = async (ppmkId: string, icNumber: string, password: string) => {
    try {
      console.log('Creating account for PPMK ID:', ppmkId)
      
      // First verify the credentials
      await verifyPpmkId(ppmkId, icNumber)
      
      // Then create the account with password
      const { data, error } = await supabase.rpc('create_user_account', {
        p_ppmk_id: ppmkId.trim(),
        p_password: password
      })

      console.log('Account creation result:', { data, error })

      if (error) {
        console.error('Account creation error:', error)
        throw new Error(error.message || 'Account creation failed')
      }

      if (!data || data.length === 0) {
        throw new Error('Failed to create account')
      }

      const userData = data[0]

      // Store user in localStorage
      localStorage.setItem('ppmk_user', JSON.stringify(userData))
      
      // Update state
      setUser(userData)
      triggerRerender()

      return { user: userData }
    } catch (error: any) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const signIn = async (ppmkId: string, password: string) => {
    try {
      console.log('Attempting to sign in with PPMK ID:', ppmkId)
      
      // Use the authenticate_user function for secure password verification
      const { data, error } = await supabase.rpc('authenticate_user', {
        p_ppmk_id: ppmkId.trim(),
        p_password: password
      })

      console.log('Authentication result:', { data, error })

      if (error) {
        console.error('Authentication error:', error)
        throw new Error(error.message || 'Login failed. Please try again.')
      }

      if (!data || data.length === 0) {
        throw new Error('Invalid PPMK ID or password')
      }

      const userData = data[0]

      // Store user in localStorage first
      localStorage.setItem('ppmk_user', JSON.stringify(userData))
      
      // Use React's flushSync to ensure synchronous state update
      import('react-dom').then(({ flushSync }) => {
        flushSync(() => {
          setUser(userData)
        })
        // Force additional re-render
        triggerRerender()
      }).catch(() => {
        // Fallback if flushSync is not available
        setUser(userData)
        setTimeout(() => {
          triggerRerender()
        }, 0)
      })

      return { user: userData }
    } catch (error: any) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      console.log('Signing out user')
      setUser(null)
      localStorage.removeItem('ppmk_user')
      triggerRerender()
      // Force a page reload to ensure clean state
      window.location.reload()
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    verifyPpmkId,
  }
}
