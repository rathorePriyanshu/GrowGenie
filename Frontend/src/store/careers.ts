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
    const { careers, selectedStream } = get();

    // 🚨 DO NOT reload if already present
    if (careers.length > 0) return;

    set({ loading: true });

    try {
      const data = await getCareers(selectedStream || null);
      set({ careers: data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
