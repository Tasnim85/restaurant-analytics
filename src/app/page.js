'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/log'

export default function Home() {
  const router = useRouter()

  const handleLogin = (email, password) => {
    // Simuler l'authentification
    if (email && password) {
      // Stocker les infos (en production, utilisez des cookies sécurisés)
      sessionStorage.setItem('user', JSON.stringify({ email }))
      router.push('/dashboard')
    }
  }

  return <LoginForm onLogin={handleLogin} />
}