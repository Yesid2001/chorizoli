export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validateMessageLength = (message: string, minLength: number = 10): boolean => {
  return message.trim().length >= minLength
}

interface ContactForm {
  name: string
  email: string
  message: string
}

export const validateContactForm = ({ name, email, message }: ContactForm) => {
  const errors: { name?: string; email?: string; message?: string } = {}
  if (!validateRequired(name)) errors.name = 'El nombre es obligatorio'
  if (!validateEmail(email)) errors.email = 'Email inválido'
  if (!validateRequired(message)) errors.message = 'El mensaje no puede estar vacío'
  else if (!validateMessageLength(message, 10)) errors.message = 'Mínimo 10 caracteres'
  return { isValid: Object.keys(errors).length === 0, errors }
}