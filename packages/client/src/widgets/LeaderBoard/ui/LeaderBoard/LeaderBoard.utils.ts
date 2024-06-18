import { ILeaderBoardItem, ILeaderboardResponseItem } from './LeaderBoard.interfaces';

export const mapLeaderboardItem = (
  item: ILeaderboardResponseItem,
  index: number
): ILeaderBoardItem => ({
  position: index + 1,
  key: index + 1,
  user: item.data.user || `User ${index + 1}`,
  rating: item.data.rating,
  id: index + 1,
  userId: index + 1,
});
