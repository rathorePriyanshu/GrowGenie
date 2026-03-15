import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Loading from "../Components/Loading";

const ProtectedRoute = () => {
  const { isAuthenticated, authInitialized } = useAuthStore();
  const location = useLocation();

  if (!authInitialized) return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
