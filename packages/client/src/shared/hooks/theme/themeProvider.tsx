import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import { themeTokens, LIGHT_THEME, DARK_THEME } from './themeProvider.constants';
import { ThemeName, ThemeContextType } from './theme.interfaces';
import { fetchTheme, setTheme } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks';
import { getUserData } from '@/entities/User';
import { fetchTopicAuthor } from '@/entities/Topics/api';

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: LIGHT_THEME,
  toggleTheme: () => {},
});

const applyThemeVariables = (theme: ThemeName): void => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
};

export const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const user = useSelector(getUserData);
  const dispatch = useAppDispatch();
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(LIGHT_THEME);
  const [authorId, setAuthorId] = useState<string | null>(null);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeName;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      applyThemeVariables(savedTheme);
    }
  }, []);

  useEffect(() => {
    const fetchAuthor = async (): Promise<void> => {
      if (user && user.id) {
        try {
          const response = await dispatch(fetchTopicAuthor(user.id)).unwrap();
          setAuthorId(response.id);
        } catch (error) {
          console.error('Failed to fetch topic author:', error);
        }
      }
    };

    fetchAuthor();
  }, [user, dispatch]);

  useEffect(() => {
    const fetchAndApplyTheme = async (): Promise<void> => {
      if (authorId) {
        try {
          const theme = await dispatch(fetchTheme(authorId)).unwrap();
          setCurrentTheme(theme as ThemeName);
          applyThemeVariables(theme as ThemeName);
          localStorage.setItem('theme', theme as ThemeName);
        } catch (error) {
          console.error('Failed to fetch theme:', error);
        }
      }
    };

    fetchAndApplyTheme();
  }, [dispatch, authorId]);

  const toggleTheme = async (): Promise<void> => {
    const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    try {
      if (authorId) {
        await dispatch(setTheme({ id: authorId, theme: newTheme })).unwrap();
        setCurrentTheme(newTheme);
        applyThemeVariables(newTheme);
      }
    } catch (error) {
      console.error('Failed to set theme:', error);
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
