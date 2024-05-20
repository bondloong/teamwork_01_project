import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { changeUserPassword, TChangePasswordPayload } from '@/entities/User';

const { Item } = Form;

interface ChangePasswordFormProps {
  passwordModalVisible: boolean;
  setPasswordModalVisible: (visible: boolean) => void;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  passwordModalVisible,
  setPasswordModalVisible,
}) => {
  const [passwordForm] = Form.useForm();

  const handlePasswordChange = async (values: {
    oldPassword: string;
    newPassword: string;
  }): Promise<void> => {
    try {
      await changeUserPassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      message.success('Password updated successfully!');
      setPasswordModalVisible(false);
      passwordForm.resetFields();
    } catch (error) {
      message.error('Failed to update password. Please try again.');
      console.error('Password update failed', error);
    }
  };

  return (
    <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange}>
      <Item
        name="oldPassword"
        label="Old Password"
        rules={[{ required: true, message: 'Please enter your old password' }]}
      >
        <Input.Password />
      </Item>
      <Item
        name="newPassword"
        label="New Password"
        rules={[{ required: true, message: 'Please enter your new password' }]}
      >
        <Input.Password />
      </Item>
      <Item
        name="confirmNewPassword"
        label="Confirm New Password"
        dependencies={['newPassword']}
        rules={[
          { required: true, message: 'Please confirm your new password' },
          // eslint-disable-next-line
          ({ getFieldValue }) => ({
            validator(_: object, value: string): Promise<void> {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          Save Password
        </Button>
      </Item>
    </Form>
  );
};
