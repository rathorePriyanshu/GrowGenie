import QuizCard from "../Components/QuizCard";

const QuizPage = () => {
  return (
    <main className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mb-4">
        <QuizCard classLevel="10" />
      </div>
    </main>
  );
};

export default QuizPage;
