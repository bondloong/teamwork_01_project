import { ITopic } from '@/entities/Topics/model';
import { API, apiServerClient } from '@/shared/api';
import { AxiosResponse } from 'axios';

export const fetchTopic = async (id: string): Promise<ITopic> => {
  try {
    const { data } = await apiServerClient.get<void, AxiosResponse<ITopic>>(`${API.topics}/${id}`);
    return data;
  } catch {
    throw 'Fetch topic failed';
  }
};
