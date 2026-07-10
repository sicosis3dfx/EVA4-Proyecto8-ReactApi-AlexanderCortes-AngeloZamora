import { useState, useEffect } from "react";
import { getPedidos, getPedido } from "../services/pedidosApi";
import {useNavigate} from 'react-router-dom'
import Buscador from '../components/Buscador'
import PedidoCard from '../components/PedidoCard'

export default function VerPedidos(){
    const [pedidos, setPedidos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() =>{
        getPedidos()
        .then(setPedidos)
        .catch((err) => setError(err.message))
        .finally(() => setCargando(false))
    },[])

    const pedidosFiltrados = pedidos.filter((p) =>{
        const texto = busqueda.toLowerCase()
        return(
            p.idPedido.toSring().includes(texto) ||
            p.client.toLowerCase.includes(texto)
        )
    })

    if(cargando){
        return(
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-success"></div>
            </div>
        )
    }
    if(error){
        return <div className="container"><div className="alert alert-danger">{error}</div></div>  
    }

    return(
        <div>
            <h3>Ver Pedidos</h3>

            <Buscador valor={busqueda} onchange={setBusqueda} placeholder="Buscar por ID o Nombre"/>
        </div>
    )

}