import { ReactElement, useState } from 'react';
import { Button } from 'antd';
import { TEXTS } from './Login.constants';
import { ICommonFormProps, LOGIN_INPUTS, loginSchema } from '../../model';
import { Form } from '../Form';
import { TInputValues } from '@/shared/hooks/useForm';
import classes from './Login.module.scss';
import { TLogInPayload, fetchUserInfo, logIn } from '@/entities/User';
import { useAuthContext } from '@/shared/contexts';
import { useNavigate } from 'react-router-dom';
import { EAppRoutes, EInputNames } from '@/shared/types';

export const Login = ({ toggleFormButton, setIsLoading }: ICommonFormProps): ReactElement => {
  const [mainError, setMainError] = useState<string | null>();
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (values: TInputValues<typeof LOGIN_INPUTS>): void => {
    if (mainError !== null) {
      setMainError(null);
    }

    const login = values[EInputNames.Login];
    const password = values[EInputNames.Password];

    const payload: TLogInPayload = {
      login,
      password,
    };

    setIsLoading(true);

    logIn(payload)
      .then(() => fetchUserInfo())
      .then((res) => {
        setUser({
          ...res,
        });

        navigate(EAppRoutes.Main);
      })
      .catch((error) => {
        console.log('LogIn failed', error);
        setMainError(TEXTS.unknownError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form
      inputs={LOGIN_INPUTS}
      validationSchema={loginSchema}
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
