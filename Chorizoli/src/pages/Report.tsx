import { useState } from 'react'

const Report = () => {
  const [loading, setLoading] = useState(false)

  const generatePDF = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('chorizoli_token')
      const response = await fetch('http://localhost:3000/reports/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'reporte-productos.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={generatePDF} disabled={loading} className="btn-primary">
      {loading ? 'Generando...' : '📄 Descargar Reporte PDF'}
    </button>
  )
}

export default Report