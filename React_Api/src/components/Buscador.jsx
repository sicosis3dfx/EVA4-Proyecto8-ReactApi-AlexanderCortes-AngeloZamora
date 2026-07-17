export default function Buscador({ valor, onchange, placeholder }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || 'Buscar por ID o Cliente...'}
        value={valor}
        // Usamos onChange (con C mayúscula) para React, y la flecha => correcta
        onChange={(e) => onchange(e.target.value)} 
      />
    </div>
  )
}