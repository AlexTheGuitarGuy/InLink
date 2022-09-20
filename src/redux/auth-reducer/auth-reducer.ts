import { securityAPI } from '../../api/securityAPI';
import { ResultCodes, ResultCodesWithCaptcha } from '../../api/API';
import { LoginPayload } from '../../types/types';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState, InferAction, InferThunk } from '../redux-store';

const initialState = {
  id: 0,
  login: '',
  email: '',
  isLoggedIn: false,
  captchaURL: '',
};

export type AuthReducerState = typeof initialState;

type AuthAction = InferAction<typeof authActions>;

type AuthThunk = InferThunk<AuthAction, void | string>;

const authReducer = (state = initialState, action: AuthAction): AuthReducerState => {
  switch (action.type) {
    case 'IN_LINK/AUTH_REDUCER/SET_DATA':
    case 'IN_LINK/AUTH_REDUCER/SET_CAPTCHA':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

type SetDataPayload = {
  id: number;
  login: string;
  email: string;
  isLoggedIn: boolean;
};

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
};

export const auth = (): AuthThunk => {
  return async (dispatch) => {
    const data = await securityAPI.me();
    if (data.resultCode === ResultCodes.Success) {
      const { email, id, login } = data.data;
      dispatch(authActions.setData({ id, login, email, isLoggedIn: true }));
    }
  };
};

const getCaptchaURL = (): AuthThunk => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptchaURL();
    dispatch(authActions.setCaptcha(data.url));
  };
};

export const login = ({
  email,
  password,
  rememberMe = false,
  captcha,
}: LoginPayload): AuthThunk => {
  return async (dispatch) => {
    const data = await securityAPI.login({ email, password, rememberMe, captcha });

    if (data.resultCode === ResultCodes.Success) {
      dispatch(auth());
      return Promise.resolve('logged in');
    } else {
      if (data.resultCode === ResultCodesWithCaptcha.CaptchaRequired) dispatch(getCaptchaURL());

      const message = data.messages[0].length > 0 ? data.messages[0] : 'An error has occurred';
      return Promise.reject(message);
    }
  };
};

export const logout = (): AuthThunk => {
  return async (dispatch) => {
    const data = await securityAPI.logout();

    if (data.resultCode === ResultCodes.Success) {
      dispatch(authActions.setData({ id: 0, login: '', email: '', isLoggedIn: false }));
      dispatch(authActions.setCaptcha(''));
      return Promise.resolve('logged out');
    } else {
      return Promise.reject("couldn't log out");
    }
  };
};

export default authReducer;
