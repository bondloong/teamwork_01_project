import { ChangeEventHandler, FormEventHandler, ReactElement } from 'react';
import classes from './LoginForm.module.scss';
import { Button, Input } from 'antd';
import { INPUTS, TEXTS } from './LoginForm.constants';
import { useForm } from '@/shared/hooks';
import { IFormProps } from '../../model';

export const LoginForm = ({ toggleFormButton }: IFormProps): ReactElement => {
  const { values, setValue, inputNames } = useForm(INPUTS);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    setValue(event.target.name, event.target.value);
  };

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
            status="warning"
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
