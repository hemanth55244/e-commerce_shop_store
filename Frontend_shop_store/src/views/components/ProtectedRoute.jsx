import { Navigate } from "react-router-dom";
import { useAuthController } from "../../controllers/useAuthController";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuthController();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
