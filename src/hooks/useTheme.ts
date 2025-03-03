import { useThemeStore } from "@/stores/useThemeStore";
import { useEffect } from "react";

export function useTheme() {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
}
