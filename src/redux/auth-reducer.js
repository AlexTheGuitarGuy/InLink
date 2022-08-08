import { stopSubmit } from 'redux-form';
import { securityAPI } from '../api/API';

const SET_DATA = 'IN_LINK/AUTH_REDUCER/SET_DATA';
const SET_CAPTCHA = 'IN_LINK/AUTH_REDUCER/SET_CAPTCHA';

const defaultState = {
  id: null,
  login: null,
  email: null,
  isLoggedIn: false,
  captchaURL: null,
};

const authReducer = (state = defaultState, action) => {
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

export const setData = (id, login, email, isLoggedIn) => {
  return {
    type: SET_DATA,
    payload: { id, login, email, isLoggedIn },
  };
};

export const setCaptcha = (captchaURL) => {
  return {
    type: SET_CAPTCHA,
    payload: { captchaURL },
  };
};

export const auth = () => {
  return async (dispatch) => {
    const data = await securityAPI.me();
    if (data.resultCode === 0) {
      const { email, id, login } = data.data;
      dispatch(setData(id, login, email, true, null));
    }
  };
};

const getCaptchaURL = () => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptchaURL();
    console.log(data);
    dispatch(setCaptcha(data.url));
  };
};

export const login = (email, password, rememberMe = false, captcha) => {
  return async (dispatch) => {
    const data = await securityAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
      dispatch(auth());
      return Promise.resolve('login successful');
    } else {
      if (data.resultCode === 10) dispatch(getCaptchaURL());

      const message = data.messages[0].length > 0 ? data.messages[0] : 'An error has occurred';
      dispatch(stopSubmit('login', { _error: message }));
      return Promise.reject(message);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    const data = await securityAPI.logout();

    if (data.resultCode === 0) {
      dispatch(setData(null, null, null, false));
      dispatch(setCaptcha(null));
      return Promise.resolve('logged out');
    } else {
      return Promise.reject("couldn't log out");
    }
  };
};

export default authReducer;
