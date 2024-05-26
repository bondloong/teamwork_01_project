import React from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { useAppDispatch } from '@/shared/hooks';
import { changeUserPassword } from '@/entities/User';
import { IChangePasswordPayload } from '@/entities/User';
import { TEXTS } from './PasswordForm.constants';
import { IPasswordFormProps } from './PasswordForm.interfaces';

const { Item } = Form;

export const PasswordForm: React.FC<IPasswordFormProps> = ({
  isPasswordModalVisible,
  setIsPasswordModalVisible,
}) => {
  const [passwordForm] = Form.useForm();
  const dispatch = useAppDispatch();

  const handlePasswordChange = async (values: {
    oldPassword: string;
    newPassword: string;
  }): Promise<void> => {
    const payload: IChangePasswordPayload = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    const result = await dispatch(changeUserPassword(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      message.success(TEXTS.passwordUpdateSuccess);
      setIsPasswordModalVisible(false);
      passwordForm.resetFields();
    } else {
      message.error(TEXTS.passwordUpdateFailed);
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
