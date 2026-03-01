import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const { isAuthenticated, authInitialized } = useAuthStore();

  if (!authInitialized) return <Loading />;

  if (isAuthenticated) {
    return <Outlet />;
  }

  toast.error("Login to access", {
    toastId: "acess-error",
  });
  return <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
