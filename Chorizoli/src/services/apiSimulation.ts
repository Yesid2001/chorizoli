interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ApiResponse {
  success: boolean
  message: string
}

export const sendContactMessage = async (formData: ContactFormData): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mensaje enviado (simulación):', formData)
      resolve({ success: true, message: 'Mensaje enviado correctamente' })
    }, 1000)
  })
}