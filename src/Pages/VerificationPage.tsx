import { useForm } from "react-hook-form";
import { BsFillShieldLockFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import type { OTPData } from "../servies/types";
import { OTPVerify } from "../servies/api";
import { getErrorMessage } from "../servies/methods";
import { useAuthStore } from "../store/auth";
import Loading from "../Components/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

const VerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, setLoading } = useAuthStore();
  const verificationId = location.state?.verificationId;

  useEffect(() => {
    if (location.state.otpSent) {
      toast.success("OTP sent to your email", {
        toastId: "otp-sent",
      });

      navigate(location.pathname, {
        replace: true,
        state: { verificationId: location.state.verificationId },
      });
    }
  }, [location, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<OTPData>({
    defaultValues: {
      otp: Array(6).fill(""),
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const otpValues = watch("otp");
  const isOTPComplete = otpValues.every((digits) => digits.length === 1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const digits = e.target.value.replace(/\D/, "").slice(-1);

    setValue(`otp.${index}`, digits, {
      shouldDirty: true,
      shouldValidate: true,
    });

    clearErrors("root.otp");

    if (digits) {
      const next = e.target.nextElementSibling as HTMLInputElement;
      next?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value) {
      const prev = e.currentTarget.previousElementSibling as HTMLInputElement;
      prev?.focus();
    }
  };

  const onsubmit = async (data: OTPData) => {
    const otpCode = data.otp.join("");

    if (otpCode.length != 6) {
      setError("root.otp", {
        type: "manual",
        message: "Enter Complete OTP",
      });
      return;
    }

    try {
      if (!verificationId) {
        navigate("/auth");
        return null;
      }

      setLoading(true);
      const res = await OTPVerify(verificationId, otpCode);
      sessionStorage.setItem("signupToken", res.signupToken);
      reset();
      navigate("/auth/signup");
    } catch (err) {
      const message = getErrorMessage(err);
      console.log("SETTING ERROR:", message);

      setError("root.otp", {
        type: "server",
        message: message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className=" relative z-10 w-full flex flex-col items-center gap-5 max-w-xl justify-center">
      <div className="w-full flex flex-col items-center rounded-xl bg-secondary border border-primary/20 shadow-2xl  shadow-secondary/20 p-6">
        <div
          className={`flex size-16 items-center justify-center  rounded-full  text-center mb-4  transition-all ${isOTPComplete ? "border-buttonPrimary bg-buttonPrimary/80  text-white hover:bg-buttonPrimary/20" : " text-gray-500 border-2 border-gray-700 bg-[#111714]"}`}
        >
          <BsFillShieldLockFill size={25} />
        </div>
        <h1 className="text-white leading-tight tracking-tight text-3xl font-bold text-center">
          Verify Your Email
        </h1>
        <p className="text-gray-400 text-center font-normal leading-normal mt-2">
          Enter the 6-digit code sent to your email
        </p>
        <div className="w-full flex items-center justify-center mt-8 mb-4">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col items-center"
          >
            <div className="flex gap-3 mb-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  autoCapitalize="off"
                  autoComplete="one-time-code"
                  autoCorrect="off"
                  spellCheck={false}
                  {...register(`otp.${index}`, {
                    required: true,
                    pattern: /^[0-9]$/,
                  })}
                  className="w-12 h-14 bg-secondary text-white font-bold rounded-full focus:outline-none focus:border-buttonPrimary border border-white text-center"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={handleKeyDown}
                />
              ))}
            </div>

            <button
              disabled={!isOTPComplete}
              type="submit"
              className={`w-2/3 p-4 text-white border rounded-full text-center text-lg font-medium leading-normal  mt-5 mb-1 transition-all ${isOTPComplete ? "border-buttonPrimary bg-buttonPrimary/80 hover:cursor-pointer hover:bg-buttonPrimary/20" : "bg-gray-500 cursor-not-allowed"}`}
            >
              Verify OTP
            </button>
            {errors.root?.otp && (
              <p className="text-red-500 opacity-60 text-sm text-center">
                {errors.root.otp.message}
              </p>
            )}
          </form>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-white/40 text-center font-normal leading-normal">
            Didn't recieve code?{" "}
            <a className="hover:text-buttonPrimary/70 transition-all" href="#">
              Resend OTP
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
