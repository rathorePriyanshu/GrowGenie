import { RxDashboard } from "react-icons/rx";
import { RiRoadMapLine } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import LogOutPage from "./LogOutPage";

const ProfilePage = () => {
  return (
    <div className="relative bg-[#0e1512] flex h-full min-h-screen w-full">
      <aside className="sticky flex-col hidden lg:flex top-0  justify-between bg-[#151d19] p-4 w-64 shrink-0">
        <div className="flex flex-col gap-3 divide-y divide-[#395646]">
          <div className="flex items-center gap-3">
            <div
              className="bg-center bg-GrowGenie bg-no-repeat aspect-square bg-cover rounded-full size-10"
              data-alt="GrowGenie logo abstract gradient"
            ></div>
            <div className="flex flex-col">
              <h1 className="text-base text-white font-medium leading-normal">
                Grow Genie
              </h1>
              <p className="text-sm text-white/40 font-normal leading-normal">
                Career Guidance
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-2 py-6">
            <a
              className="rounded-lg flex px-3 py-2 gap-2 items-center bg-buttonPrimary/20"
              href="#"
            >
              <span className="text-buttonPrimary">
                <RxDashboard />
              </span>
              <p className="text-white font-medium leading-normal text-sm">
                Dashboard
              </p>
            </a>
            <a
              className="rounded-lg flex px-3 py-2 gap-2 items-center hover:bg-white/10 transition-colors "
              href="#"
            >
              <span className="text-buttonPrimary">
                <RiRoadMapLine />
              </span>
              <p className="text-white font-medium leading-normal text-sm">
                Saved Roadmaps
              </p>
            </a>
            <a
              className="rounded-lg flex px-3 py-2 gap-2 items-center hover:bg-white/10 transition-colors"
              href="#"
            >
              <span className="text-buttonPrimary">
                <IoSettingsSharp />
              </span>
              <p className="text-white font-medium leading-normal text-sm">
                Settings
              </p>
            </a>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-4 sm:p-6 md:p-8 ">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="bg-[#151d19] p-6 rounded-2xl @container">
            <div className="flex flex-col w-full gap-4 md:flex-row md:justify-between md:items-center">
              <div className="flex items-center gap-4">
                <div className="bg-ProfileImage w-20 min-h-20 sm:w-24 sm:min-h-24 aspect-square bg-cover shrink-0 bg-center bg-no-repeat rounded-full"></div>
                <div className="flex flex-col justify-center">
                  <p className="font-bold text-white leading-normal text-xl sm:text-[22px] tracking-[-0.015em]">
                    Priyanshu Rathore
                  </p>
                  <p className="text-sm sm:text-base font-normal leading-normal text-white/40">
                    Grow Genie User
                  </p>
                  <div className="flex gap-2 pt-2 flex-wrap">
                    <div className="shrink-0 flex gap-x-2 items-center justify-center px-3 rounded-lg bg-buttonPrimary/20 h-7">
                      <p className="font-medium text-xs leading-normal text-buttonPrimary">
                        Saved Roadmaps
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <LogOutPage />
              </div>
            </div>
          </header>
          <section className="space-y-4">
            <h2 className="text-[22px] text-white font-bold tracking-[-0.015rem] leading-tight px-2">
              Your Saved Roadmaps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg flex flex-col p-4 gap-4 items-start sm:flex-row sm:items-center border border-[#395646] bg-[#151d19] hover:border-primary/50 transition-colors">
                <div className="bg-RoadmapImage bg-cover h-24 sm:w-24 w-full bg-center rounded-lg shrink-0"></div>
                <div className="flex-grow space-y-2">
                  <h3 className="text-white font-semibold text-lg">
                    Software Engineering
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
                    A comprehensive guide to becoming a software engineer,
                    covering skills, education, and career opportunities.
                  </p>
                  <button className="mt-2 w-full text-sm sm:w-auto rounded-xl text-[#0e1512] bg-buttonPrimary font-bold tracking-tight text-center px-4 py-2 hover:bg-opacity-80 transition-colors">
                    View Roadmap
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="space-y-4">
            <h2 className="text-[22px] text-white font-bold tracking-[-0.015rem] leading-tight px-2">
              Settings
            </h2>
            <div className="p-2 divide-y w-1/2 border border-[#395646] bg-[#151d19] divide-[#395646] rounded-xl">
              <a
                className="block w-full text-left p-2 text-white hover:bg-white/5 rounded-t-lg transition-colors"
                href="#"
              >
                Edit Profile
              </a>
              <a
                className="block w-full text-left p-2 text-white hover:bg-white/5 transition-colors"
                href="#"
              >
                Change Password
              </a>
              <a
                className="block w-full text-left p-2 text-white hover:bg-white/5 transition-colors"
                href="#"
              >
                setPassword
              </a>
              <a
                className="block w-full text-left p-2 text-red-400 hover:bg-red-500/10 rounded-b-lg transition-colors"
                href="#"
              >
                Delete Account
              </a>
            </div>
          </section>
          <div className="text-center">
            <button className="font-bold bg-buttonPrimary text-[#0e1512] py-3 px-8 rounded-lg hover:bg-opacity-80 transition-colors text-base">
              Explore Careers
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
