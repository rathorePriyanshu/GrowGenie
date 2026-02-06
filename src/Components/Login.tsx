import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { FaRegUserCircle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, authInitialized } = useAuthStore();

  if (!authInitialized) return null;

  return (
    <div className="flex flex-row gap-2">
      {isAuthenticated ? (
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2"
        >
          <p className="text-base text-buttonPrimary font-bold leading-normal ">
            {user?.name || user?.email}
          </p>
          <span className="text-xl text-buttonPrimary">
            <FaRegUserCircle />
          </span>
        </button>
      ) : (
        <button
          onClick={() => navigate("/auth")}
          className="flex items-center bg-buttonSecondary rounded-lg gap-2 border border-gray-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-buttonPrimary"
        >
          Signup
        </button>
      )}
    </div>
  );
};

export default Login;
