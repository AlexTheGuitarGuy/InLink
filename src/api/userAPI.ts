import { instance, CommonResponse, GetItemsResponse, ResultCodes } from './API'
import { User } from '../types/types'

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
    console.log(id)
    const response = await instance.delete<CommonResponse<ResultCodes, {}>>(`follow/${id}`)

    return response.data
  },

  follow: async (id: number) => {
    console.log(id)

    const response = await instance.post<CommonResponse<ResultCodes, {}>>(`follow/${id}`)

    return response.data
  },
}
