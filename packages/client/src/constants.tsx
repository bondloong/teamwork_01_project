import { __EXTERNAL_SERVER_URL__, __INTERNAL_SERVER_URL__ } from './app/model/types/client';
import './client.d';

export const SERVER_HOST =
  typeof window === 'undefined' ? __INTERNAL_SERVER_URL__ : __EXTERNAL_SERVER_URL__;
