export type ThemeName = 'light' | 'dark';

export interface ThemeContextType {
  currentTheme: ThemeName;
  toggleTheme: () => void;
}
