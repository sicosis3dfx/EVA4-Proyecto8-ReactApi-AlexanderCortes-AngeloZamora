import { useNavigate } from 'react-router-dom';
import { eliminarPedido } from '../services/pedidosApi';

export default function PedidoCard({ pedido, onEliminar }) {
  const navigate = useNavigate();
  const idPedido = pedido._id;

  const handleEliminar = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      return;
    }

    try {
      await eliminarPedido(idPedido);
      alert('Pedido eliminado exitosamente. 🍕');
      
      if (onEliminar) {
        onEliminar(idPedido);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const esDelivery = pedido.tipoEntrega === 'delivery';

  
  const formatearEstado = (estadoDb) => {
    switch (estadoDb) {
      case 'en_preparacion':
        return { texto: 'En Cocina 👩‍🍳', color: 'var(--accent)', bg: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' };
      case 'en_camino':
        return { texto: 'En Reparto 🛵', color: 'var(--accent2)', bg: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' };
      case 'entregado':
        return { texto: 'Entregado ✅', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.2)' };
      default:
        return { texto: estadoDb || 'Pendiente', color: '#fff', bg: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' };
    }
  };

  const infoEstado = formatearEstado(pedido.estado);

  return (
    <div 
      className="feature-card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        border: '1px solid var(--border)',
        
        
        background: 'rgba(15, 15, 20, 0.85)', 
        backdropFilter: 'blur(12px)',           
        WebkitBackdropFilter: 'blur(12px)',     
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', 
        
        borderRadius: '12px',
        padding: '2rem 1.5rem',
        textAlign: 'left'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent)' }}>
            ID: {idPedido ? idPedido.substring(idPedido.length - 6).toUpperCase() : 'S/N'}
          </span>
          <span style={{ 
            padding: '0.3rem 0.7rem', 
            borderRadius: '6px', 
            fontSize: '0.75rem', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            background: infoEstado.bg,
            color: infoEstado.color,
            border: infoEstado.border
          }}>
            {infoEstado.texto}
          </span>
        </div>

        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem', marginBottom: '1.2rem' }}>
          <p style={{ margin: '0 0 0.3rem 0', fontSize: '0.95rem', color: '#fff', fontWeight: '700' }}>
            👤 {pedido.cliente ? pedido.cliente.nombre : 'Cliente Anónimo'}
          </p>
          <p style={{ margin: '0 0 0.3rem 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
            📞 Teléfono: {pedido.cliente ? pedido.cliente.telefono : 'Sin teléfono'}
          </p>
          
          {esDelivery ? (
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--accent2)', fontWeight: '600' }}>
              📍 Despacho: {pedido.cliente?.direccion || 'No especificada'}
            </p>
          ) : (
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '600' }}>
              🏃‍♂️ Retiro en Local
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
            Detalle del Pedido:
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {pedido.items && pedido.items.map((item, idx) => {
              return (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', padding: '0.4rem 0', borderBottom: '1px dashed rgba(255, 255, 255, 0.05)' }}>
                  <span>
                    <strong>{item.cantidad}x</strong> {item.nombre} <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>({item.tamano})</span>
                  </span>
                  <span style={{ color: '#fff', fontWeight: '500' }}>
                    ${((item.precio || 0) * item.cantidad).toLocaleString('es-CL')}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Total:</span>
          <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent)' }}>
            ${pedido.total ? pedido.total.toLocaleString('es-CL') : 0}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button 
            type="button"
            onClick={() => navigate('/editar/' + idPedido)} 
            className="btn-pizza-primary"
            style={{ 
              flex: 1, 
              padding: '0.65rem 0', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            ✏️ Editar Pedido
          </button>
          
          <button 
            type="button"
            onClick={handleEliminar} 
            className="btn-delete-item"
            style={{ 
              padding: '0.65rem 1rem', 
              border: '1px solid rgba(248, 113, 113, 0.2)', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <i className="bi bi-trash" style={{ color: '#f87171' }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}