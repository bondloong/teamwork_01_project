import { API, praktikumClient } from '@/shared/api';
import { ISignUpResponse, TSignUpPayload } from './signUp.interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../../model';
import { AxiosResponse } from 'axios';

export const signUp = createAsyncThunk<IUser, TSignUpPayload>(
  'users/signUp',
  async (userData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await praktikumClient
        .post<ISignUpResponse, AxiosResponse<ISignUpResponse>, TSignUpPayload>(API.signUp, userData)
        .then((res) => res.data);

      const user = {
        ...userData,
        password: undefined,
        id: response.id,
      };

      return user;
    } catch {
      throw rejectWithValue('Sign Up failed');
    }
  }
);
