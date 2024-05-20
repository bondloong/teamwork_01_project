import { API, praktikumClient } from '@/shared/api';
import { IUser } from '../../types';

export const changeUserProfile = async (profileData: Partial<IUser>): Promise<IUser> => {
  return praktikumClient.put(API.profile, profileData).then((res) => res.data);
};
