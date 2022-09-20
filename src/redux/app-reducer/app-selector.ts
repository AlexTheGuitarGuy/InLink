import { RootState } from '../redux-store';
import { Alert } from '../../types/types';

export const getIsAppInitialized = (state: RootState) => {
  return state.app.isAppInitialized;
};

export const getIsSidebarHidden = (state: RootState) => {
  return state.app.isSidebarHidden;
};

export const getAlert = (state: RootState) => {
  return state.app.alert;
};
