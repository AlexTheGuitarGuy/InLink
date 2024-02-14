import { RootState } from '@/redux/store'

export const getIsLoggedIn = (state: RootState) => {
  return state.auth.isLoggedIn
}

export const getCaptchaURL = (state: RootState) => {
  return state.auth.captchaURL
}

export const getLogin = (state: RootState) => {
  return state.auth.login
}

export const getUID = (state: RootState) => {
  return state.auth.id
}
