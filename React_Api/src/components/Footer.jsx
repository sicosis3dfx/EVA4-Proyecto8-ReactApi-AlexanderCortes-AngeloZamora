export default function Footer() {
  return (
    <footer id='footer' className='footer'>
      <div className='footer-container'>
        <div className='footer-brand'>
          <span className='footer-logo' style={{ fontStyle: 'normal' }}>
          <span style={{ color: 'var(--accent)' }}>Pizza</span>
          <span style={{ color: '#fff' }}>Ita</span>
          <span style={{ color: 'var(--accent2)' }}>lia</span>
        </span>
          <p>Auténtica tradición napolitana<br /> 
          horneada a la piedra con pasión<br />
          y cariño artesanal.</p>
          
        </div>

        <div className='footer-links'>
          <h4>📍 Ubicación</h4>
          <p>Av. Condell 4321, Renca</p>
          <p>Santiago, Chile</p>
          <h4>📲 Contacto</h4>
          <p>📞 +56 9 8765 4321</p>
          <p>📧 contacto@pizzaitalia.cl</p>
        </div>

        <div className='footer-links'>
          <h4>🕒 Horarios</h4>
          <p>Lunes a Jueves: 10:00 a 21:00 hrs</p>
          <p>Viernes y Sábado: 10:00 a 23:00 hrs</p>
          <p>Reservas desde las 10:30 a 19:30 hrs</p>
          <p>Domingo: Cerrado</p>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>© 2026 PizzaItalia. Todos los derechos reservados.</p>
        <p>Desarrollado por Angelo Zamora.</p>
        <p>Inacap Renca</p>
      </div>
    </footer>
  )
}