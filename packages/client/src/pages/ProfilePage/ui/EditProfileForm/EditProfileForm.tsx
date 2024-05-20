import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { changeUserProfile } from '@/entities/User';
import classes from './EditProfileForm.module.scss';
import { IUser } from '@/entities/User';

const { Item } = Form;

interface EditProfileFormProps {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, setUser }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const handleSubmit = async (values: Partial<IUser>): Promise<void> => {
    setLoading(true);
    try {
      const updatedUser = await changeUserProfile(values);
      setUser(updatedUser);
      message.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
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
