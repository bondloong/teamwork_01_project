import { IComment } from '@/entities/Topics/model';
import { API, apiServerClient } from '@/shared/api';
import { AxiosResponse } from 'axios';
import { CreateCommentProps } from './types';

export const createComment = async (props: CreateCommentProps): Promise<IComment> => {
  try {
    const { data } = await apiServerClient.post<void, AxiosResponse<IComment, CreateCommentProps>>(
      API.comments,
      props
    );
    return data;
  } catch {
    throw 'Fetch topic create failed';
  }
};
