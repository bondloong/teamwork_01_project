import { AuthPage } from '@/pages/AuthPage';
import { ForumPage } from '@/pages/ForumPage';
import { GamePage } from '@/pages/GamePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { TopicPage } from '@/pages/TopicPage';
import { MainPage } from '@/pages/MainPage';
import { ReactElement, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../../styles/_app.scss';
import { ProtectedRoute } from '@/widgets/ProtectedRoute';
import { useServiceWorker } from '../../model';
import { EAppRoutes } from '@/shared/types';
import { StoreProvider } from '../StoreProvider';
import { Auth } from '../Auth';

export const Application = (): ReactElement => {
  useServiceWorker();

  // @TODO Это пример работы с env-переменными для общения с сервером
  // Удалить после того, как будет реализовано апи форума и темизации
  // docker-compose установит связь между контейнерами. Контейнеры смогут общаться между собой по имени контейнера. Поэтому используем SERVER_HOST, который также является именем контейнера для контейнера с апи-сервером
  useEffect(() => {
    const host = import.meta.env.SERVER_HOST || 'localhost';
    const port = import.meta.env.SERVER_PORT || '3001';

    fetch(`http://${host}:${port}/api`)
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <StoreProvider>
      <Auth>
        <BrowserRouter>
          <Routes>
            <Route path={EAppRoutes.Main} element={<MainPage />} />

            <Route path={EAppRoutes.Auth} element={<AuthPage />} />

            <Route path={EAppRoutes.Game} element={<GamePage />} />

            <Route path={EAppRoutes.Profile} element={<ProfilePage />} />

            <Route
              path={EAppRoutes.LeaderBoard}
              element={
                <ProtectedRoute>
                  <LeaderboardPage />
                </ProtectedRoute>
              }
            />

            <Route path={EAppRoutes.Forum}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ForumPage />
                  </ProtectedRoute>
                }
              />

              <Route path=":topicId" element={<TopicPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Auth>
    </StoreProvider>
  );
};
