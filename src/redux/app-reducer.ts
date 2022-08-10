import { auth } from './auth-reducer';
import { AlertType } from '../types/types';

const APP_INITIALIZED = 'IN_LINK/APP_REDUCER/APP_INITIALIZED';
const SET_ALERT = 'IN_LINK/APP_REDUCER/SET_ALERT';
const SET_SIDEBAR_HIDDEN = 'IN_LINK/APP_REDUCER/SET_SIDEBAR_HIDDEN';

const initialState = {
  isAppInitialized: false,
  isSidebarHidden: false,
  alert: { text: '', type: 'alert' } as AlertType,
};

export type AppReducerStateType = typeof initialState;

const appReducer = (
  state = initialState,
  action: InitializeSuccessActionType | SetAlertActionType | SetIsSidebarHiddenActionType,
): AppReducerStateType => {
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

type InitializeSuccessActionType = {
  type: typeof APP_INITIALIZED;
  payload: { isAppInitialized: true };
};
const initializeSuccess = (): InitializeSuccessActionType => ({
  type: APP_INITIALIZED,
  payload: { isAppInitialized: true },
});

type SetAlertActionType = {
  type: typeof SET_ALERT;
  payload: { alert: AlertType };
};
export const setAlert = (alert: AlertType): SetAlertActionType => ({
  type: SET_ALERT,
  payload: { alert },
});

type SetIsSidebarHiddenActionType = {
  type: typeof SET_SIDEBAR_HIDDEN;
  payload: { isSidebarHidden: boolean };
};
export const setIsSidebarHidden = (isSidebarHidden: boolean): SetIsSidebarHiddenActionType => ({
  type: SET_SIDEBAR_HIDDEN,
  payload: { isSidebarHidden },
});

export const initializeApp = () => async (dispatch: any) => {
  const authPromise = dispatch(auth());

  await Promise.all([authPromise]);

  dispatch(initializeSuccess());
};

export default appReducer;
