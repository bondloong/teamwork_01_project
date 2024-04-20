import { IPlayer } from '@/entities/Player';

export type TLeaderBoardItem = IPlayer & {
  position: number;
  key: string | number;
};
