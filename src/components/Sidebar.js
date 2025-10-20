'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, TrendingUp, FileText, Info, LogOut, Menu, X } from 'lucide-react'

export default function Sidebar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'prediction', label: 'Prediction', icon: TrendingUp, href: '/prediction' },
    { id: 'reports', label: 'Reports', icon: FileText, href: '/reports' },
    { id: 'about', label: 'About', icon: Info, href: '/about' }
  ]

  return (
    <div className={`${isOpen ? 'w-72' : 'w-24'} bg-gradient-to-b from-emerald-600 via-green-700 to-teal-800 text-white transition-all duration-500 flex flex-col shadow-2xl relative overflow-hidden`}>
      <div className="p-6 flex items-center justify-between border-b border-white/20 backdrop-blur-sm relative z-10">
        {isOpen && (
          <div className="flex items-center space-x-4 transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl shadow-xl border border-white/30 animate-pulse">
              <LayoutDashboard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg drop-shadow-lg">Restaurant</h2>
              <p className="text-xs text-emerald-200 font-medium">Analytics Pro</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/30 transform hover:scale-110 hover:rotate-90"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      
      <nav className="flex-1 p-5 space-y-3 relative z-10">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 font-semibold transform hover:scale-105 hover:translate-x-2 ${
                isActive
                  ? 'bg-white text-emerald-700 shadow-2xl scale-105'
                  : 'text-white hover:bg-white/20 backdrop-blur-sm border border-transparent hover:border-white/30'
              }`}
            >
              <Icon size={22} className={isActive ? 'animate-pulse' : ''} />
              {isOpen && <span className="text-base">{item.label}</span>}
            </Link>
          )
        })}
      </nav>
      
      <div className="p-5 border-t border-white/20 backdrop-blur-sm relative z-10">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-white hover:bg-red-500/20 backdrop-blur-sm transition-all duration-300 font-semibold border border-transparent hover:border-red-300/50 transform hover:scale-105"
        >
          <LogOut size={22} />
          {isOpen && <span className="text-base">Déconnexion</span>}
        </button>
      </div>
    </div>
  )
}