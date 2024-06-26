export interface ILeaderboardItem {
  position: number;
  key: string | number;
  user: string;
  rating: number;
}

export interface ILeaderboardState {
  leaderboardData: ILeaderboardItem[];
  isLoading: boolean;
  error: string | null;
}

export interface ILeaderboardData {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}
export interface IItem {
  data: {
    user?: string;
    rating: number;
  };
}
