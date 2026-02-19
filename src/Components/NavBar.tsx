import { Link } from "react-router-dom";
import Login from "./Login";

const NavBar = () => {
  return (
    <div className="flex gap-6 justify-between items-center px-6 py-3 rounded-lg shadow-xl">
      <div className="flex gap-3 justify-center items-center mx-4">
        <svg
          className="h-8 w-8 text-buttonPrimary"
          fill="none"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_6_319)">
            <path
              d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
              fill="currentColor"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_6_319">
              <rect fill="white" height="48" width="48"></rect>
            </clipPath>
          </defs>
        </svg>
        <h1 className="font-bold text-white text-xl">
          GrowGenie
          <span
            className="ml-4 text-xs font-bold text-white 
  bg-gradient-to-r from-green-500/80 to-blue-900/80
  px-3 py-1 rounded-full border border-green-400/50 shadow-lg 
  transform transition-all hover:scale-110 hover:shadow-xl hover:cursor-pointer"
          >
            PREMIUM
          </span>
        </h1>
      </div>
      <div className="flex gap-4 items-center divide-x divide-[#444c48]">
        <div className="flex gap-1 items-center ">
          {[
            { name: "Home", path: "/" },
            { name: "10th Class", path: "/stream" },
            { name: "12th Class", path: "/seniorstream" },
            { name: "Career", path: "/career" },
          ].map((link, index) => (
            <div key={link.name} className="relative flex items-center">
              <Link
                to={link.path}
                className="px-3 py-1 text-white font-semibold bg-transparent rounded-md
                     shadow-md hover:shadow-xl transform hover:-translate-y-1
                     transition-all duration-200"
              >
                {link.name}
              </Link>

              {/* 3D-style separator */}
              {index !== 4 && (
                <span
                  className="absolute right-0 top-1/2 transform -translate-y-1/2
                           h-6 border-gray-600"
                ></span>
              )}
            </div>
          ))}
        </div>
        <div className="pl-4">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
