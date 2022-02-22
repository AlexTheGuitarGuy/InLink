const SET_DATA = 'SET-DATA';

let defaultState = {
  id: null,
  login: null,
  email: null,
  isLoggedIn: false,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_DATA:
      window.authState = state;
      return {
        ...state,
        ...action.data,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export const setData = (id, login, email) => ({
  type: SET_DATA,
  data: { id, login, email },
});

export default authReducer;
