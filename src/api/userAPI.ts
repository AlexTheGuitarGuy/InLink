import { User } from '../types/types'
import { CommonResponse, GetItemsResponse, instance, ResultCodes } from './API'

export const userAPI = {
  getUsers: async (payload: string) => {
    const response = await instance.get<GetItemsResponse<User>>(payload)

    return response.data
  },

  isFollowing: async (id: number) => {
    const response = await instance.get<boolean>(`follow/${id}`)

    return response.data
  },

  unfollow: async (id: number) => {
    const response = await instance.delete<CommonResponse<ResultCodes, {}>>(`follow/${id}`)

    return response.data
  },

  follow: async (id: number) => {
    const response = await instance.post<CommonResponse<ResultCodes, {}>>(`follow/${id}`)

    return response.data
  },
}
