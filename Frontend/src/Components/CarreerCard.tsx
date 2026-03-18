import { HiArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import type { CareerData } from "../servies/types";
import { useRoadmapStore } from "../store/roadmap";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth";

interface CarreerCardProps {
  career: CareerData;
}

const CarreerCard = ({ career }: CarreerCardProps) => {
  const navigate = useNavigate();
  const { LoadRoadmap } = useRoadmapStore();
  const { isAuthenticated } = useAuthStore();

  const handleClick = async () => {
    try {
      if (!isAuthenticated) {
        navigate("/auth/login");
        return;
      }

      const roadmap = await LoadRoadmap(
        career.career_id,
        career.title,
        career.source,
      );
      navigate(`/roadmap/${roadmap._id}`);
    } catch (err) {
      console.error(err);
      toast.error("failed to load roadmap", {
        toastId: "roadmap-error",
      });
    }
  };

  return (
    <>
      <div
        data-tour="career-section"
        className="flex min-w-32 flex-col overflow-hidden rounded-lg shadow-lg shadow-black/20 transition-shadow duration-300 bg-gray-900 border border-[#29382f]"
      >
        <img
          src={`${career.img}`}
          alt={career.title}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-bold leading-tight mb-2 text-white">
            {career.title}
          </h3>
          <p className="text-gray-300 text-sm font-normal leading-normal mb-4 flex-grow">
            {career.description}
          </p>
          <button
            data-tour="login-cta"
            onClick={handleClick}
            className="flex w-full mt-2 max-w-xs items-center gap-2 justify-center font-medium text-lg rounded-md px-6 py-2 text-white bg-buttonPrimary hover:bg-gray-600"
          >
            View Roadmap
            <HiArrowLongRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default CarreerCard;
