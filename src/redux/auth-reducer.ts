import { stopSubmit } from 'redux-form';
import { securityAPI } from '../api/API';
import { LoginPayload } from '../types/types';

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

const authReducer = (
  state = initialState,
  action: SetDataAction | SetCaptchaAction,
): AuthReducerState => {
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

type SetDataPayload = {
  id: number;
  login: string;
  email: string;
  isLoggedIn: boolean;
};
type SetDataAction = {
  type: typeof SET_DATA;
  payload: SetDataPayload;
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

export const auth = () => {
  return async (dispatch: any) => {
    const data = await securityAPI.me();
    if (data.resultCode === 0) {
      const { email, id, login } = data.data;
      dispatch(setData({ id, login, email, isLoggedIn: true }));
    }
  };
};

const getCaptchaURL = () => {
  return async (dispatch: any) => {
    const data = await securityAPI.getCaptchaURL();
    dispatch(setCaptcha(data.url));
  };
};

export const login = ({ email, password, rememberMe = false, captcha }: LoginPayload) => {
  return async (dispatch: any) => {
    const data = await securityAPI.login({ email, password, rememberMe, captcha });

    if (data.resultCode === 0) {
      dispatch(auth());
      return Promise.resolve('logged in');
    } else {
      if (data.resultCode === 10) dispatch(getCaptchaURL());

      const message = data.messages[0].length > 0 ? data.messages[0] : 'An error has occurred';
      dispatch(stopSubmit('login', { _error: message }));
      return Promise.reject(message);
    }
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    const data = await securityAPI.logout();

    if (data.resultCode === 0) {
      dispatch(setData({ id: 0, login: '', email: '', isLoggedIn: false }));
      dispatch(setCaptcha(''));
      return Promise.resolve('logged out');
    } else {
      return Promise.reject("couldn't log out");
    }
  };
};

export default authReducer;
