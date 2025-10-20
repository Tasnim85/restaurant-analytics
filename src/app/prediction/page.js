'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { TrendingUp } from 'lucide-react'

export default function Prediction() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = sessionStorage.getItem('user')
    if (!userData) {
      router.push('/')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    router.push('/')
  }

  if (!user) return null

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Prediction" userEmail={user.email} />
        
        <main className="flex-1 overflow-auto p-10">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-emerald-200">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl border-4 border-white animate-pulse">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                📈 Prédictions et Analyses
              </h2>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto font-medium">
                Module de prédiction en cours de développement.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}