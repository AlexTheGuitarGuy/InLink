import { RootState } from '../redux-store'

export const getDialogsPage = (state: RootState) => {
  return state.dialogsPage
}

export const getUserMessages = (state: RootState) => {
  return getDialogsPage(state).userMessages
}

export const getDialogsUsers = (state: RootState) => {
  return getDialogsPage(state).users
}

export const getDialogUsers = (state: RootState) => {
  return state.dialogsPage.users
}
