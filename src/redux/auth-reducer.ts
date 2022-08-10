import { stopSubmit } from 'redux-form';
import { securityAPI } from '../api/API';

const SET_DATA = 'IN_LINK/AUTH_REDUCER/SET_DATA';
const SET_CAPTCHA = 'IN_LINK/AUTH_REDUCER/SET_CAPTCHA';

const initialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isLoggedIn: false,
  captchaURL: null as string | null,
};

export type AuthReducerStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: SetDataActionType | SetCaptchaActionType,
): AuthReducerStateType => {
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

type SetDataPayloadType = {
  id: number | null;
  login: string | null;
  email: string | null;
  isLoggedIn: boolean;
};
type SetDataActionType = {
  type: typeof SET_DATA;
  payload: SetDataPayloadType;
};
export const setData = ({
  id,
  login,
  email,
  isLoggedIn,
}: SetDataPayloadType): SetDataActionType => {
  return {
    type: SET_DATA,
    payload: { id, login, email, isLoggedIn },
  };
};

type SetCaptchaActionType = {
  type: typeof SET_CAPTCHA;
  payload: { captchaURL: string | null };
};
export const setCaptcha = (captchaURL: string | null): SetCaptchaActionType => {
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
    console.log(data);
    dispatch(setCaptcha(data.url));
  };
};

export type LoginThunkPayloadType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export const login = ({ email, password, rememberMe = false, captcha }: LoginThunkPayloadType) => {
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
      dispatch(setData({ id: null, login: null, email: null, isLoggedIn: false }));
      dispatch(setCaptcha(null));
      return Promise.resolve('logged out');
    } else {
      return Promise.reject("couldn't log out");
    }
  };
};

export default authReducer;
