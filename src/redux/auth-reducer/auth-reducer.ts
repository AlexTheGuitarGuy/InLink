import { securityAPI } from '../../api/API';
import { LoginPayload, ResultCodes, ResultCodesWithCaptcha } from '../../types/types';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../redux-store';

const SET_DATA = 'IN_LINK/AUTH_REDUCER/SET_DATA';
const SET_CAPTCHA = 'IN_LINK/AUTH_REDUCER/SET_CAPTCHA';

const initialState = {
  id: 0,
  login: '',
  email: '',
  isLoggedIn: false,
  captchaURL: '',
};

export type AuthReducerState = typeof initialState;

type AuthAction = SetDataAction | SetCaptchaAction;

const authReducer = (state = initialState, action: AuthAction): AuthReducerState => {
  switch (action.type) {
    case SET_DATA:
    case SET_CAPTCHA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

type SetDataAction = {
  type: typeof SET_DATA;
  payload: {
    id: number;
    login: string;
    email: string;
    isLoggedIn: boolean;
  };
};
export const setData = ({ id, login, email, isLoggedIn }: SetDataPayload): SetDataAction => {
  return {
    type: SET_DATA,
    payload: { id, login, email, isLoggedIn },
  };
};

type SetCaptchaAction = {
  type: typeof SET_CAPTCHA;
  payload: { captchaURL: string };
};
export const setCaptcha = (captchaURL: string): SetCaptchaAction => {
  return {
    type: SET_CAPTCHA,
    payload: { captchaURL },
  };
};

type AuthThunk = ThunkAction<Promise<void | string>, RootState, unknown, AuthAction>;

export const auth = (): AuthThunk => {
  return async (dispatch) => {
    const data = await securityAPI.me();
    if (data.resultCode === ResultCodes.Success) {
      const { email, id, login } = data.data;
      dispatch(setData({ id, login, email, isLoggedIn: true }));
    }
  };
};

const getCaptchaURL = (): AuthThunk => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptchaURL();
    dispatch(setCaptcha(data.url));
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
      dispatch(setData({ id: 0, login: '', email: '', isLoggedIn: false }));
      dispatch(setCaptcha(''));
      return Promise.resolve('logged out');
    } else {
      return Promise.reject("couldn't log out");
    }
  };
};

export default authReducer;
