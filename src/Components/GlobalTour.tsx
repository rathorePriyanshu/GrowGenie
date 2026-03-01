import { useState } from "react";
import Joyride, { STATUS, type CallBackProps } from "react-joyride";
import { useLocation, useNavigate } from "react-router-dom";
import { generateJourneySteps } from "../servies/methods";
import { TourContext } from "./TourContext";

interface Props {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const GlobalTour = ({ isAuthenticated, children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = generateJourneySteps(isAuthenticated);

  const startTour = () => {
    navigate("/stream");

    setTimeout(() => {
      setStepIndex(0);
      setRun(true);
    }, 300);
  };

  const waitForElement = (selector: string, callback: () => void) => {
    const interval = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(interval);
        callback();
      }
    }, 50);
  };

  const handleCallback = (data: CallBackProps) => {
    const { status, index, type, action } = data;

    if (
      status === STATUS.FINISHED ||
      status === STATUS.SKIPPED ||
      action === "close"
    ) {
      setRun(false);
      setStepIndex(0);
    }

    if (type !== "step:after" || action !== "next") return;
    const nextIndex = index + 1;

    if (nextIndex >= steps.length) {
      setRun(false);
      setStepIndex(0);
      navigate("/");
      return;
    }

    const nextStep = steps[nextIndex];

    if (nextStep.route && nextStep.route !== location.pathname) {
      navigate(nextStep.route);
      waitForElement(nextStep.target, () => {
        setStepIndex(nextIndex);
      });
    } else {
      setStepIndex(nextIndex);
    }
  };

  return (
    <TourContext.Provider value={{ startTour }}>
      {children}

      <Joyride
        steps={steps}
        run={run}
        stepIndex={stepIndex}
        callback={handleCallback}
        continuous
        showSkipButton
        showProgress
        scrollToFirstStep
        disableOverlayClose
        hideBackButton
        styles={{
          options: {
            // "#0e1512"
            backgroundColor: "#111714",
            primaryColor: "#111827",
            zIndex: 10000,
            textColor: "#38E07B",
          },
          spotlight: {
            borderRadius: "12px",
          },
          tooltip: {
            borderRadius: "16px",
          },
        }}
      />
    </TourContext.Provider>
  );
};

export default GlobalTour;
