import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ConfigStore = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set, get) => ({
      collapsed: true,
      toggleCollapsed: () => {
        set((state) => ({
          collapsed: !state.collapsed,
        }));
      },
    }),
    {
      name: "quotem-config-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
