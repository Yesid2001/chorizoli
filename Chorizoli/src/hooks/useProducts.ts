import { useState, useMemo, useEffect } from 'react'
import { Product } from '../data/productsData'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [category, setCategory] = useState<string>('todos')
  const [sortBy, setSortBy] = useState<string>('default')

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('chorizoli_token')
        const response = await fetch('http://localhost:3000/products', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error cargando productos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (category !== 'todos') {
      result = result.filter(p => p.category === category)
    }
    
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name))
    }
    
    return result
  }, [products, searchTerm, category, sortBy])

  const categories = ['todos', ...new Set(products.map(p => p.category))]

  return {
    products: filteredProducts,
    loading,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    sortBy,
    setSortBy,
    categories,
  }
}