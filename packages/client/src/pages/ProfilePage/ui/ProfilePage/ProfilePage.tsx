import React, { ReactElement, useState } from 'react';
import { Button, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { BaseLayout } from '@/layouts/BaseLayout';
import { EAppRoutes } from '@/shared/types';
import { LogOut } from '@/features/LogOut';
import { PasswordForm } from '@/widgets/PasswordForm';
import { ProfileForm } from '@/widgets/ProfileForm';
import { ProfileAvatar } from '@/widgets/ProfileAvatar';
import { getUserData, getIsAuth } from '@/entities/User';
import classes from './ProfilePage.module.scss';
import { TEXTS, BASE_AVATAR_URL, DEFAULT_AVATAR } from './ProfilePage.constants';
import { Navigate } from 'react-router-dom';

export const ProfilePage = (): ReactElement => {
  const isAuth = useSelector(getIsAuth);
  const user = useSelector(getUserData);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const avatarSrc = user?.avatar ? `${BASE_AVATAR_URL}${user.avatar}` : DEFAULT_AVATAR;

  if (!isAuth) {
    return <Navigate to={EAppRoutes.Auth} />;
  }

  return (
    <BaseLayout>
      <Row justify="center">
        <Col className={classes.wrapper} xs={24} sm={18} md={12} lg={10}>
          <h1 className={classes.header}>{TEXTS.title}</h1>
          <ProfileAvatar avatarSrc={avatarSrc} />
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
