import { AuthPage } from '@/pages/AuthPage';
import { ForumPage } from '@/pages/ForumPage';
import { GamePage } from '@/pages/GamePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { TopicPage } from '@/pages/TopicPage';
import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const Application = (): ReactElement => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/forum">
        <Route index element={<ForumPage />} />
        <Route path=":topicId" element={<TopicPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);