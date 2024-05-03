import { ReactElement, useState } from 'react';
import { Button } from 'antd';
import { TEXTS } from './Signup.constants';
import { ICommonFormProps, SIGNUP_INPUTS } from '../../model';
import classes from './Signup.module.scss';
import { TInputValues } from '@/shared/hooks/useForm';
import { signupSchema } from '../../model/validation/schemas';
import { Form } from '../Form';
import { TSignUpPayload, signUp } from '@/entities/User';
import { useAuthContext } from '@/shared/contexts';
import { useNavigate } from 'react-router-dom';
import { EAppRoutes, EInputNames } from '@/shared/types';

export const Signup = ({ toggleFormButton, setIsLoading }: ICommonFormProps): ReactElement => {
  const [mainError, setMainError] = useState<string | null>();
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

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
    } else if (mainError !== null) {
      setMainError(null);
    }

    const payload: TSignUpPayload = {
      login,
      email,
      phone,
      first_name,
      second_name,
      password,
    };

    setIsLoading(true);

    signUp(payload)
      .then((res) => {
        setUser({
          ...payload,
          id: res.id,
        });

        navigate(EAppRoutes.Home);
      })
      .catch((error) => {
        console.log('SignUp failed', error);
        setMainError(TEXTS.unknownError);
      })
      .finally(() => {
        setIsLoading(false);
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
