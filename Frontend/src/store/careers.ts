import { create } from "zustand";
import type { CareerData } from "../servies/types";
import { getCareers } from "../servies/api";

interface CareerState {
  careers: CareerData[];
  loading: boolean;
  selectedStream?: "Science" | "Commerce" | "Arts";

  setStream: (stream?: "Science" | "Commerce" | "Arts") => void;
  loadCareer: () => Promise<void>; // no need to pass stream
}

export const useCareerStore = create<CareerState>((set, get) => ({
  careers: [],
  loading: false,
  selectedStream: undefined,

  setStream: (stream) => set({ selectedStream: stream }),

  loadCareer: async () => {
    set({ loading: true });
    try {
      const { selectedStream } = get(); // 👈 grab current stream from store
      const data = await getCareers(selectedStream || null);
      set({ careers: data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
