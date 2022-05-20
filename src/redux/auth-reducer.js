import { authAPI } from '../api/API';
import { stopSubmit } from 'redux-form';

const SET_DATA = 'SET-DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

let defaultState = {
  id: null,
  login: null,
  email: null,
  isLoggedIn: false,
  captchaURL: null,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SET_CAPTCHA:
      return {
        ...state,
        captchaURL: action.URL,
      };
    default:
      return state;
  }
};

export const setData = (id, login, email, isLoggedIn) => {
  return {
    type: SET_DATA,
    data: { id, login, email, isLoggedIn },
  };
};

export const setCaptcha = (URL) => {
  return {
    type: SET_CAPTCHA,
    URL,
  };
};

export const auth = () => (dispatch) => {
  return authAPI.me().then((data) => {
    if (data.resultCode === 0) {
      let { email, id, login } = data.data;
      dispatch(setData(id, login, email, true, null));
    }
  });
};

const getCaptchaURL = () => (dispatch) => {
  authAPI.getCaptchaURL().then((data) => {
    dispatch(setCaptcha(data.url));
  });
};

export const login =
  (email, password, rememberMe = false, captcha) =>
  (dispatch) => {
    authAPI
      .login(email, password, rememberMe, captcha)
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(auth());
        } else {
          if (data.resultCode === 10) dispatch(getCaptchaURL());

          let message =
            data.messages[0].length > 0
              ? data.messages[0]
              : 'An error has occurred';
          dispatch(stopSubmit('login', { _error: message }));
        }
      });
  };

export const logout = () => (dispatch) => {
  authAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setData(null, null, null, false));
      dispatch(setCaptcha(null));
    }
  });
};

export default authReducer;
