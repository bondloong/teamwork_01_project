import { __EXTERNAL_SERVER_URL__, __INTERNAL_SERVER_URL__ } from '../types/client';

export const SERVER_HOST =
  typeof window === 'undefined' ? __INTERNAL_SERVER_URL__ : __EXTERNAL_SERVER_URL__;
