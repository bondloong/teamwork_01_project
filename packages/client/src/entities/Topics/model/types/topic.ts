import { ECommentReactions } from '@/shared/types';

export interface ITopic {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: IAuthor;
  likedUsers: string[];
  comments: IComment[];
  createdAt: Date;
}

export interface IAuthor {
  id: string;
  first_name: string;
  second_name: string;
  yandexUserId: string;
}

export interface IComment {
  id: string;
  content: string;
  authorId: string;
  author: IAuthor;
  topicId: string;
  createdAt: string;
  updatedAt: string;
  reactions: Array<ECommentReactions>;
}

export interface ITopicsSchema {
  data: ITopic[] | [];
  topicAuthor: IAuthor | null;
  isLoading: boolean;
  isNewTopicLoading: boolean;
  isTopicAuthorLoading: boolean;
  commentsReactions: Record<string, ECommentReactions[]>;
}
