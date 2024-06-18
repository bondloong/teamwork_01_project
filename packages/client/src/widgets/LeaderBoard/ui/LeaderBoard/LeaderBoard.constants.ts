import { TableColumnsType } from 'antd';
import { TLeaderBoardItem, TLeaderboardData } from './LeaderBoard.interfaces';

export const tableColumns: TableColumnsType<TLeaderBoardItem> = [
  {
    title: 'Position',
    key: 'position',
    dataIndex: 'index',
    render: (text, record, index) => index + 1,
    width: '150px',
  },
  {
    title: 'User',
    key: 'user',
    dataIndex: 'user',
    width: '150px',
  },
  {
    title: 'Scores',
    key: 'scores',
    dataIndex: 'rating',
  },
];
export const teamName = 'teamone';
export const formData: TLeaderboardData = {
  ratingFieldName: 'rating',
  cursor: 0,
  limit: 50,
};
