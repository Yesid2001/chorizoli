import { Product } from '../data/productsData'

export const filterProductsByName = (products: Product[], searchTerm: string): Product[] => {
  if (!searchTerm) return products
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  if (!category || category === 'todos') return products
  return products.filter(product => product.category === category)
}