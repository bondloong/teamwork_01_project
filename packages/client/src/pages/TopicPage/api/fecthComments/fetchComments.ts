import { IComment } from '@/entities/Topics/model';
import { API, projectClient } from '@/shared/api';
import { AxiosResponse } from 'axios';

export const fetchComments = async (id: string): Promise<IComment[]> => {
  try {
    const { data } = await projectClient.get<void, AxiosResponse<IComment[]>>(
      `${API.comments}/topic/${id}`
    );
    return data;
  } catch {
    throw 'Fetch topic author failed';
  }
};
