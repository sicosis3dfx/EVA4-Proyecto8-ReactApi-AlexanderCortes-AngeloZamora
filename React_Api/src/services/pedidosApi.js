// src/services/pedidosApi.js

// URL base de tu colección asignada
const BASE_URL = 'https://apiclases.inacode.cl/pizzeria';

// 1. Obtener todos los pedidos (readAll)
export async function getPedidos(){
    const res = await fetch(BASE_URL)
    if(!res.ok) throw new Error('Error al obtener pedidos desde la API')
    const data = await res.json()
    
    // El profesor devuelve los objetos en la propiedad 'datos'
    // Si viene vacía o nula, devolvemos un arreglo vacío para que no se caiga
    return data.datos || []    
}

// 2. Obtener un solo pedido por ID (readOne)
export async function getPedido(id){
    const res = await fetch(`${BASE_URL}/${id}`)
    if(!res.ok) throw new Error('Error al buscar el pedido desde la API')
    return res.json()
}

// 3. Crear un nuevo pedido (create)
export async function crearPedido(pedido) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(pedido),
    })
    if(!res.ok) throw new Error('Error al crear el pedido.')
    return res.json()    
}

// 4. Actualizar estado del pedido (update)
export async function actualizarPedido(id, datosActualizados) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datosActualizados),
    })
    if(!res.ok) throw new Error('Error al actualizar el pedido.')
    return res.json()    
}

// 5. Eliminar pedido (delete)
export async function eliminarPedido(id){
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    })
    if(!res.ok) throw new Error('Error al eliminar el pedido desde la API')
    return res.json()
}