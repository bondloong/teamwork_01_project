import { API, praktikumClient } from '@/shared/api';
import { IUser } from '../../model';

export const fetchUserInfo = async (): Promise<IUser> =>
  praktikumClient.get(API.userInfo).then((res) => res.data);
