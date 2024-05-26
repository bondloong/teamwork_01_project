import React from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { useAppDispatch } from '@/shared/hooks';
import { changeUserPassword } from '@/entities/User';
import { TChangePasswordPayload } from '@/entities/User';
import { TEXTS } from './ChangePasswordForm.constants';
import { IChangePasswordFormProps } from './ChangePasswordForm.interfaces';

const { Item } = Form;

export const ChangePasswordForm: React.FC<IChangePasswordFormProps> = ({
  isPasswordModalVisible,
  setIsPasswordModalVisible,
}) => {
  const [passwordForm] = Form.useForm();
  const dispatch = useAppDispatch();

  const handlePasswordChange = async (values: {
    oldPassword: string;
    newPassword: string;
  }): Promise<void> => {
    try {
      const payload: TChangePasswordPayload = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      await dispatch(changeUserPassword(payload)).unwrap();
      message.success(TEXTS.passwordUpdateSuccess);
      setIsPasswordModalVisible(false);
      passwordForm.resetFields();
    } catch (error) {
      message.error(TEXTS.passwordUpdateFailed);
      console.error('Password update failed', error);
    }
  };

  return (
    <Modal
      title={TEXTS.passwordModalTitle}
      open={isPasswordModalVisible}
      onCancel={() => setIsPasswordModalVisible(false)}
      footer={null}
    >
      <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange}>
        <Item
          name="oldPassword"
          label={TEXTS.oldPassword}
          rules={[{ required: true, message: TEXTS.oldPasswordRequired }]}
        >
          <Input.Password />
        </Item>
        <Item
          name="newPassword"
          label={TEXTS.newPassword}
          rules={[{ required: true, message: TEXTS.newPasswordRequired }]}
        >
          <Input.Password />
        </Item>
        <Item
          name="confirmNewPassword"
          label={TEXTS.confirmNewPassword}
          dependencies={['newPassword']}
          rules={[
            { required: true, message: TEXTS.confirmNewPasswordRequired },
            // eslint-disable-next-line
            ({ getFieldValue }) => ({
              validator(_, value): Promise<void> {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(TEXTS.passwordMismatch));
              },
            }),
          ]}
        >
          <Input.Password />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            {TEXTS.savePasswordButton}
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};
