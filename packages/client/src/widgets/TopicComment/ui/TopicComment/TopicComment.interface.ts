import { ECommentReactions } from '@/shared/types';

export type TAuthor = {
  username: string;
  avatar: string;
};

export type TTopicComment = {
  id: number;
  content: string;
  author: TAuthor;
  created_at: string;
  reactions: Array<ECommentReactions>;
};
