import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaQuestion, setCaptchaQuestion] = useState({ text: '', result: 0 })
  const [passwordStrength, setPasswordStrength] = useState<{ strength: string; score: number } | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  // Generar CAPTCHA aleatorio al cargar el componente
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion({
      text: `${num1} + ${num2}`,
      result: num1 + num2
    })
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const checkPasswordStrength = (pass: string) => {
    let score = 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    
    let strength = 'débil'
    if (score >= 3) strength = 'fuerte'
    else if (score >= 2) strength = 'intermedio'
    
    setPasswordStrength({ strength, score })
    return strength
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    // Validar CAPTCHA
    if (parseInt(captchaAnswer) !== captchaQuestion.result) {
      setError('CAPTCHA incorrecto, intenta de nuevo')
      generateCaptcha() // Generar nuevo CAPTCHA
      setCaptchaAnswer('') // Limpiar el campo
      return
    }

    setIsLoading(true)

    try {
      await register(name, email, password, captchaAnswer)
      alert('Registro exitoso. Ahora puedes iniciar sesión.')
      navigate('/login')
    } catch (err: any) {
      setError(err.message || 'Error en el registro')
      generateCaptcha() // Generar nuevo CAPTCHA en caso de error
    } finally {
      setIsLoading(false)
    }
  }

  const getStrengthColor = () => {
    if (!passwordStrength) return 'bg-gray-200'
    if (passwordStrength.strength === 'fuerte') return 'bg-green-500'
    if (passwordStrength.strength === 'intermedio') return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-chorizo-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center">
          <img src="/LogoChorizzoli.jpg" alt="Chorizoli" className="mx-auto h-20 w-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-chorizo-black">Crear cuenta</h2>
          <p className="mt-2 text-sm text-gray-600">Regístrate en Chorizoli</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-chorizo-red focus:border-chorizo-red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-chorizo-red focus:border-chorizo-red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  checkPasswordStrength(e.target.value)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-chorizo-red focus:border-chorizo-red"
              />
              {passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-gray-200">
                      <div className={`h-2 rounded-full ${getStrengthColor()}`} style={{ width: `${(passwordStrength.score / 4) * 100}%` }}></div>
                    </div>
                    <span className={`text-xs font-semibold`}>
                      {passwordStrength.strength}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Mínimo 8 caracteres, mayúsculas, números y símbolos
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña *</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-chorizo-red focus:border-chorizo-red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ¿Cuánto es {captchaQuestion.text}? (CAPTCHA) *
              </label>
              <input
                type="number"
                required
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-chorizo-red focus:border-chorizo-red"
                placeholder="Escribe el resultado"
              />
              <p className="text-xs text-gray-400 mt-1">
                CAPTCHA aleatorio para seguridad
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-chorizo-red text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-70"
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>

          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-chorizo-red font-semibold hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register