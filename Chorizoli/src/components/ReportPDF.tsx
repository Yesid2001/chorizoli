import { useState } from 'react'

const ReportPDF = () => {
  const [loading, setLoading] = useState(false)

  const generatePDF = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('chorizoli_token')
      const response = await fetch('http://localhost:3000/reports/products', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error('Error al generar el reporte')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `reporte-productos-${new Date().toISOString().split('T')[0]}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error:', error)
      alert('Error al generar el reporte')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={generatePDF}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generando...
        </>
      ) : (
        <>
          📄 Descargar Reporte PDF
        </>
      )}
    </button>
  )
}

export default ReportPDF