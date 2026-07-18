import { useState, useEffect } from 'react'
import { crearPedido } from '../services/pedidosApi'

export default function CartModal() {
  const [verCarrito, setVerCarrito] = useState(false)
  const [carrito, setCarrito] = useState([])
  const [tipoEntrega, setTipoEntrega] = useState('retiro')
  const [nombreCliente, setNombreCliente] = useState('')
  const [telefonoCarrito, setTelefonoCarrito] = useState('')
  const [direccionCliente, setDireccionCliente] = useState('')
  const [errorCarrito, setErrorCarrito] = useState('')

  
  useEffect(() => {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    window.dispatchEvent(new CustomEvent('cart-updated-count', { detail: totalItems }))
  }, [carrito])


  useEffect(() => {
    const abrirModalHandler = () => setVerCarrito(true)

    const agregarPizzaHandler = (e) => {
      const nuevaPizzaConfigurada = e.detail
      setCarrito((carritoActual) => {
        const existe = carritoActual.find(
          item => item.id === nuevaPizzaConfigurada.id && item.tamano === nuevaPizzaConfigurada.tamano
        )

        if (existe) {
          return carritoActual.map(item => 
            item.id === nuevaPizzaConfigurada.id && item.tamano === nuevaPizzaConfigurada.tamano
              ? { ...item, cantidad: item.cantidad + nuevaPizzaConfigurada.cantidad }
              : item
          )
        } else {
          return [...carritoActual, nuevaPizzaConfigurada]
        }
      })
    }

    window.addEventListener('open-cart', abrirModalHandler)
    window.addEventListener('add-to-cart', agregarPizzaHandler)

    return () => {
      window.removeEventListener('open-cart', abrirModalHandler)
      window.removeEventListener('add-to-cart', agregarPizzaHandler)
    }
  }, [])

  const eliminarDelCarrito = (indiceAEliminar) => {
    const nuevoCarrito = carrito.filter((_, index) => index !== indiceAEliminar)
    setCarrito(nuevoCarrito)
    if (nuevoCarrito.length === 0) {
      setErrorCarrito('')
    }
  }

  const calcularTotal = () => {
    if (!carrito || carrito.length === 0) return '$0'
    const suma = carrito.reduce((acumulado, item) => {
      const precioStr = item.precio ? String(item.precio) : '0'
      const precioBase = parseInt(precioStr.replace('$', '').replaceAll('.', ''), 10) || 0
      const precioFinalUnidad = item.tamano === 'Familiar' ? precioBase + 3000 : precioBase
      return acumulado + (precioFinalUnidad * item.cantidad)
    }, 0)
    return '$' + suma.toLocaleString('es-CL')
  }

  const pagarPedido = async (e) => {
    e.preventDefault()

    
    if (!nombreCliente.trim()) {
      setErrorCarrito('Por favor, ingresa tu nombre completo.')
      return
    }

    
    if (!telefonoCarrito.trim()) {
      setErrorCarrito('Por favor, ingresa un número de teléfono obligatorio.')
      return
    }

    const reglaTelefono = /^\d{9}$/
    if (!reglaTelefono.test(telefonoCarrito.trim())) {
      setErrorCarrito('El teléfono debe contener exactamente los 9 dígitos numéricos (ej: 9XXXXXXXX).')
      return
    }

    
    if (tipoEntrega === 'delivery' && !direccionCliente.trim()) {
      setErrorCarrito('Por favor, ingresa la dirección para el despacho.')
      return
    }

    setErrorCarrito('')

    try {
      const totalAlerta = calcularTotal()
      const telefonoAlerta = telefonoCarrito.trim()

      const datosPedido = {
        cliente: {
          nombre: nombreCliente.trim(),
          telefono: `+56${telefonoAlerta}`,
          direccion: tipoEntrega === 'delivery' ? direccionCliente.trim() : "Retiro en local"
        },
        items: carrito.map(item => {
          const precioStr = item.precio ? String(item.precio) : '0'
          const precioBase = parseInt(precioStr.replace('$', '').replaceAll('.', ''), 10) || 0
          const precioFinalUnidad = item.tamano === 'Familiar' ? precioBase + 3000 : precioBase
          return {
            pizzaId: item.id || "665f112233445566778899aa",
            nombre: item.nombre,
            tamano: item.tamano.toLowerCase(),
            precio: precioFinalUnidad,
            cantidad: item.cantidad
          }
        }),
        tipoEntrega: tipoEntrega === 'delivery' ? 'delivery' : 'retiro en local',
        total: parseInt(totalAlerta.replace('$', '').replaceAll('.', ''), 10) || 0,
        estado: 'en_preparacion',
        fecha: new Date().toISOString()
      }

      
      setVerCarrito(false)

      
      await crearPedido(datosPedido)

      
      setCarrito([])
      setTelefonoCarrito('')
      setNombreCliente('')
      setDireccionCliente('')
      setTipoEntrega('retiro')

      alert(`¡Tu pedido por un total de ${totalAlerta} fue enviado con éxito a la cocina 🎉!\nTe contactaremos al +56${telefonoAlerta} lo antes posible.`);

    } catch (error) {
      console.error("Error al enviar el pedido:", error)
      setVerCarrito(true)
      setErrorCarrito('Ocurrió un error al enviar el pedido. Por favor, inténtalo nuevamente.')
    }
  }

  if (!verCarrito) return null

  const forzarCierre = () => {
    setVerCarrito(false)
  }

  return (
    <div className="modal-overlay" onClick={forzarCierre}>
      <div className="modal-content-custom" onClick={(e) => e.stopPropagation()} style={{ minHeight: 'auto', position: 'relative' }}>
        
        <button type="button" className="modal-close-btn" onClick={forzarCierre} style={{ cursor: 'pointer', zIndex: 99 }}>&times;</button>
        
        <div className="modal-body-custom" style={{ textAlign: 'left' }}>
          <h2>🛒 Tu Pedido Actual</h2>
          
          {!carrito || carrito.length === 0 ? (
            <div style={{ padding: '2rem 0', textAlign: 'center' }}>
              <p style={{ color: 'var(--muted)', margin: '0 0 1.5rem 0' }}>Tu carrito está vacío. ¡Añade una pizza! 🍕</p>
              <button 
                type="button" 
                className="btn-pizza-secondary" 
                onClick={forzarCierre}
                style={{ width: '100%', cursor: 'pointer' }}
              >
                Volver al Menú
              </button>
            </div>
          ) : (
            <form onSubmit={pagarPedido}>
              
              <div className="carrito-scroll-container">
                {carrito.map((item, index) => {
                  const precioStr = item.precio ? String(item.precio) : '0'
                  const base = parseInt(precioStr.replace('$', '').replaceAll('.', ''), 10) || 0
                  const precioFinalUnidad = item.tamano === 'Familiar' ? base + 3000 : base
                  const subtotalItem = precioFinalUnidad * item.cantidad

                  return (
                    <div key={index} className="carrito-item-row" style={{ fontSize: '0.9rem' }}>
                      <div>
                        <span><strong>{item.nombre}</strong></span>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted)' }}>
                          Tamaño: {item.tamano} | Cantidad: {item.cantidad}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: 'var(--accent2)', fontWeight: '700' }}>
                          {'$' + subtotalItem.toLocaleString('es-CL')}
                        </span>
                        <button type="button" onClick={() => eliminarDelCarrito(index)} className="btn-delete-item">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              
              <div style={{ marginTop: '1.2rem', marginBottom: '1.2rem' }}>
                <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '700' }}>
                  ¿Cómo quieres recibir tu pizza? *
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => { setTipoEntrega('retiro'); setErrorCarrito(''); }}
                    style={{
                      flex: 1,
                      padding: '0.7rem',
                      border: tipoEntrega === 'retiro' ? '1px solid var(--accent)' : '1px solid var(--border)',
                      background: tipoEntrega === 'retiro' ? 'rgba(34, 197, 94, 0.15)' : '#111116',
                      color: '#fff',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: '0.2s'
                    }}
                  >
                    🏃‍♂️ Retiro en Local
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTipoEntrega('delivery'); setErrorCarrito(''); }}
                    style={{
                      flex: 1,
                      padding: '0.7rem',
                      border: tipoEntrega === 'delivery' ? '1px solid var(--accent2)' : '1px solid var(--border)',
                      background: tipoEntrega === 'delivery' ? 'rgba(239, 68, 68, 0.15)' : '#111116',
                      color: '#fff',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: '0.2s'
                    }}
                  >
                    🛵 Delivery
                  </button>
                </div>
              </div>

              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                
                <div>
                  <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '700' }}>
                    Tu Nombre Completo *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ej: Laura Méndez" 
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '0.8rem', 
                      background: '#111116', 
                      border: '1px solid var(--border)', 
                      borderRadius: '6px', 
                      color: '#fff',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

               
                <div>
                  <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '700' }}>
                    Teléfono de Contacto *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#111116', border: '1px solid var(--border)', borderRadius: '6px', paddingLeft: '0.8rem', boxSizing: 'border-box' }}>
                    <span style={{ color: 'var(--muted)', fontSize: '0.88rem', userSelect: 'none', paddingRight: '0.2rem' }}>+56</span>
                    <input 
                      type="text" 
                      placeholder="9XXXXXXXX" 
                      value={telefonoCarrito}
                      onChange={(e) => setTelefonoCarrito(e.target.value)}
                      style={{ border: 'none', padding: '0.8rem 0.2rem', background: 'transparent', color: '#fff', width: '100%', outline: 'none' }}
                      maxLength={9}
                    />
                  </div>
                </div>

                
                {tipoEntrega === 'delivery' && (
                  <div style={{ animation: 'fadeIn 0.3s ease' }}>
                    <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '700' }}>
                      Dirección de Despacho *
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej: Calle Sur 220, Renca" 
                      value={direccionCliente}
                      onChange={(e) => setDireccionCliente(e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '0.8rem', 
                        background: '#111116', 
                        border: '1px solid var(--border)', 
                        borderRadius: '6px', 
                        color: '#fff',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                )}
                
                {errorCarrito && <p className="msg-error" style={{ margin: 0, color: 'var(--accent)', fontSize: '0.85rem' }}>{errorCarrito}</p>}
              </div>

             
              <div className="carrito-total-box" style={{ marginBottom: '1.5rem' }}>
                <span>Total a Pagar:</span>
                <span className="total-amount">{calcularTotal()}</span>
              </div>
              
              <div className="modal-footer-custom">
                <button type="button" className="btn-pizza-secondary" onClick={forzarCierre}>Seguir Mirando</button>
                <button type="submit" className="btn-primary">Enviar Orden 🚀</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}