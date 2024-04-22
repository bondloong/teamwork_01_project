import { ChangeEventHandler, FormEventHandler, ReactElement } from 'react';
import { Button, Input } from 'antd';
import { TEXTS } from './SignupForm.constants';
import { useForm } from '@/shared/hooks';
import { IFormProps, SIGNUP_INPUTS } from '../../model';
import classes from './SignupForm.module.scss';

export const SignupForm = ({ toggleFormButton }: IFormProps): ReactElement => {
  const { values, setValue, inputNames, errors } = useForm(SIGNUP_INPUTS);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    setValue(event.target.name, event.target.value);
  };

  // @INFO
  // Будет доработано в следующем ПР-е
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();

    console.log(values);
    console.log(inputNames);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {SIGNUP_INPUTS.map((input) => {
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
