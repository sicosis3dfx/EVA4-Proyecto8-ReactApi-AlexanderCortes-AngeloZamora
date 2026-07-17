export default function Buscador({ valor, onchange, placeholder }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || 'Buscar por ID o Cliente...'}
        value={valor}
        onChange={(e) => onchange(e.target.value)} 
      />
    </div>
  )
}