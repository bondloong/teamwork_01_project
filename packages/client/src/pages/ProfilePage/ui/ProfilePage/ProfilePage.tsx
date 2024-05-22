import React, { ReactElement, useState, useEffect } from 'react';
import { Button, Upload, Avatar, Row, Col, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BaseLayout } from '@/layouts/BaseLayout';
import { EAppRoutes } from '@/shared/types';
import { fetchUserInfo, logOut, changeProfileAvatar } from '@/entities/User';
import { ChangePasswordForm } from '../ChangePasswordForm/ChangePasswordForm';
import { EditProfileForm } from '../EditProfileForm/EditProfileForm';
import classes from './ProfilePage.module.scss';
import DEFAULT_AVATAR from './default-avatar.png';

const BASE_AVATAR_URL = 'https://ya-praktikum.tech/api/v2/resources';

export const ProfilePage = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: IStateSchema) => state.user.userData);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchUserInfo()).catch(() => {
      navigate(EAppRoutes.Auth);
    });
  }, [dispatch, navigate]);

  const handleAvatarChange = async (file: File): Promise<void> => {
    setAvatarLoading(true);
    try {
      await dispatch(changeProfileAvatar(file)).unwrap();
      message.success('Avatar updated successfully!');
    } catch (error) {
      message.error('Failed to update avatar. Please try again.');
      console.error('Avatar update failed', error);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleBeforeUpload = (file: File): false => {
    handleAvatarChange(file);
    return false;
  };

  const handleLogout = (): void => {
    dispatch(logOut())
      .then(() => {
        message.success('Logged out successfully!');
        navigate(EAppRoutes.Main);
      })
      .catch((error: Error) => {
        message.error('Failed to log out. Please try again.');
        console.error('Logout failed', error);
      });
  };

  const avatarSrc = user?.avatar ? `${BASE_AVATAR_URL}${user.avatar}` : DEFAULT_AVATAR;

  return (
    <BaseLayout>
      <Row justify="center">
        <Col className={classes.wrapper} xs={24} sm={18} md={12} lg={10}>
          <h1 className={classes.header}>Profile Settings</h1>
          <div className={classes.avatarContainer}>
            <Avatar className={classes.avatarImage} size={100} src={avatarSrc} />
            <Upload
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              accept=".jpeg,.jpg,.png,.gif,.webp"
            >
              <Button icon={<UploadOutlined />} loading={avatarLoading}>
                Change Avatar
              </Button>
            </Upload>
          </div>
          <EditProfileForm />
          <Button
            type="default"
            onClick={() => setPasswordModalVisible(true)}
            className={classes.changePasswordButton}
          >
            Change Password
          </Button>
          <Button type="primary" danger onClick={handleLogout}>
            Log out
          </Button>
        </Col>
      </Row>
      <Modal
        title="Change Password"
        visible={passwordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        footer={null}
      >
        <ChangePasswordForm
          passwordModalVisible={passwordModalVisible}
          setPasswordModalVisible={setPasswordModalVisible}
        />
      </Modal>
    </BaseLayout>
  );
};
