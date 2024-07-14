import { ECommentReactions } from '@/shared/types';

export interface IEmojiList {
  reactions: Array<ECommentReactions>;
  onClick: (reaction: ECommentReactions) => void;
}
