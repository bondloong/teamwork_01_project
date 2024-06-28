import { ILeaderboardItem } from '../types';
export const getLeaderboardData = (state: IStateSchema): ILeaderboardItem[] => {
  return state.leaderboard.leaderboardData;
};
