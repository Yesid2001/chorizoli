export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  badge?: string
  badgeColor?: string
  image?: string
}

export const productsData: Product[] = [
  { 
    id: 1, 
    name: 'Chorizo Natural', 
    description: 'Elaborado con carne de cerdo 100% natural. Sin colorantes ni conservantes artificiales. Color rosado característico de la carne pura. Sabor auténtico y tradición artesanal.', 
    price: 12.99, 
    category: 'chorizo',
    badge: 'Sin colorantes',
    badgeColor: 'bg-green-600',
    image: '/productos/chorizo-natural.png'
  },
  { 
    id: 2, 
    name: 'Chorizo Premium', 
    description: 'Carne de cerdo con especias secretas que le otorgan un color rojo-naranja característico. Sabor intenso y ahumado natural. El favorito de nuestros clientes.', 
    price: 14.50, 
    category: 'chorizo',
    badge: 'Premium',
    badgeColor: 'bg-chorizo-red',
    image: '/productos/chorizo-premium.png'
  },
]