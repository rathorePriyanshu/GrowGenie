import React from "react";
import { MdOutlineQuiz, MdOutlineTravelExplore } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCareerStore } from "../store/careers";

const SeniorStreanSelection = () => {
  const navigate = useNavigate();
  const { selectedStream, setStream } = useCareerStore();

  const streamDescriptions: Record<string, string> = {
    Science: "Explore careers in engineering, medicine, research, and more.",
    Commerce:
      "Explore careers in business, finance, accounting, and management.",
    Arts: "Explore careers in design, literature, social sciences, and creative fields.",
  };

  const streamIcons: Record<string, React.ReactNode> = {
    Science: <GiMaterialsScience color="white" size={25} />,
    Commerce: <MdAccountBalance color="white" size={25} />,
    Arts: <IoIosColorPalette color="white" size={25} />,
  };

  return (
    <main className="flex-grow">
      <section className="relative min-h-[50vh] bg-heroPattern2 flex items-center justify-center bg-cover bg-center py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(17,23,20,0.6)] to-[rgba(17,23,20,1)]"></div>
        <div className="relative container flex flex-col mx-auto gap-6 px-4  max-w-4xl text-center items-center">
          <h1 className="font-bold leading-tight tracking-tight text-4xl md:text-6xl text-white">
            Step Into Your Career Journey
          </h1>
          <p className="text-lg max-w-2xl text-gray-400 ">
            The final stretch is here. Discover the paths and opportunities that
            will define your career and passions
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="container flex flex-col max-w-4xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="font-bold tracking-tight text-3xl text-white md:text-4xl ">
              Select Your Academic Track
            </h1>
            <p className="mt-2 text-gray-400">
              Explore the options that will shape your future
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {["Science", "Commerce", "Arts"].map((option) => (
              <label
                key={option}
                className="group flex flex-col items-center border-2 rounded-2xl cursor-pointer p-6 border-[#29382f] bg-[#1a221e] hover:border-buttonPrimary hover:bg-[#1f2a24] space-y-2"
              >
                <input
                  onChange={() =>
                    setStream(option as "Science" | "Commerce" | "Arts")
                  }
                  checked={selectedStream === option}
                  className="peer hidden"
                  name="stream"
                  type="radio"
                />
                <div className="flex size-12 items-center justify-center rounded-full border-2 border-[#3d5245] bg-[#111714] transition-all group-hover:border-[#38e07b] group-hover:text-[#111714] peer-checked:border-[#38e07b] peer-checked:bg-[#38e07b] peer-checked:text-[#111714]">
                  {streamIcons[option]}
                </div>
                <div className="flex flex-col justify-between items-center text-center">
                  <h3 className="font-bold text-xl text-white">{option}</h3>
                  <p className="text-gray-200 mx-auto text-sm mt-2">
                    {streamDescriptions[option]}
                  </p>
                </div>
              </label>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 mt-12 sm:flex-row">
            <button
              onClick={() => navigate("/quiz")}
              className="flex font-medium items-center gap-2 justify-center text-lg rounded-full px-8 sm:px-16 py-4 text-white bg-[#29382f] hover:scale-105 hover:bg-buttonPrimary hover:text-black"
            >
              <MdOutlineQuiz />
              Take Quiz
            </button>
            <button
              onClick={() => navigate("/career")}
              className="flex font-medium items-center gap-2 justify-center text-lg rounded-full px-8 py-4 text-white bg-[#29382f] hover:scale-105 hover:bg-buttonPrimary hover:text-black"
            >
              <MdOutlineTravelExplore />
              Browse Careers
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SeniorStreanSelection;
