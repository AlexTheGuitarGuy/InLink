import { ResultCodes, ResultCodesWithCaptcha } from '../../api/API'
import { securityAPI } from '../../api/securityAPI'
import { LoginPayload } from '../../types/types'
import { setAlertFromThunk } from '../app-reducer/app-reducer'
import { InferAction, InferThunk } from '../store'

const initialState = {
  id: 0,
  login: '',
  email: '',
  isLoggedIn: false,
  captchaURL: '',
}

export type AuthReducerState = typeof initialState

type AuthAction = InferAction<typeof authActions>

type AuthThunk = InferThunk<AuthAction>

const authReducer = (state = initialState, action: AuthAction): AuthReducerState => {
  switch (action.type) {
    case 'IN_LINK/AUTH_REDUCER/SET_DATA':
    case 'IN_LINK/AUTH_REDUCER/SET_CAPTCHA':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

type SetDataPayload = {
  id: number
  login: string
  email: string
  isLoggedIn: boolean
}

const authActions = {
  setData: ({ id, login, email, isLoggedIn }: SetDataPayload) =>
    ({
      type: 'IN_LINK/AUTH_REDUCER/SET_DATA',
      payload: { id, login, email, isLoggedIn },
    } as const),

  setCaptcha: (captchaURL: string) =>
    ({
      type: 'IN_LINK/AUTH_REDUCER/SET_CAPTCHA',
      payload: { captchaURL },
    } as const),
}

export const auth = (): AuthThunk => {
  return async (dispatch) => {
    const data = await securityAPI.me()
    if (data.resultCode === ResultCodes.Success) {
      const { email, id, login } = data.data
      dispatch(authActions.setData({ id, login, email, isLoggedIn: true }))
    }
  }
}

const getCaptchaURL = (): AuthThunk => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptchaURL()
    dispatch(authActions.setCaptcha(data.url))
  }
}

export const login = ({
  email,
  password,
  rememberMe = false,
  captcha,
}: LoginPayload): AuthThunk => {
  return async (dispatch) => {
    const data = await securityAPI.login({ email, password, rememberMe, captcha })

    if (data.resultCode === ResultCodes.Success) {
      dispatch(auth())
      dispatch(setAlertFromThunk({ message: 'logged in', type: 'success' }))
    } else {
      if (data.resultCode === ResultCodesWithCaptcha.CaptchaRequired) dispatch(getCaptchaURL())

      const message = data.messages[0].length > 0 ? data.messages[0] : 'An error has occurred'
      dispatch(setAlertFromThunk({ message, type: 'error' }))
    }
  }
}

export const logout = (): AuthThunk => {
  return async (dispatch) => {
    const data = await securityAPI.logout()

    if (data.resultCode === ResultCodes.Success) {
      dispatch(authActions.setData({ id: 0, login: '', email: '', isLoggedIn: false }))
      dispatch(authActions.setCaptcha(''))
      dispatch(setAlertFromThunk({ message: 'logged out', type: 'alert' }))
    } else {
      dispatch(setAlertFromThunk({ message: "couldn't log out", type: 'error' }))
    }
  }
}

export default authReducer
