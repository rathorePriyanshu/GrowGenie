import { useRef } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";
import { MdOutlineTravelExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCareerStore } from "../store/careers";

const StreamSelection = () => {
  const navigate = useNavigate();
  const Sectionref = useRef<HTMLElement | null>(null);
  const { selectedStream, setStream } = useCareerStore();

  const handleScroll = () => {
    if (Sectionref.current) {
      Sectionref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const streamDescriptions: Record<string, string> = {
    Science: "Explore careers in engineering, medicine, research, and more.",
    Commerce:
      "Explore careers in business, finance, accounting, and management.",
    Arts: "Explore careers in design, literature, social sciences, and creative fields.",
  };

  return (
    <main className="flex-grow">
      <section className="relative min-h-[50vh] bg-heroPattern flex items-center justify-center bg-cover bg-center py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(17,23,20,0.6)] to-[rgba(17,23,20,1)]"></div>
        <div className="relative container flex flex-col mx-auto gap-6 px-4  max-w-4xl text-center items-center">
          <h1 className="font-bold leading-tight tracking-tight text-4xl md:text-6xl text-white">
            Forge Your Future: Class 10
          </h1>
          <p className="text-lg max-w-2xl text-gray-400 ">
            You've reached a pivotal point. Let's explore the academic streams
            that align with your passions and ambitions.
          </p>
          <button
            onClick={handleScroll}
            className="flex font-medium mt-2 items-center gap-2 justify-center text-lg rounded-full px-8 py-4 text-black-600 bg-buttonPrimary"
          >
            Get Started
            <FaArrowDownLong />
          </button>
        </div>
      </section>
      <section ref={Sectionref} className="py-20">
        <div className="container flex flex-col max-w-4xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="font-bold tracking-tight text-3xl text-white md:text-4xl ">
              Select Your Stream
            </h1>
            <p className="mt-2 text-gray-400">
              Choose a stream to see where it can lead you
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {["Science", "Commerce", "Arts"].map((option) => (
              <label
                key={option}
                className="group flex flex-col border-2 rounded-2xl cursor-pointer p-6 border-[#29382f] bg-[#1a221e] hover:border-buttonPrimary hover:bg-[#1f2a24] space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xl text-white">{option}</h3>
                  <input
                    onChange={() =>
                      setStream(option as "Science" | "Commerce" | "Arts")
                    }
                    checked={selectedStream === option}
                    className="radio-custom"
                    name="stream"
                    type="radio"
                  />
                </div>
                <p className="text-gray-200 w-4/5 text-sm mt-2">
                  {streamDescriptions[option]}
                </p>
              </label>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 mt-12 sm:flex-row">
            <button
              data-tour="stream-selection"
              onClick={() => {
                navigate("/career");
              }}
              className="flex font-medium items-center gap-2 justify-center text-lg rounded-full px-8 py-4 text-white bg-[#29382f] hover:scale-105 hover:bg-buttonPrimary hover:text-black"
            >
              <MdOutlineTravelExplore />
              Browse Careers
            </button>
            <button
              data-tour="quiz-btn"
              onClick={() => navigate("/quiz")}
              className="flex font-medium items-center gap-2 justify-center text-lg rounded-full px-8 sm:px-16 py-4 text-white bg-[#29382f] hover:scale-105 hover:bg-buttonPrimary hover:text-black"
            >
              <MdOutlineQuiz />
              Take Quiz
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StreamSelection;
