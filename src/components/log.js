'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Star, Sparkles } from 'lucide-react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Erreur de connexion')
      }

      // ✅ Login successful — redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      console.error('Erreur de connexion:', err)
      setError(err.message || 'Erreur serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform hover:scale-[1.02] transition-all duration-500">
          <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 p-10 text-white relative overflow-hidden">
            <div className="flex items-center justify-center mb-6 relative">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-xl shadow-2xl animate-pulse border border-white/30">
                <LayoutDashboard className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <h1 className="text-4xl font-bold text-center mb-2 drop-shadow-lg">Restaurant Analytics</h1>
            <p className="text-emerald-100 text-center font-medium">Tableau de bord intelligent</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-emerald-500" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 focus:outline-none transition-all duration-300 text-base hover:border-emerald-300 hover:shadow-lg"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-emerald-500" />
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 focus:outline-none transition-all duration-300 text-base hover:border-emerald-300 hover:shadow-lg"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-center font-medium animate-pulse">
                ⚠️ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700'
              } text-white py-4 rounded-2xl font-bold text-lg transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95`}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter ✨'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8 font-medium">
          © 2025 Restaurant Analytics. Tous droits réservés.
        </p>
      </div>
    </div>
  )
}
