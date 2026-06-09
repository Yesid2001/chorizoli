import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Statistics {
  totalProducts: number
  avgPrice: number
  productsByCategory: { category: string; count: number }[]
}

const StatisticsChart = () => {
  const [stats, setStats] = useState<Statistics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('chorizoli_token')
        const response = await fetch('http://localhost:3000/reports/statistics', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error cargando estadísticas:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="animate-pulse h-64 bg-gray-200 rounded"></div>
      </div>
    )
  }

  if (!stats) return null

  const chartData = {
    labels: stats.productsByCategory.map(item => item.category),
    datasets: [
      {
        label: 'Cantidad de Productos',
        data: stats.productsByCategory.map(item => item.count),
        backgroundColor: '#8B0000',
        borderRadius: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Productos por Categoría',
      },
    },
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold text-chorizo-black mb-4">Estadísticas</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-gray-600 text-sm">Total Productos</p>
          <p className="text-3xl font-bold text-chorizo-red">{stats.totalProducts}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-gray-600 text-sm">Precio Promedio</p>
          <p className="text-3xl font-bold text-chorizo-red">${stats.avgPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

export default StatisticsChart