import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AgregarPedido from './pages/AgregarPedido' // Tu landing original vive aquí
import VerPedidos from './pages/VerPedidos'       // La cocina del profesor
import { EditarPedido } from './pages/EditarPedido' // El editor de estados de la API
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      {/* El Navbar se queda fijo arriba en todas las páginas */}
      <Navbar />
      
      <main>
        <Routes>
          {/* Ruta principal (/): Carga tu landing completa con el menú y el carrito */}
          <Route path="/" element={<AgregarPedido />} />
          
          {/* Ruta de administración (/ver): Carga la cocina de pedidos */}
          <Route path="/ver" element={<VerPedidos />} />
          
          {/* Ruta de edición (/editar/:id): Carga el editor de estados */}
          <Route path="/editar/:id" element={<EditarPedido />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}