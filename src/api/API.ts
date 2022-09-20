import * as axios from 'axios';
import { Photo, InputProfileData } from '../types/types';

export type GetItemsResponse<T> = {
  items: T[];
  totalCount: number;
  error?: string;
};

export type GetCaptchaURLResponse = {
  url: string;
};

export type CommonResponse<R, D> = {
  resultCode: R;
  messages: string[];
  data: D;
};

export enum ResultCodes {
  Success = 0,
  Error = 1,
}

export enum ResultCodesWithCaptcha {
  CaptchaRequired = 10,
}

export type GetProfileResponse = {
  photos: Photo;
  userId: number;
} & InputProfileData;

export const instance = axios.default.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'b27ac241-a89b-4b50-8a5d-bba60c6cfbd1',
  },
});
