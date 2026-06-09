import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageCard from '../components/ImageCard'
import { galleryData } from '../data/galleryData'

const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-bold text-chorizo-black">Galería</h1>
        <p className="text-gray-500 mb-8">Conoce nuestro proceso, equipo y eventos</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.map((image, idx) => (
            <ImageCard key={image.id} image={image} index={idx} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Gallery