import { AuthPage } from '@/pages/AuthPage';
import { ForumPage } from '@/pages/ForumPage';
import { GamePage } from '@/pages/GamePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { TopicPage } from '@/pages/TopicPage';
import { MainPage } from '@/pages/MainPage';
import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../../styles/_app.scss';
import { AuthProvider } from '@/shared/contexts';
import { fetchUserInfo } from '@/entities/User';
import { ProtectedRoute } from '@/widgets/ProtectedRoute';
import { useServiceWorker } from '../../model';
import { EAppRoutes } from '@/shared/types';

export const Application = (): ReactElement => {
  useServiceWorker();

  return (
    <AuthProvider getUserInfo={fetchUserInfo}>
      <BrowserRouter>
        <Routes>
          <Route path={EAppRoutes.Main} element={<MainPage />} />

          <Route path={EAppRoutes.Auth} element={<AuthPage />} />

          <Route path={EAppRoutes.Game} element={<GamePage />} />

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
    </AuthProvider>
  );
};
