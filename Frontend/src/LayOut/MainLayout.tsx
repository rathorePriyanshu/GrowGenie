import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-primary">
      <nav className="bg-[#111714] border-b border-solid border-b-[#29382f]">
        <NavBar />
      </nav>

      <Outlet />

      <footer className="bg-[#111714] border-t border-solid border-b-[#29382f] py-4">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
