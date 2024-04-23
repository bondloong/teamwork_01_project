import { ReactElement, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import { IAuthProviderProps } from './AuthProvider.interfaces';
import { Loader } from '@/shared/ui';

export const AuthProvider = ({ children, getUserInfo }: IAuthProviderProps): ReactElement => {
  const [user, setUser] = useState<IAuthContex['user'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        setUser(res);
      })
      .catch((error) => {
        console.log('Failed getUserInfo', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
