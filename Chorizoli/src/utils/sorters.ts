import { Product } from '../data/productsData'

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products]
  if (sortBy === 'price-asc') {
    return sorted.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    return sorted.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'name-asc') {
    return sorted.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy === 'name-desc') {
    return sorted.sort((a, b) => b.name.localeCompare(a.name))
  }
  return sorted
}