const Footer = () => {
  return (
    <footer className="bg-chorizo-black text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-chorizo-red">Chorizoli</h3>
            <p className="text-sm">Artesanía y tradición desde 1985</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-chorizo-red transition">Facebook</a>
            <a href="#" className="hover:text-chorizo-red transition">Instagram</a>
            <a href="#" className="hover:text-chorizo-red transition">WhatsApp</a>
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} Chorizoli - Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer