import { ITopic } from '@/entities/Topics/model';
import { API, apiServerClient } from '@/shared/api';
import { AxiosResponse } from 'axios';
import { AddLikeToTopicProps } from './types';

export const addLikeToTopic = async (props: AddLikeToTopicProps): Promise<ITopic> => {
  try {
    const { data } = await apiServerClient.post<void, AxiosResponse<ITopic, AddLikeToTopicProps>>(
      `${API.topics}/like/add`,
      props
    );
    return data;
  } catch {
    throw 'Add like to topic failed';
  }
};
