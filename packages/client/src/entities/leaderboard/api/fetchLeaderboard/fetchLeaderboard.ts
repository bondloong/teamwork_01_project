import { API, praktikumClient } from '@/shared/api';
import { TLeaderboardData } from '@/widgets/LeaderBoard/ui/LeaderBoard/LeaderBoard.interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLeaderboardByTeam = createAsyncThunk(
  'leaderboard/fetchByTeam',
  async ({ teamName, formData }: { teamName: string; formData: TLeaderboardData }) => {
    const response = await praktikumClient.post(`${API.leaderBoard}/${teamName}`, formData);
    return response.data;
  }
);
