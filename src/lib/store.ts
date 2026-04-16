import { create } from "zustand";

export type AppTab = "overview" | "learn" | "tools" | "playground" | "resources";

interface AppState {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  tourOpen: boolean;
  setTourOpen: (open: boolean) => void;
  selectedTechnique: string | null;
  setSelectedTechnique: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
  tourOpen: false,
  setTourOpen: (open) => set({ tourOpen: open }),
  selectedTechnique: null,
  setSelectedTechnique: (id) => set({ selectedTechnique: id }),
}));
