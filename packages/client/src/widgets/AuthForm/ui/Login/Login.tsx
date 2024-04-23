import { ReactElement } from 'react';
import { Button } from 'antd';
import { TEXTS } from './Login.constants';
import { ICommonFormProps, LOGIN_INPUTS, loginSchema } from '../../model';
import { Form } from '../Form';
import { TInputValues } from '@/shared/hooks/useForm';
import classes from './Login.module.scss';

export const Login = ({ toggleFormButton }: ICommonFormProps): ReactElement => {
  const handleSubmit = (values: TInputValues<typeof LOGIN_INPUTS>): void => {
    console.log(values);
  };

  return (
    <Form inputs={LOGIN_INPUTS} validationSchema={loginSchema} onSubmit={handleSubmit}>
      <div className={classes.buttonsContainer}>
        <Button type="primary" htmlType="submit">
          {TEXTS.submitButton}
        </Button>

        {toggleFormButton}
      </div>
    </Form>
  );
};
