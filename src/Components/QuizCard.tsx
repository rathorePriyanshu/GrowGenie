import { HiArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quiz";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const QuizCard = ({ classLevel }: { classLevel: "10" | "12" }) => {
  const { quizess, loading, loadQuizes, selectAnswer, submit } = useQuizStore();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("quizess:", quizess);

  useEffect(() => {
    loadQuizes(classLevel);
  }, [classLevel]);

  if (loading) {
    return <Loading />;
  }

  if (!quizess.length) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-white text-2xl">
        No quizzes found.
      </div>
    );
  }

  const quiz = quizess[currentIndex];

  const handleNext = async () => {
    if (currentIndex < quizess.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await submit();
      navigate("/feedback");
    }
  };

  const handleSelected = (optionId: string) => {
    selectAnswer(quiz.id, optionId);
  };

  return (
    <div key={quiz.id} className="bg-[#1a221d] p-8 shadow-xl rounded-lg">
      <div className="flex flex-col items-center ">
        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight text-center">
          {quiz.question}
        </h2>
        <div className="space-y-4 w-full max-w-xl">
          {quiz.options.map((opt) => (
            <label
              key={opt.id}
              className="group flex items-center gap-4 border-2 rounded-2xl cursor-pointer p-4 border-[#29382f] bg-[#29382f] hover:bg-[#3d5245]"
            >
              <input
                className="radio-custom"
                name={`stream-${quiz.id}`}
                value={opt.id}
                type="radio"
                onChange={() => handleSelected(opt.id)}
              />
              <span className="text-gray-200 font-medium">{opt.text}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          className="flex items-center tracking-wide gap-2 font-medium text-lg rounded-full px-4 py-2 bg-buttonPrimary transition-colors hover:scale-105 hover:bg-[#45ff8f]"
        >
          {currentIndex === quizess.length - 1 ? "Submit" : "Next"}
          <HiArrowLongRight />
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
