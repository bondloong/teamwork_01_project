import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks';
import { changeUserProfile } from '@/entities/User';
import { type IUser } from '@/entities/User/model';
import { profileValidationSchema } from './ProfileForm.validation';
import { TEXTS } from './ProfileForm.constants';
import classes from './ProfileForm.module.scss';
import { ValidationError } from 'yup';

const { Item } = Form;

export const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: IStateSchema) => state.user.userData);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (values: Partial<IUser>): Promise<void> => {
    setLoading(true);

    await profileValidationSchema.validate(values).catch((error: ValidationError) => {
      message.error(error.errors[0]);
      setLoading(false);
      throw error;
    });

    dispatch(changeUserProfile(values))
      .unwrap()
      .then(() => {
        message.success(TEXTS.profileUpdateSuccess);
        setIsEditing(false);
      })
      .catch((error) => {
        message.error(TEXTS.profileUpdateFailed);
        console.error('Update failed', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={user || undefined}>
      <Item
        name="first_name"
        label={TEXTS.firstName}
        rules={[{ required: true, message: TEXTS.firstNameRequired }]}
      >
        <Input readOnly={!isEditing} />
      </Item>
      <Item
        name="second_name"
        label={TEXTS.secondName}
        rules={[{ required: true, message: TEXTS.secondNameRequired }]}
      >
        <Input readOnly={!isEditing} />
      </Item>
      <Item
        name="display_name"
        label={TEXTS.displayName}
        rules={[{ required: true, message: TEXTS.displayNameRequired }]}
      >
        <Input readOnly={!isEditing} />
      </Item>
      <Item
        name="login"
        label={TEXTS.login}
        rules={[{ required: true, message: TEXTS.loginRequired }]}
      >
        <Input readOnly={!isEditing} />
      </Item>
      <Item
        name="email"
        label={TEXTS.email}
        rules={[{ required: true, type: 'email', message: TEXTS.emailRequired }]}
      >
        <Input readOnly={!isEditing} />
      </Item>
      <Item
        className={classes.phoneField}
        name="phone"
        label={TEXTS.phone}
        rules={[{ required: true, message: TEXTS.phoneRequired }]}
      >
        <Input readOnly={!isEditing} />
      </Item>
      <Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ display: isEditing ? 'block' : 'none' }}
        >
          {TEXTS.saveChanges}
        </Button>
        <Button
          type="default"
          onClick={() => setIsEditing(true)}
          style={{ display: !isEditing ? 'block' : 'none' }}
        >
          {TEXTS.changeData}
        </Button>
      </Item>
    </Form>
  );
};
