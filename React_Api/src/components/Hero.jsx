export default function Hero() {
  return (
    <section id='hero' className='hero'>
      <div className='hero-content'>
        
        <div 
          style={{ 
            display: 'inline-block',
            background: '#16161a',
            border: '3px solid transparent',
            borderImage: 'linear-gradient(to right, #22c55e 33%, #f5f5f4 33% 66%, #ef4444 66%) 1',
            padding: '0.6rem 1.8rem', 
            marginBottom: '2.2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          <span 
            className='hero-eyebrow' 
            style={{ 
              fontSize: '0.8rem',
              fontWeight: '900',
              letterSpacing: '0.25em',
              color: '#fff', 
              background: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
              borderRadius: 0,
              display: 'block',
              textTransform: 'uppercase'
            }}
          >
            BIENVENIDO A PIZZAITALIA
          </span>
        </div>

        <h1 className='hero-title'>
          La Auténtica Pizza <br />
          <span>Artesanal a la Piedra</span>
        </h1>

        <div style={{ margin: '1.5rem 0', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/img/pizza-yumi.gif" 
            alt="Pizza Animada Local" 
            style={{ width: '280px', height: '280px', objectFit: 'contain' }}
          />
        </div>

        <p 
          className='hero-subtitle'
          style={{
            maxWidth: '620px',
            margin: '0 auto 2.5rem',
            fontSize: '1.15rem',
            color: '#e2e8f0',
            lineHeight: '1.6',
            background: 'rgba(11, 11, 15, 0.55)',
            border: '1px solid var(--accent)',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(34, 197, 94, 0.05)'
          }}
        >
          Disfruta de la verdadera tradición napolitana con ingredientes 100% seleccionados y masa madre madurada por 48 horas.
        </p>

        <div className='hero-actions'>
          <a 
            href='https://youtu.be/HUll5SnavOw' 
            target='_blank' 
            rel='noopener noreferrer'
            style={{ background: '#f59e0b', color: '#111116', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem', transition: 'background 0.2s, transform 0.15s', border: 'none', display: 'inline-block' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#d97706'}
            onMouseOut={(e) => e.currentTarget.style.background = '#f59e0b'}
          >
            🐢 Colaboración Especial ¡HAZ CLICK!
          </a>
          
          <a 
            href='#features' 
            className='btn-primary'
          >
            Ver Menú 🍕
          </a>
          
          <a 
            href='#formulario-reserva' 
            style={{ background: 'var(--accent)', color: '#111116', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem', transition: 'background 0.2s, transform 0.15s', border: 'none', display: 'inline-block' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#4ade80'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--accent)'}
          >
            📅 Reserva tu Mesa
          </a>
        </div>
      </div>
    </section>
  )
}