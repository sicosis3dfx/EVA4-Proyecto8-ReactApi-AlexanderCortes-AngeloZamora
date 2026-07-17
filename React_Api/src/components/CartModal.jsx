import { useState, useEffect } from 'react'

export default function CartModal() {
  const [verCarrito, setVerCarrito] = useState(false)
  const [carrito, setCarrito] = useState([])
  const [telefonoCarrito, setTelefonoCarrito] = useState('')
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
    const suma = carrito.reduce((acumulado, item) => {
      const precioBase = parseInt(item.precio.replace('$', '').replaceAll('.', ''), 10)
      const precioFinalUnidad = item.tamano === 'Familiar' ? precioBase + 3000 : precioBase
      return acumulado + (precioFinalUnidad * item.cantidad)
    }, 0)
    return '$' + suma.toLocaleString('es-CL')
  }

  const pagarPedido = (e) => {
    e.preventDefault()

    if (!telefonoCarrito.trim()) {
      setErrorCarrito('Por favor, ingresa un número de teléfono obligatorio.')
      return
    }

    const reglaTelefono = /^\d{9}$/
    if (!reglaTelefono.test(telefonoCarrito.trim())) {
      setErrorCarrito('El teléfono debe contener exactamente los 9 dígitos numéricos (ej: 9XXXXXXXX).')
      return
    }

    setErrorCarrito('')
    alert(`¡Tu pedido por un total de ${calcularTotal()} pronto estará en el horno 🎉. Nos contactaremos al +56${telefonoCarrito} ¡GRACIAS POR PREFERIRNOS! 👌.`)
    
    setCarrito([])
    setTelefonoCarrito('')
    setVerCarrito(false)
  }

  if (!verCarrito) return null

  return (
    <div className="modal-overlay" onClick={() => setVerCarrito(false)}>
      <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setVerCarrito(false)}>&times;</button>
        <div className="modal-body-custom" style={{ textAlign: 'left' }}>
          <h2>🛒 Tu Pedido Actual</h2>
          {carrito.length === 0 ? (
            <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>Tu carrito está vacío. ¡Añade una pizza! 🍕</p>
          ) : (
            <form onSubmit={pagarPedido}>
              <div className="carrito-scroll-container">
                {carrito.map((item, index) => {
                  const base = parseInt(item.precio.replace('$', '').replaceAll('.', ''), 10)
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

              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '700' }}>
                  Teléfono de Contacto Obligatorio *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#111116', border: '1px solid var(--border)', borderRadius: '6px', paddingLeft: '0.8rem', boxSizing: 'border-box' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.88rem', userSelect: 'none', paddingRight: '0.2rem' }}>+56</span>
                  <input 
                    type="text" 
                    placeholder="9XXXXXXXX" 
                    value={telefonoCarrito}
                    onChange={(e) => setTelefonoCarrito(e.target.value)}
                    className="form-input"
                    style={{ border: 'none', paddingLeft: '0.2rem', background: 'transparent', color: '#fff', width: '100%' }}
                    maxLength={9}
                  />
                </div>
                {errorCarrito && <p className="msg-error" style={{ marginTop: '0.5rem', color: 'var(--accent)', fontSize: '0.85rem' }}>{errorCarrito}</p>}
              </div>

              <div className="carrito-total-box">
                <span>Total a Pagar:</span>
                <span className="total-amount">{calcularTotal()}</span>
              </div>
              
              <div className="modal-footer-custom">
                <button type="button" className="btn-pizza-secondary" onClick={() => setVerCarrito(false)}>Seguir Mirando</button>
                <button type="submit" className="btn-primary">Enviar Orden 🚀</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}