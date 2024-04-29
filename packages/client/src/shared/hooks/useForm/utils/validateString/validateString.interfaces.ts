import { StringSchema } from 'yup';

export type TValidateString = (value: string, schema: StringSchema) => string;
