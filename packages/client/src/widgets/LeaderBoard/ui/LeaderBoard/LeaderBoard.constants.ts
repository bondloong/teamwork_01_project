import { TableColumnsType } from 'antd';
import { TLeaderBoardItem } from './LeaderBoard.interfaces';

export const tableColumns: TableColumnsType<TLeaderBoardItem> = [
  {
    title: 'Position',
    key: 'position',
    dataIndex: 'position',
    width: '150px',
  },
  {
    title: 'User',
    key: 'user',
    dataIndex: 'login',
    width: '150px',
  },
  {
    title: 'Scores',
    key: 'scores',
    dataIndex: 'scores',
  },
];
