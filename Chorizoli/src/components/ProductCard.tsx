import { Product } from '../data/productsData'
import { useState } from 'react'

const ProductCard = ({ product }: { product: Product }) => {
  const [imgError, setImgError] = useState(false)

  if (!product) {
    return null
  }

  // Convertir price a número si viene como string
  const priceNumber = typeof product.price === 'number' ? product.price : parseFloat(product.price as any)

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md card-hover border border-gray-100 relative">
      {product.badge && (
        <div className={`absolute top-4 right-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md`}>
          {product.badge}
        </div>
      )}
      
      <div className="h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
        <img 
          src={imgError ? 'https://placehold.co/400x300/8B0000/white?text=Chorizoli' : (product.image || 'https://placehold.co/400x300/8B0000/white?text=Chorizoli')} 
          alt={product.name || 'Producto'}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setImgError(true)}
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-chorizo-black">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1 mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            🐷 Carne de cerdo
          </span>
        </div>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          {product.description}
        </p>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">Precio</span>
          <span className="text-2xl font-bold text-chorizo-red block">
            ${!isNaN(priceNumber) ? priceNumber.toFixed(2) : '0.00'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard