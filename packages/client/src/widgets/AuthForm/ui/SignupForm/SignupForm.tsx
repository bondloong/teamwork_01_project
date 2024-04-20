import { ChangeEventHandler, FormEventHandler, ReactElement } from 'react';
import { Button, Input } from 'antd';
import { INPUTS, TEXTS } from './SignupForm.constants';
import { useForm } from '@/shared/hooks';
import { IFormProps } from '../../model';
import classes from './SignupForm.module.scss';

export const SignupForm = ({ toggleFormButton }: IFormProps): ReactElement => {
  const { values, setValue, inputNames, errors } = useForm(INPUTS);

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
      {INPUTS.map((input) => {
        const { name, placeholder, type } = input;

        return (
          <Input
            name={name}
            placeholder={placeholder}
            type={type}
            size="large"
            status={errors[name] ? 'error' : undefined}
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
