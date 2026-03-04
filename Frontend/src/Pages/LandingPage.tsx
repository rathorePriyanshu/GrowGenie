import { HiArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useTour } from "../Components/TourContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { startTour } = useTour();

  return (
    <div className="w-full max-w-2xl px-4 py-16">
      <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
        Choose Smarter. Discover Your Future.
      </h2>
      <p className="mx-auto mt-4 max-w-[700px] font-medium text-gray-400 md:text-xl">
        Get personalized carrer guidance based on your class
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
        <button
          onClick={() => navigate("/stream")}
          className="flex w-full max-w-xs items-center gap-2 justify-center font-medium text-lg rounded-full px-8 py-4 text-white bg-buttonSecondary hover:bg-buttonPrimary"
        >
          I am in class 10
          <HiArrowLongRight />
        </button>
        <button
          onClick={() => navigate("/seniorstream")}
          className="flex w-full max-w-xs font-medium items-center gap-2 justify-center text-lg rounded-full px-8 py-4 text-white bg-buttonSecondary hover:bg-buttonPrimary"
        >
          I am in class 12
          <HiArrowLongRight />
        </button>
      </div>
      <button
        onClick={() => {
          console.log("BUTTON CLICKED");
          startTour();
        }}
        className="mt-6 text-sm text-white/60 hover:text-white transition-colors underline"
      >
        Take a quick tour
      </button>
    </div>
  );
};

export default LandingPage;
