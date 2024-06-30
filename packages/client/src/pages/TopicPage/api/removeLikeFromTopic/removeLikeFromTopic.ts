import { ITopic } from '@/entities/Topics/model';
import { API, projectClient } from '@/shared/api';
import { AxiosResponse } from 'axios';
import { RemoveLikeFromTopicProps } from './types';

export const removeLikeFromTopic = async (props: RemoveLikeFromTopicProps): Promise<ITopic> => {
  try {
    const { data } = await projectClient.post<
      void,
      AxiosResponse<ITopic, RemoveLikeFromTopicProps>
    >(`${API.topics}/like/remove`, props);
    return data;
  } catch {
    throw 'Remove like from topic failed';
  }
};
