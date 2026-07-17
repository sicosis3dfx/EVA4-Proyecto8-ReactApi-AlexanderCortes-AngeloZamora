const BASE_URL = 'https://apiclases.inacode.cl/pizzeria';


export async function getPedidos(){
    const res = await fetch(BASE_URL)
    if(!res.ok) throw new Error('Error al obtener pedidos desde la API')
    const data = await res.json()
    
    
    return data.datos || []    
}


export async function getPedido(id){
    const res = await fetch(`${BASE_URL}/${id}`)
    if(!res.ok) throw new Error('Error al buscar el pedido desde la API')
    return res.json()
}


export async function crearPedido(pedido) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(pedido),
    })
    if(!res.ok) throw new Error('Error al crear el pedido.')
    return res.json()    
}


export async function actualizarPedido(id, datosActualizados) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datosActualizados),
    })
    if(!res.ok) throw new Error('Error al actualizar el pedido.')
    return res.json()    
}


export async function eliminarPedido(id){
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    })
    if(!res.ok) throw new Error('Error al eliminar el pedido desde la API')
    return res.json()
}