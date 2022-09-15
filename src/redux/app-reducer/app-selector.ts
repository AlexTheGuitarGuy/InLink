import { RootState } from '../redux-store';
import { Alert } from '../../types/types';

export const getIsAppInitialized = (state: RootState): boolean => {
  return state.app.isAppInitialized;
};

export const getIsSidebarHidden = (state: RootState): boolean => {
  return state.app.isSidebarHidden;
};

export const getAlert = (state: RootState): Alert => {
  return state.app.alert;
};
