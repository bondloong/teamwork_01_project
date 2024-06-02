import { useState } from 'react';
import { useAppDispatch } from '@/shared/hooks';
import { uploadProfileAvatar } from '@/entities/User';
import { message } from 'antd';
import { TEXTS } from '../UploadAvatar/UploadAvatar.constants';

interface UseUploadAvatarReturn {
  loading: boolean;
  handleBeforeUpload: (file: File) => boolean;
}

export const UploadAvatar = (): UseUploadAvatarReturn => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = async (file: File): Promise<void> => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleBeforeUpload = (file: File): boolean => {
    handleAvatarChange(file);
    return false;
  };

  return {
    loading,
    handleBeforeUpload,
  };
};
