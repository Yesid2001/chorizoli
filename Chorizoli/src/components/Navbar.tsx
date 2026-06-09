import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/productos' },
    { name: 'Galería', path: '/galeria' },
    { name: 'Contacto', path: '/contacto' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!isAuthenticated()) {
    return null
  }

  return (
    <nav className="bg-chorizo-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img 
              src="/LogoChorizzoli.jpg" 
              alt="Chorizoli" 
              className="h-16 w-auto object-contain cursor-pointer"
              onClick={() => navigate('/')}
            />
            <span className="text-xl font-bold text-chorizo-red hidden sm:inline">
              CHORIZOLI
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-chorizo-red border-b-2 border-chorizo-red'
                      : 'hover:text-chorizo-red'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-700">
              <span className="text-sm text-gray-300">
                👤 {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-400 hover:text-red-300 transition flex items-center gap-1"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Salir
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={handleLogout} className="text-red-400 p-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-chorizo-red bg-gray-900' : 'hover:text-chorizo-red'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="px-3 py-2 text-sm text-gray-400 border-t border-gray-700 mt-2 pt-2">
              👤 {user?.name}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar