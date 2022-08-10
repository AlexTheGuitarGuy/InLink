import * as axios from 'axios';
import { PhotoType, ProfileDataType, LoginPayloadType } from '../types/types';

const instance = axios.default.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'b27ac241-a89b-4b50-8a5d-bba60c6cfbd1',
  },
});

export const userAPI = {
  getUsers: async (page = 1, pageSize = 10) => {
    const response = await instance.get(`users?page=${page}&count=${pageSize}`);

    return response.data;
  },

  unfollow: async (id: number) => {
    const response = await instance.delete(
      `https://social-network.samuraijs.com/api/1.0/follow/${id}`,
    );

    return response.data;
  },

  follow: async (id: number) => {
    const response = await instance.post(
      `https://social-network.samuraijs.com/api/1.0/follow/${id}`,
    );

    return response.data;
  },
};

export const profileAPI = {
  getProfile: async (uid: number) => {
    const response = await instance.get(`profile/${uid}`);

    return response.data;
  },

  getStatus: async (uid: number) => {
    const response = await instance.get(`profile/status/${uid}`);

    return response.data;
  },

  updateStatus: async (status: string) => {
    const response = await instance.put(`profile/status`, { status });

    return response.data.resultCode;
  },

  uploadPFP: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  uploadProfileInfo: async (payload: ProfileDataType) => {
    const response = await instance.put('profile', payload);

    return response.data;
  },
};

export const securityAPI = {
  me: async () => {
    const response = await instance.get('https://social-network.samuraijs.com/api/1.0/auth/me');

    return response.data;
  },

  login: async ({ email, password, rememberMe, captcha }: LoginPayloadType) => {
    const response = await instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });

    return response.data;
  },

  logout: async () => {
    const response = await instance.delete(`auth/login`);

    return response.data;
  },

  getCaptchaURL: async () => {
    const response = await instance.get(`/security/get-captcha-url`);

    return response.data;
  },
};
