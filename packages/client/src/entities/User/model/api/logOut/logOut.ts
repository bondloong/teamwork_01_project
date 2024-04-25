import { API, praktikumClient } from '@/shared/api';

export const logOut = async (): Promise<void> => praktikumClient.post(API.logOut);
