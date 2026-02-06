import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const LogOutPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    useAuthStore.getState().clearAuth();
    navigate("/");
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
