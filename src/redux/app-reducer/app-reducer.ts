import { auth } from '../auth-reducer/auth-reducer';
import { Alert } from '../../types/types';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState, InferAction, InferThunk } from '../redux-store';

const APP_INITIALIZED = 'IN_LINK/APP_REDUCER/APP_INITIALIZED';
const SET_ALERT = 'IN_LINK/APP_REDUCER/SET_ALERT';
const SET_SIDEBAR_HIDDEN = 'IN_LINK/APP_REDUCER/SET_SIDEBAR_HIDDEN';

const initialState = {
  isAppInitialized: false,
  isSidebarHidden: false,
  alert: { message: '', type: 'alert' } as Alert,
};

export type AppReducerState = typeof initialState;

type AppAction = InferAction<typeof appActions>;

type AppThunk = InferThunk<AppAction>;

const appReducer = (state = initialState, action: AppAction): AppReducerState => {
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

export const appActions = {
  initializeSuccess: () =>
    ({
      type: APP_INITIALIZED,
      payload: { isAppInitialized: true },
    } as const),

  setAlert: (alert: Alert) =>
    ({
      type: SET_ALERT,
      payload: { alert },
    } as const),

  setIsSidebarHidden: (isSidebarHidden: boolean) =>
    ({
      type: SET_SIDEBAR_HIDDEN,
      payload: { isSidebarHidden },
    } as const),
};

export const initializeApp = (): AppThunk => async (dispatch) => {
  const authPromise = dispatch(auth());

  await Promise.all([authPromise]);

  dispatch(appActions.initializeSuccess());
};

export default appReducer;
