import { authAPI } from './../api/API';
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

export const auth = () => (dispatch) => {
  authAPI.me().then((data) => {
    if (data.resultCode === 0) {
      let { email, id, login } = data.data;
      dispatch(setData(id, login, email));
    }
  });
};

export default authReducer;
