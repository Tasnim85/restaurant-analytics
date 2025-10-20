'use client'

export default function Header({ title, userEmail }) {
  return (
    <header className="bg-white shadow-lg border-b-4 border-emerald-500 px-10 py-6">
      <div className="flex items-center justify-between">
        <div className="transform hover:scale-105 transition-all duration-300">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            ✨ Bienvenue dans votre espace d'analyse premium
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <div className="text-right transform hover:scale-105 transition-all duration-300">
            <p className="text-sm font-bold text-gray-800">Admin User</p>
            <p className="text-xs text-emerald-600 font-medium">{userEmail}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl transform hover:scale-110 hover:rotate-12 transition-all duration-300 border-2 border-white cursor-pointer">
            A
          </div>
        </div>
      </div>
    </header>
  )
}