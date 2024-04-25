import { IInputData } from '@/shared/hooks';
import { TInputValues } from '@/shared/hooks/useForm/useForm.interfaces';
import { ReactElement } from 'react';
import { StringSchema } from 'yup';

export interface IFormProps {
  inputs: IInputData[];
  validationSchema: Record<string, StringSchema>;
  children: ReactElement;
  onSubmit: (values: TInputValues<IInputData[]>) => void;
  mainError?: string | null;
}
