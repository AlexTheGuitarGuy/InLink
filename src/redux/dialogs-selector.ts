import { RootState } from './redux-store';
import { DialogsUser } from '../types/types';
import { DialogsReducerState } from './dialogs-reducer';

export const getStoredText = (state: RootState): string => {
  return state.dialogsPage.storedText;
};

export const getDialogsPage = (state: RootState): DialogsReducerState => {
  return state.dialogsPage;
};

export const getDialogUsers = (state: RootState): DialogsUser[] => {
  return state.dialogsPage.users;
};
