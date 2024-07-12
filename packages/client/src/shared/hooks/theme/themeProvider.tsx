import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import { themeTokens } from './themeProvider.constants';
import { ThemeName, ThemeContextType } from './theme.interfaces';
import { fetchTheme, setTheme } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks';
import { getUserData } from '@/entities/User';
import { fetchTopicAuthor } from '@/entities/Topics/api';

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
  const [authorId, setAuthorId] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchTopicAuthor(user.id))
        .unwrap()
        .then((result) => {
          setAuthorId(result.id);
        })
        .catch((error) => {
          console.error('Failed to fetch topic author:', error);
        });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (authorId) {
      dispatch(fetchTheme(authorId))
        .unwrap()
        .then((theme) => {
          setCurrentTheme(theme as ThemeName);
          applyThemeVariables(theme as ThemeName);
        })
        .catch((error) => {
          console.error('Failed to fetch theme:', error);
        });
    }
  }, [dispatch, authorId]);

  const toggleTheme = async (): Promise<void> => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
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
