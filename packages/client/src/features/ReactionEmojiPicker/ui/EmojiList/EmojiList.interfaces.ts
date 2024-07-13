import { EReactions } from '@/shared/types';

export interface IEmojiList {
  reactions: Array<EReactions>;
  onClick: (reaction: EReactions) => void;
}
