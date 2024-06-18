export interface ILeaderBoardItem {
  position: number;
  user: string;
  rating: number;
  key: string | number;
  id: number;
  userId: number;
}

export interface ILeaderboardData {
  ratingFieldName: 'rating';
  cursor: number;
  limit: number;
}

export interface ILeaderboardResponseItem {
  data: {
    user?: string;
    rating: number;
  };
}

export interface IScore {
  user: string;
  rating: number;
}
