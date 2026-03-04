import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const HomeLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-secondary">
      <nav>
        <NavBar />
      </nav>

      <div className="flex flex-col grow h-full">
        <main className="flex flex-1 flex-col pt-24 items-center text-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
