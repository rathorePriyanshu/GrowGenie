import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const ProtectedRoute = () => {
  const { isAuthenticated, authInitialized } = useAuthStore();

  if (!authInitialized) return null;

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
