import { create } from "zustand";

export type AppTab = "overview" | "learn" | "tools" | "playground" | "resources";

interface AppState {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  tourOpen: boolean;
  setTourOpen: (open: boolean) => void;
  tourCompleted: boolean;
  setTourCompleted: (completed: boolean) => void;
  selectedTechnique: string | null;
  setSelectedTechnique: (id: string | null) => void;
}

const TOUR_COMPLETED_KEY = "llm-memory-tour-completed";

// Check if user has completed the tour
const getInitialTourState = (): { tourOpen: boolean; tourCompleted: boolean } => {
  if (typeof window === "undefined") {
    return { tourOpen: false, tourCompleted: false };
  }
  const completed = localStorage.getItem(TOUR_COMPLETED_KEY) === "true";
  return { tourOpen: !completed, tourCompleted: completed };
};

export const useAppStore = create<AppState>((set) => ({
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
  tourOpen: false,
  setTourOpen: (open) => set({ tourOpen: open }),
  tourCompleted: false,
  setTourCompleted: (completed) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOUR_COMPLETED_KEY, String(completed));
    }
    set({ tourCompleted: completed, tourOpen: false });
  },
  selectedTechnique: null,
  setSelectedTechnique: (id) => set({ selectedTechnique: id }),
}));

// Initialize tour state on client side
if (typeof window !== "undefined") {
  const { tourOpen, tourCompleted } = getInitialTourState();
  useAppStore.setState({ tourOpen, tourCompleted });
}
