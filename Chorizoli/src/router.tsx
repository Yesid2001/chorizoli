import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,  // ← Publica, fuera de ProtectedRoute
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Home /> },
      { path: 'productos', element: <Products /> },
      { path: 'galeria', element: <Gallery /> },
      { path: 'contacto', element: <Contact /> },
    ],
  },
])