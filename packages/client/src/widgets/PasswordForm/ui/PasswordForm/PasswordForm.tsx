import React, { useEffect } from 'react';
import { Input, Button, message, Modal } from 'antd';
import { useAppDispatch } from '@/shared/hooks';
import { useSelector } from 'react-redux';
import { EInputNames } from '@/shared/types';
import { changeUserPassword } from '@/entities/User';
import { TEXTS } from './PasswordForm.constants';
import { IPasswordFormProps } from './PasswordForm.interfaces';
import { PASSWORD_INPUTS, PasswordSchema } from '../../model';
import { useForm } from '@/shared/hooks';
import { ValidationError } from 'yup';
import classes from './PasswordForm.module.scss';
import { getIsPasswordLoading } from '@/entities/User';

export const PasswordForm: React.FC<IPasswordFormProps> = ({
  isPasswordModalVisible,
  setIsPasswordModalVisible,
}) => {
  const dispatch = useAppDispatch();
  const isPasswordLoading = useSelector(getIsPasswordLoading);

  const { values, setValue, errors, setErrors, validateFormData, validateString, resetForm } =
    useForm(PASSWORD_INPUTS);

  useEffect(() => {
    if (!isPasswordModalVisible) {
      resetForm();
    }
  }, [isPasswordModalVisible, resetForm]);

  const handleBlur = (name: string): void => {
    const value = values[name];
    const schema = PasswordSchema[name];

    if (schema) {
      const error = validateString(value, schema);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
  };

  const handlePasswordChange = async (): Promise<void> => {
    const { isValid, errors } = validateFormData(values, PasswordSchema);
    if (!isValid) {
      setErrors(errors);
      return;
    }

    if (values[EInputNames.NewPassword] !== values[EInputNames.PasswordRepeat]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [EInputNames.PasswordRepeat]: TEXTS.passwordMismatch,
      }));
      return;
    }

    try {
      await dispatch(
        changeUserPassword({
          oldPassword: values[EInputNames.OldPassword],
          newPassword: values[EInputNames.NewPassword],
        })
      ).unwrap();
      message.success(TEXTS.passwordUpdateSuccess);
      setIsPasswordModalVisible(false);
    } catch (error) {
      if (error instanceof ValidationError) {
        const formErrors = error.inner.reduce(
          (acc: Record<string, string>, curr: ValidationError) => {
            if (curr.path) acc[curr.path] = curr.message;
            return acc;
          },
          {}
        );
        setErrors(formErrors);
        message.error(error.errors[0]);
      } else {
        message.error(TEXTS.passwordUpdateFailed);
        console.error('Password update failed', error);
      }
    }
  };

  return (
    <Modal
      title={TEXTS.passwordModalTitle}
      open={isPasswordModalVisible}
      onCancel={() => setIsPasswordModalVisible(false)}
      footer={null}
    >
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          handlePasswordChange();
        }}
      >
        {PASSWORD_INPUTS.map(({ name, placeholder, type }) => (
          <div key={name} className={classes.formItem}>
            <label className={classes.itemLabel} htmlFor={name}>
              {TEXTS[name as keyof typeof TEXTS]}
            </label>
            <Input.Password
              id={name}
              name={name}
              type={type}
              value={values[name] as string}
              onChange={(e) => setValue(name, e.target.value)}
              onBlur={() => handleBlur(name)}
              placeholder={placeholder}
            />
            {errors[name] && <div className={classes.error}>{errors[name]}</div>}
          </div>
        ))}
        <div className={classes.formButtonItem}>
          <Button type="primary" htmlType="submit" loading={isPasswordLoading}>
            {TEXTS.savePasswordButton}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
