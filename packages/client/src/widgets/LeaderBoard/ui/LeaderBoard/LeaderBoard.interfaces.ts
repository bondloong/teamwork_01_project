export type TLeaderBoardItem = {
  position: number;
  user: string;
  rating: number;
};

export type TLeaderboardData = {
  ratingFieldName: 'rating';
  cursor: number;
  limit: number;
};
export type TLeaderboardResponseItem = {
  data: {
    user?: string;
    rating: number;
  };
};

export type TScore = {
  user: string;
  rating: number;
};
