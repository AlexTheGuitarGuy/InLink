import { auth } from './auth-reducer';

const APP_INITIALIZED = 'IN_LINK/APP_REDUCER/APP_INITIALIZED';
const SET_ALERT = 'IN_LINK/APP_REDUCER/SET_ALERT';
const SET_SIDEBAR_HIDDEN = 'IN_LINK/APP_REDUCER/SET_SIDEBAR_HIDDEN';

type initializeSuccessActionType = {
  type: typeof APP_INITIALIZED;
  payload: { isAppInitialized: true };
};

export type alertType = {
  text: string;
  type: 'success' | 'error' | 'alert' | '';
};

type setAlertActionType = {
  type: typeof SET_ALERT;
  payload: { alert: alertType };
};

type setIsSidebarHiddenActionType = {
  type: typeof SET_SIDEBAR_HIDDEN;
  payload: { isSidebarHidden: boolean };
};

export type initialStateType = {
  isAppInitialized: boolean;
  isSidebarHidden: boolean;
  alert: alertType | null;
};

const initialState = {
  isAppInitialized: false,
  isSidebarHidden: false,
  alert: { text: '', type: '' } as alertType,
};

const appReducer = (
  state: initialStateType = initialState,
  action: initializeSuccessActionType | setAlertActionType | setIsSidebarHiddenActionType,
) => {
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

export const setAlert = (alert: alertType) => ({
  type: SET_ALERT,
  payload: { alert },
});

export const setIsSidebarHidden = (isSidebarHidden: boolean) => ({
  type: SET_SIDEBAR_HIDDEN,
  payload: { isSidebarHidden },
});

export const initializeApp = () => async (dispatch: any) => {
  const authPromise = dispatch(auth());

  await Promise.all([authPromise]);

  dispatch(initializeSuccess());
};

export default appReducer;
