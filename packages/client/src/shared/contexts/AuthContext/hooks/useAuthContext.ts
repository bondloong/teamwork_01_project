import { useContext } from 'react';

import { AuthContext } from '../context';

export const useAuthContext = (): IAuthContex => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error('useSuseAuthContexttores must be used within AuthContext and AuthProvider');
  }

  return authContextValue;
};
