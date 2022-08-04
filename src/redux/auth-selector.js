export const getIsLoggedIn = (state) => {
  return state.auth.isLoggedIn;
};

export const getCaptchaURL = (state) => {
  return state.auth.captchaURL;
};

export const getLogin = (state) => {
  return state.auth.login;
};

export const getUID = (state) => {
  return state.auth.id;
};
