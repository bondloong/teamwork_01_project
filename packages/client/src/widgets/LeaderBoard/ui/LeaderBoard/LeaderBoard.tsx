import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/app';
import { Table } from 'antd';
import { fetchLeaderboardByTeam } from '@/entities/leaderboard';
import { tableColumns, formData, teamName } from './LeaderBoard.constants';
import {
  getLeaderboardData,
  getLeaderboardLoading,
  getLeaderboardError,
} from '@/entities/leaderboard';

export const LeaderBoard = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(getLeaderboardData);

  const isLoading = useSelector(getLeaderboardLoading);
  const error = useSelector(getLeaderboardError);

  useEffect(() => {
    dispatch(fetchLeaderboardByTeam({ teamName, formData }));
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <Table columns={tableColumns} dataSource={data} pagination={false} />;
};

export default LeaderBoard;
