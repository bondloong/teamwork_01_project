import { Table } from 'antd';
import { ReactElement, useState, useEffect } from 'react';
import { tableColumns } from './LeaderBoard.constants';
import { dataSourceMock } from './mocks';
import { TLeaderBoardItem } from './LeaderBoard.interfaces';
import { fetchLeaderboardByTeam } from '@/entities/leaderboard';
type IFormData = {
  ratingFieldName: 'rating';
  cursor: 0;
  limit: 50;
};
type LeaderboardResponse = {
  ratingFieldName: 'rating';
  cursor: number;
  limit: number;
};

// TODO: MOVE ALL THE TYPES INTO A SINGLE FILE
export const LeaderBoard = (): ReactElement => {
  const [data, setData] = useState<LeaderboardResponse[]>([]);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const teamName = 'teamone';
      const formData = {
        ratingFieldName: 'rating',
        cursor: 0,
        limit: 50,
      };
      const result = await fetchLeaderboardByTeam(teamName, formData as IFormData);
      console.log(result, setData);
      // setData(result);
    };
    console.log(data);

    fetchData();
  }, []);
  const dataWithRanks = dataSourceMock.map<TLeaderBoardItem>((item, index) => ({
    ...item,
    position: index + 1,
    key: index,
  }));

  return <Table columns={tableColumns} dataSource={dataWithRanks} pagination={false} />;
};
