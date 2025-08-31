import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Se não tiver token, redireciona para login
    return <Navigate to="/" replace />;
  }

  // Se tiver token, renderiza a rota normalmente
  return children;
}

export default ProtectedRoute;
