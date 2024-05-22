import { API, praktikumClient } from '@/shared/api';
import { IUser } from '../../model';

export const changeProfileAvatar = async (avatar: File): Promise<IUser> => {
  const formData = new FormData();
  formData.append('avatar', avatar);
  return praktikumClient
    .put(API.profileAvatar, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data);
};
