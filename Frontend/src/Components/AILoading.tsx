import { useEffect, useState } from "react";

interface Props {
  messages: string[];
}

const AILoading = ({ messages }: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col justify-center items-center h-[60vh] gap-3">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      <p className="font-medium text-2xl text-gray-600">{messages[index]}</p>
    </div>
  );
};

export default AILoading;
