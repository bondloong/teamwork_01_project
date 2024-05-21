import { ReactElement, useState } from 'react';
import { Button } from 'antd';
import { TEXTS } from './Login.constants';
import { ICommonFormProps, LOGIN_INPUTS, loginSchema } from '../../model';
import { Form } from '../Form';
import { TInputValues } from '@/shared/hooks/useForm';
import classes from './Login.module.scss';
import { TLogInPayload, fetchUserInfo, logIn } from '@/entities/User';
import { useNavigate } from 'react-router-dom';
import { EAppRoutes, EInputNames } from '@/shared/types';
import { useAppDispatch } from '@/shared/hooks';

export const Login = ({ toggleFormButton }: ICommonFormProps): ReactElement => {
  const dispatch = useAppDispatch();
  const [mainError, setMainError] = useState<string | null>();

  const navigate = useNavigate();

  const handleSubmit = (values: TInputValues<typeof LOGIN_INPUTS>): void => {
    const login = values[EInputNames.Login];
    const password = values[EInputNames.Password];

    const payload: TLogInPayload = {
      login,
      password,
    };

    dispatch(logIn(payload))
      .then(() => dispatch(fetchUserInfo()))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate(EAppRoutes.Main);
        } else {
          setMainError(TEXTS.unknownError);
        }
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
