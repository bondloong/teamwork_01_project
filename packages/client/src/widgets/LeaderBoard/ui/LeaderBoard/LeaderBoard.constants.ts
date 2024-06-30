import { TableColumnsType } from 'antd';
import { ILeaderBoardItem, ILeaderboardData } from './LeaderBoard.interfaces';

export const tableColumns: TableColumnsType<ILeaderBoardItem> = [
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
export const formData: ILeaderboardData = {
  ratingFieldName: 'rating',
  cursor: 0,
  limit: 50,
};
