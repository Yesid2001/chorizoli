import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import ReportPDF from '../components/ReportPDF'
import StatisticsChart from '../components/StatisticsChart'

const Products = () => {
  const {
    products,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    sortBy,
    setSortBy,
    categories,
  } = useProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold text-chorizo-black">Nuestros Productos</h1>
            <p className="text-gray-500">Calidad artesanal, sabor inigualable</p>
          </div>
          <ReportPDF />
        </div>

        {/* Estadísticas y gráfico */}
        <div className="mb-10">
          <StatisticsChart />
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 p-4 bg-gray-100 rounded-lg">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-chorizo-red"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'todos' ? 'Todas las categorías' : cat}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white"
          >
            <option value="default">Ordenar por</option>
            <option value="name-asc">Nombre A-Z</option>
            <option value="name-desc">Nombre Z-A</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>

        {/* Grid de productos */}
        {!products || products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No se encontraron productos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Products