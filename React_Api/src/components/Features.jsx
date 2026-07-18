import { useState, useEffect } from 'react'
import PizzaConfigurator from './PizzaConfigurator'

const MENU_PIZZAS = [
  {
    categoria: "Tradicionales",
    pizzas: [
      { id: 1, nombre: "Margherita", precio: "$8.990", desc: "Salsa de tomates artesanales, mozzarella fresca, albahaca y aceite de oliva virgen.", img: "/img/Margherita.png" },
      { id: 2, nombre: "Pepperoni", precio: "$9.990", desc: "Doble porción de pepperoni premium americano combinado con queso mozzarella fundido.", img: "/img/Pepperoni.png" }
    ]
  },
  {
    categoria: "Especialidades",
    pizzas: [
      { id: 3, nombre: "PizzaItalia Suprema", precio: "$11.990", desc: "Jamón serrano, rúcula fresca, lascas de parmesano madurado y reducción de balsámico.", img: "/img/PizzaItaliaSuprema.png" },
      { id: 4, nombre: "Cuatro Quesos", precio: "$10.990", desc: "Mezcla perfecta de Mozzarella, Gorgonzola, Parmesano y Ricotta cremosa.", img: "/img/CuatroQuesos.png" }
    ]
  }
]

const IMAGENES_CARRUSEL = [
  "/img/photo-1513104890138-7c749659a591.jpg",
  "/img/photo-1534308983496-4fabb1a015ee.jpg",
  "/img/photo-1534564883496-4faaa1c017he.jpg",
  "/img/photo-1574071318508-1cdbab80d002.jpg",
  "/img/photo-1593560708920-61dd98c46a4e.jpg",
  "/img/photo-1593560778950-61dd98c46a4e.jpg"
]

