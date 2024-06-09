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
import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom';

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

export const generateRoutes = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const { path, element, children, index: isIndex } = route;

          if (children) {
            return (
              <Route key={index} path={path} element={element}>
                {children.map((childRoute, childIndex) => {
                  const {
                    path: childPath,
                    element: childElement,
                    index: childIsIndex,
                  } = childRoute;
                  return (
                    <Route
                      key={`${index}-${childIndex}`}
                      path={childPath}
                      index={childIsIndex}
                      element={childElement}
                    />
                  );
                })}
              </Route>
            );
          }

          return <Route key={index} path={path} index={isIndex} element={element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};
