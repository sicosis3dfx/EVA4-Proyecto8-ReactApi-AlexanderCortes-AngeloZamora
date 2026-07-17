import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EliminarPedido() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigimos automáticamente a la cocina de pedidos
    navigate("/ver");
  }, [navigate]);

  return (
    <div style={{ padding: '8rem 2rem', textAlign: 'center', color: '#fff' }}>
      <p>Procesando eliminación...</p>
    </div>
  );
}