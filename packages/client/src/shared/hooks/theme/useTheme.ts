import { useContext } from 'react';
import { ThemeContext } from './themeProvider';
interface ThemeContextType {
  currentTheme: string;
  toggleTheme: () => void;
}
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
