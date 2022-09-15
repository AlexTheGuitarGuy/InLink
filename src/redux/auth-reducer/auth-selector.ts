import { RootState } from '../redux-store';

export const getIsLoggedIn = (state: RootState): boolean => {
  return state.auth.isLoggedIn;
};

export const getCaptchaURL = (state: RootState): string | null => {
  return state.auth.captchaURL;
};

export const getLogin = (state: RootState): string | null => {
  return state.auth.login;
};

export const getUID = (state: RootState): number | null => {
  return state.auth.id;
};
