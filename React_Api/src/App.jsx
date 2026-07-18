import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AgregarPedido from './pages/AgregarPedido'
import VerPedidos from './pages/VerPedidos'       
import { EditarPedido } from './pages/EditarPedido'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>      
      <Navbar />     
      <main>
        <Routes>         
          <Route path="/" element={<AgregarPedido />} />          
          <Route path="/adm" element={<VerPedidos />} /> 
          <Route path="/editar/:id" element={<EditarPedido />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}