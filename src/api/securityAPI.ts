import {
  instance,
  CommonResponse,
  GetCaptchaURLResponse,
  ResultCodes,
  ResultCodesWithCaptcha,
} from './API'
import { LoginPayload } from '../types/types'

export const securityAPI = {
  me: async () => {
    const response = await instance.get<
      CommonResponse<ResultCodes, { id: number; email: string; login: string }>
    >('auth/me')

    return response.data
  },

  login: async ({ email, password, rememberMe, captcha }: LoginPayload) => {
    const response = await instance.post<
      CommonResponse<ResultCodes | ResultCodesWithCaptcha, { userId: 2 }>
    >(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    })

    return response.data
  },

  logout: async () => {
    const response = await instance.delete<CommonResponse<ResultCodes, {}>>(`auth/login`)

    return response.data
  },

  getCaptchaURL: async () => {
    const response = await instance.get<GetCaptchaURLResponse>(`/security/get-captcha-url`)

    return response.data
  },
}
