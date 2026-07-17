import { useState, useEffect } from 'react'

export default function PizzaConfigurator({ pizza, onClose }) {
  const [tamano, setTamano] = useState('Mediana')
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    if (pizza) {
      setTamano('Mediana')
      setCantidad(1)
    }
  }, [pizza])

  if (!pizza) return null 

  const baseNum = parseInt(pizza.precio.replace('$', '').replaceAll('.', ''), 10)
  const precioActualUnidad = tamano === 'Familiar' ? baseNum + 3000 : baseNum
  const precioTotalModal = precioActualUnidad * Math.max(1, cantidad)

  const ejecutarAgregarAlCarrito = () => {
    const nuevaPizzaConfigurada = {
      ...pizza,
      tamano: tamano,
      cantidad: cantidad
    }

    window.dispatchEvent(new CustomEvent('add-to-cart', { detail: nuevaPizzaConfigurada }))
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-body-custom" style={{ textAlign: 'left' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#fff', marginBottom: '0.5rem' }}>{pizza.nombre}</h2>
            <p className="modal-pizza-desc">{pizza.desc}</p>
          </div>
          
          <div className="modal-ingredients" style={{ marginBottom: '1.25rem' }}>
            <h4>🍃 Detalles de Elaboración:</h4>
            <p>Masa madre madurada por 48 horas bajo frío controlado, estirada a mano, salsa de tomates italianos San Marzano y horneado a la piedra a 450°C.</p>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.4rem' }}>📏 Elige el Tamaño:</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: tamano === 'Mediana' ? 'var(--accent)' : '#fff' }}>
                <input type="radio" name="tamano-pizza" value="Mediana" checked={tamano === 'Mediana'} onChange={() => setTamano('Mediana')} />
                Mediana ({pizza.precio})
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: tamano === 'Familiar' ? 'var(--accent)' : '#fff' }}>
                <input type="radio" name="tamano-pizza" value="Familiar" checked={tamano === 'Familiar'} onChange={() => setTamano('Familiar')} />
                Familiar (+ $3.000)
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', margin: 0 }}>🔢 Cantidad:</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button 
                type="button" 
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'var(--card-bg)', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
              >
                -
              </button>
              <span style={{ fontSize: '1.1rem', fontWeight: '700', minWidth: '24px', textAlign: 'center', color: '#fff' }}>{cantidad}</span>
              <button 
                type="button" 
                onClick={() => setCantidad(cantidad + 1)}
                style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'var(--card-bg)', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="modal-footer-custom" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted)' }}>Subtotal:</span>
              <span className="modal-pizza-price">{'$' + precioTotalModal.toLocaleString('es-CL')}</span>
            </div>
            <button 
              className="btn-primary" 
              onClick={ejecutarAgregarAlCarrito}
            >
              Añadir al Pedido 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}