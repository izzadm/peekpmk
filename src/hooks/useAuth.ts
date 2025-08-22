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

  const signUp = async (ppmkId: string, icNumber: string, password: string) => {
    try {
      console.log('Attempting to sign up with PPMK ID:', ppmkId)
      
      // First verify user credentials (PPMK ID + IC number)
      const { data: verifyData, error: verifyError } = await supabase.rpc('verify_user_credentials', {
        p_ppmk_id: ppmkId.trim(),
        p_ic_number: icNumber.trim()
      })

      if (verifyError) {
        console.error('Verification error:', verifyError)
        throw new Error(verifyError.message || 'Verification failed. Please check your PPMK ID and IC number.')
      }

      if (!verifyData || verifyData.length === 0) {
        throw new Error('Invalid PPMK ID or IC number. Please verify your credentials.')
      }

      const userRecord = verifyData[0]

      // Check if user already has a password
      if (userRecord.password_hash) {
        throw new Error('Account already exists. Please sign in instead.')
      }

      // Create user account with password
      const { data: createData, error: createError } = await supabase.rpc('create_user_account', {
        p_ppmk_id: ppmkId.trim(),
        p_password: password
      })

      if (createError) {
        console.error('Account creation error:', createError)
        throw new Error(createError.message || 'Account creation failed. Please try again.')
      }

      if (!createData || createData.length === 0) {
        throw new Error('Account creation failed. Please try again.')
      }

      const newUser = createData[0]

      // Store user in localStorage first
      localStorage.setItem('ppmk_user', JSON.stringify(newUser))
      
      // Use React's flushSync to ensure synchronous state update
      import('react-dom').then(({ flushSync }) => {
        flushSync(() => {
          setUser(newUser)
        })
        // Force additional re-render
        triggerRerender()
      }).catch(() => {
        // Fallback if flushSync is not available
        setUser(newUser)
        setTimeout(() => {
          triggerRerender()
        }, 0)
      })

      return { user: newUser }
    } catch (error: any) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      setUser(null)
      localStorage.removeItem('ppmk_user')
      triggerRerender()
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }
}
