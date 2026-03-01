import FeedbackCards from "../Components/FeedbackCards";
import FeedbackMainCard from "../Components/FeedbackMainCard";
import Loading from "../Components/Loading";
import { useQuizStore } from "../store/quiz";
import { useRoadmapStore } from "../store/roadmap";

const Feedback = () => {
  const { loading, result } = useQuizStore();
  const roadmapLoading = useRoadmapStore((s) => s.loading);
  console.log("result", result);

  if (roadmapLoading) {
    return (
      <div className="flex-1">
        <Loading />
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (!result) {
    return (
      <div className="flex flex-1 justify-center items-center h-[60vh] text-white text-2xl">
        No result found
      </div>
    );
  }

  const [mainCareer, ...otherCareer] = result.careerInfo;

  return (
    <main className="px-5 flex flex-1 justify-center py-12">
      <div className="flex flex-col max-w-4xl flex-1 gap-8">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold tracking-tight leading-tight">
            Your Career Suggestions
          </h1>
          <p className="text-lg font-medium text-gray-400 mt-2">
            Based on your assessment results, here are some career paths you
            might excel in.
          </p>
        </div>
        <FeedbackMainCard
          Stream={result.recommendedStream}
          Feedback={result.aiFeedback}
          Skills={result.topskills}
          CareerInfo={mainCareer}
        />
        <div className="space-y-6">
          <h1 className="text-gray-300 text-2xl font-bold leading-tight tracking-[-0.015em] px-4">
            Other Suggested Careers
          </h1>
          <FeedbackCards CareerInfo={otherCareer} />
        </div>
      </div>
    </main>
  );
};

export default Feedback;
