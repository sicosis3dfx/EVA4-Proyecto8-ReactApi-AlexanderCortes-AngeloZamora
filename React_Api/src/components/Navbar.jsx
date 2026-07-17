import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isopen, setIsOpen] = useState(false)
  const [carritoCount, setCarritoCount] = useState(0)

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const actualizarContador = (e) => {
      setCarritoCount(e.detail || 0)
    }

    window.addEventListener('cart-updated-count', actualizarContador)
    return () => window.removeEventListener('cart-updated-count', actualizarContador)
  }, [])

  const abrirCarritoModal = () => {
    window.dispatchEvent(new Event('open-cart'))
  }

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        {/* Cambiado a "/" para que el logo siempre te lleve al inicio limpio */}
        <a href='/#hero' className='navbar-logo' style={{ textDecoration: 'none' }}>
          <span style={{ color: 'var(--accent)' }}>Pizza</span>
          <span style={{ color: '#fff' }}>Ita</span>
          <span style={{ color: 'var(--accent2)' }}>lia</span>
        </a>
        
        <ul className='navbar-links'>
          {/* Agregamos la barra "/" antes del ancla para que redirija primero al home */}
          <li><a href='/#hero'>Inicio</a></li>
          <li><a href='/#features'>Nuestro Menú</a></li>
          <li><a href='/#footer'>Contacto</a></li>
          
          
          
          <li>
            <button className='navbar-cta' onClick={abrirCarritoModal} style={{ border: 'none', cursor: 'pointer' }}>
              <i className="bi bi-cart3"></i> Pedido ({carritoCount})
            </button>
          </li>
        </ul>

        <button 
          className={`hamburger ${isopen ? 'open' : ''}`} 
          onClick={() => setIsOpen(!isopen)}
          aria-label='Toggle menu'
          style={{ position: 'relative' }}
        >
          <span /><span /><span />
          {carritoCount > 0 && (
            <span 
              style={{ 
                position: 'absolute', 
                top: '-8px', 
                right: '-8px', 
                backgroundColor: '#dc3545', 
                color: '#fff', 
                borderRadius: '50%', 
                fontSize: '11px', 
                fontWeight: 'bold',
                width: '18px', 
                height: '18px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                zIndex: 20
              }}
            >
              {carritoCount}
            </span>
          )}
        </button>
      </div>

      <div className={`mobile-menu ${isopen ? 'open' : ''}`}>
        {/* También corregimos los enlaces en el menú móvil */}
        <a href='/#hero' onClick={closeMenu}>Inicio</a>
        <a href='/#features' onClick={closeMenu}>Nuestro Menú</a>
        <a href='/#footer' onClick={closeMenu}>Contacto</a>
        

        <button className='navbar-cta' onClick={() => { abrirCarritoModal(); closeMenu(); }} style={{ border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
          <i className="bi bi-cart3"></i> Pedido ({carritoCount})
        </button>
      </div>
    </nav>
  )
}