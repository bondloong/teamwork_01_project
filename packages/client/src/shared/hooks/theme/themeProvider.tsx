import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import { themeTokens } from './themeProvider.constants';
import { ThemeName, ThemeContextType } from './theme.interfaces';
import { getUserData } from '@/entities/User';
import { fetchTheme, setTheme } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks';

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'light',
  toggleTheme: () => {},
});

const applyThemeVariables = (theme: ThemeName): void => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
};

export const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const user = useSelector(getUserData);

  const dispatch = useAppDispatch();
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('light');

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchTheme(user.id))
        .unwrap()
        .then((theme) => {
          setCurrentTheme(theme as ThemeName);
          applyThemeVariables(theme as ThemeName);
        })
        .catch((error) => {
          console.error('Failed to fetch theme:', error);
        });
    }
  }, [dispatch, user]);

  const toggleTheme = (): void => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    applyThemeVariables(newTheme);
    if (user && user.id) {
      console.log('🚀 ~ toggleTheme ~ user:', user);
      dispatch(setTheme({ id: user.id, theme: newTheme })).catch((error) => {
        console.error('Failed to set theme:', error);
      });
    }
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
