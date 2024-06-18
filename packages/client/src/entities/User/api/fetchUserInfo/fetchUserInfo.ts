import { API, praktikumClient } from '@/shared/api';
import { IUser } from '../../model';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserInfo = createAsyncThunk<IUser>('users/fetchUserInfo', async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const user = await praktikumClient.get<IUser>(API.userInfo).then((res) => res.data);

    return user;
  } catch {
    throw rejectWithValue('Fetching user data failed');
  }
});

/* 
написать express middleware и в ней распарсить куки и получить юзера
на сервере достать юзера из объекта респонс и передать в функцию рендер
при создании стора добавить юзера в инициал стейт
где фетчим юзера сделать проверку


middleware
import axios from 'axios';
import type { NextFunction, Request, Response } from 'express';

const PRAKTIKUM_AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

export async function auth(req: Request, res: Response, next: NextFunction) {
  const authData = {
    authCookie: req.cookies.authCookie,
    uuid: req.cookies.uuid,
  };

  const cookies = Object.entries(authData)
    .map(([key, value]) => `${key}=${value}`)
    .join(';');

  const themeCookie = req.cookies.themeCookie;

  try {
    const { data } = await axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
      headers: { Cookie: cookies },
    });
    res.locals.user = data;
  } catch (error) {
    res.locals.user = null;
  }

  next();
}
*/
