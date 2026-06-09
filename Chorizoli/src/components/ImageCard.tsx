import { GalleryImage } from '../data/galleryData'

const ImageCard = ({ image, index }: { image: GalleryImage; index: number }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer">
      <div className="h-64 bg-gray-200 flex items-center justify-center">
        {image.image ? (
          <img src={image.image} alt={image.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400">📷 Imagen {index + 1}</span>
        )}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <span className="text-white font-bold text-lg">{image.title}</span>
      </div>
    </div>
  )
}

export default ImageCard