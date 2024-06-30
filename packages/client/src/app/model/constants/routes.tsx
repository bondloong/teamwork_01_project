import { AuthPage } from '@/pages/AuthPage';
import { ForumPage } from '@/pages/ForumPage';
import { GamePage } from '@/pages/GamePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { TopicPage } from '@/pages/TopicPage';
import { EAppRoutes } from '@/shared/types';
import { ProtectedRoute } from '@/widgets/ProtectedRoute';
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
    ],
  },
  {
    path: EAppRoutes.TopicId,
    element: (
      <ProtectedRoute>
        <TopicPage />
      </ProtectedRoute>
    ),
  },
  { path: EAppRoutes.All, element: <NotFoundPage /> },
];
