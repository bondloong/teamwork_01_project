import { API, praktikumClient } from '@/shared/api';

type IFormData = {
  ratingFieldName: 'rating';
  cursor: number;
  limit: number;
};
type LeaderboardResponse = {
  ratingFieldName: 'rating';
  cursor: number;
  limit: number;
};
type IScore = {
  user: string;
  rating: number;
};

export const fetchLeaderboardByTeam = async (
  teamName: string,
  formData: IFormData
): Promise<LeaderboardResponse> => {
  try {
    const response = await praktikumClient
      .post(`${API.leaderBoard}/${teamName}`, formData)
      .then((res) => res.data);
    return response;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

export const submitScore = async (
  score: number,
  teamName: string,
  userEmail: string
): Promise<IScore> => {
  try {
    const response = await praktikumClient
      .post(API.leaderBoard, {
        data: {
          user: userEmail,
          rating: score,
        },
        ratingFieldName: 'rating',
        teamName,
      })
      .then((res) => res.data);
    return response;
  } catch (error) {
    console.error('Error submitting score:', error);
    throw error;
  }
};
