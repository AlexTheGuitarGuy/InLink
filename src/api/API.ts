import * as axios from 'axios';
import {
  Photo,
  InputProfileData,
  LoginPayload,
  GetUsersResponse,
  CommonResponse,
  ProfileData,
  GetCaptchaURLResponse,
} from '../types/types';

const instance = axios.default.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'b27ac241-a89b-4b50-8a5d-bba60c6cfbd1',
  },
});

export const userAPI = {
  getUsers: async (page = 1, pageSize = 10) => {
    const response = await instance.get<GetUsersResponse>(`users?page=${page}&count=${pageSize}`);

    return response.data;
  },

  unfollow: async (id: number) => {
    const response = await instance.delete<CommonResponse<{}>>(
      `https://social-network.samuraijs.com/api/1.0/follow/${id}`,
    );

    return response.data;
  },

  follow: async (id: number) => {
    const response = await instance.post<CommonResponse<{}>>(
      `https://social-network.samuraijs.com/api/1.0/follow/${id}`,
    );

    return response.data;
  },
};

export const profileAPI = {
  getProfile: async (uid: number) => {
    const response = await instance.get<ProfileData>(`profile/${uid}`);

    return response.data;
  },

  getStatus: async (uid: number) => {
    const response = await instance.get<string>(`profile/status/${uid}`);

    return response.data;
  },

  updateStatus: async (status: string) => {
    const response = await instance.put<CommonResponse<{}>>(`profile/status`, { status });

    return response.data.resultCode;
  },

  uploadPFP: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await instance.put<CommonResponse<{ photos: Photo }>>(
      'profile/photo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  },

  uploadProfileInfo: async (payload: InputProfileData & { userId: number }) => {
    const response = await instance.put<CommonResponse<{}>>('profile', payload);

    return response.data;
  },
};

export const securityAPI = {
  me: async () => {
    const response = await instance.get<
      CommonResponse<{ id: number; email: string; login: string }>
    >('https://social-network.samuraijs.com/api/1.0/auth/me');

    return response.data;
  },

  login: async ({ email, password, rememberMe, captcha }: LoginPayload) => {
    const response = await instance.post<CommonResponse<{ userId: 2 }>>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });

    return response.data;
  },

  logout: async () => {
    const response = await instance.delete<CommonResponse<{}>>(`auth/login`);

    return response.data;
  },

  getCaptchaURL: async () => {
    const response = await instance.get<GetCaptchaURLResponse>(`/security/get-captcha-url`);

    return response.data;
  },
};
