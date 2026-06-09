import { createContext, useState, useContext, useEffect, ReactNode } from 'react'

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<User>
  register: (name: string, email: string, password: string, captcha: string) => Promise<{ message: string; passwordStrength: { strength: string; score: number } }>
  logout: () => Promise<void>
  isAuthenticated: () => boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('chorizoli_user')
    const token = localStorage.getItem('chorizoli_token')
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Credenciales inválidas')
    }

    const data = await response.json()
    
    localStorage.setItem('chorizoli_token', data.access_token)
    localStorage.setItem('chorizoli_user', JSON.stringify(data.user))
    setUser(data.user)
    
    return data.user
  }

  const register = async (name: string, email: string, password: string, captcha: string) => {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, captcha })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Error en el registro')
    }

    return await response.json()
  }

  const logout = async (): Promise<void> => {
    const token = localStorage.getItem('chorizoli_token')
    const userId = user?.id
    const userEmail = user?.email

    if (token && userId && userEmail) {
      try {
        await fetch('http://localhost:3000/auth/logout', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ userId, userEmail })
        })
      } catch (error) {
        console.error('Error en logout:', error)
      }
    }

    localStorage.removeItem('chorizoli_user')
    localStorage.removeItem('chorizoli_token')
    setUser(null)
  }

  const isAuthenticated = () => {
    return user !== null && localStorage.getItem('chorizoli_token') !== null
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}