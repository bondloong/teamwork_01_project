export type TLeaderBoardItem = {
  position: number;
  key: string | number;
  user: string;
  rating: number;
  id: number;
  userId: number;
};

export type TLeaderboardData = {
  ratingFieldName: 'rating';
  cursor: number;
  limit: number;
};
export type LeaderboardResponseItem = {
  data: {
    user?: string;
    rating: number;
  };
};
