import { instance, CommonResponse, GetProfileResponse, ResultCodes } from './API';
import { Photo, InputProfileData } from '../types/types';

export const profileAPI = {
  getProfile: async (uid: number) => {
    const response = await instance.get<GetProfileResponse>(`profile/${uid}`);

    return response.data;
  },

  getStatus: async (uid: number) => {
    const response = await instance.get<string>(`profile/status/${uid}`);

    return response.data;
  },

  updateStatus: async (status: string) => {
    const response = await instance.put<CommonResponse<ResultCodes, {}>>(`profile/status`, {
      status,
    });

    return response.data.resultCode;
  },

  uploadPFP: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await instance.put<CommonResponse<ResultCodes, { photos: Photo }>>(
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
    const response = await instance.put<CommonResponse<ResultCodes, {}>>('profile', payload);

    return response.data;
  },
};
