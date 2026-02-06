import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleAuth, Signup } from "../servies/api";
import { useForm } from "react-hook-form";
import type { SignupData } from "../servies/types";
import { getErrorMessage } from "../servies/methods";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../store/auth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("signupToken");
  console.log("Signup token:", token);
  const { email } = jwtDecode<{ email: string }>(token!);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignupData>({
    defaultValues: {
      email,
      name: "",
      password: "",
    },
    mode: "onChange",
  });

  const password = watch("password");

  const onsubmit = async (data: SignupData) => {
    try {
      const res = await Signup(data.name, data.email, data.password);

      sessionStorage.removeItem("signupToken");
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

  const login = useGoogleLogin({
    onSuccess: async (res) => {
      const backendRes = await googleAuth(res.access_token);

      localStorage.setItem("accessToken", backendRes.token);
      useAuthStore.getState().setAuth(backendRes.user);
      navigate("/");
    },
    onError: (err) => console.log("Google login failed:", err),
  });

  return (
    <div className="flex flex-col relative z-10 w-full max-w-5xl items-center">
      <div className="flex w-full items-center rounded-xl bg-[#111b17] border border-primary/20 shadow-2xl shadow-primary/10 p-3">
        <div className="w-1/2 mb-4">
          <img
            src="/Gemini_Generated_Image_26bfmn26bfmn26bf-removebg-preview.png"
            alt="people doing research"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center">
          <div className="flex flex-col relative z-10 w-3/4 items-center">
            <div className="flex flex-col w-full items-center rounded-xl bg-[#111b17] border border-primary/20 shadow-2xl shadow-primary/10 px-4 py-2">
              <h1 className="w-full text-white font-bold leading-tight tracking-tight text-3xl text-center ">
                Create Your Account
              </h1>
              <p className="w-full text-white/70 tracking-normal mb-6 font-normal text-center text-base ">
                Start exploring your future career path
              </p>
              <form
                onSubmit={handleSubmit(onsubmit)}
                className="w-full space-y-8"
              >
                <div className="w-full space-y-6">
                  <div className="flex flex-col">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-white text-sm font-medium tracking-normal pb-2">
                        Email
                      </p>
                      <div className="flex w-full flex-1 items-stretch">
                        <input
                          className="flex w-full min-w-0 py-2 px-4 text-white text-base font-normal focus:outline-0 focus:ring-2 focus:ring-buttonPrimary bg-primary leading-normal rounded-lg placeholder:text-white/40 border-none outline-none resize-none"
                          readOnly
                          type="email"
                          placeholder="Enter your email"
                          {...register("email")}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-white text-sm font-medium tracking-normal pb-2">
                        Name
                      </p>
                      <div className="flex w-full flex-1 items-stretch">
                        <input
                          className="flex w-full py-2 px-4 min-w-0 text-white text-base font-normal focus:outline-0 focus:ring-2 focus:ring-buttonPrimary bg-primary leading-normal rounded-lg placeholder:text-white/40 border-none outline-none resize-none"
                          placeholder="Enter your name"
                          type="text"
                          autoComplete="off"
                          {...register("name", {
                            required: "Enter Your Name",
                          })}
                          maxLength={20}
                          minLength={3}
                        />
                      </div>
                    </label>
                    {errors.email && (
                      <p className="flex justify-end text-red-500 opacity-60 text-sm text-center">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-white text-sm font-medium tracking-normal pb-2">
                        Password
                      </p>
                      <div className="flex w-full flex-1 items-stretch">
                        <input
                          className="flex w-full py-2 px-4 min-w-0 text-white text-base font-normal focus:outline-0 focus:ring-2 focus:ring-buttonPrimary bg-primary leading-normal rounded-lg placeholder:text-white/40 border-none outline-none resize-none"
                          placeholder="Password"
                          type="password"
                          {...register("password", {
                            required: "Password is Required",
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            },
                          })}
                        />
                      </div>
                    </label>
                    {errors.password && (
                      <p className="flex justify-end text-red-500 opacity-60 text-sm text-center">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-white text-sm font-medium tracking-normal pb-2">
                        Confirm Password
                      </p>
                      <div className="flex w-full flex-1 items-stretch">
                        <input
                          className="flex w-full py-2 px-4 min-w-0 text-white text-base font-normal focus:outline-0 focus:ring-2 focus:ring-buttonPrimary bg-primary leading-normal rounded-lg placeholder:text-white/40 border-none outline-none resize-none"
                          placeholder="Confirm Password"
                          type="password"
                          {...register("confirmpassword", {
                            required: "Confirm Your Password",
                            validate: (value) =>
                              value === password || "Passwords do not match",
                          })}
                        />
                      </div>
                    </label>
                    {errors.confirmpassword && (
                      <p className="flex justify-end text-red-500 opacity-60 text-sm text-center">
                        {errors.confirmpassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <button
                    type="submit"
                    className="flex w-3/4 items-center justify-center text-black font-bold tracking-normal bg-buttonPrimary hover:bg-buttonPrimary/40 py-3 rounded-lg text-lg text-center mx-auto hover:cursor-pointer transition-all"
                  >
                    Create Account
                  </button>
                  {errors.root?.server && (
                    <p className="flex justify-end text-red-500 opacity-60 text-sm text-center">
                      {errors.root?.server.message}
                    </p>
                  )}
                </div>
              </form>
              <div className="flex py-6 items-center w-full gap-4">
                <hr className="w-full border-t border-white/20" />
                <p className="text-white text-sm">or</p>
                <hr className="w-full border-t border-white/20" />
              </div>
              <button
                onClick={() => login()}
                className="w-full h-12 py-2 rounded-full text-base flex items-center justify-center gap-1 font-bold bg-white border border-gray-300 text-black/80 outline-none hover:bg-white/20 hover:cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111b17] focus:ring-gray-400 mb-2"
              >
                <img
                  className="w-6 h-6 mt-0.5 flex items-center"
                  src="/images-removebg-preview.png"
                  alt="Google Logo"
                />
                <span className="text-center tracking-tight">
                  Continue with Google
                </span>
              </button>
              <p className="w-full text-white/40 font-normal leading-normal text-center mb-2">
                Already have an account?
                <a
                  className="font-normal mx-2 text-buttonPrimary/70 hover:text-buttonPrimary transition-all"
                  href="/auth"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
