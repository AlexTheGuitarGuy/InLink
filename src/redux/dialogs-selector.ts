import { RootState } from './redux-store';
import { DialogsUser, UserMessage } from '../types/types';
import { DialogsReducerState } from './dialogs-reducer';

export const getDialogsPage = (state: RootState): DialogsReducerState => {
  return state.dialogsPage;
};

export const getUserMessages = (state: RootState): UserMessage[][] => {
  return getDialogsPage(state).userMessages;
};

export const getDialogsUsers = (state: RootState): DialogsUser[] => {
  return getDialogsPage(state).users;
};

export const getDialogUsers = (state: RootState): DialogsUser[] => {
  return state.dialogsPage.users;
};
