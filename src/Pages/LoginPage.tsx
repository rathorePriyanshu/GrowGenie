import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { LoginData } from "../servies/types";
import { getErrorMessage } from "../servies/methods";
import { forgetPassword, Login } from "../servies/api";
import { useAuthStore } from "../store/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email") ?? undefined;

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email,
      password: "",
    },
    mode: "onChange",
  });

  const onsubmit = async (data: LoginData) => {
    try {
      const res = await Login(data.email, data.password);

      sessionStorage.removeItem("email");
      localStorage.setItem("accessToken", res.token);
      useAuthStore.getState().setAuth(res.user);

      navigate("/");
    } catch (err) {
      setError("root.server", {
        type: "server",
        message: getErrorMessage(err),
      });
    }
  };

  const handleClick = async () => {
    if (!email) {
      setError("email", {
        type: "manual",
        message: "Enter a Email to sent reset link",
      });
      return;
    }

    try {
      const currentEmail = getValues("email");
      await forgetPassword(currentEmail);
    } catch (err) {
      setError("root.server", {
        type: "server",
        message: getErrorMessage(err),
      });
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center rounded-xl bg-[#111b17] border border-primary/20 shadow-2xl shadow-primary/10 p-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-white text-center">
          Your Email is Registered!
        </h1>
        <p className="w-full text-white/70 font-normal leading-normal text-base text-center pb-6">
          Enter your password to continue
        </p>
        <form onSubmit={handleSubmit(onsubmit)} className="w-full">
          <div className="flex flex-col space-y-3">
            <div className="w-full flex flex-col">
              <label className="flex flex-col flex-1 min-w-40">
                <p className="font-medium text-sm text-white tracking-normal pb-2">
                  Email
                </p>
                <div className="w-full flex flex-1 items-stretch">
                  <input
                    autoComplete="off"
                    {...register("email", {
                      required: "email is required",
                      onChange: () => clearErrors("root.server"),
                    })}
                    className="flex w-full min-w-0 resize-none text-white outline-none rounded-lg focus:outline-0 focus:ring-2 focus:ring-buttonPrimary border-none bg-primary h-12 placeholder:text-white/40 p-4 text-base font-normal leading-normal mb-1"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
              </label>
              {errors.email && (
                <p className="flex justify-start text-red-500 opacity-60 text-sm text-center">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col mb-1">
              <label className="flex flex-col flex-1 min-w-40">
                <p className="font-medium text-sm text-white tracking-normal pb-2">
                  Password
                </p>
                <div className="w-full flex flex-1 items-stretch">
                  <input
                    {...register("password", {
                      required: "password is required",
                      minLength: {
                        value: 8,
                        message: "password should be at least 8 character",
                      },
                      onChange: () => clearErrors("root.server"),
                    })}
                    className="flex w-full min-w-0 resize-none text-white outline-none rounded-lg focus:outline-0 focus:ring-2 focus:ring-buttonPrimary border-none bg-primary h-12 placeholder:text-white/40 p-4 text-base font-normal leading-normal mb-1"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </label>
              {errors.password && (
                <p className="flex justify-start text-red-500 opacity-60 text-sm text-center">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <a
            className="text-sm font-normal text-white/20 flex justify-end items-center hover:text-white/70 transition-colors hover:cursor-pointer"
            onClick={handleClick}
          >
            Forgot Password?
          </a>
          <button
            type="submit"
            className="w-full flex items-center justify-center rounded-2xl h-12 px-6 text-base font-bold text-black hover:bg-buttonPrimary/40  bg-buttonPrimary transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111b17] focus:ring-buttonPrimary mt-6 mb-1"
          >
            Login
          </button>
          {errors.root?.server && (
            <p className="flex justify-center mt-1 mb-2 text-red-500 opacity-60 text-sm text-center">
              {errors.root.server.message}
            </p>
          )}
        </form>
        <p className="w-full text-white/40 font-normal leading-normal text-center mb-2">
          Check your email?
          <a
            className="font-normal mx-2 text-buttonPrimary/70 hover:text-buttonPrimary transition-all"
            href="/auth"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
