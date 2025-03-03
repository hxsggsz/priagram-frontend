import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Themes, ThemeStoreTypes } from "./types";

export const useThemeStore = create<ThemeStoreTypes>()(
  persist(
    (set) => ({
      theme: "light",

      toggleTheme: (newTheme?: Themes) => {
        set((state) => ({
          theme: newTheme ?? state.theme === "dark" ? "light" : "dark",
        }));
      },
    }),
    {
      name: "@theme-storage", // Nome único para identificar o storage no localStorage
      storage: createJSONStorage(() => localStorage), // Usa localStorage
    }
  )
);
