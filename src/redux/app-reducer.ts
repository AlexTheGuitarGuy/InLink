import { auth } from './auth-reducer';
import { Alert } from '../types/types';

const APP_INITIALIZED = 'IN_LINK/APP_REDUCER/APP_INITIALIZED';
const SET_ALERT = 'IN_LINK/APP_REDUCER/SET_ALERT';
const SET_SIDEBAR_HIDDEN = 'IN_LINK/APP_REDUCER/SET_SIDEBAR_HIDDEN';

const initialState = {
  isAppInitialized: false,
  isSidebarHidden: false,
  alert: { message: '', type: 'alert' } as Alert,
};

export type AppReducerState = typeof initialState;

const appReducer = (
  state = initialState,
  action: InitializeSuccessAction | SetAlertAction | SetIsSidebarHiddenAction,
): AppReducerState => {
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

type InitializeSuccessAction = {
  type: typeof APP_INITIALIZED;
  payload: { isAppInitialized: true };
};
const initializeSuccess = (): InitializeSuccessAction => ({
  type: APP_INITIALIZED,
  payload: { isAppInitialized: true },
});

type SetAlertAction = {
  type: typeof SET_ALERT;
  payload: { alert: Alert };
};
export const setAlert = (alert: Alert): SetAlertAction => ({
  type: SET_ALERT,
  payload: { alert },
});

type SetIsSidebarHiddenAction = {
  type: typeof SET_SIDEBAR_HIDDEN;
  payload: { isSidebarHidden: boolean };
};
export const setIsSidebarHidden = (isSidebarHidden: boolean): SetIsSidebarHiddenAction => ({
  type: SET_SIDEBAR_HIDDEN,
  payload: { isSidebarHidden },
});

export const initializeApp = () => async (dispatch: any) => {
  const authPromise = dispatch(auth());

  await Promise.all([authPromise]);

  dispatch(initializeSuccess());
};

export default appReducer;
