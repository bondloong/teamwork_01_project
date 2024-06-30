import { ITopicsSchema } from '@/entities/Topics';
import { IUser, IUserSchema } from '@/entities/User';
import { ILeaderboardState } from '@/entities/LeaderBoard';
declare const __SERVER_PORT__: number;

declare global {
  interface IAuthContex {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
  }

  interface IStateSchema {
    user: IUserSchema;

    topics: ITopicsSchema;

    leaderboard: ILeaderboardState;

  }

  declare const __API_SERVER_PORT__: number;
  declare const __API_SERVER_HOST__: string;
}
