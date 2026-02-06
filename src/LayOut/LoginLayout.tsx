import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="w-full relative flex flex-1 flex-col justify-center items-center bg-background-light dark:bg-[#0e1512] group/design-root overflow-y-auto p-4 sm:p-6">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute h-96 w-96 bg-buttonPrimary/10 blur-3xl -top-20 -left-20"></div>
        <div className="absolute h-96 w-96 bg-buttonPrimary/10 blur-3xl -bottom-20 -right-20"></div>
      </div>
      <div className="relative z-10 w-full min-h-full grid place-items-center py-4 px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
