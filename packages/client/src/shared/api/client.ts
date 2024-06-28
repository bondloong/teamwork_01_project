import axios from 'axios';
import { PRAKTIKUM_BASE_URL, PROJECT_BASE_URL } from './constants';

export const praktikumClient = axios.create({
  baseURL: PRAKTIKUM_BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

export const projectClient = axios.create({
  baseURL: PROJECT_BASE_URL,
  timeout: 5000,
  withCredentials: true,
});
