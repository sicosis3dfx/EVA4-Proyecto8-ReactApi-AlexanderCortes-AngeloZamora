import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AgregarPedido from './pages/AgregarPedido' // Tu landing original vive aquí
import VerPedidos from './pages/VerPedidos'       // La cocina del profesor
import { EditarPedido } from './pages/EditarPedido' // El editor de estados de la API
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      
      <Navbar />
      
      <main>
        <Routes>
          
          <Route path="/" element={<AgregarPedido />} />
          
          
          <Route path="/ver" element={<VerPedidos />} />
          
          
          <Route path="/editar/:id" element={<EditarPedido />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}