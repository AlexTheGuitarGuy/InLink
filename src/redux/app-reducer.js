import { auth } from './auth-reducer';

const APP_INITIALIZED = 'IN_LINK/APP_REDUCER/APP_INITIALIZED';
const SET_SIDEBAR_HIDDEN = 'IN_LINK/APP_REDUCER/SET_SIDEBAR_HIDDEN';
const SET_ALERT = 'IN_LINK/APP_REDUCER/SET_ALERT';

const defaultState = {
  isAppInitialized: false,
  isSidebarHidden: false,
  alert: { message: '', type: '' },
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case APP_INITIALIZED:
    case SET_SIDEBAR_HIDDEN:
    case SET_ALERT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const initializeSuccess = () => ({
  type: APP_INITIALIZED,
  payload: { isAppInitialized: true },
});

export const setAlert = (alert) => ({
  type: SET_ALERT,
  payload: { alert },
});

export const setIsSidebarHidden = (isSidebarHidden) => ({
  type: SET_SIDEBAR_HIDDEN,
  payload: { isSidebarHidden },
});

export const initializeApp = () => async (dispatch) => {
  const authPromise = dispatch(auth());

  await Promise.all([authPromise]);

  dispatch(initializeSuccess());
};

export default appReducer;
