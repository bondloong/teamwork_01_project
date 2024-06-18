import { createAsyncThunk } from '@reduxjs/toolkit';
import { praktikumClient, API } from '@/shared/api';
import { TScore } from '@/widgets/LeaderBoard/ui/LeaderBoard/LeaderBoard.interfaces';

export const submitScore = createAsyncThunk(
  'leaderboard/submitScore',
  async ({ score, teamName, userName }: { score: number; teamName: string; userName: string }) => {
    try {
      const response = await praktikumClient.post(API.leaderBoard, {
        data: {
          user: userName,
          rating: score,
        },
        ratingFieldName: 'rating',
        teamName,
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting score:', error);
      throw error;
    }
  }
);
