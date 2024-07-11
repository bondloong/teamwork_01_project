import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks';
import { changeUserProfile } from '@/entities/User';
import { type IUser } from '@/entities/User/model';
import { TEXTS } from './ProfileForm.constants';
import classes from './ProfileForm.module.scss';
import { useForm } from '@/shared/hooks';
import { ValidationError } from 'yup';
import { PROFILE_INPUTS, ProfileSchema } from '../../model';
import { getIsProfileLoading } from '@/entities/User';
import { ThemeSwitch } from '@/widgets/ThemeSwtich';

export const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: IStateSchema) => state.user.userData);
  const isProfileLoading = useSelector(getIsProfileLoading);
  const [isEditing, setIsEditing] = useState(false);

  const { values, setValue, errors, setErrors, validateFormData, validateString } =
    useForm(PROFILE_INPUTS);

  useEffect(() => {
    if (user) {
      PROFILE_INPUTS.forEach(({ name }) => {
        if (values[name] === '') {
          setValue(name, user[name as keyof IUser]?.toString() || '');
        }
      });
    }
  }, []);

  const handleBlur = (name: string): void => {
    const value = values[name];
    const schema = ProfileSchema[name];

    if (schema) {
      const error = validateString(value, schema);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const { isValid, errors } = validateFormData(values, ProfileSchema);
      if (!isValid) {
        setErrors(errors);
        return;
      }
      await dispatch(changeUserProfile(values)).unwrap();
      message.success(TEXTS.profileUpdateSuccess);
      setIsEditing(false);
    } catch (error) {
      if (error instanceof ValidationError) {
        const formErrors = error.inner.reduce(
          (acc: Record<string, string>, curr: ValidationError) => {
            if (curr.path) {
              acc[curr.path] = curr.message;
            }
            return acc;
          },
          {}
        );
        setErrors(formErrors);
        message.error(error.errors[0]);
      } else {
        message.error(TEXTS.profileUpdateFailed);
        console.error('Update failed', error);
      }
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {PROFILE_INPUTS.map(({ name, placeholder, type }) => (
        <div key={name} className={classes.formItem}>
          <label className={classes.itemLabel} htmlFor={name}>
            {TEXTS[name as keyof typeof TEXTS]}
          </label>
          <Input
            id={name}
            name={name}
            type={type}
            value={values[name] as string}
            onChange={(e) => setValue(name, e.target.value)}
            onBlur={() => handleBlur(name)}
            readOnly={!isEditing}
            placeholder={placeholder}
          />
          {errors[name] && <div className={classes.error}>{errors[name]}</div>}
        </div>
      ))}
      <div>
        <span className={classes.formItem}>{TEXTS.ThemeSwitch} </span>
        <ThemeSwitch id="themeSwitch" />
      </div>
      <div className={classes.formButtonItem}>
        <Button
          type="primary"
          htmlType="submit"
          loading={isProfileLoading}
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
      </div>
    </form>
  );
};
