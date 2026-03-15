import { create } from "zustand";
import type { CareerData } from "../servies/types";
import { getCareers } from "../servies/api";

interface CareerState {
  careers: CareerData[];
  loading: boolean;
  selectedStream: "Science" | "Commerce" | "Arts" | null;

  setStream: (stream?: "Science" | "Commerce" | "Arts" | null) => void;
  loadCareer: () => Promise<void>;
}

export const useCareerStore = create<CareerState>((set, get) => ({
  careers: [],
  loading: false,
  selectedStream: null,

  setStream: (stream) => set({ selectedStream: stream || null }),

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
