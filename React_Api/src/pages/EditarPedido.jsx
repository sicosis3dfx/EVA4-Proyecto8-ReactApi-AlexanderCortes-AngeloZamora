import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPedido, actualizarPedido } from "../services/pedidosApi";

export function EditarPedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  
  // Estados para la edición completa del pedido
  const [estado, setEstado] = useState("en_preparacion");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getPedido(id)
      .then((data) => {
        setPedido(data);
        if (data.estado) setEstado(data.estado);
        if (data.cliente?.nombre) setNombre(data.cliente.nombre);
        
        
        if (data.cliente?.telefono) {
          setTelefono(data.cliente.telefono.replace('+56', ''));
        }
        
        if (data.cliente?.direccion) setDireccion(data.cliente.direccion);
      })
      .catch((err) => alert("Error al cargar el pedido: " + err.message))
      .finally(() => setCargando(false));
  }, [id]);

  const handleGuardar = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("Por favor, ingresa el nombre del cliente.");
      return;
    }

    if (!telefono.trim() || !/^\d{9}$/.test(telefono.trim())) {
      alert("Por favor, ingresa un número de teléfono válido de 9 dígitos.");
      return;
    }

    
    const esDeliveryOriginal = pedido?.tipoEntrega === 'delivery';
    if (esDeliveryOriginal && !direccion.trim()) {
      alert("Por favor, ingresa la dirección para el despacho.");
      return;
    }

    try {
      const datosActualizados = {
        estado,
        cliente: {
          nombre: nombre.trim(),
          telefono: `+56${telefono.trim()}`,
          direccion: esDeliveryOriginal ? direccion.trim() : "Retiro en local"
        }
      };

      await actualizarPedido(id, datosActualizados);
      alert('¡Pedido actualizado con éxito! 🍕');
      navigate('/ver');
    } catch (err) {
      alert('Error al guardar los cambios: ' + err.message);
    }
  };

  if (cargando) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center', color: 'var(--accent)' }}>
        <span>Cargando datos del pedido... 👩‍🍳</span>
      </div>
    );
  }

  const esDeliveryOriginal = pedido?.tipoEntrega === 'delivery';

  return (
    <div style={{ padding: '8rem 2rem', maxWidth: '550px', margin: '0 auto', minHeight: '100vh', color: '#fff' }}>
      <span className="section-eyebrow">Área de Administración</span>
      <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
        Editar Pedido
      </h2>
      
      <form onSubmit={handleGuardar} className="feature-card" style={{ border: '1px solid var(--border)', padding: '2rem', borderRadius: '12px', background: 'var(--card-bg)' }}>
        
        
        <div style={{ marginBottom: '1.2rem', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)', fontWeight: '700' }}>
            Nombre del Cliente
          </label>
          <input 
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', background: '#111116', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        
        <div style={{ marginBottom: '1.2rem', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)', fontWeight: '700' }}>
            Teléfono de Contacto (9 dígitos)
          </label>
          <div style={{ display: 'flex', alignItems: 'center', background: '#111116', border: '1px solid var(--border)', borderRadius: '6px', paddingLeft: '0.8rem', boxSizing: 'border-box' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.88rem', userSelect: 'none', paddingRight: '0.2rem' }}>+56</span>
            <input 
              type="text" 
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              style={{ border: 'none', padding: '0.8rem 0.2rem', background: 'transparent', color: '#fff', width: '100%', outline: 'none' }}
              maxLength={9}
            />
          </div>
        </div>

        
        {esDeliveryOriginal && (
          <div style={{ marginBottom: '1.2rem', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)', fontWeight: '700' }}>
              Dirección de Despacho
            </label>
            <input 
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', background: '#111116', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>
        )}

        
        <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)', fontWeight: '700' }}>
            Estado del Pedido
          </label>
          <select 
            value={estado} 
            onChange={(e) => setEstado(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', background: '#111116', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}
          >
            <option value="en_preparacion">En Cocina 👩‍🍳</option>
            
            
            {esDeliveryOriginal && (
              <option value="en_camino">En Reparto 🛵</option>
            )}
            
            <option value="entregado">Entregado ✅</option>
          </select>
        </div>

      
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" onClick={() => navigate('/ver')} className="btn-pizza-secondary" style={{ flex: 1, padding: '0.8rem 0', borderRadius: '6px', cursor: 'pointer' }}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary" style={{ flex: 1, padding: '0.8rem 0', borderRadius: '6px', cursor: 'pointer' }}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}