import { Table } from 'antd';
import { ReactElement, useState, useEffect } from 'react';
import { tableColumns, formData, teamName } from './LeaderBoard.constants';
import { TLeaderBoardItem } from './LeaderBoard.interfaces';
import { fetchLeaderboardByTeam } from '@/entities/leaderboard';
import { mapLeaderboardItem } from './LeaderBoard.utils';

export const LeaderBoard = (): ReactElement => {
  const [data, setData] = useState<TLeaderBoardItem[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const result = await fetchLeaderboardByTeam(teamName, formData);

        if (Array.isArray(result)) {
          const transformedData = result.map(mapLeaderboardItem);
          setData(transformedData);
        } else {
          console.error('Wrong format:', result);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchData();
  }, []);

  return <Table columns={tableColumns} dataSource={data} pagination={false} />;
};
