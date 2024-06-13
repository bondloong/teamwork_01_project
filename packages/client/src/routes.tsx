import { MainPage } from '@/pages/MainPage';
import { EAppRoutes } from './shared/types';
import { AuthPage } from './pages/AuthPage';
import { GamePage } from './pages/GamePage';
import { ProfilePage } from './pages/ProfilePage';
import { ProtectedRoute } from './widgets/ProtectedRoute';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ForumPage } from './pages/ForumPage';
import { TopicPage } from './pages/TopicPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  { path: EAppRoutes.Main, element: <MainPage /> },
  { path: EAppRoutes.Auth, element: <AuthPage /> },
  { path: EAppRoutes.Game, element: <GamePage /> },
  { path: EAppRoutes.Profile, element: <ProfilePage /> },
  {
    path: EAppRoutes.LeaderBoard,
    element: (
      <ProtectedRoute>
        <LeaderboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: EAppRoutes.Forum,
    element: (
      <ProtectedRoute>
        <ForumPage />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <ForumPage />
          </ProtectedRoute>
        ),
      },
      { path: EAppRoutes.TopicId, element: <TopicPage /> },
    ],
  },
  { path: EAppRoutes.All, element: <NotFoundPage /> },
];
