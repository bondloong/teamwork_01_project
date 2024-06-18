import { TLeaderboardResponseItem } from './LeaderBoard.interfaces';
import { TLeaderBoardItem } from './LeaderBoard.interfaces';

export const mapLeaderboardItem = (
  item: TLeaderboardResponseItem,
  index: number
): TLeaderBoardItem => ({
  position: index + 1,
  key: index + 1,
  user: item.data.user || `User ${index + 1}`,
  rating: item.data.rating,
  id: index + 1,
  userId: index + 1,
});
