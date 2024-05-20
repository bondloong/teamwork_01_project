import React, { ReactElement, useState, useEffect } from 'react';
import { Button, Upload, Avatar, Row, Col, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuthContext } from '@/shared/contexts';
import { BaseLayout } from '@/layouts/BaseLayout';
import { useNavigate } from 'react-router-dom';
import classes from './ProfilePage.module.scss';
import './ProfilePage.module.scss';
import DEFAULT_AVATAR from './default-avatar.png';
import { EAppRoutes } from '@/shared/types';
import { fetchUserInfo, logOut, changeProfileAvatar } from '@/entities/User';
import { ChangePasswordForm } from '../ChangePasswordForm/ChangePasswordForm';
import { EditProfileForm } from '../EditProfileForm/EditProfileForm';

const BASE_AVATAR_URL = 'https://ya-praktikum.tech/api/v2/resources';
axios.defaults.withCredentials = true;

export const ProfilePage = (): ReactElement => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const userInfo = await fetchUserInfo();
        setUser(userInfo);
      } catch (error) {
        navigate(EAppRoutes.Auth);
      }
    };

    fetchData();
  }, [setUser, navigate]);

  const handleAvatarChange = async (file: File): Promise<void> => {
    setAvatarLoading(true);
    try {
      const updatedUser = await changeProfileAvatar(file);
      setUser(updatedUser);
      message.success('Avatar updated successfully!');
    } catch (error) {
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
    logOut()
      .then(() => {
        message.success('Logged out successfully!');
        setUser(null);
        navigate(EAppRoutes.Main);
      })
      .catch((error) => {
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
          <EditProfileForm user={user} setUser={setUser} />
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
