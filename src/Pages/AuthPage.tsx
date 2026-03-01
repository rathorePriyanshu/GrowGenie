import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { checkAuth, googleAuth, OTP } from "../servies/api";
import type { CheckAuthData } from "../servies/types";
import { getErrorMessage } from "../servies/methods";
import { useAuthStore } from "../store/auth";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

const AuthPage = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: CheckAuthData) => {
    try {
      setLoading(true);
      const res = await checkAuth(data.email);

      if (!res.exists) {
        const otpres = await OTP(data.email);
        navigate("verify", {
          state: { verificationId: otpres.verificationId, otpSent: true },
        });
      } else {
        sessionStorage.setItem("email", res.email);
        navigate("login");
      }
    } catch (err) {
      setError("email", {
        type: "server",
        message: getErrorMessage(err),
      });
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (res) => {
      const backendRes = await googleAuth(res.access_token);

      localStorage.setItem("accessToken", backendRes.token);
      useAuthStore.getState().setAuth(backendRes.user);
      toast.success("logged in succesfully");
      navigate("/");
    },
    onError: (err) => console.log("Google login failed:", err),
  });

  if (loading) return <Loading />;

  return (
    <div className="relative z-10 w-full flex flex-col items-center gap-4 max-w-4xl justify-center">
      <div className="w-full flex items-center rounded-xl bg-[#111b17] border border-primary/20 shadow-2xl shadow-primary/10 p-3">
        <div className="w-1/2 p-3">
          <img
            src="/Gemini_Generated_Image_dhsjo6dhsjo6dhsj-removebg-preview.png"
            alt=""
          />
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <div className="relative z-10 w-3/4 flex flex-col items-center gap-3 justify-center">
            <div className="w-full flex flex-col items-center rounded-xl bg-[#111714] border border-primary/20 shadow-2xl shadow-primary/10 py-2 px-4">
              <h1 className="w-full text-white font-bold text-3xl leading-tight tracking-tight pb-2 text-center">
                Welcome!
              </h1>
              <p className="w-full text-white/70 font-normal leading-normal text-base text-center pb-10">
                Continue your journey with GrowGenie
              </p>
              <form
                noValidate
                className="w-full space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col">
                  <label className="flex flex-col flex-1 min-w-40">
                    <p className="text-white text-sm font-medium leading-normal pb-2">
                      Email
                    </p>
                    <div className="flex w-full items-stretch flex-1">
                      <input
                        className="flex w-full min-w-0 resize-none text-white outline-none rounded-lg focus:outline-0 focus:ring-2 focus:ring-buttonPrimary border-none bg-primary h-12 placeholder:text-white/40 p-4 text-base font-normal leading-normal"
                        type="email"
                        {...register("email", {
                          required: true,
                          pattern: {
                            value: /^\S+@\S+$/,
                            message: "Invalid email format",
                          },
                          onChange: () => {
                            clearErrors("email");
                          },
                        })}
                        placeholder="Enter your email"
                      />
                    </div>
                  </label>
                  {errors.email && (
                    <p className="flex justify-end text-center text-sm leading-tight tracking-tight text-red-500 opacity-70 mt-1">
                      {errors.email.message}
                    </p>
                  )}

                  <button className="w-full flex items-center justify-center rounded-2xl h-12 px-6 text-base font-bold text-black hover:bg-buttonPrimary/40  bg-buttonPrimary transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111b17] focus:ring-buttonPrimary mt-8">
                    SignUp
                  </button>
                </div>
              </form>
              <div className="w-full flex items-center gap-4 py-6">
                <hr className="w-full border-t border-white/20" />
                <p className="text-sm text-white/50">or</p>
                <hr className="w-full border-t border-white/20" />
              </div>
              <button
                onClick={() => login()}
                className="w-full h-12 py-2 rounded-full text-base flex items-center justify-center gap-1 font-bold bg-white border border-gray-300 text-black/80 outline-none hover:bg-white/20 hover:cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111b17] focus:ring-gray-400 mb-3"
              >
                <img
                  className="w-6 h-6 mt-0.5 flex items-center"
                  src="/images-removebg-preview.png"
                  alt="Google Logo"
                />
                <span className="text-center">Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
