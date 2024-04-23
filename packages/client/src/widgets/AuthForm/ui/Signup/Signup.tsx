import { ReactElement } from 'react';
import { Button } from 'antd';
import { TEXTS } from './Signup.constants';
import { ICommonFormProps, SIGNUP_INPUTS } from '../../model';
import classes from './Signup.module.scss';
import { TInputValues } from '@/shared/hooks/useForm';
import { signupSchema } from '../../model/validation/schemas';
import { Form } from '../Form';

export const Signup = ({ toggleFormButton }: ICommonFormProps): ReactElement => {
  const handleSubmit = (values: TInputValues<typeof SIGNUP_INPUTS>): void => {
    console.log(values);
  };

  return (
    <Form inputs={SIGNUP_INPUTS} validationSchema={signupSchema} onSubmit={handleSubmit}>
      <div className={classes.buttonsContainer}>
        <Button type="primary" htmlType="submit">
          {TEXTS.submitButton}
        </Button>

        {toggleFormButton}
      </div>
    </Form>
  );
};
