import React from 'react';
import { Upload, Avatar, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import classes from './ProfileAvatar.module.scss';
import { TEXTS } from './ProfileAvatar.constants';
import { IProfileAvatarProps } from './ProfileAvatar.interfaces';
import { UploadAvatar } from '@/features/UploadAvatar';

export const ProfileAvatar: React.FC<IProfileAvatarProps> = ({ avatarSrc }) => {
  const { loading, handleBeforeUpload } = UploadAvatar();

  return (
    <div className={classes.avatarContainer}>
      <Avatar className={classes.avatarImage} size={100} src={avatarSrc} />
      <Upload
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
        accept=".jpeg,.jpg,.png,.gif,.webp"
      >
        <Button icon={<UploadOutlined />} loading={loading}>
          {TEXTS.buttonText}
        </Button>
      </Upload>
    </div>
  );
};
