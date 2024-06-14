import { API, praktikumClient } from '@/shared/api';
import { TLeaderboardData } from '@/widgets/LeaderBoard/ui/LeaderBoard/LeaderBoard.interfaces';

type IScore = {
  user: string;
  rating: number;
};

export const fetchLeaderboardByTeam = async (
  teamName: string,
  formData: TLeaderboardData
): Promise<TLeaderboardData> => {
  try {
    const response = await praktikumClient.post(`${API.leaderBoard}/${teamName}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

export const submitScore = async (
  score: number,
  teamName: string,
  userName: string
): Promise<IScore> => {
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
};
