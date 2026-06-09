import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { validateContactForm } from '../utils/validators'
import { sendContactMessage } from '../services/apiSimulation'

interface FormData {
  name: string
  email: string
  message: string
}

interface Errors {
  name?: string
  email?: string
  message?: string
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validateContactForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await sendContactMessage(formData)
      if (response.success) {
        setSubmitStatus({ type: 'success', message: '¡Mensaje enviado! Te contactaremos pronto.' })
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
      } else {
        setSubmitStatus({ type: 'error', message: 'Hubo un error, intenta nuevamente.' })
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Error de conexión.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold text-chorizo-black">Contáctanos</h1>
            <div className="w-20 h-1 bg-chorizo-red my-4"></div>
            <p className="text-gray-600 mb-6">
              ¿Tienes preguntas, pedidos especiales o quieres ser distribuidor? Escríbenos y te responderemos a la brevedad.
            </p>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center space-x-3">
                <span className="text-chorizo-red text-xl">📍</span>
                <span>Calle de los Embutidos 123, Santiago, Chile</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-chorizo-red text-xl">📞</span>
                <span>+56 2 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-chorizo-red text-xl">✉️</span>
                <span>ventas@chorizoli.cl</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-chorizo-red focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-chorizo-red focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje * (mínimo 10 caracteres)</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-chorizo-red focus:outline-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              {submitStatus && (
                <div className={`p-3 rounded-lg text-center ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Contact