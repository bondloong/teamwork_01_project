import { ReactElement } from 'react';

export interface ICommonFormProps {
  toggleFormButton: ReactElement;
  setIsLoading: (value: boolean) => void;
}
