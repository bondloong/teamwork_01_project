import { ChangeEventHandler, FormEventHandler, ReactElement } from 'react';
import classes from './LoginForm.module.scss';
import { Button, Input } from 'antd';
import { TEXTS } from './LoginForm.constants';
import { useForm } from '@/shared/hooks';
import { IFormProps, LOGIN_INPUTS } from '../../model';
import { string, object, ValidationError } from 'yup';
import { INPUT_VALIDATION_SCHEMAS } from '@/shared/services';

export const LoginForm = ({ toggleFormButton }: IFormProps): ReactElement => {
  const { values, setValue, inputNames, errors } = useForm(LOGIN_INPUTS);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    setValue(event.target.name, event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();

    const credsSchema = object({
      login: string().min(7, 'login min 7').email('login email'),
      password: string().min(7, 'password min 7'),
    });

    try {
      credsSchema.validateSync(values, { abortEarly: false });
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        return;
      }
      console.log(error.inner);
      console.log(error.inner[0].message);
      console.log(error.inner[0].path);
    }

    INPUT_VALIDATION_SCHEMAS['name']?.validateSync(values.login);
    INPUT_VALIDATION_SCHEMAS['password']?.validateSync(values.password);

    console.log(values);
    console.log(inputNames);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {LOGIN_INPUTS.map((input) => {
        const { name, placeholder, type } = input;

        return (
          <Input
            name={name}
            placeholder={placeholder}
            type={type}
            size="large"
            status={errors[name] && 'error'}
            value={values[name]}
            onChange={handleInputChange}
            key={name}
          />
        );
      })}

      <div className={classes.buttonsContainer}>
        <Button type="primary" htmlType="submit">
          {TEXTS.submitButton}
        </Button>

        {toggleFormButton}
      </div>
    </form>
  );
};
