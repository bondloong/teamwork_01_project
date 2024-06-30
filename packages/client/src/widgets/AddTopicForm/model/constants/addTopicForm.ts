import { IInputData } from '@/shared/hooks';
import { EInputNames } from '@/shared/types';

export const ADD_TOPIC_INPUTS: IInputData[] = [
  {
    name: EInputNames.Title,
    placeholder: 'Title',
    type: 'text',
  },
  {
    name: EInputNames.Content,
    placeholder: 'Description',
    type: 'textarea',
  },
] as const;
