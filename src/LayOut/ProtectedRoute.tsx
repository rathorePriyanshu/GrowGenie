import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Loading from "../Components/Loading";

const ProtectedRoute = () => {
  const { isAuthenticated, authInitialized } = useAuthStore();

  if (!authInitialized) return <Loading />;

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
