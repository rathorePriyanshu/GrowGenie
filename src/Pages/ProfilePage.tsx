import { RxDashboard } from "react-icons/rx";
import { RiRoadMapLine } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import LogOutPage from "./LogOutPage";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRoadmapStore } from "../store/roadmap";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { LoadSavedRoadmaps, DeleteSavedRoadmap, savedRoadmaps } =
    useRoadmapStore();
  const sectionRef = useRef<HTMLElement | null>(null);
  const dashboardRef = useRef<HTMLElement | null>(null);

  type Section = "dashboard" | "roadmaps" | "settings";
  const sideBarItems: { title: Section; icon: React.ReactNode }[] = [
    { title: "dashboard", icon: <RxDashboard /> },
    { title: "roadmaps", icon: <RiRoadMapLine /> },
    { title: "settings", icon: <IoSettingsSharp /> },
  ];
  const [activeSection, setActiveSection] = useState<Section>("dashboard");

  useEffect(() => {
    LoadSavedRoadmaps();
  }, []);

  const handleSection = (section: Section) => {
    setActiveSection(section);

    if (section === "dashboard") {
      dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    if (section === "roadmaps" || section === "settings") {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = async (id: string) => {
    try {
      navigate(`/roadmap/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      DeleteSavedRoadmap(id);
      toast.success("Roadmap removed");
    } catch (err) {
      console.log(err);
    }
  };

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
            {sideBarItems.map((s) => (
              <button
                className={`rounded-lg flex px-3 py-2 gap-2 items-center transition-colors ${
                  activeSection === s.title
                    ? "bg-buttonPrimary/20"
                    : "hover:bg-white/10"
                }`}
                onClick={() => handleSection(s.title)}
              >
                <span className="text-buttonPrimary">{s.icon}</span>
                <p className="text-white font-medium leading-normal text-sm">
                  {s.title}
                </p>
              </button>
            ))}
          </nav>
        </div>
      </aside>
      <main ref={dashboardRef} className="flex-1 p-4 sm:p-6 md:p-8 ">
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
          <section ref={sectionRef} className="space-y-4">
            <h2 className="text-[22px] text-white font-bold tracking-[-0.015rem] leading-tight px-2">
              Your Saved Roadmaps
            </h2>
            {savedRoadmaps && savedRoadmaps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedRoadmaps.map((roadmap) => (
                  <div
                    key={roadmap.roadmap_id}
                    className="relative rounded-lg flex flex-col p-4 gap-4 items-start sm:flex-row sm:items-center border border-[#395646] bg-[#151d19] hover:border-primary/50 transition-colors"
                  >
                    <button
                      onClick={() => handleDelete(roadmap.roadmap_id)}
                      className="absolute top-3 right-3 text-white/60 hover:text-red-400"
                    >
                      <IoClose size={18} />
                    </button>
                    <div className="bg-RoadmapImage bg-cover h-24 sm:w-24 w-full bg-center rounded-lg shrink-0"></div>
                    <div className="flex-grow space-y-2">
                      <h3 className="text-white font-semibold text-lg">
                        {roadmap.career_name}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
                        {roadmap.savedAt}
                      </p>
                      <button
                        onClick={() => handleClick(roadmap.roadmap_id)}
                        className="mt-2 w-full text-sm sm:w-auto rounded-xl text-[#0e1512] bg-buttonPrimary font-bold tracking-tight text-center px-4 py-2 hover:bg-opacity-80 transition-colors"
                      >
                        View Roadmap
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-lg text-center font-normal w-full">
                No Saved Roadmaps
              </p>
            )}
          </section>
          <section ref={sectionRef} className="space-y-4">
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
            <button
              onClick={() => navigate("/career")}
              className="font-bold bg-buttonPrimary text-[#0e1512] py-3 px-8 rounded-lg hover:bg-opacity-80 transition-colors text-base"
            >
              Explore Careers
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