export default function Features() {
  const [categoriaActiva, setCategoriaActiva] = useState(0)
  const [fotoActiva, setFotoActiva] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [pizzaSeleccionada, setPizzaSeleccionada] = useState(null)
  const [formData, setFormData] = useState({ nombre: '', correo: '', personas: '2', fecha: '', hora: '', telefono: '' })
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)

  const hoy = new Date().toISOString().split('T')[0]

  const cambiarImagenConEfecto = (nuevoIndice) => {
    setIsFading(true)
    setTimeout(() => {
      setFotoActiva(nuevoIndice)
      setIsFading(false)
    }, 250)
  }

  const siguienteFoto = () => {
    const siguiente = (fotoActiva + 1) % IMAGENES_CARRUSEL.length
    cambiarImagenConEfecto(siguiente)
  }

  const anteriorFoto = () => {
    const anterior = (fotoActiva - 1 + IMAGENES_CARRUSEL.length) % IMAGENES_CARRUSEL.length
    cambiarImagenConEfecto(anterior)
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      siguienteFoto()
    }, 4000)
    return () => clearInterval(intervalo)
  }, [fotoActiva])

  const handleReserva = (e) => {
    e.preventDefault()
    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.fecha || !formData.hora || !formData.telefono.trim()) {
      setError('Por favor, completa todos los campos obligatorios (*).')
      setExito(false)
      return
    }

    const fechaSeleccionada = new Date(formData.fecha + 'T00:00:00')
    const diaSemana = fechaSeleccionada.getDay()
    if (diaSemana === 0) {
      setError('PizzaItalia permanece cerrado los domingos. Por favor, selecciona un día de lunes a sábado.')
      setExito(false)
      return
    }

    const horaSeleccionada = formData.hora
    if (horaSeleccionada < "10:30" || horaSeleccionada > "19:30") {
      setError('La hora de reserva debe ser de 10:30 a 19:30 Hrs.')
      setExito(false)
      return
    }

    const reglaCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!reglaCorreo.test(formData.correo.trim())) {
      setError('Por favor, ingresa un correo electrónico válido (ej: usuario@correo.com).')
      setExito(false)
      return
    }

    const reglaTelefono = /^\d{9}$/
    if (!reglaTelefono.test(formData.telefono.trim())) {
      setError('El teléfono debe contener exactamente los 9 dígitos numéricos (ej: 9XXXXXXXX).')
      setExito(false)
      return
    }
    
    setError('')
    setExito(true)
    setFormData({ nombre: '', correo: '', personas: '2', fecha: '', hora: '', telefono: '' })
  }

  return (
    <section id='features' className='features'>
      <div className='features-container'>
        
        <p className='section-eyebrow'>Galería Artesanal</p>
        <h2 className='section-title' style={{ marginBottom: '2rem' }}>Nuestras Especialidades en el Horno</h2>
        
        <div style={{ position: 'relative', maxWidth: '650px', margin: '0 auto', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)' }}>
          
          <button 
            type="button" 
            onClick={anteriorFoto} 
            style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '16px', background: 'rgba(17, 17, 22, 0.6)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10, transition: 'all 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--accent)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(17, 17, 22, 0.6)'}
          >
            &#10094;
          </button>
          
          <div style={{ width: '100%', height: '350px', background: '#0b0a0a' }}>
            <img 
              src={IMAGENES_CARRUSEL[fotoActiva]} 
              alt="Pizza Especialidad" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.25s ease-in-out', opacity: isFading ? 0 : 1 }} 
            />
          </div>
          
          <button 
            type="button" 
            onClick={siguienteFoto} 
            style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '16px', background: 'rgba(17, 17, 22, 0.6)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10, transition: 'all 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--accent)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(17, 17, 22, 0.6)'}
          >
            &#10095;
          </button>
          
          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.6rem', zIndex: 10, background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(6px)', padding: '0.45rem 0.9rem', borderRadius: '20px' }}>
            {IMAGENES_CARRUSEL.map((_, idx) => (
              <span 
                key={idx} 
                onClick={() => cambiarImagenConEfecto(idx)}
                style={{ width: '8px', height: '8px', borderRadius: '50%', background: fotoActiva === idx ? 'var(--accent)' : 'rgba(255, 255, 255, 0.35)', transform: fotoActiva === idx ? 'scale(1.25)' : 'scale(1)', cursor: 'pointer', transition: 'all 0.2s' }}
              />
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem'}}>
          <p className='section-eyebrow'>Nuestro Menú Artesanal</p>
          <h2 className='section-title'>👇 Elige tu Pizza 👇</h2>
        </div>

        <div className="accordion-wrapper">
          {MENU_PIZZAS.map((item, index) => {
            const estaAbierto = categoriaActiva === index
            return (
              <div className="accordion-item-custom" key={item.categoria}>
                <button 
                  className={`accordion-trigger ${estaAbierto ? 'active' : ''}`}
                  onClick={() => setCategoriaActiva(estaAbierto ? null : index)}
                >
                  {item.categoria}
                  <span className="accordion-arrow">{estaAbierto ? '▲' : '▼'}</span>
                </button>

                {estaAbierto && (
                  <div className="accordion-content-custom">
                    <div className='features-grid'>
                      {item.pizzas.map((pizza) => (
                        <div className='feature-card' key={pizza.id}>
                          <div className='feature-icon' style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                            <img 
                              src={pizza.img} 
                              alt={pizza.nombre} 
                              style={{ width: '240px', height: '240px', objectFit: 'contain' }} 
                            />
                          </div>
                          <h3>{pizza.nombre}</h3>
                          <p>{pizza.desc}</p>
                          <span className="pizza-price">{pizza.precio} <span style={{fontSize:'0.75rem', color:'var(--muted)', fontWeight:'normal'}}>(Mediana)</span></span>
                          
                          <div className="pizza-card-actions">
                            <button className="btn-pizza-primary" style={{width: '100%'}} onClick={() => setPizzaSeleccionada(pizza)}>
                              Seleccionar y Añadir 🛒
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div id='formulario-reserva' style={{ scrollMarginTop: '120px', marginTop: '5rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', padding: '2rem', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <p className='section-eyebrow'>Planifica tu Visita</p>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '800' }}>📅 Reserva tu Mesa</h3>
          
          <form onSubmit={handleReserva} className="reserva-form">
            <input 
              type="text" 
              placeholder="Tu Nombre *" 
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="form-input"
            />

            <input 
              type="text" 
              placeholder="Correo Electrónico *" 
              value={formData.correo}
              onChange={(e) => setFormData({...formData, correo: e.target.value})}
              className="form-input"
            />

            <div style={{ display: 'flex', alignItems: 'center', background: '#111116', border: '1px solid var(--border)', borderRadius: '6px', paddingLeft: '0.8rem', boxSizing: 'border-box' }}>
              <span style={{ color: 'var(--muted)', fontSize: '0.88rem', userSelect: 'none', paddingRight: '0.2rem' }}>+56</span>
              <input 
                type="text" 
                placeholder="9XXXXXXXX *" 
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                className="form-input"
                style={{ border: 'none', paddingLeft: '0.2rem', background: 'transparent' }}
                maxLength={9}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <input 
                type="date" 
                min={hoy}
                value={formData.fecha}
                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                className="form-input"
                style={{ flex: 1 }}
              />
              <input 
                type="time" 
                value={formData.hora}
                onChange={(e) => setFormData({...formData, hora: e.target.value})}
                className="form-input"
                style={{ flex: 1 }}
              />
            </div>

            <select 
              value={formData.personas}
              onChange={(e) => setFormData({...formData, personas: e.target.value})}
              className="form-input"
            >
              <option value="1">1 Persona</option>
              <option value="2">2 Personas</option>
              <option value="4">4 Personas</option>
              <option value="6">6 Personas</option>
            </select>

            {error && <p className="msg-error" style={{ marginTop: '0.5rem' }}>{error}</p>}
            {exito && <p className="msg-success" style={{ marginTop: '0.5rem', fontSize: '1rem', fontWeight: '700' }}>¡Mesa reservada con éxito! 🎉 Un correo de confirmación será enviado a su Email registrado.</p>}

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
              Confirmar Reserva
            </button>
          </form>
        </div>

      </div>

      <PizzaConfigurator 
        pizza={pizzaSeleccionada} 
        onClose={() => setPizzaSeleccionada(null)} 
      />
    </section>
  )
}