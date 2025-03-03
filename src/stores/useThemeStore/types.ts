export type Themes = "light" | "dark";

export interface ThemeStoreTypes {
  theme: Themes;
  toggleTheme: (newTheme?: Themes) => void;
}
