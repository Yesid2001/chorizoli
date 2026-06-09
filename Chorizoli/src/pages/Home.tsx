import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { productsData } from '../data/productsData'

const Home = () => {
  const featuredProducts = productsData.slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-chorizo-black text-white">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/1a1a1a/8B0000?text=Chorizoli+Background')] bg-cover bg-center opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 text-center">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
              <span className="text-chorizo-red">Chorizoli</span>
              <br />
              Sabor que<span className="text-chorizo-red"> impacta</span>
            </h1>
            <p className="mt-6 text-xl max-w-2xl mx-auto text-gray-300">
              La tradición de los embutidos artesanales, ahora con una visión de futuro.
              Calidad, pasión y excelencia en cada bocado.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/productos" className="btn-primary">Ver productos</Link>
              <Link to="/contacto" className="btn-secondary">Contáctanos</Link>
            </div>
          </div>
        </section>

        {/* Sobre Nosotros */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-chorizo-black">Más de 35 años de tradición</h2>
                <div className="w-20 h-1 bg-chorizo-red my-4"></div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Chorizoli nació en 1985 como un pequeño negocio familiar. Hoy, con la misma receta secreta
                  y un compromiso inquebrantable con la calidad, nos proyectamos como una marca global.
                  Nuestros embutidos combinan técnicas artesanales con los más altos estándares de seguridad alimentaria.
                </p>
              </div>
              <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center">
                <span className="text-gray-500">📸 Nuestra historia en imágenes</span>
              </div>
            </div>
          </div>
        </section>

{/* Productos destacados */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-chorizo-black">Nuestros Chorizos</h2>
      <p className="text-gray-500 mt-2">Dos opciones, un solo sabor excepcional</p>
      <div className="w-24 h-1 bg-chorizo-red mx-auto mt-4"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {featuredProducts.map(product => (
        <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md card-hover">
          <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
            {product.name === 'Chorizo Natural' ? (
              <div className="text-center">
                <span className="text-6xl">🥩</span>
                <p className="text-gray-400 text-sm mt-2">Sin colorantes</p>
              </div>
            ) : (
              <div className="text-center">
                <span className="text-6xl">🌶️</span>
                <p className="text-gray-400 text-sm mt-2">Receta especial</p>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-chorizo-black">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.description.substring(0, 100)}...</p>
            <div className="mt-4 flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Desde</span>
                <span className="text-chorizo-red font-bold text-2xl ml-2">${product.price}</span>
              </div>
              <Link to="/productos" className="text-chorizo-red font-semibold hover:underline flex items-center gap-1">
                Ver más <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-12">
      <Link to="/productos" className="btn-primary inline-block">
        Ver catálogo completo
      </Link>
    </div>
  </div>
</section>

        {/* CTA final */}
        <section className="bg-chorizo-red py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">¿Listo para el auténtico sabor?</h2>
            <p className="text-red-100 mt-4 text-lg">Distribuimos a todo el país. Contáctanos para pedidos al por mayor.</p>
            <Link to="/contacto" className="mt-8 inline-block bg-white text-chorizo-red px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
              Solicitar información
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home