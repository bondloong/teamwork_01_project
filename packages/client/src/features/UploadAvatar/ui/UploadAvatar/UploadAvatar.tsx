import { useAppDispatch } from '@/shared/hooks';
import { uploadProfileAvatar } from '@/entities/User';
import { message } from 'antd';
import { IUploadAvatarReturn } from './UploadAvatar.interfaces';
import { TEXTS } from '../UploadAvatar/UploadAvatar.constants';

export const UploadAvatar = (): IUploadAvatarReturn => {
  const dispatch = useAppDispatch();

  const handleAvatarChange = async (file: File): Promise<void> => {
    try {
      const result = await dispatch(uploadProfileAvatar(file)).unwrap();
      if (result) {
        message.success(TEXTS.avatarUpdateSuccess);
      } else {
        message.error(TEXTS.avatarUpdateFailed);
      }
    } catch (error) {
      message.error(TEXTS.avatarUpdateFailed);
      console.error('Avatar update failed', error);
    }
  };

  const handleBeforeUpload = (file: File): boolean => {
    handleAvatarChange(file);
    return false;
  };

  return {
    handleBeforeUpload,
  };
};
