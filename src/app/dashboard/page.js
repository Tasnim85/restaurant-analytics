'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { LayoutDashboard, Star, Sparkles } from 'lucide-react'

export default function Dashboard() {
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
        <Header title="Dashboard" userEmail={user.email} />
        
        <main className="flex-1 overflow-auto p-10">
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-emerald-200 transform hover:scale-[1.01] transition-all duration-500 hover:shadow-emerald-200">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-emerald-500 animate-spin" style={{animationDuration: '3s'}} />
                  Power BI Dashboard
                </h2>
                <span className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl text-sm font-bold shadow-lg animate-pulse border-2 border-emerald-300">
                  🔴 En direct
                </span>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-10 border-4 border-dashed border-emerald-300 transform hover:scale-[1.02] transition-all duration-500 hover:border-emerald-500">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-500 border-4 border-white animate-pulse">
                    <LayoutDashboard className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      🚀 Intégration Power BI
                    </h3>
                    <p className="text-gray-700 text-base max-w-md mx-auto mb-6 font-medium leading-relaxed">
                      Insérez votre iframe Power BI ici
                    </p>
                    <div className="bg-white px-6 py-5 rounded-2xl text-sm text-left border-2 border-emerald-200 shadow-lg font-mono text-gray-800 max-w-xl mx-auto">
                      &lt;iframe src="VOTRE_URL_POWERBI"&gt;&lt;/iframe&gt;
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 p-8 rounded-3xl shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 border-4 border-white cursor-pointer group">
                  <p className="text-sm text-white font-bold mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 group-hover:animate-spin" />
                    Total Restaurants
                  </p>
                  <p className="text-5xl font-bold text-white drop-shadow-2xl">23</p>
                </div>
                <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 p-8 rounded-3xl shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 border-4 border-white cursor-pointer group">
                  <p className="text-sm text-white font-bold mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 group-hover:animate-spin" />
                    Note Moyenne
                  </p>
                  <p className="text-5xl font-bold text-white drop-shadow-2xl">1.20</p>
                </div>
                <div className="bg-gradient-to-br from-teal-400 via-green-500 to-emerald-500 p-8 rounded-3xl shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 border-4 border-white cursor-pointer group">
                  <p className="text-sm text-white font-bold mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 group-hover:animate-spin" />
                    Nombre d'avis
                  </p>
                  <p className="text-5xl font-bold text-white drop-shadow-2xl">1,161</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}