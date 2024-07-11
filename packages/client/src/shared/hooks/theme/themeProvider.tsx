import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { themeTokens } from './themeProvider.constants';
import { ThemeName, ThemeContextType } from './theme.interfaces';

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'light',
  toggleTheme: () => {},
});

const applyThemeVariables = (theme: ThemeName): void => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
};

export const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const storedTheme = (localStorage.getItem('user-theme') as ThemeName) || 'light';
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(storedTheme);

  const toggleTheme = (): void => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    applyThemeVariables(newTheme);
    localStorage.setItem('user-theme', newTheme);
  };

  useEffect(() => {
    applyThemeVariables(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <ConfigProvider theme={themeTokens[currentTheme]}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};
