import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { toast } from "react-toastify";

const LogOutPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    useAuthStore.getState().clearAuth();
    toast.success("logged out succesfully");
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
