import { useEffect } from "react";
import CarreerCard from "../Components/CarreerCard";
import { useCareerStore } from "../store/careers";
import Loading from "../Components/Loading";
import { useRoadmapStore } from "../store/roadmap";
import AILoading from "../Components/AILoading";
import { useTour } from "../Components/TourContext";
import { roadmapMessages, staticCareer } from "../servies/data";

const CarreerPage = () => {
  const { careers, loadCareer, loading, selectedStream } = useCareerStore();

  const { isTourActive } = useTour();
  const RoadMaploading = useRoadmapStore((s) => s.loading);

  const dataToRender = isTourActive ? staticCareer : careers;

  useEffect(() => {
    if (isTourActive) return;

    loadCareer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStream, isTourActive]);

  if (RoadMaploading) return <AILoading messages={roadmapMessages} />;

  return (
    <div className="relative flex-1">
      {loading && !isTourActive && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Loading />
        </div>
      )}
      <main className="px-5 flex flex-1 justify-center py-10">
        <div className="flex flex-col max-w-5xl flex-1">
          <div className="flex flex-col gap-4 mb-12 text-center">
            <h1 className="text-5xl font-bold text-white leading-tight tracking-tighter">
              {selectedStream ? `${selectedStream} Careers` : "All Careers"}
            </h1>
            <p className="text-gray-500 text-lg font-normal leading-normal max-w-2xl mx-auto">
              Explore a wide range of career paths tailored for Class 12
              students. Find your passion and plan your future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataToRender.length > 0 ? (
              dataToRender.map((career) => (
                <CarreerCard key={career.career_id} career={career} />
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full mt-4">
                No Careers
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarreerPage;
