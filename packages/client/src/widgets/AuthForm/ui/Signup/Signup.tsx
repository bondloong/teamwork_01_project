import { ReactElement, useState } from 'react';
import { Button } from 'antd';
import { TEXTS } from './Signup.constants';
import { ICommonFormProps, SIGNUP_INPUTS } from '../../model';
import classes from './Signup.module.scss';
import { TInputValues } from '@/shared/hooks/useForm';
import { signupSchema } from '../../model/validation/schemas';
import { Form } from '../Form';
import { TSignUpPayload, signUp } from '@/entities/User';
import { useNavigate } from 'react-router-dom';
import { EAppRoutes, EInputNames } from '@/shared/types';
import { useAppDispatch } from '@/shared/hooks';

export const Signup = ({ toggleFormButton }: ICommonFormProps): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [mainError, setMainError] = useState<string | null>();

  const handleSubmit = (values: TInputValues<typeof SIGNUP_INPUTS>): void => {
    const login = values[EInputNames.Login];
    const email = values[EInputNames.Email];
    const phone = values[EInputNames.Phone];
    const first_name = values[EInputNames.FirstName];
    const second_name = values[EInputNames.SecondName];
    const password = values[EInputNames.Password];
    const passwordRepeat = values[EInputNames.PasswordRepeat];

    if (password !== passwordRepeat) {
      setMainError(TEXTS.passwordRepeatError);

      return;
    }

    const payload: TSignUpPayload = {
      login,
      email,
      phone,
      first_name,
      second_name,
      password,
    };

    dispatch(signUp(payload)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(EAppRoutes.Main);
      }
    });
  };

  return (
    <Form
      inputs={SIGNUP_INPUTS}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}
      mainError={mainError}
    >
      <div className={classes.buttonsContainer}>
        <Button type="primary" htmlType="submit">
          {TEXTS.submitButton}
        </Button>

        {toggleFormButton}
      </div>
    </Form>
  );
};
