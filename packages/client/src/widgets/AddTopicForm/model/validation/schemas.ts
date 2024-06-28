import { EInputNames } from '@/shared/types';
import { ADD_TOPIC_INPUTS } from '../constants';
import { StringSchema } from 'yup';
import { INPUT_VALIDATION_SCHEMAS } from '@/shared/constants';

const REQUIRED_ERROR = 'Обязательное поле';

export const addTopicSchema: Record<(typeof ADD_TOPIC_INPUTS)[number]['name'], StringSchema> = {
  [EInputNames.Title]: INPUT_VALIDATION_SCHEMAS.title.required(REQUIRED_ERROR),
  [EInputNames.Content]: INPUT_VALIDATION_SCHEMAS.content.required(REQUIRED_ERROR),
} as const;
