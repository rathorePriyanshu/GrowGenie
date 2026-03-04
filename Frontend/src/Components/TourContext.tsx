import { createContext, useContext } from "react";

export interface TourContextType {
  startTour: () => void;
}

export const TourContext = createContext<TourContextType | null>(null);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used inside TourProvider");
  }
  return context;
};
