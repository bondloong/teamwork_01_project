import React, { ReactElement, useState, useEffect } from 'react';
import { Button, Upload, Avatar, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BaseLayout } from '@/layouts/BaseLayout';
import { EAppRoutes } from '@/shared/types';
import { useAppDispatch } from '@/shared/hooks';
import { LogOut } from '@/features/LogOut';
import { PasswordForm } from '@/widgets/PasswordForm';
import { ProfileForm } from '@/widgets/ProfileForm';
import { fetchUserInfo, uploadProfileAvatar, getUserData, getIsAuth } from '@/entities/User';
import classes from './ProfilePage.module.scss';
import { TEXTS, BASE_AVATAR_URL, DEFAULT_AVATAR } from './ProfilePage.constants';
import { Navigate } from 'react-router-dom';

export const ProfilePage = (): ReactElement => {
  const isAuth = useSelector(getIsAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUserData);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchUserInfo()).catch((error: Error) => {
      console.error('Failed to fetch user info', error);
      navigate(EAppRoutes.Auth);
    });
  }, [dispatch, navigate]);

  const handleAvatarChange = async (file: File): Promise<void> => {
    setAvatarLoading(true);
    try {
      // eslint-disable-next-line
      await dispatch(uploadProfileAvatar(file) as any).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
       message.success(TEXTS.avatarUpdateSuccess);
      } else {
      message.error(TEXTS.avatarUpdateFailed);
      }
    });
      message.success(TEXTS.avatarUpdateSuccess);
    } catch (error) {
      message.error(TEXTS.avatarUpdateFailed);
      console.error('Avatar update failed', error);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleBeforeUpload = (file: File): false => {
    handleAvatarChange(file);
    return false;
  };

  const avatarSrc = user?.avatar ? `${BASE_AVATAR_URL}${user.avatar}` : DEFAULT_AVATAR;

  if (!isAuth) {
    return <Navigate to={EAppRoutes.Auth} />;
  }

  return (
    <BaseLayout>
      <Row justify="center">
        <Col className={classes.wrapper} xs={24} sm={18} md={12} lg={10}>
          <h1 className={classes.header}>{TEXTS.title}</h1>
          <div className={classes.avatarContainer}>
            <Avatar className={classes.avatarImage} size={100} src={avatarSrc} />
            <Upload
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              accept=".jpeg,.jpg,.png,.gif,.webp"
            >
              <Button icon={<UploadOutlined />} loading={avatarLoading}>
                {TEXTS.changeAvatarButton}
              </Button>
            </Upload>
          </div>
          <ProfileForm />
          <Button
            type="default"
            onClick={() => setIsPasswordModalVisible(true)}
            className={classes.changePasswordButton}
          >
            {TEXTS.changePasswordButton}
          </Button>
          <LogOut danger />
        </Col>
      </Row>
      <PasswordForm
        isPasswordModalVisible={isPasswordModalVisible}
        setIsPasswordModalVisible={setIsPasswordModalVisible}
      />
    </BaseLayout>
  );
};
