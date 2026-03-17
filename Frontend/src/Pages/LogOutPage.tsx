import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { toast } from "react-toastify";

const LogOutPage = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = () => {
    navigate("/auth", { replace: true });

    localStorage.removeItem("accessToken");
    clearAuth();

    toast.success("Logged out successfully", {
      toastId: "logout",
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="text-black bg-buttonPrimary rounded-lg px-4 py-3 text-sm font-bold text-center hover:bg-opacity-80"
    >
      Logout
    </button>
  );
};

export default LogOutPage;
