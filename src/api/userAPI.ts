import { instance, CommonResponse, GetItemsResponse, ResultCodes } from './API';
import { User } from '../types/types';

export const userAPI = {
  getUsers: async (page = 1, pageSize = 10) => {
    const response = await instance.get<GetItemsResponse<User>>(
      `users?page=${page}&count=${pageSize}`,
    );

    return response.data;
  },

  unfollow: async (id: number) => {
    const response = await instance.delete<CommonResponse<ResultCodes, {}>>(
      `https://social-network.samuraijs.com/api/1.0/follow/${id}`,
    );

    return response.data;
  },

  follow: async (id: number) => {
    const response = await instance.post<CommonResponse<ResultCodes, {}>>(
      `https://social-network.samuraijs.com/api/1.0/follow/${id}`,
    );

    return response.data;
  },
};
