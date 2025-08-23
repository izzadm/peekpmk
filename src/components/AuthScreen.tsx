import React, { useState } from 'react'
import WelcomeScreen from './WelcomeScreen'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'

const AuthScreen: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'signup'>('welcome')

  const handleShowLogin = () => {
    setCurrentScreen('login')
  }

  const handleShowSignup = () => {
    setCurrentScreen('signup')
  }

  const handleBack = () => {
    setCurrentScreen('welcome')
  }

  switch (currentScreen) {
    case 'login':
      return <LoginScreen onBack={handleBack} isDemoMode={false} />
    case 'signup':
      return <SignupScreen onBack={handleBack} />
    default:
      return <WelcomeScreen onShowLogin={handleShowLogin} onShowSignup={handleShowSignup} />
  }
}

export default AuthScreen
