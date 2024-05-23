import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks';
import { changeUserProfile } from '@/entities/User';
import { type IUser } from '@/entities/User/model';
import classes from './EditProfileForm.module.scss';

const { Item } = Form;

export const EditProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: IStateSchema) => state.user.userData);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (values: Partial<IUser>): Promise<void> => {
    setLoading(true);
    try {
      await dispatch(changeUserProfile(values)).unwrap();
      message.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      message.error('Failed to update profile. Please try again.');
      console.error('Update failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={user || undefined}>
      <Item
        name="first_name"
        label="First Name"
        rules={[{ required: true, message: 'Please enter your first name' }]}
      >
        <Input readOnly={!isEditing} />
      </Item>
      <Item
        name="second_name"
        label="Second Name"
        rules={[{ required: true, message: 'Please enter your second name' }]}
      >
        <Input readOnly={!isEditing} />
      </Item>
      <Item
        name="display_name"
        label="Display Name"
        rules={[{ required: true, message: 'Please enter your display name' }]}
      >
        <Input readOnly={!isEditing} />
      </Item>
      <Item
        name="login"
        label="Login"
        rules={[{ required: true, message: 'Please enter your login' }]}
      >
        <Input readOnly={!isEditing} />
      </Item>
      <Item
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
      >
        <Input readOnly={!isEditing} />
      </Item>
      <Item
        className={classes.phoneField}
        name="phone"
        label="Phone"
        rules={[{ required: true, message: 'Please enter your phone number' }]}
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
          Save Changes
        </Button>
        <Button
          type="default"
          onClick={() => setIsEditing(true)}
          style={{ display: !isEditing ? 'block' : 'none' }}
        >
          Change Data
        </Button>
      </Item>
    </Form>
  );
};
