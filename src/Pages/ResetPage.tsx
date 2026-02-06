import { useForm } from "react-hook-form";
import { MdLockReset } from "react-icons/md";
import type { ResetPasswordData } from "../servies/types";
import { getErrorMessage } from "../servies/methods";
import { ResetPassword } from "../servies/api";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = watch("password");

  const onsubmit = async (data: ResetPasswordData) => {
    try {
      if (!token) {
        setError("root.server", {
          type: "manual",
          message: "Token is missing",
        });
        return;
      }

      await ResetPassword(token, data.password);
      navigate("/auth/login");
    } catch (err) {
      setError("root.server", {
        type: "server",
        message: getErrorMessage(err),
      });
    }
  };

  return (
    <div className="relative z-10 w-full flex flex-col items-center max-w-lg justify-center">
      <div className="w-full flex flex-col items-center rounded-xl bg-[#111b17] border border-primary/20 shadow-2xl shadow-primary/10 py-5 px-10">
        <div className="flex size-14 items-center justify-center text-buttonPrimary rounded-full border-2 border-gray-700 bg-[#111714] text-center mb-2">
          <MdLockReset size={30} />
        </div>
        <h1 className="w-full text-white font-bold text-3xl leading-tight tracking-tight text-center">
          Reset Your Password
        </h1>
        <p className="w-full text-white/70 font-normal leading-normal text-base text-center pb-8">
          Create a new strong password. Must be at least 8 characters.
        </p>
        <form onSubmit={handleSubmit(onsubmit)} className="w-full space-y-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="flex flex-col flex-1 min-w-40">
                <p className="text-white text-sm font-medium leading-normal pb-2">
                  New Password
                </p>
                <div className="flex w-full items-stretch flex-1">
                  <input
                    className="flex w-full min-w-0 resize-none text-white outline-none rounded-lg focus:outline-0 focus:ring-2 focus:ring-buttonPrimary border-none bg-primary h-12 placeholder:text-white/40 p-4 text-base font-normal leading-normal"
                    type="password"
                    placeholder="Enter new password"
                    {...register("password", {
                      required: "password is required",
                      minLength: {
                        value: 8,
                        message: "password must be at least 8 characters",
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
            <div className="flex flex-col mb-2">
              <label className="flex flex-col flex-1 min-w-40">
                <p className="text-white text-sm font-medium leading-normal pb-2">
                  Confirm Password
                </p>
                <div className="flex w-full items-stretch flex-1">
                  <input
                    className="flex w-full min-w-0 resize-none text-white outline-none rounded-lg focus:outline-0 focus:ring-2 focus:ring-buttonPrimary border-none bg-primary h-12 placeholder:text-white/40 p-4 text-base font-normal leading-normal"
                    type="password"
                    placeholder="Confirm new password"
                    {...register("confirmPassword", {
                      required: "confirm your password",
                      validate: (value) =>
                        value === password || "password do not match",
                    })}
                  />
                </div>
              </label>
              {errors.confirmPassword && (
                <p className="flex justify-end text-red-500 opacity-60 text-sm text-center">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="flex w-3/4 items-center justify-center text-black font-bold tracking-normal bg-buttonPrimary hover:bg-buttonPrimary/40 py-3 rounded-lg text-lg text-center mx-auto hover:cursor-pointer transition-all"
          >
            Update Password
          </button>
          {errors.root?.server && (
            <p className="flex justify-end text-red-500 opacity-60 text-sm text-center">
              {errors.root.server.message}
            </p>
          )}
        </form>
        <p className="w-full text-white/40 font-normal leading-normal text-center mt-1 mb-2">
          Remember your password?{" "}
          <a
            className="font-normal mx-1 text-white/40 hover:text-buttonPrimary transition-all"
            href="/auth"
          >
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPage;
