import { useState, useEffect } from "react";
import { getPedidos } from "../services/pedidosApi"; 
import { useNavigate } from 'react-router-dom'
import Buscador from '../components/Buscador'
import PedidoCard from '../components/PedidoCard'

export default function VerPedidos(){
    const [pedidos, setPedidos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
    getPedidos()
      .then((respuesta) => {
        
        if (respuesta && respuesta.datos) {
          setPedidos(Array.isArray(respuesta.datos) ? respuesta.datos : [])
        } else {
          setPedidos(Array.isArray(respuesta) ? respuesta : [])
        }
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => setCargando(false))
  }, [])

    
    const handlePedidoEliminado = (idEliminado) => {
        setPedidos(prevPedidos => prevPedidos.filter(p => p._id !== idEliminado))
    }

    const listaParaFiltrar = Array.isArray(pedidos) ? pedidos : [];

    const pedidosFiltrados = listaParaFiltrar.filter((p) =>{
        if (!p) return false; 

        const texto = busqueda.toLowerCase().trim()
        
       
        const idRealStr = p._id ? p._id.toString().toLowerCase() : ''; 
        
        
        const idAmigableStr = p._id ? p._id.substring(p._id.length - 6).toLowerCase() : '';
        
        const clienteNombre = p.cliente?.nombre || p.client || ''; 

        return(
            idRealStr.includes(texto) ||
            idAmigableStr.includes(texto) ||
            clienteNombre.toLowerCase().includes(texto)
        )
    })

    if(cargando){
        return(
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8rem 2rem', color: 'var(--accent)' }}>
                <span>Cargando comandas en tiempo real... 👩‍🍳</span>
            </div>
        )
    }

    if(error){
        return (
            <div style={{ padding: '8rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent2)', borderRadius: '8px', color: '#f87171' }}>
                    Error de conexión: {error}. ¿Está encendido el servidor de la API?
                </div>
            </div>
        )
    }

    return(
        <div style={{ padding: '8rem 2rem 4rem', maxWidth: '1100px', margin: '0 auto', minHeight: '100vh' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <span className="section-eyebrow">Área de Administración</span>
                <h1 className="section-title" style={{ margin: '0 0 1.5rem 0' }}>Cocina de PizzaItalia 🍳</h1>
                
                <Buscador valor={busqueda} onchange={setBusqueda} placeholder="Buscar por ID o Nombre"/>
            </div>

            {pedidosFiltrados.length === 0 ? (
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>No se encontraron pedidos en la cocina. 🍕</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {pedidosFiltrados.map((pedido) => (
                        <PedidoCard key={pedido._id} pedido={pedido} onEliminar={handlePedidoEliminado} />
                    ))}
                </div>
            )}
        </div>
    )
}