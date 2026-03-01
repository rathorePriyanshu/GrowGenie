import axios from "axios";

const TOUR_ROADMAP_ID = "6990dbc7d441d87193d137b0";

export const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return err?.response?.data.message || "Something went wrong";
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "Something went wrong";
};

export function generateJourneySteps(isAuthenticated: boolean) {
  return [
    {
      route: "/stream",
      target: '[data-tour="stream-selection"]',
      content: "Choose your stream and explore career paths.",
      disableBeacon: true,
    },
    {
      route: "/stream",
      target: '[data-tour="quiz-btn"]',
      content: isAuthenticated
        ? "Take the quiz to get AI-powered career suggestions."
        : "Login to take the quiz and unlock personalized suggestions.",
      disableBeacon: true,
    },
    {
      route: "/career",
      target: '[data-tour="career-card"]',
      content: "Explore different career options here.",
      disableBeacon: true,
    },
    {
      route: isAuthenticated ? `/roadmap/${TOUR_ROADMAP_ID}` : "/career",
      target: isAuthenticated
        ? '[data-tour="roadmap-section"]'
        : '[data-tour="login-cta"]',
      content: isAuthenticated
        ? "Each career includes a detailed roadmap. You can also save it to your profile."
        : "Login to unlock detailed career roadmaps and track your progress.",
      disableBeacon: true,
    },
  ];
}
