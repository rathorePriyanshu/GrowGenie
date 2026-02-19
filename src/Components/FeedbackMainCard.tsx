import { FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { CareerInfo } from "../servies/types";
import { useRoadmapStore } from "../store/roadmap";

interface FeedbackMainCardProps {
  Stream: string;
  Feedback: string;
  Skills: string[];
  CareerInfo: CareerInfo;
}

const FeedbackMainCard = ({
  Stream,
  Feedback,
  Skills,
  CareerInfo,
}: FeedbackMainCardProps) => {
  const navigate = useNavigate();
  const { LoadRoadmap } = useRoadmapStore();

  const handleClick = async () => {
    try {
      const roadmap = await LoadRoadmap(
        CareerInfo.career_id,
        CareerInfo.career_name,
        CareerInfo.career_source,
      );
      navigate(`/roadmap/${roadmap._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-secondary rounded-xl shadow-lg overflow-hidden @container">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnFbVGu-u4vFpImRQ8Q9zIDZgxavnVQ4UUbJgvNCrsZvgyERJW0sbuc9cguq3G6EBCLkTUQclvMlAmhMZnbe13f64vsb8ErWlgA4_4ypRR7EwudqsKZPbAcAMr4VqrO2Yaw7GYDWI8Mo9Db2OqjUywyKEHPplXGiNPcaxdZGQ_ltZx0-POSkY1uAcI7Ce9HBuj-WIco_sf7cyLZstfjNlstnqkRTIKjD-KeuTMeCBdY-nB-Wj3zsTEJ4lFmo0Bv4IfBPlmFlknf7SA"
            alt="Software Enginner working on a laptop"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:w-1/2">
          <span className="inline-flex items-center gap-2 text-green-300 text-sm font-semibold mb-2">
            <FaRegStar />
            Top Recommendations
          </span>
          <h2 className="text-gray-100 text-2xl mt-1 font-bold leading-tight tracking-[-0.015em]">
            {CareerInfo.career_name}
          </h2>
          <p className="text-gray-500 text-base font-normal leading-relaxed mt-3 mb-6">
            {Feedback}
            {Stream}
            {Skills}
          </p>
          <button
            onClick={handleClick}
            className="flex min-w-[84px] w-fit cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-6 bg-buttonPrimary text-white text-base font-medium leading-normal shadow-sm hover:bg-buttonSecondary transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            View Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackMainCard;
