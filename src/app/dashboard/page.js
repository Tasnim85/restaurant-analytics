'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { LayoutDashboard, Star, Sparkles, TrendingUp, Users, Building2, CheckCircle } from 'lucide-react'
import { getDashboardByRole } from '../../config'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dashboardConfig, setDashboardConfig] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()

        if (!data.success) {
          router.push('/')
          return
        }

        setUser(data.user)
        
        // Récupérer la config du dashboard selon le rôle
        const config = getDashboardByRole(data.user.role_nom)
        setDashboardConfig(config)
      } catch (error) {
        console.error('Erreur:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user || !dashboardConfig) return null

  // Déterminer les stats selon le rôle
  const getStatsForRole = () => {
    switch (user.role_nom) {
      case 'manager':
        return [
          { label: 'Total Restaurants', value: '23', icon: Building2, color: 'from-emerald-400 via-green-500 to-teal-500' },
          { label: 'Note Moyenne', value: '1.20', icon: Star, color: 'from-green-400 via-emerald-500 to-teal-500' },
          { label: "Nombre d'avis", value: '1,161', icon: Users, color: 'from-teal-400 via-green-500 to-emerald-500' }
        ]
      case 'responsable_clientele':
        return [
          { label: 'Satisfaction Client', value: '87%', icon: Star, color: 'from-emerald-400 via-green-500 to-teal-500' },
          { label: 'Avis Reçus', value: '1,161', icon: Users, color: 'from-green-400 via-emerald-500 to-teal-500' },
          { label: 'Taux Réponse', value: '94%', icon: CheckCircle, color: 'from-teal-400 via-green-500 to-emerald-500' }
        ]
      case 'responsable_marketing':
        return [
          { label: 'Campagnes Actives', value: '12', icon: TrendingUp, color: 'from-emerald-400 via-green-500 to-teal-500' },
          { label: 'ROI Marketing', value: '+45%', icon: Star, color: 'from-green-400 via-emerald-500 to-teal-500' },
          { label: 'Engagement', value: '68%', icon: Users, color: 'from-teal-400 via-green-500 to-emerald-500' }
        ]
      case 'responsable_franchise':
        return [
          { label: 'Franchises Actives', value: '15', icon: Building2, color: 'from-emerald-400 via-green-500 to-teal-500' },
          { label: 'Performance Moy.', value: '4.2/5', icon: Star, color: 'from-green-400 via-emerald-500 to-teal-500' },
          { label: 'Croissance', value: '+12%', icon: TrendingUp, color: 'from-teal-400 via-green-500 to-emerald-500' }
        ]
      default:
        return []
    }
  }

  const stats = getStatsForRole()

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
      {user && (
  <Header
    title={`Dashboard - ${user.role_nom ? user.role_nom.replace('_', ' ') : ''}`}
    userEmail={user.email || ''}
  />
)}

        
        <main className="flex-1 overflow-auto p-10">
          <div className="space-y-8">
            {/* Card d'info rôle */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-2xl transform hover:scale-[1.01] transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{dashboardConfig.title}</h3>
                  <p className="text-emerald-100 text-sm">{dashboardConfig.description}</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30">
                  <LayoutDashboard className="w-8 h-8" />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {dashboardConfig.features.map((feature, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm border border-white/30">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div 
                    key={index}
                    className={`bg-gradient-to-br ${stat.color} p-8 rounded-3xl shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 border-4 border-white cursor-pointer group`}
                  >
                    <p className="text-sm text-white font-bold mb-2 flex items-center gap-2">
                      <Icon className="w-4 h-4 group-hover:animate-spin" />
                      {stat.label}
                    </p>
                    <p className="text-5xl font-bold text-white drop-shadow-2xl">{stat.value}</p>
                  </div>
                )
              })}
            </div>

            {/* Power BI Dashboard */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-emerald-200 transform hover:scale-[1.01] transition-all duration-500 hover:shadow-emerald-200">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-emerald-500 animate-spin" style={{animationDuration: '3s'}} />
                 Tableau de bord Power BI - {user.role_nom ? user.role_nom.replace('_', ' ') : ''}

                </h2>
                <span className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl text-sm font-bold shadow-lg animate-pulse border-2 border-emerald-300">
                  🔴 En direct
                </span>
              </div>

              {/* Power BI Embed */}
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-200" style={{ height: '700px' }}>
                {dashboardConfig.url && dashboardConfig.url.includes('powerbi.com') ? (
                  <iframe
                    title={`Power BI Dashboard - ${user.role_nom}`}
                    src={dashboardConfig.url}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen={true}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
                    <div className="text-center space-y-6 p-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-500 border-4 border-white animate-pulse">
                        <LayoutDashboard className="w-12 h-12 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          🚀 Configurez votre Dashboard Power BI
                        </h3>
                        <p className="text-gray-700 text-base max-w-md mx-auto mb-6 font-medium leading-relaxed">
                          Insérez l'URL de votre dashboard Power BI dans le fichier de configuration
                        </p>
                        <div className="bg-white px-6 py-5 rounded-2xl text-sm text-left border-2 border-emerald-200 shadow-lg font-mono text-gray-800 max-w-2xl mx-auto">
                          <p className="text-emerald-600 font-bold mb-2">📁 src/config/powerbi.js</p>
                          <code className="block">
                            {user.role_nom}: &#123;<br />
                            &nbsp;&nbsp;url: "<span className="text-red-500">https://app.powerbi.com/view?r=YOUR_REPORT_ID</span>",<br />
                            &nbsp;&nbsp;...<br />
                            &#125;
                          </code>
                        </div>
                        <div className="mt-6 space-y-2">
                          <p className="text-sm font-semibold text-emerald-600">✅ Permissions de votre rôle:</p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {user.permissions.map((perm, i) => (
                              <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                                {perm}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}