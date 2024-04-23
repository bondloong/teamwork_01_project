import { ChangeEventHandler, FormEventHandler, ReactElement } from 'react';
import { IFormProps } from './Form.interfaces';
import { Input } from 'antd';
import { useForm } from '@/shared/hooks';
import classes from './Form.module.scss';
import { classNames } from '@/shared/utils';

export const Form = (props: IFormProps): ReactElement => {
  const { inputs, validationSchema, children, onSubmit } = props;

  const { values, setValue, errors, setErrors, validateFormData, setError, validateString } =
    useForm(inputs);

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

  const handleBlur = (name: string): void => {
    const value = values[name];

    const schema = validationSchema[name];

    if (schema === undefined) {
      return;
    }

    const error = validateString(value, schema);

    const prevError = errors[name];

    if (error !== prevError) {
      setError(name, error);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes['inputs-container']}>
        {inputs.map((input) => {
          const { name, placeholder, type } = input;

          const isError = Boolean(errors[name]);

          const errorClasses = classNames({
            [classes.error]: true,
            [classes.error__expanded]: isError,
          });

          return (
            <fieldset className={classes.field} key={name}>
              <Input
                name={name}
                placeholder={placeholder}
                type={type}
                size="large"
                status={errors[name] && 'error'}
                value={values[name]}
                onChange={handleInputChange}
                onBlur={() => handleBlur(name)}
              />

              {<span className={errorClasses}>{errors[name]}</span>}
            </fieldset>
          );
        })}
      </div>

      {children}
    </form>
  );
};
