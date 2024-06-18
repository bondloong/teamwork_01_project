import { createAsyncThunk } from '@reduxjs/toolkit';
import { praktikumClient, API } from '@/shared/api';
import { IScore } from '@/widgets/LeaderBoard/ui/LeaderBoard/LeaderBoard.interfaces';

export const submitScore = createAsyncThunk(
  'leaderboard/submitScore',
  async ({
    score,
    teamName,
    userName,
  }: {
    score: IScore['rating'];
    teamName: string;
    userName: IScore['user'];
  }) => {
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
