import { ChangeEventHandler, FormEventHandler, ReactElement } from 'react';
import { IFormProps } from './Form.interfaces';
import { Input } from 'antd';
import { useForm } from '@/shared/hooks';
import classes from './Form.module.scss';

export const Form = (props: IFormProps): ReactElement => {
  const { inputs, validationSchema, children, onSubmit } = props;

  const { values, setValue, errors, setErrors, validateFormData } = useForm(inputs);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    setValue(event.target.name, event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();

    const { isValid, errors } = validateFormData(values, validationSchema);

    setErrors(errors);

    if (isValid) {
      onSubmit(values);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes['inputs-container']}>
        {inputs.map((input) => {
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
      </div>

      {children}
    </form>
  );
};
