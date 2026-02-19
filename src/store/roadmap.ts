import { create } from "zustand";
import type { Roadmap, savedRoadmaps } from "../servies/types";
import {
  deleteRoadmap,
  getProfileRoadmap,
  getRoadmap,
  getSavedRoadmaps,
} from "../servies/api";

interface RoadmapState {
  roadmap: Roadmap | null;
  loading: boolean;
  savedRoadmaps: savedRoadmaps[];

  LoadRoadmap: (
    career_id: string,
    career_name: string,
    career_source: string,
  ) => Promise<Roadmap>;
  LoadSavedRoadmaps: () => Promise<void>;
  LoadProfileRoadmap: (roadmap_Id: string) => Promise<Roadmap>;
  DeleteSavedRoadmap: (roadmap_Id: string) => Promise<void>;
}

export const useRoadmapStore = create<RoadmapState>((set) => ({
  roadmap: null,
  loading: false,
  savedRoadmaps: [],

  LoadRoadmap: async (career_id, career_name, career_source) => {
    try {
      set({ loading: true });
      const roadmap = await getRoadmap(career_id, career_name, career_source);
      set({ roadmap: roadmap });
      return roadmap;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  LoadSavedRoadmaps: async () => {
    try {
      set({ loading: true });
      const roadmaps = await getSavedRoadmaps();
      set({ savedRoadmaps: roadmaps });
      return roadmaps;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  LoadProfileRoadmap: async (roadmap_id) => {
    try {
      set({ loading: true });
      const roadmap = await getProfileRoadmap(roadmap_id);
      set({ roadmap: roadmap });
      return roadmap;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  DeleteSavedRoadmap: async (roadmap_Id) => {
    try {
      const res = await deleteRoadmap(roadmap_Id);
      set((state) => ({
        savedRoadmaps: state.savedRoadmaps.filter(
          (roadmap) => roadmap.roadmap_id !== roadmap_Id,
        ),
      }));
      return res;
    } catch (err) {
      console.error(err);
    }
  },
}));
